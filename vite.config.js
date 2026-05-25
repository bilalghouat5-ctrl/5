import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      'react-router-dom': fileURLToPath(new URL('./src/vendor/react-router-dom.jsx', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  publicDir: 'public',
})
