import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: "src",
  publicDir: "../public",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@game": resolve(__dirname, "./src/game"),
      "@systems": resolve(__dirname, "./src/game/systems"),
      "@entities": resolve(__dirname, "./src/game/entities"),
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    target: "ES2020",
    minify: "terser",
    sourcemap: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    open: true,
    middlewareMode: false,
  },
  define: {
    "import.meta.env.VITE_VERSION": JSON.stringify("1.0.0"),
  },
});
