import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: process.env.NODE_ENV === "development" ? {
      '/api': 'http://localhost:3000',
    } : undefined,
  },
  plugins: [react()],
});
