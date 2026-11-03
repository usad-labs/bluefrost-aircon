import { test, expect } from '@playwright/test';

test.describe('quote actions at 360x640', () => {
  test.use({ viewport: { width: 360, height: 640 } });

  test('h1 and a "Get a quote" link are visible without scrolling', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    const quote = page.getByRole('link', { name: /get\s+a\s+quote/i }).first();
    await expect(quote).toBeVisible();
    // "visible" alone is true below the fold, so check the boxes against the viewport.
    for (const box of [await h1.boundingBox(), await quote.boundingBox()]) {
      expect(box).not.toBeNull();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(640);
    }
  });

  test('tel link is +639170000000 and m.me link opens safely in a new tab', async ({ page }) => {
    await page.goto('/');
    const tels = page.locator('a[href^="tel:"]');
    expect(await tels.count()).toBeGreaterThan(0);
    for (const href of await tels.evaluateAll((els) => els.map((e) => e.getAttribute('href')))) {
      expect(href).toBe('tel:+639170000000');
    }
    const msgs = page.locator('a[href^="https://m.me/"]');
    expect(await msgs.count()).toBeGreaterThan(0);
    for (const el of await msgs.all()) {
      await expect(el).toHaveAttribute('target', '_blank');
      expect(await el.getAttribute('rel')).toMatch(/noopener/);
    }
  });
});

test.describe('JavaScript off', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 360, height: 640 } });

  test('all 11 sections and quote actions are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main > section')).toHaveCount(10);
    await expect(page.locator('footer')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    // hero, 3 pricing cards, CTA band, sticky bar (+ desktop header link, hidden on phones)
    expect(await page.getByRole('link', { name: /get\s+a\s+quote/i }).count()).toBe(6);
    expect(await page.getByRole('link', { name: /message\s+us/i }).count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator('a[href="tel:+639170000000"]:visible').first()).toBeVisible();
  });
});
