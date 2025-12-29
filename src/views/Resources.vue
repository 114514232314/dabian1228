<template>
  <div class="resources-page">
    <div class="page-container">
      <h1 class="page-title">
        <span class="title-icon">📚</span> 叉烧喵の日漫情报局
      </h1>
      <p class="page-subtitle">日漫配音剪辑人的核心资源平台推荐</p>

      <!-- 平台卡片列表 -->
      <div class="platforms-grid">
        <div class="platform-card" v-for="(platform, index) in platforms" :key="index">
          <div class="card-header">
            <div class="platform-icon">{{ platform.icon }}</div>
            <div class="platform-info">
              <h3 class="platform-name">{{ platform.name }}</h3>
              <a :href="platform.url" target="_blank" rel="noopener" class="platform-link">
                {{ platform.url }}
              </a>
            </div>
          </div>
          <div class="card-body">
            <div class="feature-section">
              <h4 class="feature-title">✨ 核心特点</h4>
              <p class="feature-text">{{ platform.features }}</p>
            </div>
            <div class="feature-section">
              <h4 class="feature-title">🎯 适配场景</h4>
              <p class="feature-text">{{ platform.scenarios }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用技巧 -->
      <div class="tips-section">
        <h2 class="section-title">
          <span class="section-icon">💡</span> 我的使用小技巧
        </h2>
        <div class="tips-grid">
          <div class="tip-card" v-for="(tip, index) in tips" :key="index">
            <div class="tip-header">
              <span class="tip-icon">{{ tip.icon }}</span>
              <h4 class="tip-title">{{ tip.title }}</h4>
            </div>
            <p class="tip-content">{{ tip.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const platforms = [
  {
    name: '番组计划（Bangumi）',
    icon: '🎬',
    url: 'https://bgm.tv/',
    features: '日漫信息天花板，收录99%日漫的剧情、声优、播出时间。支持自建追番/剪辑素材番单，用户评分体系能精准避坑烂番。社区可与同好交流配音/剪辑思路，同时标注每部番的正版播放平台，避免剪辑侵权。',
    scenarios: '配音前查角色声优的声线特点，剪辑前定位番剧高分集数/名场面，自建「配音练习番单」「剪辑素材番单」。'
  },
  {
    name: '动漫之家（资讯版）',
    icon: '📰',
    url: 'https://www.dmzj.com/',
    features: '日漫资讯实时更新，涵盖新番档期、声优动态、剧场版预告。番剧百科收录大量经典/小众番的详细解读，支持一键跳转B站/腾讯等正版播放平台，无广告干扰。',
    scenarios: '找小众番素材线索（避免剪辑内容撞款），查日漫配音声优的访谈/幕后，为角色配音找参考。'
  },
  {
    name: '萌娘百科（动漫板块）',
    icon: '📖',
    url: 'https://zh.moegirl.org.cn/',
    features: '专注日漫细节解析，标注经典番的名场面集数/时间点、角色设定、名台词，相当于「剪辑素材索引库」。纯资讯属性，浏览体验丝滑。',
    scenarios: '做「日漫名场面配音合集」时，直接按索引找片段；配音前拆解角色性格/声线特点。'
  },
  {
    name: 'MyAnimeList（国际版）',
    icon: '🌐',
    url: 'https://myanimelist.net/',
    features: '全球最大日漫数据库，覆盖海外未引进的小众番。支持按「治愈/热血/悬疑」等标签筛选番剧，海外漫迷评分体系能提供差异化的素材选题思路。',
    scenarios: '找海外冷门但口碑高的日漫做差异化配音剪辑，参考海外视角提炼番剧剪辑亮点。'
  }
];

const tips = [
  {
    icon: '🎥',
    title: '剪辑前',
    content: '先在Bangumi查番剧版权信息，再去萌娘百科定位名场面时间点，最后跳转到正版平台获取素材。'
  },
  {
    icon: '🎤',
    title: '配音前',
    content: '在动漫之家查声优访谈，结合MyAnimeList的角色解析，精准匹配角色声线。'
  },
  {
    icon: '📋',
    title: '建番单',
    content: '把适合配音的「台词向番剧」、适合剪辑的「画面向番剧」分类整理，找素材效率翻倍。'
  }
];
</script>

<style scoped>
.resources-page {
  padding: 40px 0;
  background: var(--gradient-background);
  min-height: calc(100vh - 80px);
  transition: background 0.3s ease;
  position: relative;
}

/* 装饰性背景 */
.resources-page::before {
  content: '';
  position: fixed;
  top: -30%;
  right: -15%;
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  animation: float 22s ease-in-out infinite;
}

.resources-page::after {
  content: '';
  position: fixed;
  bottom: -30%;
  left: -15%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(66, 185, 131, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  animation: float 18s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, -20px);
  }
}

.page-container {
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.page-title {
  color: var(--color-text);
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: color 0.3s ease;
}

.title-icon {
  font-size: 40px;
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

.page-subtitle {
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 16px;
  margin-bottom: 40px;
  font-weight: 500;
}

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  gap: 28px;
  margin-bottom: 48px;
}

.platform-card {
  background: linear-gradient(145deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  border-radius: var(--radius-xl);
  padding: 28px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.platform-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.platform-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.platform-card:hover::before {
  transform: scaleX(1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.platform-icon {
  font-size: 48px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(66, 185, 131, 0.1), rgba(102, 126, 234, 0.1));
  border-radius: var(--radius-lg);
}

.platform-info {
  flex: 1;
}

.platform-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 6px;
  transition: color 0.3s ease;
}

.platform-link {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 13px;
  word-break: break-all;
  transition: all 0.3s ease;
  display: block;
}

.platform-link:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-section {
  background: var(--color-background);
  padding: 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.feature-section:hover {
  background: var(--color-background-alt);
}

.feature-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.feature-text {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.tips-section {
  margin-top: 48px;
}

.section-title {
  font-size: 28px;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 32px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: color 0.3s ease;
}

.section-icon {
  font-size: 32px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.tip-card {
  background: linear-gradient(145deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  border-radius: var(--radius-xl);
  padding: 24px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.tip-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.tip-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.tip-card:hover::before {
  transform: scaleX(1);
}

.tip-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.tip-icon {
  font-size: 32px;
}

.tip-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
  transition: color 0.3s ease;
}

.tip-content {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .resources-page {
    padding: 24px 0;
  }

  .page-container {
    width: 95%;
  }

  .page-title {
    font-size: 28px;
  }

  .page-subtitle {
    font-size: 14px;
    margin-bottom: 28px;
  }

  .platforms-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .platform-card {
    padding: 20px;
  }

  .card-header {
    flex-direction: column;
    text-align: center;
  }

  .platform-name {
    font-size: 16px;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .tip-card {
    padding: 20px;
  }

  .section-title {
    font-size: 22px;
  }
}
</style>
