import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: "dist",
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/embed/index.ts"),
      name: "LearnAble",
      formats: ["es", "iife"],
      fileName: (format) => (format === "es" ? "learnable.es.js" : "learnable.js"),
    },
    rollupOptions: {
      output: {
        footer: "if (typeof LearnAble !== 'undefined' && LearnAble.default) window.LearnAble = LearnAble.default;",
      },
    },
  },
});
