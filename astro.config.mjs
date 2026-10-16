// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeTableScroll from './src/plugins/rehype-table-scroll.mjs';

// https://astro.build
export default defineConfig({
  site: 'https://nitroxconsulting.com',
  output: 'static',
  markdown: {
    // Reason: Astro 7 renders Markdown with Satteri by default, which ignores
    // remark/rehype plugins. Opting back into the unified processor is what
    // keeps rehypeTableScroll (below) applying to /perspective tables.
    processor: unified(),
    // Wrap /perspective tables in a scroll container (see the plugin's Reason).
    rehypePlugins: [rehypeTableScroll],
  },
  // Reason: GitHub Pages serves clean directory URLs; keep trailing slashes
  // off so /services (not /services/) resolves, matching the nav hrefs.
  trailingSlash: 'never',
  // Reason: Astro 7 changed the default to 'jsx', which strips whitespace
  // between inline elements and reflows prose. Pinned to the pre-7 behaviour
  // so the rendered copy stays byte-identical.
  compressHTML: true,
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
    // Reason: the Plugin-type mismatch that needed a @ts-expect-error here is
    // gone — Astro 7 bundles Vite 8, the same major @tailwindcss/vite targets,
    // so the two Vite type copies finally agree.
    plugins: [tailwindcss()],
  },
});
