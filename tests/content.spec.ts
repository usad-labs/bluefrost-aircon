import { test, expect } from '@playwright/test';
import { norm } from './helpers';

test.beforeEach(async ({ page }) => page.goto('/'));

test('11 sections in the FR-001 order', async ({ page }) => {
  const names = await page.evaluate(() => {
    const els = [...document.querySelectorAll('main > section'), document.querySelector('footer')!];
    return els.map((e) => ({
      tag: e.tagName,
      heading: (e.querySelector('h1,h2') as HTMLElement | null)?.textContent ?? '',
      label: e.getAttribute('aria-label') ?? '',
      cls: e.className,
    }));
  });
  expect(names).toHaveLength(11);
  const text = (i: number) => norm(names[i].heading).toLowerCase();
  expect(names[0].cls).toContain('hero');
  expect(names[0].heading).not.toBe('');
  expect(names[1].cls).toContain('trust');
  expect(names[2].cls).toContain('logos');
  expect(text(3)).toMatch(/everything your aircon/);
  expect(names[4].label).toMatch(/numbers/i);
  expect(text(5)).toMatch(/how|work/);
  expect(text(6)).toMatch(/pric/);
  expect(text(7)).toMatch(/customers|review/);
  expect(text(8)).toMatch(/question/);
  expect(names[9].heading).not.toBe('');
  expect(names[10].tag).toBe('FOOTER');
});

test('4 services', async ({ page }) => {
  await expect(page.locator('#services h3')).toHaveCount(4);
  const t = norm(await page.locator('#services').innerText()).toLowerCase();
  for (const k of ['clean', 'repair', 'install', 'freon|gas']) expect(t).toMatch(new RegExp(k));
});

test('3 packages, exactly 1 popular, prices "from PHP X,XXX per unit"', async ({ page }) => {
  await expect(page.locator('#pricing ul.grid > li')).toHaveCount(3);
  await expect(page.locator('#pricing .badge')).toHaveCount(1);
  await expect(page.locator('#pricing li.popular')).toHaveCount(1);
  await expect(page.locator('#pricing li.popular h3')).toHaveText(/Deep Chemical Clean/);
  const names = (await page.locator('#pricing ul.grid > li > h3').allInnerTexts()).map(norm);
  expect(names).toEqual(['Basic Clean', 'Deep Chemical Clean', 'Care Plan']);
  for (const p of await page.locator('#pricing .price').allInnerTexts()) {
    expect(norm(p)).toMatch(/^from ₱\d{1,3}(,\d{3})* per unit$/);
  }
  await expect(page.locator('#pricing .unit-note')).toContainText(/window/i);
  await expect(page.locator('#pricing .unit-note')).toContainText(/split/i);
});

test('"from" price equals the lowest unit price on each card', async ({ page }) => {
  const num = (s: string) => Number(s.replace(/[^\d]/g, ''));
  for (const card of await page.locator('#pricing ul.grid > li').all()) {
    const from = num(norm(await card.locator('.price strong').innerText()));
    const units = norm(await card.locator('.units').innerText()).match(/₱[\d,]+/g)!.map(num);
    expect(from).toBe(Math.min(...units));
  }
});

test('3 reviews with a readable rating', async ({ page }) => {
  const reviews = page.locator('#reviews ul.grid > li');
  await expect(reviews).toHaveCount(3);
  for (const r of await reviews.all()) {
    expect(await r.locator('.rating').getAttribute('aria-label')).toMatch(/Rated [1-5] out of 5 stars/);
    expect(norm(await r.locator('.rating-text').textContent())).toMatch(/^[1-5] out of 5$/);
    await expect(r.locator('.town')).toContainText(/, Cavite/);
  }
});

test('5-6 FAQ items: first starts open and closes with Enter; the rest start closed and open with Enter/Space', async ({ page }) => {
  const items = page.locator('#faq details');
  const n = await items.count();
  expect(n).toBeGreaterThanOrEqual(5);
  expect(n).toBeLessThanOrEqual(6);
  // The first card starts open (Faq.astro: details open={i === 0}).
  const first = items.first();
  await expect(first).toHaveAttribute('open', '');
  await expect(first.locator('p')).toBeVisible();
  await first.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(first).not.toHaveAttribute('open', '');
  await expect(first.locator('p')).toBeHidden();
  // Every other card starts closed.
  for (let i = 1; i < n; i++) await expect(items.nth(i)).not.toHaveAttribute('open', '');
  const second = items.nth(1);
  await second.locator('summary').focus();
  await page.keyboard.press('Space');
  await expect(second).toHaveAttribute('open', '');
  await page.keyboard.press('Enter');
  await expect(second).not.toHaveAttribute('open', '');
  const third = items.nth(2);
  await third.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(third).toHaveAttribute('open', '');
});

test('footer has the fictional-business notice and USAD credit', async ({ page }) => {
  const f = norm(await page.locator('footer').innerText());
  expect(f).toMatch(/fictional business/i);
  expect(f).toMatch(/sample data/i);
  expect(f).toMatch(/Built by USAD Labs/);
});

test('no form and no script', async ({ page }) => {
  const html = await (await page.request.get('/')).text();
  expect(html).not.toMatch(/<form[\s>]/i);
  expect(html).not.toMatch(/<script[\s>]/i);
  await expect(page.locator('form, input, textarea')).toHaveCount(0);
});
