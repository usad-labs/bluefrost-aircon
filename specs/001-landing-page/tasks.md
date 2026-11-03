# Tasks: BlueFrost Aircon Landing Page

**Input**: spec.md, plan.md, data-model.md, research.md, design-system/bluefrost-aircon/MASTER.md
**Format**: `- [ ] T### [P?] [Story] description (path)`. [P] = can run in parallel (different files). Owner in brackets at the end.

## Phase 1: Setup

- [ ] T001 Turn design-system tokens into CSS custom properties (`src/styles/tokens.css`) [Bolt]
- [ ] T002 Base layout: lang, meta description, OG/Twitter tags, favicon, a 1200×630 OG image, font preload, skip link, `prefers-reduced-motion` reset (`src/layouts/Base.astro`, `public/`) [Bolt] (FR-016, edge cases)
- [ ] T003 [P] Self-host the chosen font as a latin-subset woff2 (`public/fonts/`) [Bolt]
- [ ] T004 [P] `Icon` component with only the Lucide SVGs used, `aria-hidden` by default (`src/components/Icon.astro`) [Bolt]

## Phase 2: Foundational (blocks all stories)

- [ ] T005 Content data files with invented sample data (`src/data/site.ts`, `services.ts`, `pricing.ts`, `reviews.ts`, `faq.ts`, `stats.ts`) [Bolt] (FR-014, data-model.md)
- [ ] T006 Playwright + axe config and a shared helper; add `npx playwright test` to `.claude/quality-gates.txt` (`playwright.config.ts`, `tests/`) [Bugsy]

## Phase 3: US1, quote from a phone (P1) 🎯 MVP

- [ ] T007 [US1] Header with logo and a sticky quote bar on phones that covers no content (`src/components/Header.astro`) [Bolt] (FR-012)
- [ ] T008 [US1] Hero: problem-first headline, supporting line, technician photo via `astro:assets` (eager, sized), "Get a quote" + "Message us" (`src/components/Hero.astro`, `src/assets/`) [Bolt] (FR-002, FR-011)
- [ ] T009 [US1] Final CTA band + footer with sample contacts, fictional-business notice, USAD credit (`src/components/CtaBand.astro`, `Footer.astro`) [Bolt] (FR-013)
- [ ] T010 [US1] Tests: hero headline and CTA above the fold at 360px; `tel:` and `m.me` hrefs; JS-off run shows all quote actions (`tests/quote.spec.ts`) [Bugsy] (SC-001, SC-006)

## Phase 4: US2, trust and price check (P2)

- [ ] T011 [P] [US2] Trust icon row + client wordmark row (`TrustRow.astro`, `LogoRow.astro`) [Bolt] (FR-004, FR-005)
- [ ] T012 [P] [US2] Services cards ×4 (`Services.astro`) [Bolt] (FR-018)
- [ ] T013 [P] [US2] Stats row + how-it-works 3 steps (`Stats.astro`, `HowItWorks.astro`) [Bolt] (FR-006, FR-007)
- [ ] T014 [P] [US2] Pricing ×3 with "from ₱X,XXX per unit", popular badge, unit-type note (`Pricing.astro`) [Bolt] (FR-008)
- [ ] T015 [P] [US2] Reviews ×3 with accessible star rating and initials avatars (`Reviews.astro`) [Bolt] (FR-009)
- [ ] T016 [P] [US2] FAQ with `<details>` (`Faq.astro`) [Bolt] (FR-010)
- [ ] T017 [US2] Assemble all 11 sections in order with alternating light/dark backgrounds (`src/pages/index.astro`) [Bolt] (FR-001, FR-003)
- [ ] T018 [US2] Tests: 11 sections in order; 4 services, 3 packages (exactly 1 popular, `fromPrice` = min unit price), 3 reviews with readable ratings, 5–6 FAQ items that open by keyboard (`tests/content.spec.ts`) [Bugsy]

## Phase 5: US3, portfolio quality (P3)

- [ ] T019 [US3] Tests: no sideways scroll at 320/360/768/1280; transfer < 500 KB; axe 0 serious/critical; reduced-motion visible (`tests/quality.spec.ts`) [Bugsy] (SC-003–SC-005)
- [ ] T020 [US3] Lighthouse CI config with SC-002 asserts on `dist/` (`lighthouserc.json`) [Bugsy] (SC-002)
- [ ] T021 [P] [US3] README (what, stack + why, run, checks, screenshots 360px + desktop in `docs/`) and `CREDITS.md` (`README.md`, `CREDITS.md`, `docs/`) [Bolt] (FR-015)

## Phase 6: Review and release

- [ ] T022 Nana review: a11y, licences in CREDITS, fake-data check (no real names, brands or contacts), README links public (`work/06-review/review.md`) [Nana] (FR-014, SC-007)
- [ ] T023 gitleaks over files + history = 0 findings; local commit [lead] (SC-007)
- [ ] T024 ✋ Gate 4: create the public repo, push, Vercel deploy; re-run lhci against the live URL [user + lead]

## Dependencies

Setup → Foundational → US1 → US2 → US3 → Review. Within a phase, [P] tasks touch different files. Bolt's tasks feed Bugsy's matching test tasks (T010, T018, T019).
