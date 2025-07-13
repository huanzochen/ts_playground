import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        mathjs: "src/entry-mathjs.ts",
        lusolve: "src/entry-lusolve.ts",
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
