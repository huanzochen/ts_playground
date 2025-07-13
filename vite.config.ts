import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        mathjs: "src/entries/entry-mathjs.ts",
        lusolve: "src/entries/entry-lusolve.ts",
      },
      output: {
        entryFileNames: "[name].bundle.js",
        dir: "dist",
        format: "es",
      },
    },
    minify: true,
    emptyOutDir: true,
  },
});
