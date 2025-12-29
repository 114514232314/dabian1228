<template>
  <div class="snake-game">
    <div class="game-info">
      <div class="score-display">
        <span class="score-label">分数</span>
        <span class="score-value">{{ score }}</span>
      </div>
      <div class="best-score">
        <span>最高分: {{ bestScore }}</span>
      </div>
      <button @click="startGame" class="start-btn" :disabled="gameState === 'playing'">
        {{ gameState === 'playing' ? '游戏中' : '开始游戏' }}
      </button>
    </div>

    <div class="game-container" ref="gameContainer" tabindex="0">
      <canvas ref="canvas" width="400" height="400"></canvas>
      
      <div class="overlay" v-if="gameState !== 'playing'">
        <div class="overlay-content">
          <h2 class="overlay-title">
            {{ gameState === 'start' ? '贪吃蛇' : '游戏结束' }}
          </h2>
          <p class="overlay-score" v-if="gameState === 'ended'">
            分数: {{ score }} | 最高分: {{ bestScore }}
          </p>
          <button @click="startGame" class="start-btn-overlay">
            {{ gameState === 'start' ? '开始游戏' : '再来一次' }}
          </button>
          <p class="instructions">
            使用方向键或 WASD 控制蛇的移动
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
const gameContainer = ref(null)
const score = ref(0)
const bestScore = ref(parseInt(localStorage.getItem('snakeBestScore') || '0'))
const gameState = ref('start')

let ctx = null
let animationId = null
let snake = []
let food = null
let direction = { x: 1, y: 0 }
let nextDirection = { x: 1, y: 0 }
let gridSize = 20
let cellSize = 20

function initGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ]
  score.value = 0
  direction = { x: 1, y: 0 }
  nextDirection = { x: 1, y: 0 }
  spawnFood()
}

function spawnFood() {
  const gridWidth = canvas.value.width / gridSize
  const gridHeight = canvas.value.height / gridSize
  
  let newFood
  do {
    newFood = {
      x: Math.floor(Math.random() * gridWidth),
      y: Math.floor(Math.random() * gridHeight)
    }
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
  
  food = newFood
}

function startGame() {
  initGame()
  gameState.value = 'playing'
  gameLoop()
}

function gameLoop() {
  if (gameState.value !== 'playing') return

  direction = { ...nextDirection }
  
  // 移动蛇
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  }

  // 检查碰撞
  if (checkCollision(head)) {
    gameOver()
    return
  }

  snake.unshift(head)

  // 检查是否吃到食物
  if (head.x === food.x && head.y === food.y) {
    score.value += 10
    spawnFood()
  } else {
    snake.pop()
  }

  draw()
  // 固定速度，无时间限制
  animationId = setTimeout(() => requestAnimationFrame(gameLoop), 150)
}

function checkCollision(head) {
  // 检查墙壁碰撞
  if (head.x < 0 || head.x >= canvas.value.width / gridSize ||
      head.y < 0 || head.y >= canvas.value.height / gridSize) {
    return true
  }

  // 检查自身碰撞
  return snake.some(segment => segment.x === head.x && segment.y === head.y)
}

