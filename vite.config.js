import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 本地开发用空字符串，部署时用仓库名
  base: import.meta.env.DEV ? '/' : '/dabian1228/'
})
