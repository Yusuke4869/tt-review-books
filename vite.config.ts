/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = `${process.cwd()}/src`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: `${process.cwd()}/dist`,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "~/": `${root}/`,
    },
  },
  root,
  envDir: process.cwd(),
  publicDir: `${process.cwd()}/public`,
  test: {
    include: ["tests/unit/**/*.spec.tsx"],
    exclude: ["**/*/__snapshots__/**"],
    globals: true,
    environment: "jsdom",
  },
});
