import { test, expect, type Page } from '@playwright/test';

// Axe only sees the default state. This measures real contrast of every .btn while hovered and keyboard-focused.
// Runs in the page: resolve any CSS colour (rgb, color-mix, color()) via canvas, composite translucent
// backgrounds over the ancestors, then compute the WCAG 2.x ratio.
const measure = (el: HTMLElement) => {
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!;
  const rgba = (css: string) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return [r, g, b, a / 255];
  };
  const over = (top: number[], bot: number[]) => {
    const a = top[3] + bot[3] * (1 - top[3]);
    if (a === 0) return [0, 0, 0, 0];
    return [0, 1, 2].map((i) => (top[i] * top[3] + bot[i] * bot[3] * (1 - top[3])) / a).concat(a);
  };
  let bg = [255, 255, 255, 0];
  for (let n: HTMLElement | null = el; n && bg[3] < 1; n = n.parentElement) {
    bg = over(bg, rgba(getComputedStyle(n).backgroundColor)); // bg is "on top" of what we have found so far
  }
  const fg = over(rgba(getComputedStyle(el).color), bg);
  const lum = (c: number[]) => {
    const [r, g, b] = c.slice(0, 3).map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [hi, lo] = [lum(fg), lum(bg)].sort((a, b) => b - a);
  const band = el.closest('.card') ? 'card' : (el.closest('.band')?.className.match(/band-\w+/)?.[0] ?? 'none');
  return {
    ratio: (hi + 0.05) / (lo + 0.05),
    label: `${band} / ${el.className.replace('btn ', '')} / "${(el.textContent ?? '').trim()}"`,
    fg: getComputedStyle(el).color,
    bg: bg.map(Math.round).join(','),
  };
};

const failures = (rows: { ratio: number; label: string; fg: string; bg: string }[], state: string) =>
  rows
    .filter((r) => r.ratio < 4.5)
    .map((r) => `${state}: ${r.label} is ${r.ratio.toFixed(2)}:1 (fg ${r.fg} on rgb ${r.bg})`);

async function allBtns(page: Page) {
  // visible only: the header button is hidden on phones, the sticky bar on desktop
  return page.locator('.btn:visible').all();
}

for (const width of [360, 1280]) {
  test.describe(`button state contrast at ${width}px`, () => {
    test.use({ viewport: { width, height: 800 }, reducedMotion: 'reduce' }); // reduced motion = no colour transition to wait for

    test('hover: every visible .btn is >= 4.5:1', async ({ page }) => {
      await page.goto('/');
      const btns = await allBtns(page);
      expect(btns.length).toBeGreaterThanOrEqual(5);
      const rows = [];
      for (const b of btns) {
        await b.scrollIntoViewIfNeeded();
        await b.hover();
        rows.push(await b.evaluate(measure));
      }
      // must cover all three bands, otherwise the test proves nothing
      const bands = new Set(rows.map((r) => r.label.split(' / ')[0]));
      expect([...bands]).toEqual(expect.arrayContaining(['band-light', 'band-accent', 'card']));
      expect(failures(rows, 'hover')).toEqual([]);
    });

    test('keyboard focus: every visible .btn is >= 4.5:1 and has a ring', async ({ page }) => {
      await page.goto('/');
      const total = await page.locator('.btn:visible').count();
      const seen = new Set<string>();
      const rows = [];
      const noRing: string[] = [];
      for (let i = 0; i < 80 && seen.size < total; i++) {
        await page.keyboard.press('Tab');
        const focused = page.locator(':focus');
        if (!(await focused.evaluate((e) => e.classList.contains('btn')))) continue;
        const info = {
          ...(await focused.evaluate(measure)),
          key: await focused.evaluate((e) => e.outerHTML),
          ring: await focused.evaluate((e) => {
            const s = getComputedStyle(e);
            return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2;
          }),
        };
        if (seen.has(info.key)) continue;
        seen.add(info.key);
        rows.push(info);
        if (!info.ring) noRing.push(info.label);
      }
      expect(seen.size, 'tabbing reached every visible .btn').toBe(total);
      expect(noRing).toEqual([]);
      expect(failures(rows, 'focus')).toEqual([]);
    });
  });
}
