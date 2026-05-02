import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://studiokuznetsov.com',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
