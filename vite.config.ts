import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/mathjs/lusolve.ts", // 你的 library 入口
      name: "LUSolve",
      fileName: (format) => `lusolve.${format}.js`,
      formats: ["es"], // 只產生 ESM
    },
    rollupOptions: {
      // external: [], // 若有外部依賴可設這裡
    },
    minify: false,
    emptyOutDir: true,
  },
});
