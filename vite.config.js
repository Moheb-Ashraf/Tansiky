import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // اعتراض أي طلب يبدأ بـ /api
      '/api': {
        target: 'http://tansiqy.runasp.net', // العنوان الأصلي للسيرفر
        changeOrigin: true,
        // تحويل الرابط من شكل Vercel (الذي يحتوي على proxy?path=) إلى شكل السيرفر المباشر
        rewrite: (path) => path.replace(/^\/api\/proxy\?path=/, ''),
      },
    },
  },
})