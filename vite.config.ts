import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path for GitHub Pages project sites (served at /<repo-name>/).
// If you deploy to a custom domain or a user/org page instead, change this to '/'.
export default defineConfig({
  base: '/math-for-a-reason/',
  plugins: [react()],
})
