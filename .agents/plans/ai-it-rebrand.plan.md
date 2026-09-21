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

## Decision inherited from the NitroX library (operator, 2026-09-20)

RFC 001 in the `nitrox_xll` repo settled the Excel add-in's future, and it changes what this
site can honestly say and when:

- `NitroX.xll` moves off **XLL+ 7** (commercial, pinned to VS 2010, 32-bit, no longer installed
  anywhere) onto **`xlladdins/xll` at MIT**, vendored at a pinned commit — rebuilt 64-bit,
  C++20, MSVC 2022. **Until that lands, the add-in cannot be rebuilt at all.**
- RFC 002 + the roadmap publish the **curve + swap** core (~9.4k of ~60k lines) under
  **BSD-3**, explicitly as a *shop window and lead generator* for the closed product
  (options, exotics, credit and the add-in stay commercial).

Website consequence: the Excel add-in case study and an open-source landing page are both
**real assets, but not yet**. Each is gated on a phase in
`nitrox_xll/docs/plans/roadmap-to-open-source.md` — Phase 3 for the add-in, Phase 5 for the
public repo. Nothing on this site should claim either before it exists.

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

- [x] Real brand logo wired in Header/Footer (theme-swapped white/black NITROX wordmark). *(PR #5)*
- [x] Accent switched gold → NitroX red to match the logo; hero overlay lightened; nav enlarged. *(PR #5)*
- [ ] AI/IT-themed imagery for interior sections (currently text + cards only).
- [ ] Tune the exact red shade + light-mode contrast with the operator.
- [ ] Solutions / case-study detail pages — **sequenced, not optional**:
  - [ ] **FX platform** and **NitroxBrain** — no external dependency, write whenever.
  - [ ] **Excel add-in (NitroX)** — *blocked on Phase 3 of the library roadmap.* Safe to state
        today: a C++ interest-rate/credit derivatives pricing library, 160 Excel worksheet
        functions, licensed to clients. Not safe to state until the rebuild ships: anything
        implying it is currently maintained, 64-bit, or buildable on a modern toolchain.
        **Verify the in-production dates with the operator before writing them** — the code
        dates from 2012–2017 and the last build is circa 2017, but "in production since X" is
        a claim, not a fact we hold.
  - [ ] **Open-source page** — *blocked on Phase 5.* Links the public BSD-3 curve/swap repo,
        frames it as the shop window it is meant to be. No repo URL, no "open source" claim and
        no launch copy until the repo is actually public and v1.0 is correct; the roadmap is
        explicit that nothing ships publicly until it is.
- [ ] Copy review pass (EN + FR) with the operator; confirm company facts (founding claims, LinkedIn URL, SIRET/legal footer).

## Open questions for review

- Confirm the **LinkedIn company URL** and **contact email** in `src/i18n/ui.ts` (placeholders used).
- Confirm framing of the **track record** years/claims on the Expertise page.
- Keep **GitHub Pages**, or move to Netlify/Vercel like brain-website? (Pages kept for now — least change.)
- ⚠ **Does the quant work belong on this site at all?** Real tension worth an explicit call
  rather than a drift: this site was deliberately repositioned to AI & IT and de-jargoned for
  SME buyers, while the BSD-3 curve library is aimed at quants and banks — a different
  audience reading a different vocabulary. Three options: (a) keep it here as finance-heritage
  proof, written for the SME reader and light on detail; (b) give the library its own
  minimal site or GitHub-only presence and link it from Expertise; (c) both, with the
  open-source page written for quants and firewalled from the main funnel. Decide before
  Phase 5, because it determines whether the launch copy is written for this site or another.
- If the add-in case study ships, confirm which client-facing facts may be named (function
  count, asset classes, years in production) and which are under NDA.
