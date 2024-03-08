import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  base: '/portfolio',
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    react()
  ],
  site: 'https://gabriellemi.github.io'
});