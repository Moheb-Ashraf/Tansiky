import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Direct proxy: any request starting with /api will go to the target
      '/api': {
        target: 'http://tansiqy.runasp.net',
        changeOrigin: true,
        // No complex rewrite needed, it will just append the path to the target
        // Example: /api/Universities -> http://tansiqy.runasp.net/api/Universities
      },
    },
  },
})