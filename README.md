# nitroxconsulting.com

Marketing website for **NitroX Consulting** — AI & IT consulting, built on two decades of capital-markets engineering.

Built with **Astro + Tailwind CSS v4**, bilingual (EN/FR), deployed to **GitHub Pages**. Design mirrors the sibling
product site [nitroxbrain.com](https://nitroxbrain.com) with a distinct charcoal + gold palette.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static build → dist/
npm run preview
```

## Structure

- `src/pages/` — EN routes at root, FR mirrors under `src/pages/fr/`.
- `src/components/` — Header, Footer, Hero, Section, Features, CTA, ContactForm.
- `src/i18n/ui.ts` — per-locale nav/footer strings + site constants.
- `src/styles/global.css` — Tailwind v4 theme tokens (charcoal + gold), dark/light.
- `public/` — static assets (`CNAME`, `favicon.ico`, `robots.txt`, hero image).
- `legacy/` — previous jQuery site, kept for reference (not built).

## Deploy

Push to `master` → `.github/workflows/deploy-pages.yml` builds Astro and publishes `dist/` to GitHub Pages.
The `public/CNAME` file keeps the `nitroxconsulting.com` custom domain.

## Contact form

`src/components/ContactForm.astro` POSTs JSON to `https://ls.nitroxconsulting.com/contact` — the same NitroxBrain
dispatcher endpoint (AWS SES, EU/Paris) used by nitroxbrain.com. No third-party form processor.
