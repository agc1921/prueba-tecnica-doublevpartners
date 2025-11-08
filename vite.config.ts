import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vitest/config';
import vue from "@vitejs/plugin-vue";
// import vueDevTools from 'vite-plugin-vue-devtools';


export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],

  base: '/prueba_tecnica_double_v_partners/',

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  test: {
    environment: "jsdom",
  },
});
