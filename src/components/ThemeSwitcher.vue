<template>
  <div class="theme-switcher">
    <div class="theme-dropdown" ref="dropdownRef">
      <button 
        class="theme-toggle-btn" 
        @click="toggleDropdown"
        :class="{ active: isOpen }"
      >
        <span class="theme-icon">🎨</span>
        <span class="theme-label">{{ currentTheme.name }}</span>
        <span class="dropdown-arrow">{{ isOpen ? '▲' : '▼' }}</span>
      </button>
      
      <transition name="dropdown">
        <div class="theme-list" v-show="isOpen">
          <div 
            v-for="(theme, key) in themes" 
            :key="key"
            class="theme-option"
            :class="{ active: currentThemeName === key }"
            @click="selectTheme(key)"
          >
            <span class="theme-preview" :style="{ background: theme.gradients.primary }"></span>
            <span class="theme-name">{{ theme.name }}</span>
            <span class="theme-check" v-if="currentThemeName === key">✓</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { themes, getCurrentTheme, setTheme, loadTheme, applyTheme } from '../theme'

const isOpen = ref(false)
const currentThemeName = ref(loadTheme())
const currentTheme = computed(() => getCurrentTheme())
const dropdownRef = ref(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectTheme(key) {
  setTheme(key)
  currentThemeName.value = key
  isOpen.value = false
  applyTheme(key)
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // 应用初始主题
  applyTheme(currentThemeName.value)
  // 监听主题变化
  window.addEventListener('theme-changed', (e) => {
    currentThemeName.value = e.detail
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.theme-switcher {
  position: relative;
  z-index: 1000;
}

.theme-dropdown {
  position: relative;
  display: inline-block;
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.theme-toggle-btn:hover {
  background: var(--color-backgroundAlt);
  box-shadow: var(--shadow-md);
}

.theme-toggle-btn.active {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.theme-icon {
  font-size: 18px;
}

.theme-label {
  font-weight: 500;
}

.dropdown-arrow {
  font-size: 10px;
  opacity: 0.6;
  transition: transform 0.3s ease;
}

.theme-toggle-btn.active .dropdown-arrow {
  transform: rotate(180deg);
}

.theme-list {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 1001;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--color-border);
}

.theme-option:last-child {
  border-bottom: none;
}

.theme-option:hover {
  background: var(--color-backgroundAlt);
}

.theme-option.active {
  background: var(--color-backgroundAlt);
  border-left: 3px solid var(--color-primary);
}

.theme-preview {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
}

.theme-name {
  flex: 1;
  font-size: 14px;
  color: var(--color-text);
}

.theme-check {
  color: var(--color-primary);
  font-weight: bold;
}

/* 下拉动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* 响应式 */
@media (max-width: 768px) {
  .theme-list {
    right: auto;
    left: 0;
  }
}
</style>
