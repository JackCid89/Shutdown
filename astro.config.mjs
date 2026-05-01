// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://cierra.example',
  trailingSlash: 'always',
  prefetch: { prefetchAll: false },
  i18n: {
    defaultLocale: 'es',
    locales: [
      'es', 'en', 'zh', 'hi', 'fr', 'ar', 'bn', 'pt', 'ru', 'ur',
      'id', 'de', 'ja', 'mr', 'te', 'tr', 'ta', 'vi', 'tl', 'ko'
    ],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false
    }
  },
  vite: {
    // Cast to any: @tailwindcss/vite ships against a newer Vite than Astro
    // bundles, so the Plugin types clash (no runtime issue).
    plugins: [/** @type {any} */ (tailwindcss())]
  },
  build: {
    inlineStylesheets: 'auto'
  },
  compressHTML: true
});
