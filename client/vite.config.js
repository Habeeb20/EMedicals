import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:6000',
        changeOrigin: true,
      },
    },
  },
  theme: {
    extend: {
      colors: {
        primary: '#4D49FF',
        secondary: '#FF3366',
        bgGray: '#F5F7FB',
        dark: '#1F1F1F',
        lightText: '#6B6B6B',
        whiteText: '#FFFFFF',
        borderGray: '#E5E5E5'
      },
    },
  },
})
