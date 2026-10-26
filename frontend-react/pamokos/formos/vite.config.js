import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Vite papildinių konfigūracija.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
