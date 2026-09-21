import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
  Editorial collection behind /perspective (EN) and /fr/perspective (FR).
  One Markdown file per article per locale, under `src/content/perspective/<lang>/`.

  Every article exists in BOTH locales (repo convention: keep EN and FR in sync),
  but each locale gets its own URL slug — so the pair is linked explicitly via
  `altSlug`, which the article page turns into the hreflang alternate and the
  header's language switch.
*/
const perspective = defineCollection({
  loader: glob({ base: './src/content/perspective', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** Meta description + listing summary. One sentence. */
    description: z.string(),
    pubDate: z.coerce.date(),
    lang: z.enum(['en', 'fr']),
    /** URL segment in THIS locale, e.g. /perspective/<slug>. */
    slug: z.string(),
    /** URL segment of the same article in the OTHER locale. */
    altSlug: z.string(),
    /** Small uppercase label above the title, e.g. "Note de cadrage". */
    tagline: z.string(),
    /** Displayed as-is next to the date, e.g. "6 min". */
    readingTime: z.string(),
  }),
});

export const collections = { perspective };
