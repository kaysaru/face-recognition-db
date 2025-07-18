import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            '/api': {
                target: 'https://81915d18a4fa.ngrok-free.app',
                changeOrigin: true,
                secure: false,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
})
