import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base path for GitHub Pages deployment
  // If deploying to https://username.github.io/repo-name/, set VITE_BASE_PATH=/repo-name/
  // If deploying to custom domain or root, leave empty
  base: process.env.VITE_BASE_PATH || '/',
})
