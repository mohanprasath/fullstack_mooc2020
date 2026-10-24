import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// CRA kept JSX in .js files; tell esbuild to parse them as JSX.
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
})
