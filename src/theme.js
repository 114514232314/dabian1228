// 主题配置系统
export const themes = {
  modern: {
    name: '现代简约',
    colors: {
      primary: '#42b983',
      primaryHover: '#3aa876',
      secondary: '#667eea',
      background: '#ffffff',
      backgroundAlt: '#f8f9fa',
      text: '#2c3e50',
      textSecondary: '#5a6c7d',
      textMuted: '#7f8c8d',
      border: '#e8ecf1',
      shadow: 'rgba(0, 0, 0, 0.08)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #42b983 0%, #667eea 100%)',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf3 100%)',
    },
    patterns: {
      dots: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cdefs%3E%3Cpattern id=%22dots%22 width=%2220%22 height=%2220%22 patternUnits=%22userSpaceOnUse%22%3E%3Ccircle cx=%2210%22 cy=%2210%22 r=%221%22 fill=%22rgba(66,185,131,0.05)%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=%22url(%23dots)%22 width=%22100%25%22 height=%22100%25%22/%3E%3C/svg%3E")',
      waves: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cdefs%3E%3Cpattern id=%22waves%22 width=%22100%22 height=%2220%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M0 10 Q25 0 50 10 T100 10%22 stroke=%22rgba(66,185,131,0.08)%22 fill=%22none%22 stroke-width=%221%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=%22url(%23waves)%22 width=%22100%25%22 height=%22100%25%22/%3E%3C/svg%3E")',
    },
    borderRadius: {
      sm: '6px',
      md: '8px',
      lg: '12px',
      xl: '16px',
    },
    shadows: {
      sm: '0 2px 4px rgba(0, 0, 0, 0.04)',
      md: '0 2px 12px rgba(0, 0, 0, 0.08)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
  },
  vibrant: {
    name: '活力渐变',
    colors: {
      primary: '#667eea',
      primaryHover: '#5568d3',
      secondary: '#764ba2',
      background: '#ffffff',
      backgroundAlt: '#f0f4ff',
      text: '#2d3748',
      textSecondary: '#4a5568',
      textMuted: '#718096',
      border: '#e2e8f0',
      shadow: 'rgba(102, 126, 234, 0.15)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ff 100%)',
    },
    patterns: {
      dots: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cdefs%3E%3Cpattern id=%22dots%22 width=%2225%22 height=%2225%22 patternUnits=%22userSpaceOnUse%22%3E%3Ccircle cx=%2212.5%22 cy=%2212.5%22 r=%221.5%22 fill=%22rgba(102,126,234,0.06)%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=%22url(%23dots)%22 width=%22100%25%22 height=%22100%25%22/%3E%3C/svg%3E")',
      hexagons: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cdefs%3E%3Cpattern id=%22hex%22 width=%2250%22 height=%2243.3%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M25 0 L50 14.4 L50 43.3 L25 57.7 L0 43.3 L0 14.4 Z%22 stroke=%22rgba(118,75,162,0.06)%22 fill=%22none%22 stroke-width=%221%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=%22url(%23hex)%22 width=%22100%25%22 height=%22100%25%22/%3E%3C/svg%3E")',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    },
    shadows: {
      sm: '0 2px 6px rgba(0, 0, 0, 0.05)',
      md: '0 4px 16px rgba(102, 126, 234, 0.2)',
      lg: '0 12px 32px rgba(102, 126, 234, 0.3)',
    },
  },
  dark: {
    name: '暗黑模式',
    colors: {
      primary: '#64b5f6',
      primaryHover: '#42a5f5',
      secondary: '#81c784',
      background: '#1a1a2e',
      backgroundAlt: '#16213e',
      text: '#e4e6eb',
      textSecondary: '#b0b3b8',
      textMuted: '#8a8d91',
      border: '#3a3a4a',
      shadow: 'rgba(0, 0, 0, 0.3)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #64b5f6 0%, #81c784 100%)',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    },
    patterns: {
      stars: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cdefs%3E%3Cpattern id=%22stars%22 width=%22100%22 height=%22100%22 patternUnits=%22userSpaceOnUse%22%3E%3Ccircle cx=%2220%22 cy=%2220%22 r=%220.5%22 fill=%22rgba(255,255,255,0.1)%22/%3E%3Ccircle cx=%2280%22 cy=%2280%22 r=%220.8%22 fill=%22rgba(255,255,255,0.08)%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%220.6%22 fill=%22rgba(255,255,255,0.06)%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=%22url(%23stars)%22 width=%22100%25%22 height=%22100%25%22/%3E%3C/svg%3E")',
      grid: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cdefs%3E%3Cpattern id=%22grid%22 width=%2240%22 height=%2240%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M40 0 L0 0 0 40%22 stroke=%22rgba(100,181,246,0.05)%22 fill=%22none%22 stroke-width=%221%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=%22url(%23grid)%22 width=%22100%25%22 height=%22100%25%22/%3E%3C/svg%3E")',
    },
    borderRadius: {
      sm: '6px',
      md: '8px',
      lg: '12px',
      xl: '16px',
    },
    shadows: {
      sm: '0 2px 4px rgba(0, 0, 0, 0.2)',
      md: '0 4px 12px rgba(0, 0, 0, 0.3)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.4)',
    },
  },
  warm: {
    name: '温暖时光',
    colors: {
      primary: '#f59e0b',
      primaryHover: '#d97706',
      secondary: '#ef4444',
      background: '#fffbeb',
      backgroundAlt: '#fef3c7',
      text: '#1f2937',
      textSecondary: '#4b5563',
      textMuted: '#6b7280',
      border: '#fde68a',
      shadow: 'rgba(245, 158, 11, 0.1)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    },
    patterns: {
      circles: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cdefs%3E%3Cpattern id=%22circles%22 width=%2260%22 height=%2260%22 patternUnits=%22userSpaceOnUse%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22 fill=%22rgba(245,158,11,0.06)%22/%3E%3Ccircle cx=%2210%22 cy=%2210%22 r=%221%22 fill=%22rgba(239,68,68,0.04)%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%221.5%22 fill=%22rgba(245,158,11,0.05)%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=%22url(%23circles)%22 width=%22100%25%22 height=%22100%25%22/%3E%3C/svg%3E")',
      zigzag: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cdefs%3E%3Cpattern id=%22zigzag%22 width=%2240%22 height=%2220%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M0 10 L10 0 L20 10 L30 0 L40 10%22 stroke=%22rgba(245,158,11,0.08)%22 fill=%22none%22 stroke-width=%221%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=%22url(%23zigzag)%22 width=%22100%25%22 height=%22100%25%22/%3E%3C/svg%3E")',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    },
    shadows: {
      sm: '0 2px 4px rgba(245, 158, 11, 0.05)',
      md: '0 4px 12px rgba(245, 158, 11, 0.1)',
      lg: '0 8px 24px rgba(245, 158, 11, 0.15)',
    },
  },
}

// 当前主题
export let currentTheme = 'modern'

// 获取当前主题
export function getCurrentTheme() {
  return themes[currentTheme]
}

// 切换主题
export function setTheme(themeName) {
  if (themes[themeName]) {
    currentTheme = themeName
    // 保存到本地存储
    localStorage.setItem('theme', themeName)
    // 触发自定义事件
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: themeName }))
  }
}

// 从本地存储加载主题
export function loadTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme && themes[savedTheme]) {
    currentTheme = savedTheme
  }
  return currentTheme
}

// 应用主题到根元素
export function applyTheme(themeName = currentTheme) {
  const theme = themes[themeName]
  if (!theme) return

  const root = document.documentElement
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value)
  })
  Object.entries(theme.gradients).forEach(([key, value]) => {
    root.style.setProperty(`--gradient-${key}`, value)
  })
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value)
  })
  Object.entries(theme.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value)
  })
}
