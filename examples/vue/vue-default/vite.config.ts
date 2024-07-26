import { fileURLToPath, URL } from "node:url"

import Vue from "@vitejs/plugin-vue"
import VueJsx from "@vitejs/plugin-vue-jsx"
import { defineConfig } from "vite"
import VueDevTools from "vite-plugin-vue-devtools"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Vue(), VueJsx(), VueDevTools()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
