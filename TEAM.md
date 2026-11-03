# TEAM.md: BlueFrost Aircon

## 1. Goal
A static landing page for a made-up aircon cleaning and repair company in Cavite, built as a USAD Labs portfolio piece ("Connect. Automate. Accelerate.").
**Helps:** USAD Labs, which can show it to local service-business prospects · **Problem:** local service businesses lose leads because they have no clear, fast, mobile page with a single "Get a quote" action
**Limits:** no deadline · hours/week not set · budget ₱0 (free tools, fonts, photos, hosting)
**Must use:** spec-kit (small depth), ui-ux-pro-max, Astro + TypeScript + scoped CSS, Vercel Hobby · **Must avoid:** paid tools, real brands and people, secrets, `/speckit-implement`, `/speckit-converge`
**Out of scope:** the instant quote calculator (stage 2)

## 2. Deliverables
| # | Deliverable | Done check (measurable) | Stage |
|---|---|---|---|
| 1 | Spec-kit specs: spec.md, plan.md (stack choice and why, for the USAD CTO), analyze report | analyze shows 0 CRITICAL issues; plan.md has a "Why this stack" section of 5 lines or fewer | 02-spec |
| 2 | Design system (ui-ux-pro-max) | `design-system/bluefrost-aircon/MASTER.md`; every text/background pair meets WCAG AA (4.5:1 or better) | 03-design |
| 3 | Landing page, 11 sections: hero · trust icons · client logos · services · stats · how it works · pricing · reviews · FAQ · final CTA band · footer | Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90 · axe 0 serious issues · no sideways scroll at 360px · first load < 500 KB · works with JavaScript off | 04-build |
| 4 | Public repo `usad-labs/bluefrost-aircon` + Vercel URL | README with a screenshot; gitleaks clean; all data clearly fake · ✋ Gate 4 before any push | 07-deploy |
| 5 | This file's test-run log | Retries, bugs and tokens per role and stage | all |

**"Get a quote" button:** a `tel:` link to a made-up 09XX number plus a placeholder Messenger link. No form, so no personal data is collected.

**Project checks (auto gate):** `.claude/quality-gates.txt`: `npm run check` · `npm run build` · `npx html-validate "dist/**/*.html"` · `gitleaks dir . --no-banner --redact`. Bugsy adds `npx playwright test` once tests exist. Lighthouse CI (`lhci`) runs in Bugsy's QA pass, not the auto gate, because it is slow.

## 3. Team
| Name | Role | Job | Skills | Model (why) | Checked by |
|---|---|---|---|---|---|
| Lead | lead | spec-kit specs, design system, TEAM.md, commits | speckit-*, ui-ux-pro-max | session model | you |
| Nori | scout | explore research (done) | none | sonnet (default) | lead |
| Bolt | builder | Astro components, copy, fake logos, images, README, CREDITS | ui-ux-pro-max | sonnet (default) | Bugsy |
| Bugsy | qa | Playwright (360px, JS off, weight), axe, lhci, html-validate, gitleaks | e2e-testing, browser-qa | sonnet for the first check, haiku for re-checks | Nana |
| Nana | reviewer | review before going public: a11y, licences, fake data, links | security-review, ponytail-review | sonnet | lead |

