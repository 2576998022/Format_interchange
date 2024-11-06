import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 基础配置
  base: '/',
  // 服务器配置
  server: {
    port: 3000,
    open: true
  }
})
