import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3001,
    strictPort: true,
  },
  build: {
    outDir: "build",
    // Preserve the browser targets used before the Vite security upgrade.
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
  },
});
