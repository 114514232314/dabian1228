<template>
  <div id="app">
    <!-- 全局导航栏 -->
    <nav class="nav-bar">
      <div class="nav-container">
        <h2 class="logo">
          <router-link to="/">我的Vite Vue博客</router-link>
        </h2>
        <div class="nav-right">
        <ul class="nav-list">
          <li>
            <router-link to="/" class="nav-link" active-class="active">首页</router-link>
          </li>
          <li>
            <router-link to="/archive" class="nav-link" active-class="active">文章归档</router-link>
          </li>
          <li>
            <router-link to="/about" class="nav-link" active-class="active">关于我</router-link>
          </li>
          <li>
            <router-link to="/games" class="nav-link" active-class="active">游戏</router-link>
          </li>
          <li>
            <router-link to="/resources" class="nav-link" active-class="active">资源</router-link>
          </li>
        </ul>
          <!-- 主题切换器 -->
          <ThemeSwitcher />
        </div>
      </div>
    </nav>

    <!-- 路由出口：渲染匹配的页面组件 -->
    <router-view />
  </div>
</template>

<script setup>
import ThemeSwitcher from './components/ThemeSwitcher.vue'
</script>

<style>
/* CSS 变量定义 */
:root {
  --color-primary: #42b983;
  --color-primary-hover: #3aa876;
  --color-secondary: #667eea;
  --color-background: #ffffff;
  --color-background-alt: #f8f9fa;
  --color-text: #2c3e50;
  --color-text-secondary: #5a6c7d;
  --color-text-muted: #7f8c8d;
  --color-border: #e8ecf1;
  --gradient-primary: linear-gradient(135deg, #42b983 0%, #667eea 100%);
  --gradient-background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf3 100%);
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 2px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Microsoft YaHei", "Helvetica Neue", sans-serif;
  background: var(--gradient-background);
  color: var(--color-text);
  transition: background 0.3s ease, color 0.3s ease;
  /* 添加精美的背景图案 */
  background-image:
    linear-gradient(135deg, var(--gradient-background)),
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(102,126,234,0.03)"/><circle cx="75" cy="75" r="1" fill="rgba(102,126,234,0.03)"/><circle cx="50" cy="10" r="0.5" fill="rgba(66,185,131,0.02)"/><circle cx="10" cy="90" r="0.5" fill="rgba(66,185,131,0.02)"/></pattern></defs><rect fill="url(%23grain)" width="100%" height="100%"/></svg>');
  background-blend-mode: overlay;
  min-height: 100vh;
}

.nav-bar {
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: var(--shadow-sm);
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* 导航栏装饰线条 */
.nav-bar::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-bar:hover::before {
  transform: scaleX(1);
}

.nav-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  text-decoration: none;
  color: var(--color-primary);
  font-weight: bold;
  font-size: 20px;
  transition: color 0.3s ease;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 28px;
  margin: 0;
}

.nav-link {
  text-decoration: none;
  color: var(--color-text);
  font-size: 15px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width 0.3s ease;
}

.nav-link:hover, .nav-link.active {
  color: var(--color-primary);
  font-weight: 500;
}

.nav-link:hover::after, .nav-link.active::after {
  width: 100%;
}

/* 响应式 */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 12px;
  }

  .nav-list {
    gap: 20px;
  }

  .nav-link {
    font-size: 14px;
  }
}
</style>