# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for **NitroX Consulting** (nitroxconsulting.com) — an **AI & IT consulting** firm
(repositioned in 2026 from its financial-consulting origins). The site is built with **Astro + Tailwind CSS v4**
and deployed to **GitHub Pages** via the `.github/workflows/deploy-pages.yml` Actions workflow (build → upload
`dist/` → deploy). The design mirrors the sibling product site **nitroxbrain.com** (Astro/Tailwind), with a
distinct **charcoal + gold** palette derived from the hero image (a dark trading-terminal screen).

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
- **`src/styles/global.css`** — Tailwind v4 `@theme` tokens (gold + charcoal) and semantic light/dark variables.
- **`public/`** — static assets served as-is: `CNAME`, `favicon.ico`, `robots.txt`, `images/hero-terminal.png`.

## Legacy

The previous jQuery 1.7.1 single-page site is preserved under **`legacy/`** for reference. It is not built or deployed.

## Conventions

- **PR-first.** All changes go through a pull request. Astro build must be green (`npm run build`) before merge.
- Keep EN and FR pages in sync when editing copy.
