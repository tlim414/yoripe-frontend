import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or @vitejs/plugin-react depending on the template generation

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Forces the frontend to always run on localhost:3000
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})