<template>
  <div class="game2048">
    <div class="game-header">
      <div class="score-board">
        <div class="score-box">
          <div class="score-label">分数</div>
          <div class="score-value">{{ score }}</div>
        </div>
        <div class="score-box">
          <div class="score-label">最高分</div>
          <div class="score-value">{{ bestScore }}</div>
        </div>
      </div>
      <button @click="newGame" class="new-game-btn">新游戏</button>
    </div>

    <div class="game-container" ref="gameContainer" @keydown="handleKeydown" tabindex="0">
      <div class="grid">
        <div 
          v-for="(cell, index) in grid" 
          :key="index"
          class="cell"
          :class="{ 'merged': cell.merged }"
        >
          <div 
            class="tile" 
            v-if="cell.value > 0"
            :class="`tile-${cell.value}`"
          >
            {{ cell.value }}
          </div>
        </div>
      </div>

      <div class="game-over-overlay" v-if="gameOver">
        <div class="game-over-content">
          <h2 class="game-over-title">
            {{ hasWon ? '恭喜胜利！' : '游戏结束' }}
          </h2>
          <p class="game-over-score">得分: {{ score }}</p>
          <button @click="newGame" class="restart-btn">再来一次</button>
        </div>
      </div>
    </div>

    <p class="instructions">使用方向键或 WASD 移动方块</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const gameContainer = ref(null)
const grid = ref([])
const score = ref(0)
const bestScore = ref(parseInt(localStorage.getItem('2048BestScore') || '0'))
const gameOver = ref(false)
const hasWon = ref(false)
const gridSize = 4

function initGrid() {
  grid.value = Array(gridSize * gridSize).fill({ value: 0, merged: false })
  addNewTile()
  addNewTile()
  score.value = 0
  gameOver.value = false
  hasWon.value = false
}

function addNewTile() {
  const emptyCells = grid.value
    .map((cell, index) => ({ cell, index }))
    .filter(item => item.cell.value === 0)
  
  if (emptyCells.length === 0) return

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  grid.value[randomCell.index] = {
    value: Math.random() < 0.9 ? 2 : 4,
    merged: false
  }
}

function getRow(index) {
  return grid.value.slice(index * gridSize, (index + 1) * gridSize)
}

function getColumn(index) {
  const column = []
  for (let i = 0; i < gridSize; i++) {
    column.push(grid.value[index + i * gridSize])
  }
  return column
}

function moveLeft() {
  let moved = false
  for (let i = 0; i < gridSize; i++) {
    const row = getRow(i).map(cell => ({ ...cell }))
    const newRow = mergeRow(row)
    
    for (let j = 0; j < gridSize; j++) {
      if (row[j].value !== newRow[j].value) {
        moved = true
      }
      grid.value[i * gridSize + j] = newRow[j]
    }
  }
  return moved
}

function moveRight() {
  let moved = false
  for (let i = 0; i < gridSize; i++) {
    const row = getRow(i).map(cell => ({ ...cell })).reverse()
    const newRow = mergeRow(row).reverse()
    
    for (let j = 0; j < gridSize; j++) {
      if (row[j].value !== newRow[j].value) {
        moved = true
      }
      grid.value[i * gridSize + j] = newRow[j]
    }
  }
  return moved
}

function moveUp() {
  let moved = false
  for (let i = 0; i < gridSize; i++) {
    const col = getColumn(i).map(cell => ({ ...cell }))
    const newCol = mergeRow(col)
    
    for (let j = 0; j < gridSize; j++) {
      if (col[j].value !== newCol[j].value) {
        moved = true
      }
      grid.value[i + j * gridSize] = newCol[j]
    }
  }
  return moved
}

function moveDown() {
  let moved = false
  for (let i = 0; i < gridSize; i++) {
    const col = getColumn(i).map(cell => ({ ...cell })).reverse()
    const newCol = mergeRow(col).reverse()
    
    for (let j = 0; j < gridSize; j++) {
      if (col[j].value !== newCol[j].value) {
        moved = true
      }
      grid.value[i + j * gridSize] = newCol[j]
    }
  }
  return moved
}

