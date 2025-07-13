import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/mathjs/lusolve.ts", // 你的 library 入口
      name: "LUSolve",
      fileName: (format) => `lusolve.${format}.js`,
      formats: ["es", "cjs"], // 同時產生 ESM 與 CJS
    },
    rollupOptions: {
      // external: [], // 若有外部依賴可設這裡
    },
    minify: false,
    emptyOutDir: true,
  },
});
