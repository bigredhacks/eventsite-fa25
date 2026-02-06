import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/utils": "/src/utils",
      "@/assets": "/src/assets",
      "@/components": "/src/components",
      "@/lib": "/src/lib",
      "@/pages": "/src/pages",
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
