import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://sewamobiljogjaku.id',

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    domains: ["cdn.sanity.io", "lh3.googleusercontent.com", "ui-avatars.com"],
  },

  integrations: [sitemap({
    i18n: {
      defaultLocale: 'id',
      locales: {
        id: 'id-ID',
        en: 'en-US'
      }
    }
  }), react()],

  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  adapter: netlify()
});