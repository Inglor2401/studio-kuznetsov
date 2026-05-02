import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages deploy → https://inglor2401.github.io/studio-kuznetsov/
export default defineConfig({
  site: 'https://inglor2401.github.io',
  base: '/studio-kuznetsov',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
