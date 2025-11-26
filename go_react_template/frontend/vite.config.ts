import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    target: 'esnext',
    sourcemap: false // セキュリティ都合でソースマップを無効化
  },
  esbuild: {
    target: 'esnext'
  }
})
