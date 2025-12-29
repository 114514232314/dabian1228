<template>
  <div class="archive-page">
    <div class="page-container">
      <div class="back-btn">
        <router-link to="/">← 返回首页</router-link>
      </div>

      <h1 class="archive-title">文章归档</h1>
      <div class="archive-list">
        <div class="category-group" v-for="(group, category) in categoryGroups" :key="category">
          <h2 class="category-title">{{ category }}</h2>
          <ul class="category-article-list">
            <li v-for="item in group" :key="item.id">
              <router-link :to="`/article/${item.id}`" class="archive-article-title">
                {{ item.title }}
              </router-link>
              <span class="archive-article-time">{{ item.time }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 同步更新4篇文章（剪辑/漫画/配音+GitHub部署，无音乐相关）
const articleList = [
  {
    id: 1,
    title: "我的视频剪辑心得：新手快速上手Pr的3个核心技巧",
    time: "2025-12-30",
    category: "视频剪辑"
  },
  {
    id: 2,
    title: "漫画收藏与赏析：那些让我反复回看的经典日系漫画",
    time: "2025-12-29",
    category: "漫画爱好"
  },
  {
    id: 3,
    title: "配音小白入门指南：如何练就好听的配音声线",
    time: "2025-12-28",
    category: "声音配音"
  },
  {
    id: 4,
    title: "详细教程：将Vue个人博客部署到GitHub Pages",
    time: "2025-12-27",
    category: "技术教程"
  }
];

// 定义分类分组响应式数据
const categoryGroups = ref({});

// 按分类分组文章
const groupArticlesByCategory = () => {
  const groups = {};
  articleList.forEach(item => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
  });
  categoryGroups.value = groups;
};

// 页面挂载时执行分组
onMounted(() => {
  groupArticlesByCategory();
});
</script>

<style scoped>
.archive-page {
  padding: 30px 0;
  background-color: #f9f9f9;
}

.page-container {
  width: 85%;
  margin: 0 auto;
}

.back-btn {
  margin-bottom: 20px;
}

.back-btn a {
  text-decoration: none;
  color: #42b983;
  font-size: 15px;
}

.archive-title {
  color: #333;
  font-size: 24px;
  text-align: center;
  margin-bottom: 40px;
}

.archive-list {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}

.category-group {
  margin-bottom: 35px;
}

.category-title {
  font-size: 20px;
  color: #444;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #42b983;
}

.category-article-list {
  list-style: none;
  padding-left: 10px;
}

.category-article-list li {
  padding: 12px 0;
  border-bottom: 1px dashed #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.archive-article-title {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.archive-article-title:hover {
  color: #42b983;
}

.archive-article-time {
  color: #999;
  font-size: 14px;
}
</style>