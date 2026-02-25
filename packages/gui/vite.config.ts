import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@metalang/core': path.resolve(__dirname, '../core/src/index.ts'),
      '@metalang/schema': path.resolve(__dirname, '../schema/src/index.ts'),
    },
  },
})
