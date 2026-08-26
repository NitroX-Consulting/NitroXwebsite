# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for **NitroX Consulting** (nitroxconsulting.com) — an **AI & IT consulting** firm
(repositioned in 2026 from its financial-consulting origins). The site is built with **Astro + Tailwind CSS v4**
and deployed to **GitHub Pages** via the `.github/workflows/deploy-pages.yml` Actions workflow (build → upload
`dist/` → deploy). The design mirrors the sibling product site **nitroxbrain.com** (Astro/Tailwind), with a
**charcoal** base (from the dark trading-terminal hero image) + the **NitroX red** accent (from the logo).

## Build & Run

```bash
npm install
npm run dev      # local dev server
npm run build    # static build → dist/
npm run preview  # preview the production build
```

## Architecture

- **`src/pages/`** — routes. English at the root (`index`, `services`, `expertise`, `about`, `contact`, `privacy`),
  French mirrors under `src/pages/fr/`. Astro `build.format: 'file'` emits clean `foo.html` URLs for GitHub Pages.
- **`src/layouts/Layout.astro`** — HTML shell, SEO/OG head, dark-mode flash guard, Header + Footer.
- **`src/components/`** — `Header`, `Footer`, `Hero`, `Section`, `Features`, `CTA`, `ContactForm`.
  `ContactForm.astro` POSTs JSON to `https://ls.nitroxconsulting.com/contact` (the same NitroxBrain dispatcher /
  AWS SES EU endpoint used by nitroxbrain.com) — no third-party form processor.
- **`src/i18n/ui.ts`** — nav, footer strings and site constants per locale (`en` / `fr`).
- **`src/styles/global.css`** — Tailwind v4 `@theme` tokens (NitroX red `brand-*` + charcoal) and semantic light/dark variables.
- **`public/`** — static assets served as-is: `CNAME`, `favicon.ico`, `robots.txt`, `images/hero-terminal.png`.

## Legacy

The previous jQuery 1.7.1 single-page site is preserved under **`legacy/`** for reference. It is not built or deployed.

## Conventions

- **PR-first.** All changes go through a pull request. Astro build must be green (`npm run build`) before merge.
- Keep EN and FR pages in sync when editing copy.
- **External links** opening in a new tab must carry `rel="noopener noreferrer"`.

## Voice — write for a company owner, not an AI engineer

The audience is the **owner of a small or mid-sized business** (TPE/PME), who has usually never
said the word "RAG". The site was rewritten in 2026-08 because it argued to AI professionals
instead: 86 occurrences of expert vocabulary across the two locales, and two of three homepage
cards *titled* in jargon.

**The rule: a term earns its place only if a company owner with no AI background can restate
it.** Say what the visitor gets, not which technology delivers it.

| Don't write | Write instead |
|---|---|
| agentique / agent IA / agentic | un assistant qui fait le travail, pas seulement qui répond |
| RAG / base de connaissances | retrouver l'information dans vos propres documents |
| multi-étapes / multi-step | plusieurs tâches à la suite |
| en production / in production | utilisé tous les jours, pour de vrai |
| isolation par utilisateur | chacun ne voit que ce à quoi il a droit |
| scale-to-zero, conteneurisé | dimensionné pour ne coûter que ce que vous utilisez |

**This applies to the finance vocabulary too.** "Pricing de produits exotiques et optionnels"
is no more legible to a business owner than "RAG" is — and since the founder's markets
background is now a headline credential, it has to be readable. Translate to *consequence*,
not instrument: "calculer le prix et le risque de produits financiers complexes, sur de
l'argent réel, où une erreur se voit le jour même".

**Do not trade specificity for simplicity** — they are different axes. Keep the concrete facts
(École Polytechnique X 88, Paribas and Commerzbank, EDHEC and SKEMA); simplify the *words*
around them, never the substance.

Check before opening a PR:

```bash
grep -rniE 'agentiqu|agentic|multi-étapes|multi-step|en production|in production|isolation par utilisateur|per-user isolation' src/
grep -rnE '\bRAG\b' src/   # case-sensitive: case-insensitive also matches "cadrage"
```

## Page structure — problem first

The homepage runs **problème → gains → bons usages → nos offres → qui vous accompagne →
sécurité → CTA**. It used to open on the technology we sell, which asked the visitor to have
already diagnosed themselves. Keep new sections in that order.

- **Formations + Accompagnement lead the offers**; custom builds come third.
- **Every CTA converges on the free 30-minute call.** No price is published — the honest-scoping
  promise ("si l'IA n'est pas la bonne réponse, nous vous le dirons") does the work a price
  anchor otherwise would.
- **The founder credentials stay on the homepage.** With no client case studies and no price,
  they are the only proof the site carries.
- **EN is the default at the root**; FR lives under `/fr/` and is reached via the language
  switcher. (A FR-first root was considered and deliberately rejected, 2026-08-26.)
