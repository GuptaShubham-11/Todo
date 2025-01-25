import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': 'https://localhost:3000', use when you are in development mode
  //   },
  // },
  plugins: [react()],
});
