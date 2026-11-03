# 04-build notes (Bolt)

Done: T001-T005, T007-T009, T011-T017, T021 (except real screenshots, which are Bugsy's: README says TODO).
Gate: `npm run check` 0/0/0, `npm run build` OK, html-validate OK, gitleaks no leaks, `<script` count in dist/index.html = 0.
Manual check (Playwright chromium, ad hoc): no sideways scroll at 320/360/1280; at 360x640 the h1 and "Get a quote" are above the fold.

## Things to know
- **Non-breaking spaces:** html-validate's `tel-non-breaking` rule fails on normal spaces in the text of any `tel:` link. So `site.phoneDisplay` is `0917 000 0000` and `site.quoteLabel` is `Get a quote` (src/data/site.ts). Bugsy: match text with whitespace-normalising locators (`getByRole('link', {name: /get a quote/i})`); an exact string with a normal space may not match.
- **MASTER.md hover contrast:** primary CTA hover = `#C2410C` bg with dark `#0B1530` text (as the override says). I estimate ~3.6:1, below AA 4.5:1. Not axe-detectable (hover state). Lead: decide whether to switch hover text to white (~5:1).
- **OG image:** `public/og-image.png` (PNG, 1200x630) made from `src/assets/og-image.svg` with sharp once, by hand. Not regenerated at build. Social crawlers need an absolute URL: set `site` in astro.config.mjs after the Vercel URL exists (Base.astro already uses `Astro.site`). I did not edit astro.config.mjs.
- **Hero swap:** change the import in `src/components/Hero.astro` (one line) plus alt text; the `<Image>` has width/height, sizes, eager and fetchpriority=high. SVG sources are passed through unoptimised; a JPG/PNG will be converted by astro:assets.
- **Sticky bar** lives in Header.astro (fixed, <768px). It is early in tab order on phones; acceptable for stage 1.
- Pricing self-check: `assertPricing()` in src/data/pricing.ts throws at import (exactly 3 packages, exactly 1 popular, fromPrice = min unitPrices). Verified by reading, not by a failing-run test; Bugsy's T018 also covers it.
- Header/hero used `band-white` / `band-light` global classes from src/styles/global.css; extra file beyond the plan (tokens.css has variables only).
- No docs/ files created (screenshots are Bugsy's).

## Fix round (2026-11-03, after Nana and Bugsy)
Gate: `npm run check` 0/0/0, build OK, `npx playwright test` 20 passed / 1 skipped (screenshots), html-validate OK, gitleaks clean. At 360px the sticky bar buttons are 48 px tall (one line each), fixed at the bottom, after `<main>` in the DOM.

1. **Accent-band hover** (src/styles/global.css, `.band-accent .btn-secondary:hover`): solid navy `#0B1530` + white text, 18.04:1 (was 4.13:1).
2. **Licence:** `public/fonts/OFL.txt` copied from the fontsource LICENSE. CREDITS.md now says the woff2 was copied into `public/fonts/` and the devDependency stays only as the source.
3. **README:** screenshots embedded, test commands listed, "all copy in src/data" softened, Lighthouse and weight line added.
4. **Sticky bar:** moved to new `src/components/QuoteBar.astro`, rendered after `<Footer />` in `src/pages/index.astro` (still `position: fixed` bottom, phones only).
5. **Pricing links:** `aria-label="Get a quote for {name}"` (Pricing.astro).
6. **Ponytail:** `.sr-only` deleted (unused). `fromPrice` now derived with `Math.min(...Object.values(unitPrices))` in pricing.ts; the literal is gone, so the old per-package min check went too. "exactly 3" and "exactly 1 popular" checks kept.
7. **Installation icon:** new `aircon` icon (wall unit with airflow) in src/data/icons.ts, used by the Installation card. `site.messengerLabel` is now `Message us`; `site.messengerAriaLabel` keeps `Message us (sample link)` (set on all 3 Messenger links). Hero phone line now reads "Or call 0917 000 0000 (sample number)".
`site` in astro.config.mjs is still not set (waits for the Vercel URL).

### Contrast of every interactive state (WCAG AA text 4.5:1; focus ring needs 3:1)
Active uses the same colours as hover (no separate :active style). Focus changes only the outline, not the text colours, so the focus rows are ring vs background. Computed with a small node script (WCAG relative luminance); hover tints are the real composite (12% colour over the band).

| Band | Element and state | Text on background | Ratio |
|---|---|---|---|
| light (#EFF6FF) | primary default | navy on #EA580C | 5.07 |
| light | primary hover/active | navy on #F97316 | 6.44 |
| light | secondary default | #1E40AF on #EFF6FF | 8.01 |
| light | secondary hover/active | #1E40AF on 12% tint | 6.58 |
| light | text link / muted text | #1E40AF / #475569 on #EFF6FF | 8.01 / 6.96 |
| white (header) | logo and link | #1E40AF on white | 8.72 |
| white | primary default / hover | navy on #EA580C / #F97316 | 5.07 / 6.44 |
| dark (navy) | primary default / hover/active | navy on #EA580C / #F97316 | 5.07 / 6.44 |
| dark | secondary default | white on navy | 18.04 |
| dark | secondary hover/active | white on 12% white tint | 12.92 |
| dark | footer link / muted text | #93C5FD / #BFDBFE on navy | 10.00 / 12.69 |
| dark card (white) | primary default / hover | navy on #EA580C / #F97316 | 5.07 / 6.44 |
| dark card | muted text | #475569 on white | 7.58 |
| accent (#EA580C) | call button default | white on navy | 18.04 |
| accent | call button hover/active | white on #1E3A8A | 10.36 |
| accent | secondary default | navy on #EA580C | 5.07 |
| accent | secondary hover/active (old, 12% navy tint) | navy on tint | 4.13 FAIL |
| accent | secondary hover/active (new, solid navy) | white on navy | 18.04 |
| accent | body text | navy on #EA580C | 5.07 |
| focus ring | light / dark / accent / card | #1E40AF on #EFF6FF, #FDBA74 on navy, navy on #EA580C, #1E40AF on white | 8.01 / 10.70 / 5.07 / 8.72 (all >= 3) |

Lowest passing text pair: navy on #EA580C at 5.07. Nothing below 4.5 remains.

### Left open
- docs/screenshot-360.png was taken before this round (the old two-line "Message us (sample link)" label and the old icon). Regenerate with `SHOTS=1 npx playwright test` (docs/ is not in my ownership).
- No test depends on the old label: tests match `/message\s+us/i`, which still matches.
