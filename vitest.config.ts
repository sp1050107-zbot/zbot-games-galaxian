import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "src/__tests__/",
        "**/*.test.ts",
        "**/*.spec.ts",
      ],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
    include: ["src/**/*.{test,spec}.ts"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@game": resolve(__dirname, "./src/game"),
      "@systems": resolve(__dirname, "./src/game/systems"),
      "@entities": resolve(__dirname, "./src/game/entities"),
    },
  },
});
