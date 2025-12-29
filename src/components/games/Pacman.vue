<template>
  <div class="pacman-game">
    <div class="game-info">
      <div class="score-display">
        <span class="score-label">分数</span>
        <span class="score-value">{{ score }}</span>
      </div>
      <div class="level-display">
        <span>关卡: {{ level }}</span>
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
            {{ gameState === 'start' ? '吃豆人' : '游戏结束' }}
          </h2>
          <p class="overlay-score" v-if="gameState === 'ended'">
            分数: {{ score }} | 关卡: {{ level }}
          </p>
          <button @click="startGame" class="start-btn-overlay">
            {{ gameState === 'start' ? '开始游戏' : '再来一次' }}
          </button>
          <p class="instructions">
            使用方向键控制移动
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
const level = ref(1)
const gameState = ref('start')

let ctx = null
let animationId = null
let pacman = null
let ghosts = []
let dots = []
let cellSize = 20
const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

function initGame() {
  score.value = 0
  level.value = 1
  initLevel()
}

function initLevel() {
  // 初始化 Pacman
  pacman = {
    x: 10,
    y: 15,
    direction: { x: 0, y: 0 },
    nextDirection: { x: 0, y: 0 },
    mouthOpen: 0,
    mouthDir: 1
  }

  // 初始化幽灵
  ghosts = [
    { x: 9, y: 9, color: '#ff0000', direction: { x: 1, y: 0 } },
    { x: 10, y: 9, color: '#00ffff', direction: { x: -1, y: 0 } },
    { x: 9, y: 10, color: '#ffb8ff', direction: { x: 0, y: 1 } },
    { x: 10, y: 10, color: '#ffb852', direction: { x: 0, y: -1 } }
  ]

  // 初始化豆子
  dots = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 0 && !(x === 10 && y === 15)) {
        dots.push({ x, y, eaten: false })
      }
    }
  }
}

function startGame() {
  initGame()
  gameState.value = 'playing'
  gameLoop()
}

function gameLoop() {
  if (gameState.value !== 'playing') return

  update()
  draw()
  animationId = setTimeout(() => requestAnimationFrame(gameLoop), 150)
}

function update() {
  // 更新 Pacman 方向
  const nextX = pacman.x + pacman.nextDirection.x
  const nextY = pacman.y + pacman.nextDirection.y
  
  if (map[nextY] && map[nextY][nextX] !== 1) {
    pacman.direction = { ...pacman.nextDirection }
  }

  // 移动 Pacman
  const newX = pacman.x + pacman.direction.x
  const newY = pacman.y + pacman.direction.y
  
  if (map[newY] && map[newY][newX] !== 1) {
    pacman.x = newX
    pacman.y = newY
  }

  // 吃豆子
  const dotIndex = dots.findIndex(d => d.x === pacman.x && d.y === pacman.y && !d.eaten)
  if (dotIndex !== -1) {
    dots[dotIndex].eaten = true
    score.value += 10
  }

  // 检查是否吃完所有豆子
  if (dots.every(d => d.eaten)) {
    level.value++
    initLevel()
    return
  }

  // 更新幽灵
  ghosts.forEach(ghost => {
    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ]
    
    // 随机选择方向，避免走回头路
    const validDirections = directions.filter(d => {
      const newX = ghost.x + d.x
      const newY = ghost.y + d.y
      return map[newY] && map[newY][newX] !== 1
    })

    if (validDirections.length > 0) {
      ghost.direction = validDirections[Math.floor(Math.random() * validDirections.length)]
    }

    ghost.x += ghost.direction.x
    ghost.y += ghost.direction.y

    // 检查与 Pacman 碰撞
    if (Math.abs(ghost.x - pacman.x) < 1 && Math.abs(ghost.y - pacman.y) < 1) {
      gameOver()
    }
  })

  // 更新嘴巴动画
  pacman.mouthOpen += 0.2 * pacman.mouthDir
  if (pacman.mouthOpen > 0.5 || pacman.mouthOpen < 0) {
    pacman.mouthDir *= -1
  }
}

