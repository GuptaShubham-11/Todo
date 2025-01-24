import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.VITE_SERVER_API_BASE_URL || 'http://localhost:3000',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
});
