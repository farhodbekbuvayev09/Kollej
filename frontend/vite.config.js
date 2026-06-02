import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/agent.php': 'http://localhost:8000',
      '/Admin/process.php': 'http://localhost:8000'
    }
  }
})
