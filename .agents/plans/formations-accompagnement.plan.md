# Plan — Add "Formations IA" + "Accompagnement" to nitroxconsulting.com

**Repo:** `/Users/lepolo/Developer/NitroXwebsite` (Astro 5 + Tailwind v4, bilingual EN/FR, GitHub Pages)
**Goal:** Add two dedicated, nav-level offerings inspired by alegria.group's *Formations* + *Accompagnement* split — but in NitroX's sober charcoal/red voice (no gift emojis, urgency countdowns, or influencer lead-magnets).
**Decisions (confirmed):** ① Two new nav pages. ② Formations = one overview page with course cards → Contact (no per-course pages, no booking system).

---

## Positioning (brand fit)

Adopt Alegria's *structure*, not its tone. NitroX sells engineering credibility, not hype. Translate their enterprise trio into NitroX language:

| Alegria (enterprise) | NitroX equivalent | Where it lives |
|---|---|---|
| Formation IA entreprises | **Formations IA** — team upskilling | new `/formations` page |
| Conseil & Stratégie IA + Déploiement | **Accompagnement IA** — advisory + hands-on adoption | new `/accompagnement` page |
| Social proof (10k learners, media logos) | Honest proof: NitroxBrain in production, 20y capital-markets, RGPD/EU | reuse existing proof blocks, no invented numbers |

CTAs stay "Demander un devis" / "Réserver un échange" → existing `/contact`, **not** external tracked landing pages.

---

## New routes (7 files)

Each page follows the exact `services.astro` pattern: `Layout` + `Hero` + `Section` + `Features` + `CTA`. No new components needed.

1. `src/pages/formations.astro` (EN — "Training")
2. `src/pages/fr/formations.astro` (FR — canonical, primary audience)
3. `src/pages/accompagnement.astro` (EN — "AI Adoption" / "Enablement")
4. `src/pages/fr/accompagnement.astro` (FR)
5. Edit `src/i18n/ui.ts` — add both to `nav` (EN + FR arrays)
6. Edit `src/pages/services.astro` + `src/pages/fr/services.astro` — cross-link the "Education & enablement" advisory card to the new pages (optional but tidy)

> Note on the EN URL slug: keep `/accompagnement` and `/formations` as literal slugs in **both** locales (they read fine in EN and keep the FR↔EN `hreflang` pairing in `Layout.astro` trivial — `path` is the same string for both). EN nav *labels* can still say "Training" / "AI Adoption".

---

## Page 1 — `/formations` (Formations IA)

**Hero:** tagline "Formations" · title "Rendre vos équipes autonomes avec l'IA" · subtitle on practical, hands-on, no-slideware training · action → Contact.

**Section "Programmes" — `Features` grid, 4 course cards** (columns=2), each `{title, description, icon}`, no detail pages:

| Card | Audience / format | icon |
|---|---|---|
| Découverte de l'IA générative | Tous · demi-journée | `tabler:sparkles` |
| L'IA pour dirigeants & décideurs | Comité de direction · 2–3h | `tabler:presentation` |
| Prompt engineering pour les équipes | Métiers · 1 jour, atelier | `tabler:message-2-cog` |
| Automatisations & agents IA | Ops/technique · 1–2 jours | `tabler:robot` |

**Section "Format & approche"** (surface) — 3 features: sur-mesure vs sur catalogue · en présentiel (Montpellier/Occitanie) ou distanciel · débrief pratique + suivi. Reuses the existing "Education & enablement" DNA already in `services.astro`.

**Optional proof `Section`:** short line — same NitroxBrain/20y credibility, no invented learner counts.

**CTA:** "Construisons votre plan de formation" → `/contact` (label "Demander un devis").

## Page 2 — `/accompagnement` (Accompagnement IA)

**Hero:** tagline "Accompagnement" · title "De la stratégie IA au système en production" · subtitle: honest scoping → build → maintain.

**Section "Comment nous accompagnons" — `Features` 3 cards:**
- Cadrage & feasibility (`tabler:route`) — where AI pays off, honest scoping before spend
- Déploiement & intégration (`tabler:rocket`) — build it, ship it, run it where the team works
- Suivi & montée en compétence (`tabler:trending-up`) — adoption, enablement, RGPD/EU-resident

**Section "Pour qui"** (surface) — 3 cards: PME/ETI · dirigeants · équipes métier. Mirror Alegria's "600+ entreprises accompagnées" *slot* but fill with real NitroX proof only.

**CTA:** "Parlons de votre projet" → `/contact` (label "Réserver un échange").

---

## Nav change (`src/i18n/ui.ts`)

Insert between Services and Expertise, EN + FR:

```ts
// EN
{ label: 'Training',    href: '/formations' },
{ label: 'AI Adoption', href: '/accompagnement' },
// FR
{ label: 'Formations',     href: '/fr/formations' },
{ label: 'Accompagnement', href: '/fr/accompagnement' },
```

Nav grows to 7 items. **Watch:** verify `Header.astro` wraps/handles 7 links on mobile & mid-width — likely fine (flex), but check the burger/overflow breakpoint. If it feels crowded, fallback is to group both under Services as a dropdown, but start with flat nav per the confirmed decision.

---

## Copy & i18n

- FR is the primary market (Montpellier/Occitanie) — write FR first, then EN mirror, matching how `services.astro` / `fr/services.astro` already pair.
- Keep every card `description` one or two sentences, `set:html` supported (used in `Features`).
- No new i18n keys required — page copy is inline in each `.astro` like the other pages; only the `nav` arrays in `ui.ts` change.

## Icons

All chosen icons are `tabler:*` and covered by the existing `astro-icon` config (`tabler: ['*']`). No config change.

## SEO / Layout wiring

- Each page passes `lang` + `path` to `Layout` so the `hreflang` EN/FR alternates auto-generate (already handled in `Layout.astro`). Use identical `path` (`/formations`, `/accompagnement`) for both locales.
- `@astrojs/sitemap` picks up new routes automatically — no manual edit.
- Give each page a distinct `title` + `description` (feeds `<title>`, meta, OG).

---

## Validation & ship

1. `npm run dev` → eyeball `/formations`, `/accompagnement`, `/fr/formations`, `/fr/accompagnement`, nav on desktop + mobile, dark + light toggle.
2. `npm run build` (astro check runs types) → confirm clean, 4 new pages in `dist/`.
3. Commit on a branch, PR against `master` (per your PR-first workflow).
4. Merge → `deploy-pages.yml` builds and publishes to GitHub Pages; `CNAME` keeps the domain. Auto-deploys on merge to `master`.

## Out of scope (explicit)

- No per-course detail pages, pricing tables, booking/e-commerce, or LMS.
- No new components, no external form processor (Contact still POSTs to `ls.nitroxconsulting.com/contact`).
- No invented social-proof metrics or media logos.

## Effort

~2–3h: mostly FR/EN copywriting for 4 files + a 4-line nav edit. Zero new infra, zero new dependencies.
