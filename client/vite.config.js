import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/api': process.env.VITE_SERVER_API_URL || 'http://localhost:3000',
    },
  },
  plugins: [react()],
});
