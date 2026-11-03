# Phase 0 Research: BlueFrost Aircon Landing Page

Full exploration: `work/explore/research.md` (Nori, 2026-11-03). Decisions only:

| Topic | Decision | Rationale | Alternatives rejected |
|---|---|---|---|
| Stack | Astro + TS + scoped CSS | see plan.md "Why this stack" | plain HTML, Next.js, Tailwind |
| Hosting | Vercel Hobby, zero-config; fallback `vercel deploy` CLI if Hobby refuses the org-owned repo | free, Astro preset auto-detected | GitHub Pages, repo under nagisa314 |
| Icons | Lucide SVGs inlined via one `Icon` component | ISC licence, no runtime, ~10 icons | Heroicons, Tabler (fine, MIT) |
| Photos | Pexels/Unsplash, "air conditioner technician", no visible brand logos, recorded in `CREDITS.md` | free commercial use without attribution (custom licences, not CC0; reread pexels.com/license before use) | stock faces for reviewers (fake names on real faces) |
| Reviewer avatars | initials circles | avoids putting fake names on real people | stock portraits |
| Client logos | invented SVG/text wordmarks, greyscale | FR-005, FR-014 | real brands |
| Fonts | self-hosted latin-subset variable woff2, `font-display: swap`, preloaded | no third-party request; faster | Google Fonts CDN |
| FAQ | `<details>/<summary>` | works without JS, accessible by default | JS accordion |
| Sticky CTA | CSS `position: sticky` bottom bar on phones, with matching body padding | no JS, nothing hidden underneath | JS scroll listener |
| Messenger link | `https://m.me/` (Messenger home, no account) labelled as sample | must not point to a real account (spec edge case) | a made-up username (might exist) |
| Phone | `0917 000 0000`-style sample in 09XX format, shown as text too | clearly fake | random digits that might be real |
| Checks | Playwright + axe, lhci, html-validate, gitleaks | free, local, Windows-ok | pa11y-ci, @axe-core/cli |

Known risks: lhci can raise EPERM temp cleanup errors on Windows (retry or use the plain `lighthouse` CLI); Vercel Hobby with an org repo is unverified.
