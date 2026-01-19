import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { copyFileSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Plugin para copiar index.html a 404.html (necesario para GitHub Pages SPA routing)
const copy404Plugin = () => {
  return {
    name: 'copy-404',
    writeBundle() {
      copyFileSync(
        path.resolve(__dirname, 'dist/index.html'),
        path.resolve(__dirname, 'dist/404.html')
      )
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copy404Plugin()],
  // Base path para GitHub Pages (si el repo es username.github.io, usa '/')
  // Si es un proyecto en username.github.io/repo-name, usa '/repo-name/'
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Optimizaciones para producción
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
        },
      },
    },
    // Aumentar límite de advertencia de tamaño
    chunkSizeWarningLimit: 1000,
  },
  // Optimizar dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'],
  },
})
