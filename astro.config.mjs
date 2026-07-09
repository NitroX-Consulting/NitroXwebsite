// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build
export default defineConfig({
  site: 'https://nitroxconsulting.com',
  output: 'static',
  // Reason: GitHub Pages serves clean directory URLs; keep trailing slashes
  // off so /services (not /services/) resolves, matching the nav hrefs.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    icon({
      include: {
        tabler: ['*'],
      },
    }),
    sitemap(),
  ],
  vite: {
    // @ts-expect-error — @tailwindcss/vite's Plugin type mismatches Astro's
    // bundled Vite copy (two Vite type versions); harmless, the build passes.
    plugins: [tailwindcss()],
  },
});
