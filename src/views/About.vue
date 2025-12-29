<template>
  <div class="about-page">
    <div class="page-container">
      <!-- 返回首页按钮 -->
      <div class="back-btn">
        <router-link to="/">← 返回首页</router-link>
      </div>

      <h1 class="about-title">关于我</h1>
      <div class="about-content">
        <!-- 个人头像 -->
        <div class="avatar-container"></div>

        <div class="intro">
          <h3 class="intro-title">个人简介</h3>
          <p class="intro-content">
            欢迎！这里是我的个人博客，一个记录生活、分享心得的小天地。
            在这里，你能看到我的思考与感悟，还有那些让我印象深刻的事物。
            愿每一个热爱生活的你，都能在这里找到共鸣。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 无需额外逻辑，图片通过CSS直接引入
</script>

<style scoped>
.about-page {
  padding: 40px 0;
  background: var(--gradient-background);
  min-height: calc(100vh - 80px);
  transition: background 0.3s ease;
  position: relative;
}

/* 添加装饰性背景元素 */
.about-page::before {
  content: '';
  position: fixed;
  top: 20%;
  left: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  animation: float 18s ease-in-out infinite;
}

.about-page::after {
  content: '';
  position: fixed;
  bottom: 20%;
  right: -20%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(66, 185, 131, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  animation: float 22s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-30px, 30px);
  }
}

.page-container {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.back-btn {
  margin-bottom: 20px;
}

.back-btn a {
  text-decoration: none;
  color: var(--color-primary);
  font-size: 15px;
  transition: color 0.3s ease;
}

.about-title {
  color: var(--color-text);
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 700;
  transition: color 0.3s ease;
}

.about-content {
  background: var(--color-background);
  padding: 40px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* 添加装饰性背景图案 */
.about-content::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(66,185,131,0.04)"/></pattern></defs><rect fill="url(%23dots)" width="100%" height="100%"/></svg>');
  background-size: 40px 40px;
  z-index: 0;
}

.avatar-container {
  width: 200px;
  height: 200px;
  margin-bottom: 25px;
  background-image: url('../assets/my-img.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  /* 添加光晕效果 */
}

.avatar-container::after {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: var(--radius-lg);
  background: var(--gradient-primary);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
  filter: blur(20px);
}

.avatar-container:hover::after {
  opacity: 0.3;
}

.avatar-container:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-lg);
}

.intro {
  width: 100%;
  max-width: 700px;
  position: relative;
  z-index: 1;
}

.intro-title {
  font-size: 24px;
  color: var(--color-text);
  margin-bottom: 20px;
  font-weight: 600;
  padding-left: 16px;
  border-left: 5px solid var(--color-primary);
  transition: color 0.3s ease, border-color 0.3s ease;
  position: relative;
}

/* 添加标题装饰 */
.intro-title::before {
  content: '';
  position: absolute;
  left: -16px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: var(--gradient-primary);
  border-radius: 50%;
  opacity: 0.6;
}

.intro-content {
  color: var(--color-text-secondary);
  font-size: 16px;
  line-height: 1.8;
  text-align: left;
  transition: color 0.3s ease;
  position: relative;
  padding: 20px;
  background: var(--color-background-alt);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

/* 响应式 */
@media (max-width: 768px) {
  .about-page {
    padding: 20px 0;
  }

  .page-container {
    width: 95%;
  }

  .about-content {
    padding: 24px;
  }

  .about-title {
    font-size: 26px;
  }

  .intro-title {
    font-size: 20px;
  }

  .intro-content {
    font-size: 15px;
  }
}
</style>