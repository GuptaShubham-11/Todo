import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://todo-to90.onrender.com' || 'http://localhost:3000'
    }
  },
  plugins: [react()],
});
