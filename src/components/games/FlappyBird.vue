<template>
  <div class="flappy-bird-game">
    <div class="game-info">
      <div class="score-display">
        <span class="score-label">分数</span>
        <span class="score-value">{{ score }}</span>
      </div>
      <div class="best-score">
        <span>最高分: {{ bestScore }}</span>
      </div>
    </div>

    <div class="game-container">
      <canvas ref="canvas" width="400" height="600"></canvas>
      
      <div class="overlay" v-if="gameState !== 'playing'">
        <div class="overlay-content">
          <h2 class="overlay-title">
            {{ gameState === 'start' ? '笨鸟先飞' : '游戏结束' }}
          </h2>
          <p class="overlay-score" v-if="gameState === 'ended'">
            分数: {{ score }} | 最高分: {{ bestScore }}
          </p>
          <button @click="startGame" class="start-btn">
            {{ gameState === 'start' ? '开始游戏' : '再来一次' }}
          </button>
          <p class="instructions">
            点击或按空格键控制小鸟飞行
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
const score = ref(0)
const bestScore = ref(parseInt(localStorage.getItem('flappyBestScore') || '0'))
const gameState = ref('start')

let ctx = null
let animationId = null
let bird = null
let pipes = []
let frameCount = 0

class Bird {
  constructor() {
    this.x = 80
    this.y = 300
    this.radius = 15
    this.velocity = 0
    this.gravity = 0.35
    this.jump = -6
  }

  update() {
    this.velocity += this.gravity
    this.y += this.velocity
    // 限制最大下落速度
    if (this.velocity > 8) this.velocity = 8
  }

  flap() {
    this.velocity = this.jump
  }

  draw() {
    // 身体
    ctx.fillStyle = '#42b983'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    
    // 眼睛
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(this.x + 6, this.y - 4, 5, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(this.x + 8, this.y - 4, 2.5, 0, Math.PI * 2)
    ctx.fill()
    
    // 嘴巴
    ctx.fillStyle = '#f59e0b'
    ctx.beginPath()
    ctx.moveTo(this.x + 8, this.y)
    ctx.lineTo(this.x + 18, this.y + 2)
    ctx.lineTo(this.x + 8, this.y + 5)
    ctx.closePath()
    ctx.fill()
    
    // 翅膀
    ctx.fillStyle = '#3aa876'
    ctx.beginPath()
    ctx.ellipse(this.x - 4, this.y + 2, 8, 5, -0.3, 0, Math.PI * 2)
    ctx.fill()
  }
}

class Pipe {
  constructor(x) {
    this.x = x
    this.width = 70
    this.gap = 220
    this.topHeight = Math.random() * (canvas.value.height - this.gap - 120) + 60
    this.bottomY = this.topHeight + this.gap
    this.passed = false
  }

  update() {
    this.x -= 2.5
  }

  draw() {
    // 管道渐变
    const gradient = ctx.createLinearGradient(this.x, 0, this.x + this.width, 0)
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(1, '#5568d3')
    
    ctx.fillStyle = gradient
    ctx.fillRect(this.x, 0, this.width, this.topHeight)
    ctx.fillRect(this.x, this.bottomY, this.width, canvas.value.height - this.bottomY)
    
    // 管道边缘
    ctx.fillStyle = '#4c5ec4'
    ctx.fillRect(this.x - 4, this.topHeight - 15, this.width + 8, 15)
    ctx.fillRect(this.x - 4, this.bottomY, this.width + 8, 15)
    
    // 管道高光
    ctx.fillStyle = 'rgba(255,255,255,0.1)'
    ctx.fillRect(this.x + 5, 0, 5, this.topHeight - 15)
    ctx.fillRect(this.x + 5, this.bottomY + 15, 5, canvas.value.height - this.bottomY - 15)
  }
}

function initGame() {
  bird = new Bird()
  pipes = []
  score.value = 0
  frameCount = 0
}

function startGame() {
  initGame()
  gameState.value = 'playing'
  gameLoop()
}

function gameLoop() {
  if (gameState.value !== 'playing') return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // 绘制背景
  const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.value.height)
  bgGradient.addColorStop(0, '#87CEEB')
  bgGradient.addColorStop(1, '#B0E0E6')
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  
  // 绘制云朵
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  for (let i = 0; i < 3; i++) {
    const cloudX = (frameCount * 0.5 + i * 150) % (canvas.value.width + 100) - 50
    drawCloud(cloudX, 60 + i * 90)
  }

  // 更新和绘制小鸟
  bird.update()
  bird.draw()

  // 生成管道（每90帧生成一个）
  if (frameCount % 90 === 0) {
    pipes.push(new Pipe(canvas.value.width))
  }

  // 更新和绘制管道
  pipes.forEach((pipe, index) => {
    pipe.update()
    pipe.draw()

    // 碰撞检测 - 改为圆形碰撞
    if (checkCollision(bird, pipe)) {
      gameOver()
      return
    }

    // 移除出界管道
    if (pipe.x + pipe.width < 0) {
      pipes.splice(index, 1)
    }

    // 计分 - 当管道左侧经过小鸟中心时
    if (!pipe.passed && pipe.x + pipe.width < bird.x) {
      pipe.passed = true
      score.value++
    }
  })

  // 边界检测
  if (bird.y - bird.radius < 0 || bird.y + bird.radius > canvas.value.height) {
    gameOver()
    return
  }

  frameCount++
  animationId = requestAnimationFrame(gameLoop)
}

function drawCloud(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, 25, 0, Math.PI * 2)
  ctx.arc(x + 25, y - 10, 30, 0, Math.PI * 2)
  ctx.arc(x + 50, y, 25, 0, Math.PI * 2)
  ctx.fill()
}

function checkCollision(bird, pipe) {
  // 水平方向检测
  if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipe.width) {
    // 垂直方向检测（管道间隙）
    if (bird.y - bird.radius < pipe.topHeight || bird.y + bird.radius > pipe.bottomY) {
      return true
    }
  }
  return false
}

function gameOver() {
  gameState.value = 'ended'
  cancelAnimationFrame(animationId)
  
  if (score.value > bestScore.value) {
    bestScore.value = score.value
    localStorage.setItem('flappyBestScore', bestScore.value.toString())
  }
}

function handleInput(e) {
  if (gameState.value === 'playing') {
    bird.flap()
  }
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  initGame()
  
  // 绘制初始画面
  const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.value.height)
  bgGradient.addColorStop(0, '#87CEEB')
  bgGradient.addColorStop(1, '#B0E0E6')
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  bird.draw()
  
  // 添加事件监听
  canvas.value.addEventListener('click', handleInput)
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault()
      handleInput()
    }
  })
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  canvas.value?.removeEventListener('click', handleInput)
  document.removeEventListener('keydown', handleInput)
})

</script>

<style scoped>
.flappy-bird-game {
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

.game-container {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
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
  background: rgba(0, 0, 0, 0.7);
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

.start-btn {
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

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(66, 185, 131, 0.5);
}

.instructions {
  margin-top: 20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}
</style>
