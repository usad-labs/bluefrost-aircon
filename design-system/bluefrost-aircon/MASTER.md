# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

## ⭐ BlueFrost overrides (lead, 2026-11-03). These win over everything generated below.

| Topic | Rule |
|---|---|
| Direction | **Bold Frost** (2026-11-03): deep navy + icy cyan, one accent, no warm colour. Replaces the orange/blue-900 palette |
| Fonts | **Plus Jakarta Sans** (variable, latin subset, self-hosted woff2, `font-display: swap`, preloaded). Five sizes: display `clamp(2.5rem,12vw,5rem)` (hero >= 900px: `clamp(3rem,6.2vw,5rem)`) 800 / h2 `clamp(1.875rem,5vw,3rem)` 800 / h3 and lead 1.25rem / body 1rem / small 0.875rem. Body line-height 1.6 |
| Tokens | navy `#0B1530`, navy-2 `#14224A` (surface on dark), cyan `#67E8F9`, cyan-hover `#A5F3FC`, cyan-deep `#0E7490` (accent on light), frost `#E8F8FC`, white, ink-muted `#3D4D66`, ink-muted-dark `#B4C6E4`, navy-hover `#1C2F66` |
| Bands | dark: navy bg, white text, muted `#B4C6E4`, link/accent cyan. light: frost bg (white for `band-white`), navy text, muted `#3D4D66`, link/accent `#0E7490`. accent (CTA band): cyan bg, navy text. Class names `band-dark/light/white/accent` are a test contract |
| Primary CTA | on dark: bg cyan, text navy (12.4:1); hover `#A5F3FC` (14.5:1). On light/cyan/popular card: bg navy, text white (18:1); hover `#1C2F66` (12.7:1) |
| Secondary CTA | outline in the band's ink (white on dark, navy on light/cyan); hover = 14% tint of the outline colour. On phones the hero one is a plain underlined link |
| Focus ring | 3px solid, 2px offset: cyan on dark, navy on light and cyan |
| Stars | accent colour (`#0E7490` on white, cyan on navy), always paired with text "N out of 5" / `aria-label` |
| Motion | **No JS.** CSS colour transitions 150 ms, press `scale(0.97)`, hover in `(hover: hover)`; all removed under `prefers-reduced-motion`. Logos are a static row |
| Effects | Flat: no gradients, no shadows (borders only). Cold-air wave SVG used twice: hero bottom edge, CTA band line (>= 768px) |
| Radius / spacing | cards 16px, hero photo 24px (48px left corners on desktop), buttons 999px; 4/8/12/16/24/32/48/64/96 scale; section padding 64px mobile / 96px desktop; max-width 1120px; 16/24px gutters |
| Layouts | hero split + bleed photo / trust 2x2 to 4 strip / logos label-left / services numbered rows / stats 2x2 to 4 / how-it-works head-left + timeline / pricing 3 cards (popular = cyan) / reviews 1 big + 2 / FAQ head-left + list-right / CTA band |
| Tap targets | >= 44x44 px; sticky bottom CTA bar on phones < 768px |
| Icons | Own small SVG set, 24px, stroke 2, `currentColor` |
| Logo | `src/assets/logo-mark.svg` (copy at `public/favicon.svg`) + wordmark in `src/components/Logo.astro`: "Blue" 800 + "Frost" 500 in the accent |
| Ignore below | the generated palette, "Low-friction form" and "Contact Sales" notes, the GSAP snippet, the Google Fonts `@import` |

Contrast check (Bold Frost, computed 2026-11-03): all pairs listed in Tokens measured ≥ 4.5:1 (script in the lead's scratchpad; results in TEAM.md log).

---

**Project:** BlueFrost Aircon
**Generated:** 2026-11-03 03:11:55
**Category:** Home Services (Plumber/Electrician)
**Design Dials:** Variance 4/10 (Balanced / Modern) | Motion 2/10 (Subtle) | Density 5/10 (Standard)

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#1E40AF` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#3B82F6` | `--color-secondary` |
| On Secondary | `#000000` | `--color-on-secondary` |
| Accent/CTA | `#EA580C` | `--color-accent` |
| On Accent/CTA | `#000000` | `--color-on-accent` |
| Background | `#EFF6FF` | `--color-background` |
| Foreground | `#1E3A8A` | `--color-foreground` |
| Card | `#FFFFFF` | `--color-card` |
| Card Foreground | `#1E3A8A` | `--color-card-foreground` |
| Muted | `#E9EEF6` | `--color-muted` |
| Muted Foreground | `#475569` | `--color-muted-foreground` |
| Border | `#BFDBFE` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| On Destructive | `#FFFFFF` | `--color-on-destructive` |
| Ring | `#1E40AF` | `--color-ring` |

**Color Notes:** Professional blue + urgent orange [Accent adjusted from #F97316]

### Typography

- **Heading Font:** EB Garamond
- **Body Font:** Lato
- **Mood:** legal, professional, traditional, trustworthy, formal, authoritative
- **Google Fonts:** [EB Garamond + Lato](https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');
```

### Spacing Variables

*Density: 5/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #EA580C;
  color: #000000;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #1E40AF;
  border: 2px solid #1E40AF;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #EFF6FF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #1E40AF;
  outline: none;
  box-shadow: 0 0 0 3px #1E40AF20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Flat Design

**Keywords:** 2D, minimalist, bold colors, no shadows, clean lines, simple shapes, typography-focused, modern, icon-heavy

**Best For:** Web apps, mobile apps, cross-platform, startup MVPs, user-friendly, SaaS, dashboards, corporate

**Key Effects:** No gradients/shadows, simple hover (color/opacity shift), fast loading, clean transitions (150-200ms ease), minimal icons

### Page Pattern

**Pattern Name:** Trust & Authority + Conversion

- **Conversion Strategy:** Security badges. Case studies. Transparent pricing. Low-friction form. Provide pause/stop and stop the logo carousel on focus, hover, and reduced motion. Previous/next controls provide the keyboard equivalent; pause offscreen/hidden and render a static logo set under reduced motion.
- **CTA Placement:** Contact Sales / Get Quote (primary) + Nav
- **Section Order:** Hero (mission/credibility) > Proof (logos, certs, stats) > Solution overview > Clear CTA path

---

## Motion

**Page Transition** (Subtle) — Trigger: route change | Duration: 200-300ms | Easing: `power1.inOut`

```js
gsap.to(main, { opacity: 0, duration: 0.2, onComplete: () => { navigate(); gsap.fromTo(main, { opacity: 0 }, { opacity: 1, duration: 0.2 }); } });
```

**Framework notes:** Pair with the router's transition hooks (Next.js App Router transitions, React Router's useNavigate, Vue Router's beforeEach/afterEach); Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Preload the destination route's critical assets before the exit tween finishes
- ❌ Don't block navigation on animation; cap exit duration at ~250ms so the app never feels unresponsive
- ⚡ Exit animation should always resolve faster than entrance (asymmetric timing) so back/forward feels snappy

---

## Anti-Patterns (Do NOT Use)

- ❌ Hidden contact info
- ❌ No certifications

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
