# Implementation Plan: BlueFrost Aircon Landing Page

**Branch**: `001-landing-page` | **Date**: 2026-11-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-landing-page/spec.md`

## Summary

A single static landing page: 11 sections, quote actions via `tel:` and Messenger links, no form and no backend. It's built with Astro so the page ships as plain HTML and CSS, with 0 JavaScript in stage 1. All content (services, packages, reviews, FAQ, business info) lives in typed data files, so the components can be reused for USAD's other portfolio pages and the stage 2 calculator can read the same pricing data.

## Why this stack (for the USAD CTO)

1. **Astro + TypeScript + scoped CSS.** It outputs static HTML and ships 0 JS by default, so the speed and "works with JS off" targets hold without extra effort.
2. **Built-in image optimisation** (`astro:assets` → AVIF/WebP, sized `srcset`, explicit dimensions). Photos are the biggest risk to the 500 KB budget and to layout shift.
3. **Reuse:** USAD plans 3 portfolio landing pages (services, real estate, products). Components + data files carry over; only the data and the tokens change.
4. **Stage 2 fit:** the quote calculator becomes one island (`client:visible`) reading `src/data/pricing.ts`. The rest of the page stays static.
5. **Rejected:** plain HTML (no reuse and hand-made image variants), Next.js (React runtime JS hurts the 90+ performance target), Tailwind (long class lists; scoped CSS + tokens is enough).

## Technical Context

**Language/Version**: TypeScript 6 (strict), Astro 7.4, HTML, CSS (custom properties)
**Primary Dependencies**: `astro` (runtime/build). Dev only: `@astrojs/check`, `typescript`, `@playwright/test`, `@axe-core/playwright`, `@lhci/cli`, `html-validate`. Icons: Lucide SVGs copied inline (ISC), not a package. Font: one self-hosted latin-subset variable woff2 (picked in the design system), at most 2 families.
**Storage**: N/A (content in `src/data/*.ts`)
**Testing**: Playwright (overflow check at 320/360/768/1280, JS-off run, quote links, transfer weight) + axe (fail on serious/critical) · Lighthouse CI (mobile, asserts from SC-002) · html-validate on `dist/` · gitleaks
**Target Platform**: static hosting on Vercel Hobby (zero-config Astro preset, output `dist/`); evergreen mobile and desktop browsers
**Project Type**: static website (single project)
**Performance Goals**: Lighthouse mobile perf ≥ 90, LCP < 2.5 s, CLS < 0.1, first-load transfer < 500 KB (hero image ≈ 60–90 KB AVIF)
**Constraints**: 0 client JS in stage 1, works with JS off, WCAG 2.2 AA, no third-party requests at runtime (fonts self-hosted, no analytics, no embeds), free assets only
**Scale/Scope**: 1 page, 11 sections, about 12 components

## Constitution Check

The spec-kit constitution is not filled in (small depth skips `/speckit-constitution`), so the gates below come from USAD Labs' team rules and lessons:

| Gate | Status |
|---|---|
| Tests before "done": the auto gate + Bugsy's Playwright/axe/lhci suite | ✅ planned |
| Config over code: all copy and prices in `src/data/` | ✅ |
| Offline/demoable: static build, no network at runtime | ✅ |
| Every animation has a visible reduced-motion state (Team Lessons) | ✅ planned (spec edge case) |
| Every README link is public, checked with `gh repo view` (Team Lessons) | ✅ planned (Nana) |
| Nothing publishes without a yes (Gate 4) | ✅ |

Post-design re-check: no violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-landing-page/
├── spec.md              # /speckit-specify + clarify
├── plan.md              # this file
├── research.md          # Phase 0 decisions (summarises work/explore/research.md)
├── data-model.md        # Phase 1 content entities
├── quickstart.md        # Phase 1 run / check / deploy
├── tasks.md             # build order for Bolt and Bugsy
└── checklists/requirements.md
```

No `contracts/`: the page exposes no API or external interface. The only outward links are `tel:` and the placeholder Messenger URL, both specified in FR-011.

### Source Code (repository root)

```text
src/
├── data/            # site.ts, services.ts, pricing.ts, reviews.ts, faq.ts, stats.ts
├── components/      # Header (sticky CTA), Hero, TrustRow, LogoRow, Services, Stats,
│                    # HowItWorks, Pricing, Reviews, Faq, CtaBand, Footer, Icon
├── layouts/Base.astro   # <head>: meta, OG, favicon, font preload, skip link
├── styles/tokens.css    # design-system tokens (colours, type, spacing, radius)
├── assets/          # source photos (optimised at build by astro:assets)
└── pages/index.astro
public/              # favicon, og-image, fonts/*.woff2
tests/               # Playwright specs (owned by Bugsy)
design-system/bluefrost-aircon/MASTER.md
```

**Structure Decision**: single static Astro project. One component per section keeps each one small and lets the sibling portfolio pages reuse them.

## Complexity Tracking

No constitution violations to justify.
