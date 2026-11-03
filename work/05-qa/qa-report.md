# QA report: BlueFrost v3 re-check (lazy-image screenshots)

**Verdict: PASS.** 0 bugs in the product. The lazy-image screenshot defect was in the test (tests/screenshots.spec.ts), now fixed. src/ was not touched.

## Checks (quality-gates.txt, plus lhci)

| Check | Result |
|---|---|
| `npm run check` | 0 errors, 0 warnings, 0 hints |
| `npm run build` | 1 page built |
| `SHOTS=1 npx playwright test` | 27 passed (regenerated docs/*.png) |
| `npx playwright test` | 26 passed, 1 skipped (screenshots, SHOTS unset) |
| `npx html-validate "dist/**/*.html"` | exit 0 |
| `gitleaks dir . --no-banner --redact` | no leaks found |
| `npx lhci autorun` (mobile, 1 run) | Performance 99, Accessibility 100, Best Practices 100, SEO 100. All 4 above threshold. LCP 1.4 s, CLS 0 |

## Changes (test files only)

- `tests/helpers.ts`: added `scrollThrough` (400px steps, 120 ms apart, `behavior: 'instant'` because html has `scroll-behavior: smooth`), `imagesNotLoaded`, and `loadAllImages` (scroll, networkidle, wait for every img with naturalWidth > 0 with a 15 s timeout, scroll to top).
- `tests/screenshots.spec.ts`: `loadAllImages` runs before both full-page shots (360 and 1280).
- `tests/quality.spec.ts`: new test "after scrolling, every img has loaded" (one assertion: `imagesNotLoaded` is `[]` at 360px).

## Evidence

- Full-page shots now show photos. Viewed tiled captures: docs/screenshot-360-full.png (360x10015) and docs/screenshot-1280-full.png (1280x7278). Hero, service cards, how-it-works, CTA band and stats backgrounds are all filled. File sizes rose from 1.03 MB to 1.30 MB (360) and 1.89 MB to 3.03 MB (1280).
- Mutation probe: a temporary spec that 404'd every `/_astro/*` image failed the new assertion and listed the blocked avif URLs. The probe was deleted afterwards.
- Flake check: the new test passed 3 of 3 with `--repeat-each=3`.

## Coverage gaps

- Critical: none.
- Important: the image assertion passes vacuously on a page with zero `img` elements. The site has about 10 images today, so it is not vacuous now. No separate count assertion was added because the request was for one assertion.
- Nice to have: the screenshot test does not assert on image content. It relies on the waitForFunction timeout, which throws after 15 s if an image never loads.

## Bugs

None open. The screenshot defect (empty navy cards in the full-page shots) was a test-side bug and is fixed.

## Notes

- Lighthouse was run with no upload target, so nothing was uploaded.
- Team Lessons already has the 2026-11-03 full-page screenshot lesson. No new lesson added.
