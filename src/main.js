// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
// 导入路由实例
import router from './router'

// 创建Vue实例并挂载路由、挂载到#app
createApp(App)
  .use(router)
  .mount('#app')