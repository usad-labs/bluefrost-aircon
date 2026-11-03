import { test } from '@playwright/test';
import { loadAllImages } from './helpers';

// Only runs with SHOTS=1: writes the README screenshots into docs/.
test.skip(!process.env.SHOTS, 'set SHOTS=1 to regenerate docs screenshots');

test('360px and 1280px screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'docs/screenshot-360.png' });
  await loadAllImages(page); // lazy photos must be loaded before a full-page shot
  await page.screenshot({ path: 'docs/screenshot-360-full.png', fullPage: true });
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'docs/screenshot-1280.png' });
  await loadAllImages(page);
  await page.screenshot({ path: 'docs/screenshot-1280-full.png', fullPage: true });
  // sticky bar over the footer, and pricing cards, at 360px
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto('/');
  await page.locator('footer').scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.screenshot({ path: 'docs/qa-360-footer-bottom.png' });
  await page.locator('#pricing').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'docs/qa-360-pricing.png' });
});
