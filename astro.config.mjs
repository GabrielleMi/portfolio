import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/portfolio',
  integrations: [react()],
  site: 'https://gabriellemi.github.io',
  vite: {
    plugins: [tailwindcss()]
  }
});