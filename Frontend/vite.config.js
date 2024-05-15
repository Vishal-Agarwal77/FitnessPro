import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');
//   return {
//     define: {
//       'process.env.BACKEND_DOMAIN': JSON.stringify(env.BACKEND_DOMAIN)
//     },
//     plugins: [react()],
//   }
// })