function draw() {
  // 清除画布 - 使用渐变背景
  const bgGradient = ctx.createLinearGradient(0, 0, canvas.value.width, canvas.value.height)
  bgGradient.addColorStop(0, '#1a1a2e')
  bgGradient.addColorStop(1, '#16213e')
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // 绘制网格
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
  ctx.lineWidth = 1
  for (let i = 0; i <= canvas.value.width; i += gridSize) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, canvas.value.height)
    ctx.stroke()
  }
  for (let i = 0; i <= canvas.value.height; i += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(canvas.value.width, i)
    ctx.stroke()
  }

  // 绘制蛇
  snake.forEach((segment, index) => {
    const x = segment.x * gridSize
    const y = segment.y * gridSize
    
    // 渐变色
    const gradient = ctx.createRadialGradient(
      x + gridSize / 2,
      y + gridSize / 2,
      0,
      x + gridSize / 2,
      y + gridSize / 2,
      gridSize / 2
    )
    
    if (index === 0) {
      gradient.addColorStop(0, '#64b5f6')
      gradient.addColorStop(1, '#42a5f5')
    } else {
      // 身体颜色渐变
      const brightness = Math.max(0.4, 1 - index * 0.05)
      gradient.addColorStop(0, `rgba(100, 181, 132, ${brightness})`)
      gradient.addColorStop(1, `rgba(76, 175, 80, ${brightness})`)
    }
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.roundRect(x + 1, y + 1, gridSize - 2, gridSize - 2, 4)
    ctx.fill()

    // 绘制蛇头眼睛
    if (index === 0) {
      ctx.fillStyle = 'white'
      const eyeSize = 4
      const eyeOffset = 6
      
      if (direction.x === 1) {
        ctx.beginPath()
        ctx.arc(x + gridSize - eyeOffset, y + eyeOffset, eyeSize, 0, Math.PI * 2)
        ctx.arc(x + gridSize - eyeOffset, y + gridSize - eyeOffset, eyeSize, 0, Math.PI * 2)
        ctx.fill()
      } else if (direction.x === -1) {
        ctx.beginPath()
        ctx.arc(x + eyeOffset, y + eyeOffset, eyeSize, 0, Math.PI * 2)
        ctx.arc(x + eyeOffset, y + gridSize - eyeOffset, eyeSize, 0, Math.PI * 2)
        ctx.fill()
      } else if (direction.y === 1) {
        ctx.beginPath()
        ctx.arc(x + eyeOffset, y + gridSize - eyeOffset, eyeSize, 0, Math.PI * 2)
        ctx.arc(x + gridSize - eyeOffset, y + gridSize - eyeOffset, eyeSize, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.arc(x + eyeOffset, y + eyeOffset, eyeSize, 0, Math.PI * 2)
        ctx.arc(x + gridSize - eyeOffset, y + eyeOffset, eyeSize, 0, Math.PI * 2)
        ctx.fill()
      }
      
      ctx.fillStyle = 'black'
      if (direction.x === 1) {
        ctx.beginPath()
        ctx.arc(x + gridSize - eyeOffset + 1, y + eyeOffset, 2, 0, Math.PI * 2)
        ctx.arc(x + gridSize - eyeOffset + 1, y + gridSize - eyeOffset, 2, 0, Math.PI * 2)
        ctx.fill()
      } else if (direction.x === -1) {
        ctx.beginPath()
        ctx.arc(x + eyeOffset + 1, y + eyeOffset, 2, 0, Math.PI * 2)
        ctx.arc(x + eyeOffset + 1, y + gridSize - eyeOffset, 2, 0, Math.PI * 2)
        ctx.fill()
      } else if (direction.y === 1) {
        ctx.beginPath()
        ctx.arc(x + eyeOffset + 1, y + gridSize - eyeOffset, 2, 0, Math.PI * 2)
        ctx.arc(x + gridSize - eyeOffset - 1, y + gridSize - eyeOffset, 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.arc(x + eyeOffset + 1, y + eyeOffset, 2, 0, Math.PI * 2)
        ctx.arc(x + gridSize - eyeOffset - 1, y + eyeOffset, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  })

  // 绘制食物（带发光效果）
  const foodX = food.x * gridSize + gridSize / 2
  const foodY = food.y * gridSize + gridSize / 2
  
  // 发光效果
  const glowGradient = ctx.createRadialGradient(foodX, foodY, 0, foodX, foodY, gridSize)
  glowGradient.addColorStop(0, 'rgba(245, 158, 11, 0.4)')
  glowGradient.addColorStop(1, 'rgba(245, 158, 11, 0)')
  ctx.fillStyle = glowGradient
  ctx.fillRect(food.x * gridSize - gridSize/2, food.y * gridSize - gridSize/2, gridSize * 2, gridSize * 2)
  
  // 食物本体
  const foodGradient = ctx.createRadialGradient(
    foodX - 3,
    foodY - 3,
    0,
    foodX,
    foodY,
    gridSize / 2 - 2
  )
  foodGradient.addColorStop(0, '#fcd34d')
  foodGradient.addColorStop(1, '#d97706')
  
  ctx.fillStyle = foodGradient
  ctx.beginPath()
  ctx.arc(foodX, foodY, gridSize / 2 - 2, 0, Math.PI * 2)
  ctx.fill()
}

function handleKeydown(e) {
  const keyMap = {
    'ArrowUp': { x: 0, y: -1 },
    'ArrowDown': { x: 0, y: 1 },
    'ArrowLeft': { x: -1, y: 0 },
    'ArrowRight': { x: 1, y: 0 },
    'KeyW': { x: 0, y: -1 },
    'KeyS': { x: 0, y: 1 },
    'KeyA': { x: -1, y: 0 },
    'KeyD': { x: 1, y: 0 }
  }

  const newDirection = keyMap[e.code]
  if (newDirection && gameState.value === 'playing') {
    // 防止直接反向移动
    if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
      nextDirection = newDirection
    }
    e.preventDefault()
  }
}

function gameOver() {
  gameState.value = 'ended'
  cancelAnimationFrame(animationId)
  
  if (score.value > bestScore.value) {
    bestScore.value = score.value
    localStorage.setItem('snakeBestScore', bestScore.value.toString())
  }
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  initGame()
  draw()
  
  // 自动聚焦
  setTimeout(() => {
    gameContainer.value?.focus()
  }, 100)
  
  gameContainer.value?.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  gameContainer.value?.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.snake-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.game-info {
  display: flex;
  gap: 40px;
  align-items: center;
}

.score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-label {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 4px;
}

.score-value {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-primary);
}

.best-score {
  font-size: 16px;
  color: var(--color-text-secondary);
}

.start-btn {
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.start-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.game-container {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  outline: none;
}

canvas {
  display: block;
  border-radius: var(--radius-lg);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 26, 46, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
}

.overlay-content {
  text-align: center;
  color: white;
  padding: 32px;
}

.overlay-title {
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: 700;
}

.overlay-score {
  font-size: 18px;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.9);
}

.start-btn-overlay {
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 14px 40px;
  font-size: 18px;
  font-weight: 600;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.4);
}

.start-btn-overlay:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(66, 185, 131, 0.5);
}

.instructions {
  margin-top: 20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}
</style>