function mergeRow(row) {
  // 移除零
  let filtered = row.filter(cell => cell.value > 0)
  
  // 合并相同值
  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i].value === filtered[i + 1].value) {
      filtered[i].value *= 2
      filtered[i].merged = true
      score.value += filtered[i].value
      
      if (filtered[i].value === 2048 && !hasWon.value) {
        hasWon.value = true
      }
      
      filtered.splice(i + 1, 1)
    }
  }
  
  // 填充零
  while (filtered.length < gridSize) {
    filtered.push({ value: 0, merged: false })
  }
  
  return filtered
}

function checkGameOver() {
  // 检查是否有空位
  if (grid.value.some(cell => cell.value === 0)) {
    return false
  }
  
  // 检查是否可以合并
  for (let i = 0; i < gridSize; i++) {
    const row = getRow(i)
    const col = getColumn(i)
    
    for (let j = 0; j < gridSize - 1; j++) {
      if (row[j].value === row[j + 1].value || col[j].value === col[j + 1].value) {
        return false
      }
    }
  }
  
  return true
}

function move(direction) {
  if (gameOver.value) return

  let moved = false
  
  switch (direction) {
    case 'left':
      moved = moveLeft()
      break
    case 'right':
      moved = moveRight()
      break
    case 'up':
      moved = moveUp()
      break
    case 'down':
      moved = moveDown()
      break
  }

  if (moved) {
    // 清除合并状态
    grid.value = grid.value.map(cell => ({ ...cell, merged: false }))
    addNewTile()
    
    if (checkGameOver()) {
      gameOver.value = true
      if (score.value > bestScore.value) {
        bestScore.value = score.value
        localStorage.setItem('2048BestScore', bestScore.value.toString())
      }
    }
  }
}

function handleKeydown(e) {
  const keyMap = {
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'ArrowUp': 'up',
    'ArrowDown': 'down',
    'KeyW': 'up',
    'KeyA': 'left',
    'KeyS': 'down',
    'KeyD': 'right'
  }

  const direction = keyMap[e.code]
  if (direction) {
    e.preventDefault()
    move(direction)
  }
}

function newGame() {
  initGrid()
  gameContainer.value?.focus()
}

onMounted(() => {
  initGrid()
  setTimeout(() => {
    gameContainer.value?.focus()
  }, 100)
})
</script>

<style scoped>
.game2048 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.game-header {
  display: flex;
  align-items: center;
  gap: 32px;
  width: 100%;
  max-width: 400px;
  justify-content: space-between;
}

.score-board {
  display: flex;
  gap: 12px;
}

.score-box {
  background: var(--color-background-alt);
  border-radius: var(--radius-md);
  padding: 12px 20px;
  text-align: center;
  border: 1px solid var(--color-border);
}

.score-label {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 4px;
}

.score-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
}

.new-game-btn {
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

.new-game-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.game-container {
  position: relative;
  width: 400px;
  height: 400px;
  background: var(--color-background-alt);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
  height: 100%;
}

.cell {
  background: var(--color-background);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 32px;
  color: var(--color-text);
  transition: all 0.15s ease;
}

.tile {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: appear 0.2s ease;
}

@keyframes appear {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.tile-2 { background: #eee4da; }
.tile-4 { background: #ede0c8; }
.tile-8 { background: #f2b179; }
.tile-16 { background: #f59563; }
.tile-32 { background: #f67c5f; }
.tile-64 { background: #f65e3b; }
.tile-128 { background: #edcf72; color: #f9f6f2; }
.tile-256 { background: #edcc61; color: #f9f6f2; }
.tile-512 { background: #edc850; color: #f9f6f2; }
.tile-1024 { background: #edc53f; color: #f9f6f2; font-size: 28px; }
.tile-2048 { background: #edc22e; color: #f9f6f2; font-size: 28px; }
.tile-super { background: #3c3a32; color: #f9f6f2; font-size: 24px; }

.tile.merged {
  animation: merge 0.2s ease;
}

@keyframes merge {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.game-over-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(238, 228, 218, 0.9);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
}

.game-over-content {
  text-align: center;
}

.game-over-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 16px;
}

.game-over-score {
  font-size: 20px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

.restart-btn {
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 12px 32px;
  font-size: 18px;
  font-weight: 600;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.restart-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.instructions {
  font-size: 14px;
  color: var(--color-text-muted);
}
</style>
