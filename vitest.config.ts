/// <reference types="vitest" />

import path from "path";
import { defineConfig, mergeConfig } from "vite";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      alias: { "@": path.resolve(__dirname, "src") },
      environment: "happy-dom",
    },
  })
);
