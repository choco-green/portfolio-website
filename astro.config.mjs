import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  build: {
    inlineStylesheets: "always"
  },

  vite: {
    plugins: [tailwindcss()]
  },

  site: "https://justinfung.com",
  integrations: [react()],
  adapter: cloudflare()
});