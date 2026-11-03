import type { Page } from '@playwright/test';

// Collapse normal and non-breaking spaces so text matches regardless of nbsp.
export const norm = (s: string | null | undefined) => (s ?? '').replace(/[\s  ]+/g, ' ').trim();

// Scroll the whole page in 400px steps, 120 ms apart, so lazy <img>s start loading.
// behavior 'instant': html has scroll-behavior: smooth, which would turn each step into an animation.
export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y <= document.documentElement.scrollHeight; y += 400) {
      window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
      await new Promise((r) => setTimeout(r, 120));
    }
  });
}

// Srcs of <img>s that have not finished loading with real pixels (naturalWidth > 0).
export const imagesNotLoaded = (page: Page) =>
  page.evaluate(() =>
    [...document.images]
      .filter((i) => !(i.complete && i.naturalWidth > 0))
      .map((i) => i.currentSrc || i.src || '(no src)'),
  );

// Before a full-page shot: scroll, wait for the network and every image, then back to the top.
export async function loadAllImages(page: Page) {
  await scrollThrough(page);
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, {
    timeout: 15_000,
  });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }));
}