function draw() {
  // 清除画布
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // 绘制地图
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 1) {
        ctx.fillStyle = '#2121de'
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        ctx.strokeStyle = '#0000ff'
        ctx.lineWidth = 2
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
      }
    }
  }

  // 绘制豆子
  dots.forEach(dot => {
    if (!dot.eaten) {
      ctx.fillStyle = '#ffb8ae'
      ctx.beginPath()
      ctx.arc(
        dot.x * cellSize + cellSize / 2,
        dot.y * cellSize + cellSize / 2,
        3,
        0,
        Math.PI * 2
      )
      ctx.fill()
    }
  })

  // 绘制 Pacman
  const pacX = pacman.x * cellSize + cellSize / 2
  const pacY = pacman.y * cellSize + cellSize / 2
  
  ctx.fillStyle = '#f59e0b'
  ctx.beginPath()
  
  let startAngle = pacman.mouthOpen
  let endAngle = Math.PI * 2 - pacman.mouthOpen
  
  // 根据方向旋转
  let rotation = 0
  if (pacman.direction.x === 1) rotation = 0
  else if (pacman.direction.x === -1) rotation = Math.PI
  else if (pacman.direction.y === 1) rotation = Math.PI / 2
  else if (pacman.direction.y === -1) rotation = -Math.PI / 2

  ctx.save()
  ctx.translate(pacX, pacY)
  ctx.rotate(rotation)
  ctx.moveTo(cellSize / 2 - 2, 0)
  ctx.arc(0, 0, cellSize / 2 - 2, startAngle, endAngle)
  ctx.closePath()
  ctx.fill()
  ctx.restore()

  // 绘制幽灵
  ghosts.forEach(ghost => {
    ctx.fillStyle = ghost.color
    const ghostX = ghost.x * cellSize + cellSize / 2
    const ghostY = ghost.y * cellSize + cellSize / 2
    
    // 身体
    ctx.beginPath()
    ctx.arc(ghostX, ghostY - 2, cellSize / 2 - 2, Math.PI, 0, false)
    ctx.lineTo(ghostX + cellSize / 2 - 2, ghostY + cellSize / 2 - 4)
    
    // 波浪底部
    for (let i = 0; i < 3; i++) {
      const waveX = ghostX + cellSize / 2 - 2 - (i * (cellSize / 2 - 2))
      ctx.quadraticCurveTo(waveX, ghostY + cellSize / 2, waveX, ghostY + cellSize / 2 - 4)
    }
    
    ctx.closePath()
    ctx.fill()

    // 眼睛
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(ghostX - 3, ghostY - 3, 3, 0, Math.PI * 2)
    ctx.arc(ghostX + 3, ghostY - 3, 3, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(ghostX - 3, ghostY - 3, 1.5, 0, Math.PI * 2)
    ctx.arc(ghostX + 3, ghostY - 3, 1.5, 0, Math.PI * 2)
    ctx.fill()
  })
}

function handleKeydown(e) {
  if (gameState.value !== 'playing') return

  const keyMap = {
    'ArrowUp': { x: 0, y: -1 },
    'ArrowDown': { x: 0, y: 1 },
    'ArrowLeft': { x: -1, y: 0 },
    'ArrowRight': { x: 1, y: 0 }
  }

  const direction = keyMap[e.code]
  if (direction) {
    pacman.nextDirection = direction
    e.preventDefault()
  }
}

function gameOver() {
  gameState.value = 'ended'
  clearTimeout(animationId)
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  initGame()
  draw()
  
  setTimeout(() => {
    gameContainer.value?.focus()
  }, 100)
  gameContainer.value?.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  clearTimeout(animationId)
  gameContainer.value?.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.pacman-game {
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

.level-display {
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
  background: rgba(0, 0, 0, 0.8);
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
