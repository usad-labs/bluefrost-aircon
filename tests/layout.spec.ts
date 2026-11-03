import { test, expect, type Page } from '@playwright/test';

// Device / alignment regression tests, run against the built site (same as the other specs).
// 900 / 1100 are grid switch points in the CSS; 1366 is the common laptop width.
const WIDTHS = [360, 390, 768, 900, 1024, 1100, 1280, 1366, 1440, 1920];
const TOL = 2; // px: allowed difference for "same y"

// Page-y boxes of every element matching `selector`.
const boxes = (page: Page, selector: string) =>
  page.evaluate(
    (sel) =>
      [...document.querySelectorAll(sel)].map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top + window.scrollY, height: r.height };
      }),
    selector,
  );

// Cards whose tops are within TOL of each other are in the same grid row.
function rowsOf<T extends { top: number }>(items: T[]): T[][] {
  const rows: T[][] = [];
  for (const it of [...items].sort((a, b) => a.top - b.top)) {
    const row = rows.find((r) => Math.abs(r[0].top - it.top) <= TOL);
    row ? row.push(it) : rows.push([it]);
  }
  return rows;
}

// Row sizes, e.g. [2, 2] or [3] or [1, 1, 1]. Orphan = a lone card in a row while another row holds 2+.
const hasOrphan = (sizes: number[]) => sizes.some((n) => n === 1) && sizes.some((n) => n >= 2);

for (const width of WIDTHS) {
  test.describe(`layout at ${width}px`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready); // web font changes text widths, so wait for it
    });

    test('no sideways scroll', async ({ page }) => {
      const { sw, cw } = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        cw: document.documentElement.clientWidth,
      }));
      expect(sw).toBeLessThanOrEqual(cw);
    });

    test('pricing: quote buttons line up and no orphan row', async ({ page }) => {
      const cards = await boxes(page, '#pricing ul.grid > li');
      expect(cards).toHaveLength(3);
      const buttons = await boxes(page, '#pricing ul.grid > li > a.btn');
      expect(buttons).toHaveLength(3);
      const rows = rowsOf(cards.map((c, i) => ({ ...c, btn: buttons[i].top })));
      for (const row of rows) {
        const tops = row.map((c) => c.btn);
        expect(Math.max(...tops) - Math.min(...tops), `button tops in one row: ${tops}`).toBeLessThanOrEqual(TOL);
      }
      expect(hasOrphan(rows.map((r) => r.length)), `pricing row sizes: ${rows.map((r) => r.length)}`).toBe(false);
    });

    test('services: price rows line up and no orphan row', async ({ page }) => {
      const cards = await boxes(page, '#services ul.cards > li');
      expect(cards).toHaveLength(4);
      const prices = await page.evaluate(() =>
        [...document.querySelectorAll('#services ul.cards > li .price')].map((el) => ({
          top: el.getBoundingClientRect().top + window.scrollY,
          text: (el.querySelector('strong')?.textContent ?? '').trim(),
        })),
      );
      // content, not just position: every card shows "from ₱<n>" or "Quoted first"
      expect(prices).toHaveLength(4);
      for (const p of prices) expect(p.text).toMatch(/^(from ₱[\d,]+|Quoted first)$/);
      const rows = rowsOf(cards.map((c, i) => ({ ...c, price: prices[i].top })));
      for (const row of rows) {
        const tops = row.map((c) => c.price);
        expect(Math.max(...tops) - Math.min(...tops), `price tops in one row: ${tops}`).toBeLessThanOrEqual(TOL);
      }
      expect(hasOrphan(rows.map((r) => r.length)), `services row sizes: ${rows.map((r) => r.length)}`).toBe(false);
    });

    test('section padding follows the tokens', async ({ page }) => {
      // Resolve --section-pad / --strip-pad to px at this width with a probe element.
      const pad = await page.evaluate(() => {
        const probe = document.createElement('div');
        document.body.append(probe);
        const px = (v: string) => {
          probe.style.paddingTop = `var(${v})`;
          return parseFloat(getComputedStyle(probe).paddingTop);
        };
        const out = { section: px('--section-pad'), strip: px('--strip-pad') };
        probe.remove();
        return out;
      });
      expect(pad.strip).toBeCloseTo(pad.section * 0.4, 1);

      // Each top-level <section> of <main> paints its bands itself (.band) or via inner .band divs (CTA).
      // Strips (--strip-pad) per the CSS: .trust (TrustRow), .logos (LogoRow). The cyan .contact strip was removed.
      // Hero is excluded on purpose (it sets its own photo-led padding).
      const found = await page.evaluate(() =>
        [...document.querySelectorAll('main > section')].map((s) => ({
          name: s.id || s.className.replace(/\bband(-\w+)?\b/g, '').trim() || s.getAttribute('aria-labelledby') || '?',
          surfaces: (s.classList.contains('band') ? [s] : [...s.querySelectorAll(':scope > .band')]).map((b) => ({
            strip: b.classList.contains('trust') || b.classList.contains('logos'),
            stage: b.classList.contains('stage'),
            hero: b.classList.contains('hero'),
            top: parseFloat(getComputedStyle(b).paddingTop),
          })),
        })),
      );
      expect(found, 'hero, trust, logos, services, stats, how, pricing, reviews, faq, cta').toHaveLength(10);

      let regular = 0;
      let strips = 0;
      for (const s of found) {
        for (const b of s.surfaces) {
          if (b.hero) continue;
          if (b.strip) {
            strips++;
            expect(b.top, `${s.name} is a strip`).toBeCloseTo(pad.strip, 1);
          } else if (b.stage && width < 1024) {
            // CTA photo band on phones/tablets: 220px of photo sits above the text on purpose (CtaBand.astro).
            expect(b.top, `${s.name} stage (photo offset below 1024px)`).toBe(220);
          } else {
            regular++;
            expect(b.top, `${s.name} section`).toBeCloseTo(pad.section, 1);
          }
        }
      }
      expect(strips, 'trust + logos').toBe(2);
      expect(regular, 'services, stats, how, pricing, reviews, faq' + (width < 1024 ? '' : ' + CTA stage')).toBe(
        width < 1024 ? 6 : 7,
      );
    });
  });
}

test('services section is under 1,000px tall at 1440px', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const [services] = await boxes(page, '#services');
  expect(services.height).toBeLessThan(1000);
});