Plugins: ponytail is on for every subagent (its SubagentStart hook, mode `full`). Caveman is manual-only and off. Superpowers stays on (the user's choice). Profile: `coding`.

## 4. Stages and handoffs
```
01-explore ─► 02-spec ─► 03-design ─► 04-build ─► 04b-look check (lead + you) ─► 05-qa ─► 06-review ─► commit ─► 07-deploy (✋G4)
```
| Stage | Inputs | Maker → output | Checker |
|---|---|---|---|
| 01-explore | deliverables | Nori → `work/explore/research.md` | lead |
| 02-spec | research, Landing Page References | lead → `specs/<feature>/` | lead (analyze) |
| 03-design | spec | lead → `design-system/bluefrost-aircon/MASTER.md` | Bugsy (contrast) |
| 04-build | spec, MASTER.md | Bolt → `src/`, `public/` | Bugsy |
| 05-qa | build | Bugsy → `tests/`, `work/05-qa/report.md` | Nana |
| 06-review | build + QA report | Nana → `work/06-review/review.md` | lead |

**File ownership:**
- Lead: `specs/`, `design-system/`, `TEAM.md`, `.claude/`, `.specify/`, `work/02-spec/`
- Nori: `work/explore/`
- Bolt: `src/`, `public/`, `astro.config.mjs`, `README.md`, `CREDITS.md`, `docs/`
- Bugsy: `tests/`, `playwright.config.ts`, `lighthouserc.json`, `work/05-qa/`
- Nana: `work/06-review/` (read-only everywhere else)

## 5. You
- [ ] Pick the hero photo on Pexels (person doing aircon work, no visible brand logos) and write its `CREDITS.md` line
- [ ] Give the Vercel GitHub app access to `usad-labs` and import the repo (fallback: the `vercel deploy` CLI)
- [ ] Run Lighthouse once yourself in DevTools and compare your score with Bugsy's

## 6. Gates
- ✋ 1 deliverables: approved 2026-11-03
- ✋ 2 visuals + team: approved 2026-11-03 (stack changed from plain HTML to Astro + TS + scoped CSS at the user's request)
- ✋ 3 installs: approved 2026-11-03: spec-kit (`specify-cli` 1.2.6 via uv), ui-ux-pro-max (project-only), npm dev tools (astro, @astrojs/check, typescript, @playwright/test + chromium, @axe-core/playwright, @lhci/cli, html-validate), gitleaks (winget)
- ✋ 4 public: nothing publishes, pushes or deploys without a yes. Vercel fallback if Hobby refuses the org repo: deploy with the CLI

## 7. Log
| Date | Stage | Role | What happened | Tokens |
|---|---|---|---|---|
| 2026-11-03 | 00-kickoff | lead | Triage L; Gate 1 approved; name BlueFrost Aircon, Vercel, call + Messenger CTA | not measured (main session) |
| 2026-11-03 | 01-explore | Nori | **Retry 1:** the session ended mid-run and nothing was written; resumed with SendMessage | first run unknown |
| 2026-11-03 | 01-explore | Nori | research.md written: plain HTML pick, check tools, Vercel org-repo risk | 45,162 (resumed run, 2 tool uses, 24 s) |
| 2026-11-03 | 00-kickoff | lead | **User correction:** stack changed from plain HTML to Astro + TS + scoped CSS (reuse across 3 portfolio pages, image optimisation, stage 2 island). Logged in Team Lessons | n/a |
| 2026-11-03 | 00-kickoff | lead | **Gate catch:** `specify-cli` from PyPI pulled `uvicorn`; checked against github/spec-kit's README and its latest release (1.2.6) before going on | n/a |
| 2026-11-03 | 00-kickoff | lead | Hired: git init, spec-kit init, ui-ux-pro-max copied and patched, Astro scaffold builds, 4 auto-gate checks pass, gitleaks finds no leaks | n/a |
| 2026-11-03 | 02-spec | lead | spec.md (18 FR, 7 SC), checklist passed on the first try; clarify: 2 questions (English only; 3 packages + unit-type note) | not measured |
| 2026-11-03 | 02-spec | lead | **Gate catch / kickoff gap:** `/speckit-analyze` requires tasks.md, but kickoff's "small depth" skips tasks. Wrote a short tasks.md (24 tasks), which also orders Bolt's work | n/a |
| 2026-11-03 | 02-spec | lead | analyze: 0 CRITICAL, 1 MEDIUM fixed (services had no FR → FR-018), 1 LOW fixed (OG image task), 3 LOW accepted. Report: `work/02-spec/analyze.md` | not measured |
| 2026-11-03 | 03-design | lead | **Correction of tool output:** ui-ux-pro-max picked EB Garamond + Lato ("legal" mood), a GSAP snippet and a logo carousel. Overridden: Plus Jakarta Sans, CSS-only motion, static logos. 15 contrast pairs all ≥ 4.5:1; white on orange (3.56) banned | n/a |
| 2026-11-03 | 03-design | lead | Gate 3 add-on: `@fontsource-variable/plus-jakarta-sans` approved; `lucide-static` declined → Bolt hand-draws the icons. Hero photo is a placeholder until the user picks one | n/a |
| 2026-11-03 | 04-build | Bolt | 11 sections, 0 JS, pricing self-check, hand-drawn icons, placeholder hero; auto gate 4/4 green on the first run. ponytail: on | 101,711 (57 tool uses, 6.4 min) |
| 2026-11-03 | 04-build | Bolt → lead | **Gate catch (Bolt caught the lead):** the hover rule in MASTER (dark text on #C2410C) was 3.48:1, failing AA. Lead changed the hover to #F97316 (6.44:1) in MASTER + tokens.css (a Bolt-owned file; one token, logged) | n/a |
| 2026-11-03 | 05-qa | Bugsy | **SHIP-to-review.** Gate 5/5 green (playwright added); Playwright 20 pass, 1 skipped (screenshots), 3 runs with no flakes; lhci Perf/A11y/BP/SEO 100/100/100/100 (LCP 1.2 s, CLS 0); first load about 70 KB; axe 0 serious. 0 critical/major bugs, 3 minor: Installation card reuses the snowflake icon; hero is still the placeholder; sticky "Message us (sample link)" wraps at 360px. ponytail: on | 71,988 (37 tool uses, 4.8 min) |
| 2026-11-03 | 05-qa | Bugsy | **Gate catches:** lhci `preset: mobile` invalid in 0.15 (dropped; default is mobile). The first lighthouserc used `temporary-public-storage` (a public upload); the auto-mode classifier blocked it and the upload target was removed. Write of work/05-qa/report.md refused, so the report lives in this log | n/a |
| 2026-11-03 | 06-review | Nana | **PASS-with-fixes**, 0 critical, gitleaks clean (tree + history). 4 HIGH: CTA-band secondary hover 4.1:1 (the same hover lesson again), OFL licence file missing, tool folders committed without attribution, Gmail as commit author. Plus 5 MEDIUM, 3 LOW. Read-only, so the findings are in the reply. ponytail: on | 70,771 (15 tool uses, 2.1 min) |
| 2026-11-03 | 06-review | Bolt | **Retry 2:** fix round stopped when the session ended; resumed with SendMessage and found all 7 items already done. Gate 5/5 green. Every state's contrast ≥ 5.07:1 (work/04-build/notes.md) | 58,914 (resumed run; first run unknown) |
| 2026-11-03 | 06-review | lead | User decisions: noreply author + rewrite local history; exclude tool folders (`.claude/*` except quality-gates, `.specify/`); "the USAD CTO" in place of a name; MIT LICENSE. Lead added README "Planning tools" + "License" sections (a Bolt-owned file, logged) | n/a |
| 2026-11-03 | 06-review | lead | Asked about Orca (parallel agents in worktrees): not used. More tokens per run, and it would mix up this test run; a candidate for building the sibling portfolio pages in parallel later | n/a |
| 2026-11-03 | 06-review | Bugsy | **PASS**, 0 bugs. New contrast.spec measures computed hover and focus colours for every .btn at 360/1280 (min 6.44:1), and was shown to fail when the threshold was raised. Focus order main → footer → quote bar. JS-off links exactly 6. Playwright 75 pass with --repeat-each=3. lhci 97/100/100/100. Not covered: non-button links, focus-ring contrast. ponytail: on | 48,862 (21 tool uses, 4.5 min) |
| 2026-11-03 | 07-release | lead | History rewritten into one clean commit (noreply author, no tool folders). Stale docs/qa-360-services.png removed | n/a |
| 2026-11-03 | 07-release | user | **Workflow change:** add a 👀 look check after the build and before Bugsy (the lead shows 360px + desktop screenshots, the user OKs or adds fixes). Added to /kickoff step 6 and to this file's stages | n/a |
| 2026-11-03 | 07-release | Nori | Vetted 3 design skills from a TikTok video: emilkowalski/skills ✅, impeccable ⚠️ (binary + edit hooks), taste-skill ⚠️ (network + headless Chrome). work/explore/design-skills.md | 62,691 (12 tool uses, 2.3 min) |
| 2026-11-03 | 07-release | distiller (sonnet) | User chose to distil all 3 into one global `usad-design` skill (~3k words, credits, no scripts). Found AI-directed instructions in the sources (run scripts, canned replies) and did not follow them. Lead review fixed one conflict: the "no invented proof" rule now allows labelled demo data | 134,942 (15 tool uses, 2.4 min) |
| 2026-11-03 | 04b-look | user | **User correction:** the design "looks generic". Picked the Bold Frost direction plus a mark + wordmark logo. ADHD output mode made the default for all sessions (global CLAUDE.md) | n/a |
| 2026-11-03 | 04-build | Bolt | Bold Frost redesign + logo (header, footer, favicon, OG), 3 look-check fixes; gate 5/5 green, Playwright 25 pass. Added a Services "Message us" button partly so the contrast test has a light-band button. ponytail: on | 132,250 (51 tool uses, 9.3 min) |
| 2026-11-03 | 04b-look | lead | Look check (usad-design §8): OK. Only the hero placeholder is left (user's photo pick) | n/a |
| 2026-11-03 | 05-qa | Bugsy (haiku) | Re-check after redesign: gate 5/5, lhci 99/100/100/100, 36.6 KB compressed first load, contrast measured in all bands (dark measured but not asserted, which is a small test gap). ponytail: on | 60,878 (17 tool uses, 3.4 min) |
| 2026-11-03 | 04-build | lead | Hero photo hunt: Pexels was blocked at first (later allowed), and Unsplash/Pixabay were searched too. Rejected: visible brand (EuropAce), company text on a shirt, a real company's upload, hands-only shots. User picked Pixabay 6869855 (IqbalStock, Pixabay Content License). Downloaded 1280×866, 127 KB | n/a |
| 2026-11-03 | 04-build | Bolt | Hero photo swapped in (astro:assets avif/webp, about 6–11 KB), placeholder deleted, CREDITS updated; gate 5/5 green; first load about 83 KB. ponytail: on | 37,429 (11 tool uses, 2 min) |
| 2026-11-03 | 04b-look | lead | Look check OK at 1280 and 360. Fixed the copy "uniformed technicians" → "in full safety gear" to match the photo (a Bolt-owned data file, one string, logged) | n/a |
| 2026-11-03 | 04b-look | user | **User correction (2nd):** v2 "more generic" than the Antixor references. Pasted 4 Antixor screenshots; the user's AI image setup (ComfyUI + FLUX.2-klein, local) replaces stock photos | n/a |
| 2026-11-03 | 01-explore | Nori | Premium service-page patterns: v2 had 1 photo in about 6,000px; 8 usad-design rules over-corrected (rewritten, backup SKILL.md.bak-v1). Research thin (snippets only) | 53,963 (12 tool uses, 1.7 min) |
| 2026-11-03 | 04-build | lead | ComfyUI: 1 test, 2 style tests (user picked "Bold Antixor"), then 11 brand-graded images at about 30–50 s each on an RTX 3050. Install image regenerated (fake badges on uniforms). JPG 30–90 KB each | lead tokens |
| 2026-11-03 | 04-build | Bolt | v3 photo-rich (Antixor roofing pattern): photo hero + floating proof card, photo service cards, trust photo band, steps + photo, face reviews, photo CTA. Gate 5/5, lhci 99/100/100/100, first load about 135 KB. ponytail: on | 216,869 (77 tool uses, 19.7 min) |
| 2026-11-03 | 04b-look | lead | **Look check caught:** README full-page screenshots showed lazy images as empty boxes (screenshot spec does not scroll) → sent to Bugsy. Install photo reused in steps (Minor). FR-015 updated for AI photos | n/a |
| 2026-11-03 | 05-qa | Bugsy (haiku) | v3 re-check PASS, 0 bugs. Fixed the screenshot spec (scroll + wait for every img); added an all-images-loaded assertion. lhci 99/100/100/100. ponytail: on | 84,622 (29 tool uses, 4.6 min) |
| 2026-11-03 | 04b-look | user | **User correction (3rd):** desktop "Get a quote" buttons not aligned, too much blank space, uneven section sizes; must work on every device | n/a |
| 2026-11-03 | 04b-look | lead | Look check at 1440/1024/768/390: pricing buttons at 3 different heights, services 1,685px tall, uneven padding, a 2+1 orphan pricing card at 768, trust row wrapping 4 lines | n/a |
| 2026-11-03 | 04-build | Bolt | Responsive polish: 1200px container, section/strip padding tokens, services 1/2/4 cols, equal-height pricing, FAQ help block, stretch-aligned steps. 1440 total 7,352 → 6,371px. Gate 5/5. ponytail: on | 145,686 (61 tool uses, 10.4 min) |
| 2026-11-03 | 05-qa | Bugsy | tests/layout.spec.ts: 29 tests (7 widths × no sideways scroll, aligned buttons/prices, no orphans, one padding token, services < 1,000px), proven to fail on broken CSS; 87/87 with repeat-each=3. lhci 100/100/100/100. 0 bugs. ponytail: on | see notification |

**Token tracking:** subagent tokens come from each task notification. Lead tokens: run `/caveman-stats` or `explain-usage` at the end of each session and paste the total here.
