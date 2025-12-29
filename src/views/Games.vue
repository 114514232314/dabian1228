<template>
  <div class="games-page">
    <div class="page-container">
      <h1 class="page-title">
        <span class="title-icon">🎮</span> 小游戏
      </h1>

      <div class="games-grid">
        <div 
          v-for="game in games" 
          :key="game.id" 
          class="game-card"
          @click="selectGame(game.id)"
        >
          <div class="game-icon">{{ game.icon }}</div>
          <h3 class="game-name">{{ game.name }}</h3>
          <p class="game-desc">{{ game.desc }}</p>
          <div class="game-tags">
            <span v-for="tag in game.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <transition name="fade">
        <div class="game-play-area" v-if="selectedGame">
          <div class="game-header">
            <button @click="closeGame" class="back-btn">← 返回游戏列表</button>
            <h2 class="current-game-name">{{ getCurrentGame().name }}</h2>
          </div>
          
          <div class="game-container">
            <FlappyBird v-if="selectedGame === 'flappy'" />
            <Game2048 v-else-if="selectedGame === '2048'" />
            <Pacman v-else-if="selectedGame === 'pacman'" />
            <Snake v-else-if="selectedGame === 'snake'" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FlappyBird from '../components/games/FlappyBird.vue'
import Game2048 from '../components/games/Game2048.vue'
import Pacman from '../components/games/Pacman.vue'
import Snake from '../components/games/Snake.vue'

const selectedGame = ref(null)

const games = [
  {
    id: 'flappy',
    name: '笨鸟先飞',
    icon: '🐦',
    desc: '控制小鸟躲避障碍物，飞得越远分数越高！',
    tags: ['反应', '挑战']
  },
  {
    id: '2048',
    name: '2048',
    icon: '🔢',
    desc: '经典数字合并游戏，通过移动方块合成2048！',
    tags: ['益智', '策略']
  },
  {
    id: 'pacman',
    name: '吃豆人',
    icon: '🟡',
    desc: '吃掉所有豆子，躲避幽灵的追击！',
    tags: ['经典', '冒险']
  },
  {
    id: 'snake',
    name: '贪吃蛇',
    icon: '🐍',
    desc: '控制蛇身，吃掉食物变长，不要撞到墙壁！',
    tags: ['经典', '反应']
  }
]

function selectGame(gameId) {
  selectedGame.value = gameId
}

function closeGame() {
  selectedGame.value = null
}

function getCurrentGame() {
  return games.find(g => g.id === selectedGame.value) || games[0]
}
</script>

<style scoped>
.games-page {
  padding: 40px 0;
  background: var(--gradient-background);
  min-height: calc(100vh - 80px);
  position: relative;
}

.games-page::before {
  content: '';
  position: fixed;
  top: -50%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  animation: float 20s ease-in-out infinite;
}

.games-page::after {
  content: '';
  position: fixed;
  bottom: -50%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(66, 185, 131, 0.08) 0%, transparent 70%);
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
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.page-title {
  color: var(--color-text);
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: color 0.3s ease;
}

.title-icon {
  font-size: 36px;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.game-card {
  background: var(--color-background);
  border-radius: var(--radius-xl);
  padding: 32px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.game-card::before {
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

.game-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.game-card:hover::before {
  transform: scaleX(1);
}

.game-icon {
  font-size: 64px;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
}

.game-card:hover .game-icon {
  transform: scale(1.1);
}

.game-name {
  font-size: 22px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
  transition: color 0.3s ease;
}

.game-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  transition: color 0.3s ease;
}

.game-tags {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  background: var(--gradient-primary);
  background: linear-gradient(135deg, rgba(var(--color-primary), 0.1), rgba(var(--color-primary), 0.05));
  color: var(--color-primary);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.game-card:hover .tag {
  background: var(--gradient-primary);
  color: white;
}

.game-play-area {
  background: var(--color-background);
  border-radius: var(--radius-xl);
  padding: 24px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.back-btn {
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 8px 16px;
  font-size: 14px;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.current-game-name {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
  transition: color 0.3s ease;
}

.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 响应式 */
@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .game-card {
    padding: 24px;
  }

  .page-title {
    font-size: 26px;
  }

  .game-icon {
    font-size: 48px;
  }
}
</style>
