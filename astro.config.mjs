import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://fitoraquel.com",
  integrations: [mdx(), sitemap(), icon(), vue()],
  vite: {
    plugins: [tailwindcss()],
  },
});
