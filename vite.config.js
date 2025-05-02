import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // This ensures assets are served from the root
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      external: ['react-router-dom']
    }
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
    allowedHosts: ['lookbook-kgvm.onrender.com']
  }
})
