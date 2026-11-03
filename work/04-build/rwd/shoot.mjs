// Usage: node work/04-build/rwd/shoot.mjs [tag] [widths,comma] [shots:0|1]
// Measures layout at each width (JSON to stdout) and saves full-page screenshots to work/04-build/rwd/<tag>-<width>.png
import { chromium } from '@playwright/test';
const tag = process.argv[2] ?? 'after';
const widths = (process.argv[3] ?? '360,390,768,1024,1280,1440,1920').split(',').map(Number);
const shots = process.argv[4] !== '0';
const browser = await chromium.launch();
const out = {};
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto('http://localhost:4321/');
  await page.evaluate(async () => {
    for (let y = 0; y <= document.documentElement.scrollHeight; y += 400) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 100));
    }
  });
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 15000 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  out[w] = await page.evaluate(() => {
    const r = (e) => { const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y + scrollY), w: Math.round(b.width), h: Math.round(b.height) }; };
    const secs = [...document.querySelectorAll('main > section'), document.querySelector('footer')];
    const heights = Object.fromEntries(secs.map((s, i) => [(s.id || s.className.split(' ').find((c) => !c.startsWith('band')) || 'sec') + i, Math.round(s.getBoundingClientRect().height)]));
    const tops = (sel) => [...document.querySelectorAll(sel)].map((e) => Math.round(e.getBoundingClientRect().top + scrollY));
    const cardH = (sel) => [...document.querySelectorAll(sel)].map((e) => Math.round(e.getBoundingClientRect().height));
    const left = (sel) => [...new Set([...document.querySelectorAll(sel)].map((e) => Math.round(e.getBoundingClientRect().left)))];
    return {
      doc: document.documentElement.scrollHeight, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
      heights,
      pricingBtnTops: tops('#pricing ul.grid > li > .btn'), pricingCardH: cardH('#pricing ul.grid > li'),
      pricingCardTops: tops('#pricing ul.grid > li'),
      svcCardTops: tops('#services .cards > li'), svcCardH: cardH('#services .cards > li'), svcPriceTops: tops('#services .price'),
      trustItemTops: tops('.trust li'),
      containerLefts: left('main > section .container, main > section .container > :first-child'),
      h1: r(document.querySelector('h1')),
    };
  });
  if (shots) await page.screenshot({ path: `work/04-build/rwd/${tag}-${w}.png`, fullPage: true });
  if (process.env.SECS) {
    const names = ['hero', 'trust', 'logos', 'services', 'stats', 'how', 'pricing', 'reviews', 'faq', 'cta', 'footer'];
    const els = await page.locator('main > section, footer').all();
    for (const [i, el] of els.entries()) if (process.env.SECS === 'all' || process.env.SECS.split(',').includes(names[i])) await el.screenshot({ path: `work/04-build/rwd/${tag}-${w}-${names[i]}.png` });
  }
  await page.close();
}
await browser.close();
console.log(JSON.stringify(out));
