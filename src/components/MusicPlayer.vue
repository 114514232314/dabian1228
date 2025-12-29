<template>
  <div class="music-player">
    <!-- 可折叠的头部 -->
    <div class="player-header" @click="toggleCollapse">
      <h3 class="player-title">
        <span class="music-icon">🎵</span> 我制作视频时所喜欢添加的背景音乐
        <span class="collapse-icon">{{ isCollapsed ? '▶' : '▼' }}</span>
      </h3>
      <div class="mini-info" v-if="isCollapsed">
        <button @click.stop="togglePlay" class="mini-play-btn" :disabled="musicList.length === 0">
          {{ isPlaying ? '⏸' : '▶️' }}
        </button>
        <span class="mini-song-name">{{ currentSong?.name || '暂无歌曲' }}</span>
      </div>
      <div class="playback-controls" v-else @click.stop>
        <button @click="prevTrack" class="control-btn" :disabled="musicList.length === 0">
          ⏮
        </button>
        <button @click="togglePlay" class="play-btn" :disabled="musicList.length === 0">
          {{ isPlaying ? '⏸' : '▶️' }}
        </button>
        <button @click="nextTrack" class="control-btn" :disabled="musicList.length === 0">
          ⏭
        </button>
        <button @click="toggleLoop" class="loop-btn" :class="{ active: isLooping }">
          {{ isLooping ? '🔁' : '🔂' }}
        </button>
      </div>
    </div>

    <!-- 展开的内容 -->
    <transition name="collapse">
      <div class="player-content" v-show="!isCollapsed">
        <div class="current-song">
          <p class="song-name">{{ currentSong?.name || '暂无歌曲' }}</p>
          <p class="song-artist">{{ currentSong?.artist || '--' }}</p>
        </div>

        <div class="progress-container">
          <div class="time-display">
            <span class="current-time">{{ formatTime(currentTime) }}</span>
            <span class="total-time">{{ formatTime(duration) }}</span>
          </div>
          <div class="progress-bar" @click="seekTo">
            <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>

        <div class="playlist">
          <h4 class="playlist-title">播放列表</h4>
          <div class="playlist-content">
            <div 
              v-for="(song, index) in musicList" 
              :key="index"
              class="playlist-item"
              :class="{ 
                active: currentSongIndex === index,
                playing: currentSongIndex === index && isPlaying 
              }"
              @click="playSong(index)"
            >
              <span class="song-index">{{ index + 1 }}</span>
              <div class="song-info">
                <span class="song-title-text">{{ song.name }}</span>
                <span class="song-artist-text">{{ song.artist }}</span>
              </div>
              <span class="playing-indicator" v-if="currentSongIndex === index && isPlaying">
                🎵
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <audio 
      ref="audioRef" 
      @timeupdate="updateTime"
      @loadedmetadata="updateDuration"
      @ended="handleEnded"
      @error="handleError"
    ></audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const audioRef = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const currentSongIndex = ref(0)
const isLooping = ref(false)
const isCollapsed = ref(false)

