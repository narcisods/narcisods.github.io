import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// narcisods.github.io is a user site served from the domain root, so base stays '/'.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
