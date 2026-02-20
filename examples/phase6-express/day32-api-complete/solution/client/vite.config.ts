import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // 프록시 설정: /api로 시작하는 요청을 백엔드 서버로 전달
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
