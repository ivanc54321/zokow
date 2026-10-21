import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        admin: resolve(import.meta.dirname, 'admin.html'),
        arconf: resolve(import.meta.dirname, 'arconf.html'),
        preview: resolve(import.meta.dirname, 'preview.html'),
        vibe: resolve(import.meta.dirname, 'vibe.html')
      }
    }
  }
})
