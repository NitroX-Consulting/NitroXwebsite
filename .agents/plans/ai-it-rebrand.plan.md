# Plan — Rebrand nitroxconsulting.com to AI & IT (design parity with nitroxbrain.com)

**Status:** Phase 1 shipped in this PR · **Filed:** 2026-07-09

## Goal

Reposition nitroxconsulting.com from **financial consulting** to **AI & IT consulting**, with a design
**similar to nitroxbrain.com**, while keeping the 30-year capital-markets background as the credibility
differentiator. Retire the legacy jQuery 1.7.1 single-page site.

## Decisions (operator, 2026-07-09)

- **Scope:** lean multi-page + **bilingual EN/FR**.
- **Positioning:** lead with AI & IT; **keep** the finance/risk heritage as a differentiator.
- **Brand:** brain-website's design system, **distinct accent** → **charcoal + gold** (gold echoes the
  "Gold spot" chart in the retained hero image; clearly distinct from brain's electric cyan).
- **Hero image:** keep the current dark trading-terminal banner (`homepage-banner.png` → `public/images/hero-terminal.png`).
- **Add an "Expertise" page** (the domains + track-record / differentiator page).
- **Contact form:** replicate brain's — same `/contact` SES-EU endpoint, honeypot, JSON POST.

## Stack

Astro 5 + Tailwind v4 (`@tailwindcss/vite`) + Inter variable font + astro-icon (tabler) + @astrojs/sitemap.
Static output, deployed to GitHub Pages (build → `dist/`). CNAME preserved.

## Phase 1 — Foundation + content (this PR)

- [x] Move legacy jQuery site → `legacy/`.
- [x] Astro scaffold: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`.
- [x] Design system: `global.css` charcoal+gold tokens, dark/light, Inter.
- [x] Components: `Header` (nav + lang toggle + dark toggle), `Footer`, `Hero`, `Section`, `Features`, `CTA`, `ContactForm`.
- [x] Pages EN: Home, Services, **Expertise**, About, Contact, Privacy.
- [x] Pages FR: mirrors under `src/pages/fr/`.
- [x] Rewrite all copy financial → AI/IT (finance heritage kept as differentiator).
- [x] `deploy-pages.yml` → build Astro, upload `dist/`.
- [x] Verify `npm run build` green.

## Phase 2 — Polish (follow-up PRs)

- [ ] Real brand logo (replace the placeholder gold square in Header/Footer).
- [ ] AI/IT-themed imagery for interior sections (currently text + cards only).
- [ ] Tune the exact gold accent + light-mode contrast with the operator.
- [ ] Optional: solutions/case-study detail pages (Excel add-in, FX platform, NitroxBrain), a blog, analytics.
- [ ] Copy review pass (EN + FR) with the operator; confirm company facts (founding claims, LinkedIn URL, SIRET/legal footer).

## Open questions for review

- Confirm the **LinkedIn company URL** and **contact email** in `src/i18n/ui.ts` (placeholders used).
- Confirm framing of the **track record** years/claims on the Expertise page.
- Keep **GitHub Pages**, or move to Netlify/Vercel like brain-website? (Pages kept for now — least change.)
