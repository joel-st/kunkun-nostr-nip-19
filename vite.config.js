import preact from "@preact/preset-vite"
import { defineConfig } from "vite"
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
      '@store': resolve(__dirname, 'src/modules/store.js'),
      '@components': resolve(__dirname, 'src/components')
    }
  }
})
