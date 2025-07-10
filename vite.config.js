import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],server:{port:1776},proxy: {
    '/api/avatar': {
      target: 'https://api.multiavatar.com',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api\/avatar\//, ''), // Fix rewrite issue
    },
  },
  
})
