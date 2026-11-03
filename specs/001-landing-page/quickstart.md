# Quickstart

```bash
npm install
npm run dev          # http://localhost:4321
npm run check        # Astro + TypeScript
npm run build        # → dist/
npx html-validate "dist/**/*.html"
npx playwright test  # overflow, JS off, links, weight, axe
npx lhci autorun     # Lighthouse mobile asserts
gitleaks dir . --no-banner --redact
```

Deploy (after Gate 4 only): import `usad-labs/bluefrost-aircon` in Vercel (framework auto-detected: Astro, output `dist`). Fallback: `npx vercel deploy --prod` from your own login.
