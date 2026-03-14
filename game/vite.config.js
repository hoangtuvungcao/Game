import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false
      }
    }
  },
  server: {
    // Enable HMR and watch files for changes.
    hmr: true,
    watch: {
      usePolling: true // Useful for some Windows environments
    }
  }
});
