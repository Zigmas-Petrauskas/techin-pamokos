import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite konfigūracija su React ir Tailwind CSS.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
