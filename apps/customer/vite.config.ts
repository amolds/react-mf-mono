import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'customer',
      filename: 'remoteEntry.js',
      exposes: {
        './CustomersPage': './src/CustomersPage.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  server: {
    port: 3001
  },
  build: {
    target: 'esnext',
    minify: false
  }
})
