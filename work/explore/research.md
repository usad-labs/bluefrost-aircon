# BlueFrost Aircon: explore research (stage 1, static page)

Sources: Team Lessons, Skill Library, Landing Page References (Services section), 3 web searches (third-party blogs, not official docs). Items marked (verify) must be checked by Bolt or Bugsy first. Nothing was installed or cloned.
Lessons applied: every animation needs a visible reduced-motion state; check each README link is public (`gh repo view`); status text must be false-proof for empty input; run each check in its own step so one crash does not hide the rest.

## 1. Spec-kit specs
1. Installed `speckit-*` skills (constitution, specify, plan, tasks, analyze). PICK. Init with `--events false --no-model-invocation`; never implement or converge (per Skill Library).
2. Hand-written spec.md + plan.md. Fallback.
3. Skip specs. No, it is a deliverable.
Mistake to avoid: a spec that lists "how" (tags) instead of testable "what". Put the budgets in as acceptance criteria: Lighthouse mobile perf >= 90, a11y >= 95, axe 0 serious, no sideways scroll at 360px, first load < 500 KB, works with JS off. The plan records the stack choice (section 3a) and that stage 2 is out of scope.

## 2. Design system (ui-ux-pro-max, installed)
1. ui-ux-pro-max search for style, palette, font pair, landing pattern. PICK.
2. Pattern from Landing Page References: one brand colour + one accent button colour, light and dark sections alternating, trust icon row under hero, stats, how-it-works steps, review cards, final CTA band.
3. Hand-picked frost blue + orange accent. Fallback.
Mistakes: accent button text failing AA (white on light blue, orange on white). Need 4.5:1 body, 3:1 large text and UI borders. Add a visible focus ring and a `prefers-reduced-motion` state.
Suggested 11 sections (Bolt confirms in spec): sticky bar + hero with one CTA / trust icon row / client logos / services cards / pricing packages / stats / how-it-works steps / reviews / FAQ / final CTA band / footer.

## 3. Static landing page
### (a) Stack
1. Plain HTML + one hand-written CSS file, no build, no JS required. PICK. Smallest payload, JS-off works by default, Vercel serves it with zero config.
2. Eleventy: only if repeated markup (cards, FAQ) becomes painful. Adds a Node build.
3. Astro (static output): best upgrade path if stage 2 grows, ships 0 JS by default. Tailwind via CDN is a no (runtime JS, size). Tailwind CLI adds a build step for little gain on one page.
Stage 2 (quote calculator) needs: a 3-question form and a price-range calc. Build as progressive enhancement: form and a call/WhatsApp link work without JS, plus one small vanilla JS file. Keep prices in a data object, not hardcoded in HTML. Move to Astro only if it needs multiple pages.
Tip: `<details>/<summary>` for the FAQ (no JS, accessible).

### (b) Free, license-safe assets
- Icons: Lucide (ISC). Copy only the ~10 SVGs used, inline. Alternatives: Heroicons, Tabler (both MIT).
- Photos: Pexels or Unsplash. Both allow commercial use, no attribution required, but they are custom licences, not CC0; no redistributing as a stock set, no implying endorsement, no trademarks. Sources conflict on details, so read pexels.com/license and unsplash.com/license directly. Search "air conditioner technician". Avoid visible brand logos on AC units. Keep a `CREDITS.md` (photographer, URL). Convert to AVIF/WebP, hero about 60 KB, set width/height, lazy-load below the fold, never lazy-load the hero.
- Reviewer faces: use initials avatars, not stock faces with fake names.
- Fake client logos: invented text or simple SVG wordmarks, greyscale, never real brands. Footer note "sample data".
- Fonts: self-host a latin-subset variable woff2 (fontsource or google-webfonts-helper), `font-display: swap`, preload it, max 2 families. Fewer connections and no third-party request. Google Fonts CDN is the fallback.

## 4. Repo, Vercel, README, secret scan
1. GitHub public repo `usad-labs/bluefrost-aircon`, imported into Vercel. PICK, after the org check below.
2. `vercel deploy` from the CLI (skips the org link). Fallback.
3. GitHub Pages, or repo under `nagisa314`. Fallback.
Gotchas (d):
- vercel.json is NOT needed for a plain index.html at the repo root. Add one only for `cleanUrls`, security headers or cache headers.
- Hobby is for personal, non-commercial use (Vercel terms). A fake-data portfolio piece is defensible; no real customers or payments.
- Org repo on Hobby (verify): the Vercel GitHub app must be granted on `usad-labs`, and Hobby may refuse org-owned repos. Test early; fallback is option 2 or 3.
- If files sit in a subfolder, set Output Directory explicitly.
- README: Playwright screenshot (360px and desktop) in `docs/`, under about 200 KB; all links public.
- Secret scan covers git history, not only the working tree.

## 5. TEAM.md
1. One markdown table (date, role, event, tokens), updated at each stage. PICK.
2. `/caveman-stats` output pasted per stage.
3. `explain-usage` summary at the end.
Mistake: logging only successes. Log every retry, Bugsy bug and gate catch.

## (c) Free CLI checks for Bugsy (Windows + Node). Not read, not installed.
Use `npx --yes <pkg>` per project after the user's Gate 3 yes; never global.
| Check | Tool | Note |
|---|---|---|
| Perf + a11y score | `@lhci/cli` (`lhci autorun`, `staticDistDir`, mobile, assert perf >= 0.9, a11y >= 0.95) | Windows temp-folder EPERM cleanup error is a known annoyance (verify); alt: plain `lighthouse` CLI. Also run against the Vercel URL |
| a11y rules | `@axe-core/playwright`, fail on serious and critical | preferred over `@axe-core/cli` (chromedriver match issues, verify); alt `pa11y-ci` |
| HTML validity | `html-validate` | no browser needed |
| 360px overflow | Playwright, viewport 360x740, assert `scrollWidth <= 360` | also run with `javaScriptEnabled: false` and assert h1 and CTA text exist |
| Weight < 500 KB | Playwright response sizes, or lhci `total-byte-weight` | cold load, transferred bytes |
| Secret scan | `gitleaks` (`winget install Gitleaks.Gitleaks`, id from winstall.app, verify; it is a binary, needs user yes). Alt: GitHub secret scanning (free on public repos) | scan full history |
Mistake: 200 OK is not success; assert on content.

## Installed skills that fit
- `speckit-*`: deliverable 1. `ui-ux-pro-max`: deliverable 2 (name it in the design pick).
- `e2e-testing`, `browser-qa`: Playwright, axe, 3-breakpoint shots, SHIP / DO-NOT-SHIP verdict.
- Gap noted in Skill Library (no HTML a11y checker): axe via Playwright covers it, no new skill.

## Reuse vs build new
REUSE: spec-kit skills, ui-ux-pro-max, e2e-testing, browser-qa, Lucide SVGs, Pexels/Unsplash photos, self-hosted variable font, `<details>` FAQ, lhci, axe-playwright, html-validate, gitleaks, Vercel zero-config.
BUILD NEW: the HTML/CSS page, fake wordmark logos, copy and prices, Playwright check script (overflow, JS-off, weight), README, TEAM.md, CREDITS.md.

## Decisions for the user
1. Plain HTML/CSS, no framework: yes?
2. gitleaks via winget (a binary), or GitHub secret scanning only?
3. If Vercel Hobby blocks the org repo: deploy by CLI, or host under `nagisa314`?
