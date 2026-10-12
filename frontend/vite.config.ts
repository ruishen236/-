import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    // 浏览器只请求同源 /api；开发服务器转发到 FastAPI，避免宽泛跨域配置。
    proxy: { '/api': 'http://127.0.0.1:8000' },
  },
  preview: { proxy: { '/api': 'http://127.0.0.1:8000' } },
  test: { environment: 'jsdom', setupFiles: './src/test-setup.ts', css: false },
});
