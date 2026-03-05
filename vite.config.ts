import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  publicDir: 'assets',
  server: {
    proxy: {
      '/api': {
        target: 'https://dashscope-intl.aliyuncs.com',
        changeOrigin: true,
        // Keep /api prefix — Alibaba endpoint is /api/v1/...
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('[PROXY →]', req.method, req.url, '→', 'https://dashscope-intl.aliyuncs.com' + proxyReq.path);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('[PROXY ←]', proxyRes.statusCode, req.url);
          });
          proxy.on('error', (err, req) => {
            console.log('[PROXY ERROR]', req.url, err.message);
          });
        },
      },
    },
  },
})