const musicList = [
  { name: '告白の夜 (live version)', artist: 'Ayasa', url: new URL('../music/Ayasa - 告白の夜 (live version).mp3', import.meta.url).href },
  { name: 'Luv Letter', artist: 'TSUKINOSORA', url: new URL('../music/TSUKINOSORA - Luv Letter.mp3', import.meta.url).href },
  { name: 'fish in the pool・花屋敷', artist: 'ヘクとパスカル', url: new URL('../music/ヘクとパスカル - fish in the pool・花屋敷.mp3', import.meta.url).href },
  { name: 'ありがとう…', artist: 'KOKIA', url: new URL('../music/KOKIA - ありがとう… (the Coquillage edtion).mp3', import.meta.url).href },
  { name: 'Komorebi', artist: '田熊理秀', url: new URL('../music/田熊理秀 - Komorebi.mp3', import.meta.url).href },
  { name: 'grassharvest', artist: 'Foxtail-Grass Studio', url: new URL('../music/Foxtail-Grass Studio - grassharvest.mp3', import.meta.url).href },
  { name: '葬花', artist: 'THT', url: new URL('../music/THT - 葬花.mp3', import.meta.url).href },
  { name: '羽根', artist: '折戸伸治', url: new URL('../music/折戸伸治 - 羽根.mp3', import.meta.url).href },
  { name: 'Bloom of Youth', artist: '清水淳一', url: new URL('../music/清水淳一,Key Sounds Label - Bloom of Youth.mp3', import.meta.url).href },
  { name: '星茶会', artist: '灰澈', url: new URL('../music/灰澈 - 星茶会.mp3', import.meta.url).href },
  { name: 'Are You Lost', artist: 'Park Bird', url: new URL('../music/Park Bird - Are You Lost.mp3', import.meta.url).href },
  { name: '沢の河城工務店', artist: 'Foxtail-Grass Studio', url: new URL('../music/Foxtail-Grass Studio - 沢の河城工務店.mp3', import.meta.url).href },
  { name: 'Old Threads', artist: 'Deep East Music', url: new URL('../music/Deep East Music - Old Threads.mp3', import.meta.url).href },
  { name: 'Born a Stranger', artist: 'Kan R. Gao', url: new URL('../music/Kan R. Gao - Born a Stranger.mp3', import.meta.url).href },
  { name: '忙碌的生活「人山人海」', artist: '时空储蓄罐', url: new URL('../music/时空储蓄罐 - 忙碌的生活「人山人海」.mp3', import.meta.url).href },
  { name: 'Spongebob Remix Krusty Krab', artist: 'Eugene The Dream', url: new URL('../music/Eugene The Dream,Vine - Spongebob Remix Krusty Krab.mp3', import.meta.url).href }
]

const currentSong = computed(() => musicList[currentSongIndex.value])

const progressPercentage = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const togglePlay = () => {
  if (musicList.length === 0) return
  
  const audio = audioRef.value
  if (audio.src !== currentSong.value.url) {
    audio.src = currentSong.value.url
  }
  
  if (isPlaying.value) {
    audio.pause()
  } else {
    audio.play()
  }
  isPlaying.value = !isPlaying.value
}

const prevTrack = () => {
  if (musicList.length === 0) return
  currentSongIndex.value = (currentSongIndex.value - 1 + musicList.length) % musicList.length
  loadAndPlay()
}

const nextTrack = () => {
  if (musicList.length === 0) return
  currentSongIndex.value = (currentSongIndex.value + 1) % musicList.length
  loadAndPlay()
}

const playSong = (index) => {
  currentSongIndex.value = index
  loadAndPlay()
}

const loadAndPlay = () => {
  const audio = audioRef.value
  audio.src = currentSong.value.url
  currentTime.value = 0
  audio.play()
  isPlaying.value = true
}

const seekTo = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  const newTime = percent * duration.value
  audioRef.value.currentTime = newTime
  currentTime.value = newTime
}

const updateTime = () => {
  currentTime.value = audioRef.value.currentTime
}

const updateDuration = () => {
  duration.value = audioRef.value.duration
}

const handleEnded = () => {
  if (isLooping.value) {
    audioRef.value.currentTime = 0
    audioRef.value.play()
  } else {
    nextTrack()
  }
}

