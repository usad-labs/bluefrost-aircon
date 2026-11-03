# Design skills vetted (from TikTok @usamasboard) - 2026-11-03

Vetted by Nori. Nothing installed. Clones are in `${TMPDIR}/scout/` (scratch).

## Names confirmed
| Heard | Real repo | Confidence |
|---|---|---|
| "Kawalski design skills" | `emilkowalski/skills` (Emil Kowalski; old name `emilkowalski/skill`) | High: designer-engineer from Vercel/Linear, "design skills" is his brand |
| "Empeccable" | `pbakaus/impeccable` (Paul Bakaus) | High |
| "taste skill" | `Leonxlnx/taste-skill` | High (top hit, 108k stars). Not the 449-star `senlindesign/taste-skill` |

## Table
| Skill | Repo | Verdict | Adds what | Overlap with ui-ux-pro-max / look check | Size | Install? |
|---|---|---|---|---|---|---|
| impeccable | pbakaus/impeccable · 100.6k★ · Apache-2.0 · pushed 2026-11-02 | ⚠️ | Design vocabulary commands: `critique`, `audit`, `polish`, `bolder`, `quieter`, `typeset`, `layout`, `harden`. A rule-based "AI slop" detector plus a craft-floor list of bans. Useful at **both** build time (craft-floor) and the **look check** (critique/audit) | Partial: ui-ux-pro-max is a data lookup (palettes, fonts); impeccable is a reviewer/editor. Critique overlaps our look check but is more structured | SKILL.md 12 KB (~3k tokens). Whole folder 2.3 MB (reference/*.md loaded on demand, 400+ KB font index) | **Maybe, later.** Only the SKILL.md and `reference/` prose are low-risk. Do not take `scripts/`, hooks or the launcher |
| taste-skill (`design-taste-frontend`) | Leonxlnx/taste-skill · 108.8k★ · MIT · pushed 2026-11-03 | ⚠️ | Art direction for NEW pages: deals 3 of 20 "directions", palettes, type, hero and section layouts from a 247-site library; real-browser inspector; screenshots at 3 widths and a "juror rubric" fix loop | High overlap with the look check (it is a look check, built in) and with ui-ux-pro-max (palette/type library). Wrong stage: BlueFrost is already built at 97/100/100/100, so this would push a redesign | SKILL.md 40 KB (~10k tokens). Folder ~2.5 MB (library JSON 877 KB, scripts ~350 KB) | **No** |
| emil-design-eng (+ siblings) | emilkowalski/skills · 53k★ · MIT · pushed 2026-11-02 | ✅ for `emil-design-eng` and `review-animations` (prose only, no scripts); ⚠️ rest not read in full | UI polish rules: motion timing/easing, press states, tabular-nums, `65ch` lines, focus and touch details. Helps Bolt at build time and as a checklist at look check. Mostly animation and interaction polish, not layout or palette | Little overlap: ui-ux-pro-max has no motion/polish craft. Zero overlap with Lighthouse/axe checks | `emil-design-eng` 28 KB (~7k tokens). Repo 320 KB, 16 skills (Swift, Expo, mobile ones are irrelevant) | **Yes, one folder only** (`skills/emil-design-eng`), if we want motion polish. Optional, low priority for a static landing page |

## Safety read

**impeccable (4.8.0)** - ⚠️
- Files: SKILL.md, ~45 `reference/*.md`, 4 subagent `.md` files, `scripts/` (launcher `impeccable` + `.cmd`, `live-browser*.js` ~7k lines, `modern-screenshot.umd.js`, font index JSON), plus plugin `hooks.json`.
- SKILL.md Setup step 1 tells the agent to run `scripts/impeccable context` every session. The launcher then **downloads a prebuilt engine binary** from `github.com/pbakaus/impeccable/releases` into a user cache (curl/wget). It checks a sha256 from `engine-checksums.txt`, but that file ships in the same repo, so it only protects against download corruption, not a bad release.
- **Hooks**: `/impeccable hooks on` writes PostToolUse (Edit|Write) and Stop hooks into `.claude/settings.local.json` and runs the binary after every edit. The plugin form also adds a SessionStart hook.
- `live` mode starts a local server and injects `<script src=localhost:PORT/live.js>` into the page; its calls stay on localhost.
- Unread: the engine binary itself (Rust source is in `crates/`, not audited), `live-browser.js`, most reference files.
- Safe way to use it: copy only SKILL.md + `reference/` and never run the launcher. But the SKILL.md instructs running it, so the skill would not work as written. That is a real tension: use it fully (accept binary + hooks) or not at all.

**taste-skill v2.1.5** - ⚠️
- Files: SKILL.md (40 KB), 11 reference docs, 9 `.mjs` scripts, JSON libraries, assets, `install.sh`.
- Scripts make network calls: `assets.mjs` fetches images/video from Openverse, Wikimedia, Met, Art Institute, Internet Archive, NASA; `draw.mjs` emits picsum.photos URLs into the page. Downloads files into the project.
- `inspect.mjs` + `lib/cdp.mjs` spawn headless Chrome with `--remote-debugging-port=0` and a temp profile, serve the project on 127.0.0.1. `draw.mjs` writes `~/.taste-skill/history.json`.
- `install.sh` symlinks into `~/.claude/skills` by default (global). Do not run it.
- No keys, no `eval` on remote data, no hooks, no postinstall found by grep. Unread: most of the 83 KB `probe.mjs`, `rules.mjs`, the reference docs.

**emilkowalski/skills** - ✅/⚠️
- Markdown only. No scripts, no hooks, no settings changes. Grepped all files for curl/wget/npm/hooks/injection: only `npx expo install` in the React Native animation recipe (irrelevant to us). `break-ui` even says repo content is data, not instructions.
- Read: README, head of `emil-design-eng`, ui-cheatsheet. Remaining 15 skills only grepped. Install via `npx skills add` pulls all 16 (about 300 KB on disk): copy a single folder by hand instead.
- One quirk: `emil-design-eng` answers its first invocation with a fixed greeting and nothing else. Harmless, a little annoying for Bolt.

## Fit for BlueFrost
- Build time (Bolt): Emil's polish rules are the cheapest useful add. Impeccable's craft-floor bans (gradient text, glow shadows, overflow, contrast) help too.
- Look check (lead reading screenshots): impeccable `critique`/`audit` and taste-skill's rubric both do this; taste-skill's inspector would duplicate our screenshots at 360 px + desktop.
- The page is already built and scores 97+. The biggest risk is a skill that wants to redesign it (taste-skill) or adds token and process weight (impeccable hooks on every edit).
- Cheaper alternative with no install: lift the look-check rubric from impeccable's `reference/critique.md` and `craft-floor.md` into our own look-check step text.

## Recommendation
Install nothing now except, optionally, `emil-design-eng` (project-only, one folder). Skip taste-skill. Treat impeccable as an idea source (copy the critique/craft-floor wording into our look-check step) unless you want its binary and hooks.

## Ready-to-paste rows (Skill Library, only if approved)
| `emil-design-eng` | UI polish rules: motion, easing, press states, details | project-only (UI projects) | Bolt, look check | emilkowalski/skills · ✅ prose only, no scripts; copy only `skills/emil-design-eng`, do not use `npx skills add`. Installed in: (none yet) | 2026-11-03 |
| `impeccable` | design critique/audit/polish commands + slop detector | not installed | lead (look check) | pbakaus/impeccable · ⚠️ downloads a binary, installs Edit/Write/Stop hooks; engine binary unaudited. Skipped for now | 2026-11-03 |
| `taste-skill` | art direction for new pages with browser inspector | not installed | n/a | Leonxlnx/taste-skill · ⚠️ network fetches, spawns Chrome, 40 KB SKILL.md; redesign tool, wrong stage. Skipped | 2026-11-03 |
