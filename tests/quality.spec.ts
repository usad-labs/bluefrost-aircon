import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { imagesNotLoaded, scrollThrough } from './helpers';

for (const width of [320, 360, 768, 1280]) {
  test(`no sideways scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const { sw, cw } = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
    }));
    expect(sw).toBeLessThanOrEqual(cw);
  });
}

test('first load transfers < 500 KB', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  let bytes = 0;
  const pending: Promise<void>[] = [];
  page.on('response', (res) =>
    pending.push(
      res
        .body()
        .then((b) => void (bytes += b.length))
        .catch(() => {}),
    ),
  );
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await Promise.all(pending);
  console.log(`transferred ~${(bytes / 1024).toFixed(1)} KB (uncompressed bodies)`);
  expect(bytes).toBeLessThan(500 * 1024);
});

test('after scrolling, every img has loaded', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto('/');
  await scrollThrough(page);
  await page.waitForLoadState('networkidle');
  expect(await imagesNotLoaded(page)).toEqual([]);
});

for (const width of [360, 1280]) {
  test(`axe: 0 serious or critical at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    const bad = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([]);
  });
}

test('reduced motion: everything stays visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const s of await page.locator('main > section').all()) {
    await expect(s).toBeVisible();
    expect(await s.evaluate((e) => getComputedStyle(e).opacity)).toBe('1');
  }
  await expect(page.locator('footer')).toBeVisible();
  const anim = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length);
  expect(anim).toBe(0);
});

test('skip link exists, works, and focus ring is visible on the first link', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  const first = page.locator(':focus');
  await expect(first).toHaveAttribute('href', '#main');
  await expect(first).toBeVisible();
  const ring = await first.evaluate((e) => {
    const s = getComputedStyle(e);
    return { style: s.outlineStyle, width: parseFloat(s.outlineWidth), shadow: s.boxShadow };
  });
  expect((ring.style !== 'none' && ring.width >= 2) || ring.shadow !== 'none').toBe(true);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await page.keyboard.press('Tab');
  const next = await page.locator(':focus').evaluate((e) => {
    const s = getComputedStyle(e);
    return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2;
  });
  expect(next).toBe(true);
});

test('360px keyboard order: main content comes before the sticky quote bar', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto('/');
  const total = await page.evaluate(() => document.querySelectorAll('a[href], button, summary').length);
  const order: string[] = [];
  for (let i = 0; i < total + 5; i++) {
    await page.keyboard.press('Tab');
    order.push(
      await page.evaluate(() => {
        const e = document.activeElement!;
        return e.closest('.quote-bar') ? 'bar' : e.closest('main') ? 'main' : e.closest('footer') ? 'footer' : 'other';
      }),
    );
    if (order.at(-1) === 'bar') break; // tabbing past the end wraps to the top; stop at the first bar link
  }
  const firstBar = order.indexOf('bar');
  expect(firstBar, 'tabbing reaches the quote bar').toBeGreaterThan(-1);
  expect(order.slice(firstBar)).toEqual(['bar']);
  expect(order.slice(0, firstBar)).toContain('main');
  expect(order.slice(0, firstBar)).toContain('footer');
});