const toggleLoop = () => {
  isLooping.value = !isLooping.value
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleError = () => {
  console.error('音频加载错误')
  isPlaying.value = false
}

onMounted(() => {
  if (musicList.length > 0) {
    audioRef.value.src = currentSong.value.url
  }
})
</script>

<style scoped>
.music-player {
  background: var(--color-background);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  color: var(--color-text);
  box-shadow: var(--shadow-md);
  margin-bottom: 30px;
  border: 1px solid var(--color-border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.music-player:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 0;
  transition: all 0.3s ease;
}

.player-header:hover {
  background: var(--color-background-alt);
  border-radius: var(--radius-md);
  padding-left: 12px;
  padding-right: 12px;
}

.player-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  color: var(--color-text);
}

.collapse-icon {
  font-size: 12px;
  opacity: 0.5;
  transition: transform 0.3s ease;
  margin-left: 6px;
  color: var(--color-text-muted);
}

.music-icon {
  font-size: 20px;
}

.mini-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: flex-end;
}

.mini-play-btn {
  background: var(--color-primary);
  border: none;
  border-radius: var(--radius-md);
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.3);
}

.mini-play-btn:hover:not(:disabled) {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.4);
}

.mini-play-btn:active:not(:disabled) {
  transform: translateY(0);
}

.mini-song-name {
  font-size: 14px;
  color: var(--color-text-secondary);
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.playback-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.control-btn,
.play-btn,
.loop-btn {
  background: var(--color-background-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.control-btn:hover:not(:disabled),
.play-btn:hover:not(:disabled),
.loop-btn:hover:not(:disabled) {
  background: var(--color-background);
  color: var(--color-primary);
  transform: translateY(-1px);
  border-color: var(--color-primary);
}

.control-btn:active:not(:disabled),
.play-btn:active:not(:disabled),
.loop-btn:active:not(:disabled) {
  transform: translateY(0);
}

.control-btn:disabled,
.play-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.play-btn {
  width: 44px;
  height: 44px;
  font-size: 18px;
  background: var(--gradient-primary);
  color: white;
  border: none;
}

.play-btn:hover:not(:disabled) {
  box-shadow: var(--shadow-md);
  filter: brightness(1.05);
}

.loop-btn.active {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
}

.player-content {
  padding-top: 20px;
}

.current-song {
  text-align: center;
  margin-bottom: 20px;
}

.song-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-text);
}

.song-artist {
  font-size: 14px;
  color: var(--color-text-muted);
  margin: 0;
}

.progress-container {
  margin-bottom: 20px;
}

.time-display {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.progress-bar {
  height: 4px;
  background: var(--color-background-alt);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: height 0.2s ease;
}

.progress-bar:hover {
  height: 6px;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 2px;
  transition: width 0.1s linear;
  position: relative;
}

.playlist {
  background: var(--color-background-alt);
  border-radius: var(--radius-md);
  padding: 16px;
  border: 1px solid var(--color-border);
}

.playlist-title {
  margin: 0 0 12px 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.playlist-content {
  max-height: 240px;
  overflow-y: auto;
}

.playlist-content::-webkit-scrollbar {
  width: 6px;
}

.playlist-content::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

.playlist-content::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}

.playlist-content::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-muted);
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.playlist-item:hover {
  background: var(--color-background);
  border-color: var(--color-border);
  box-shadow: var(--shadow-sm);
}

.playlist-item.active {
  background: var(--color-background-alt);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.playlist-item.playing {
  animation: pulse-light 2s ease-in-out infinite;
}

@keyframes pulse-light {
  0%, 100% {
    background: var(--color-background-alt);
  }
  50% {
    background: var(--color-primary);
  }
}

.song-index {
  font-size: 12px;
  color: var(--color-text-muted);
  width: 24px;
  text-align: center;
}

.song-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.song-title-text {
  font-size: 14px;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist-text {
  font-size: 12px;
  color: var(--color-text-muted);
}

.playlist-item.active .song-title-text {
  color: var(--color-primary);
  font-weight: 500;
}

.playing-indicator {
  font-size: 14px;
  animation: bounce 0.6s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-8px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .music-player {
    padding: 16px 20px;
  }

  .player-title {
    font-size: 14px;
  }

  .mini-song-name {
    max-width: 150px;
    font-size: 12px;
  }

  .control-btn,
  .loop-btn {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }

  .play-btn {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}
</style>
