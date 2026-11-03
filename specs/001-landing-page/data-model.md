# Phase 1 Data Model: content entities

All content lives in typed TypeScript modules under `src/data/`. All values are invented sample data (FR-014).

| Entity | File | Fields | Rules |
|---|---|---|---|
| Site | `site.ts` | `name`, `tagline`, `phoneDisplay`, `phoneHref` (`tel:+63…`), `messengerUrl`, `serviceArea: string[]`, `hours` | phone in 09XX format, clearly fake; messenger = `https://m.me/` |
| Service | `services.ts` | `id`, `name`, `icon` (Lucide name), `benefit` (1 line), `detail` | exactly 4: cleaning, repair, installation, freon/gas refill |
| Package | `pricing.ts` | `id`, `name`, `fromPrice` (number, ₱ per unit), `unitPrices: { window: number; split: number }`, `includes: string[]`, `popular: boolean` | exactly 3; exactly one `popular`; `fromPrice` = min of `unitPrices`; formatted `from ₱X,XXX per unit` with `Intl.NumberFormat('en-PH')` at build. Stage 2 reads `unitPrices` |
| Review | `reviews.ts` | `name` ("Ana R."), `town` (Cavite), `rating` (1–5 int), `text` | exactly 3; initials are derived from `name` |
| FaqItem | `faq.ts` | `q`, `a` | 5–6 items |
| Stat | `stats.ts` | `value` (string, e.g. "2,400+"), `label` | 3–4 items |
| TrustClaim | `site.ts` | `icon`, `text` | 3–4 items |
| ClientLogo | `site.ts` | `name` (invented) | 4–6 items, rendered as greyscale wordmarks |

Self-check: one small TypeScript assertion module (or a Playwright test) confirms exactly one popular package and that `fromPrice === Math.min(...Object.values(unitPrices))`.
