import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("development"),
  },
  server: {
    port: 5173, // Default Vite port
    strictPort: true,
    open: true, // Opens the browser automatically
  },
  build: {
    sourcemap: true, // Enables source maps for debugging
  },
})
