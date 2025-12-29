<template>
  <div class="home-page">
    <div class="page-container">
      <h1 class="blog-title">
        <span class="title-icon">✨</span> 我的个人博客
      </h1>
      
      <!-- 音乐播放器模块 -->
      <MusicPlayer />
      
      <div class="article-list">
        <h2 class="list-title">
          <span class="title-badge">📝</span> 最新文章
        </h2>
        <div class="article-item" v-for="item in articleList" :key="item.id">
          <router-link :to="`/article/${item.id}`" class="article-title">
            <span class="title-arrow">→</span>
            {{ item.title }}
          </router-link>
          <p class="article-desc">{{ item.desc }}</p>
          <p class="article-meta">
            <span class="meta-item">📅 {{ item.time }}</span>
            <span class="meta-separator">|</span>
            <span class="meta-item category-tag">{{ item.category }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MusicPlayer from '../components/MusicPlayer.vue'

// 你的喜好（剪辑、漫画、配音）相关文章列表 + GitHub部署教程
const articleList = [
  {
    id: 1,
    title: "我的视频剪辑心得：新手快速上手Pr的3个核心技巧",
    desc: "作为剪辑爱好者，分享我从零基础到熟练使用Premiere的实用技巧，让你少走弯路",
    time: "2025-12-30",
    category: "视频剪辑"
  },
  {
    id: 2,
    title: "漫画收藏与赏析：那些让我反复回看的经典日系漫画",
    desc: "分享我的漫画收藏清单，以及对剧情、分镜、人物塑造的个人赏析，记录漫画带给我的感动",
    time: "2025-12-29",
    category: "漫画爱好"
  },
  {
    id: 3,
    title: "配音小白入门指南：如何练就好听的配音声线",
    desc: "作为配音爱好者，分享我练习发声、情感表达、台词功底的实用方法，新手也能快速掌握",
    time: "2025-12-28",
    category: "声音配音"
  },
  {
    id: 4,
    title: "详细教程：将Vue个人博客部署到GitHub Pages",
    desc: "手把手教你将Vite Vue博客打包并部署到GitHub Pages，实现公网访问",
    time: "2025-12-27",
    category: "技术教程"
  }
];
</script>

<style scoped>
.home-page {
  padding: 40px 0;
  background: var(--gradient-background);
  min-height: calc(100vh - 80px);
  transition: background 0.3s ease;
  position: relative;
}

/* 添加装饰性背景元素 */
.home-page::before {
  content: '';
  position: fixed;
  top: -50%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(66, 185, 131, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  animation: float 20s ease-in-out infinite;
}

.home-page::after {
  content: '';
  position: fixed;
  bottom: -50%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  animation: float 25s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, -30px);
  }
}

.page-container {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.blog-title {
  color: var(--color-text);
  text-align: center;
  margin-bottom: 35px;
  font-size: 32px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: color 0.3s ease;
  position: relative;
}

.title-icon {
  font-size: 36px;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.list-title {
  font-size: 24px;
  color: var(--color-text);
  margin-bottom: 28px;
  padding-left: 16px;
  border-left: 5px solid var(--color-primary);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.title-badge {
  font-size: 20px;
}

.article-item {
  background: linear-gradient(145deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  padding: 28px;
  border-radius: var(--radius-xl);
  margin-bottom: 24px;
  box-shadow: var(--shadow-md);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--color-border);
  position: relative;
  overflow: hidden;
}

/* 添加装饰性背景图案 */
.article-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  z-index: 2;
}

.article-item::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="10" cy="10" r="2" fill="rgba(66,185,131,0.03)"/><circle cx="90" cy="90" r="2" fill="rgba(102,126,234,0.03)"/><circle cx="50" cy="50" r="1" fill="rgba(66,185,131,0.02)"/></svg>');
  background-size: 100px 100px;
  z-index: 1;
}

.article-item:hover::before {
  transform: scaleX(1);
}

.article-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.article-title {
  font-size: 20px;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 600;
  display: block;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 2;
}

.title-arrow {
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
  color: var(--color-primary);
}

.article-item:hover .title-arrow {
  opacity: 1;
  transform: translateX(0);
}

.article-title:hover {
  color: var(--color-primary);
  transform: translateX(4px);
}

.article-desc {
  color: var(--color-text-secondary);
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 16px;
  font-weight: 400;
  position: relative;
  z-index: 2;
}

.article-meta {
  color: var(--color-text-muted);
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
  transition: color 0.3s ease, border-color 0.3s ease;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-separator {
  color: var(--color-border);
}

.category-tag {
  background: var(--gradient-primary);
  background: linear-gradient(135deg, rgba(var(--color-primary), 0.1), rgba(var(--color-primary), 0.05));
  color: var(--color-primary);
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 12px;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.article-item:hover .category-tag {
  background: var(--gradient-primary);
  color: white;
  transform: scale(1.02);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-page {
    padding: 20px 0;
  }

  .page-container {
    width: 95%;
  }

  .blog-title {
    font-size: 26px;
  }

  .list-title {
    font-size: 20px;
  }

  .article-item {
    padding: 20px;
  }

  .article-title {
    font-size: 17px;
  }

  .article-desc {
    font-size: 14px;
  }
}
</style>