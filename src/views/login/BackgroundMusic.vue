<template>
  <div class="music-player-wrapper">
    <img class="img" :src="playImg" alt="" />
    <div class="play-controls">
      <div class="music-detail">
        {{ musicName }}
      </div>
      <el-slider v-model="sliderValue" :show-tooltip="false" />
      <div class="icon-group">
        <el-icon><ArrowLeftBold /></el-icon>
        <el-icon class="specialIcon" v-if="!isPlaying" @click="play"
          ><CaretRight
        /></el-icon>
        <el-icon class="specialIcon" v-else @click="pause"
          ><VideoPause
        /></el-icon>
        <el-icon><ArrowRightBold /></el-icon>
      </div>
    </div>
    <audio
      ref="musicAudio"
      class="audio-component"
      preload="auto"
      @canplay="changeDuration"
    >
      <source ref="musicSource" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script lang="ts" setup>
import playImg from '@/assets/bgc2.webp'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
// 播放中钩子
const changeDuration = () => {
  console.log('isPlaying')
}

const sliderValue = ref(0)
const isPlaying = ref(false)
const musicName = ref('暂未播放')

const play = () => {
  isPlaying.value = true
}

const pause = () => {
  isPlaying.value = false
}
</script>

<style lang="scss" scoped>
.music-player-wrapper {
  height: 400px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fff;
  .img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 30px;
  }
  .play-controls {
    width: 250px;
    font-size: 25px;
    color: #8ec5fc;
    .icon-group {
      display: flex;
      justify-content: space-around;
      line-height: 35px;
      .specialIcon {
        font-size: 35px;
        transform: translateY(-4px);
      }
      .el-icon {
        cursor: pointer;
      }
    }
  }
}
:deep(.el-slider__button-wrapper) {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .el-slider__button {
    width: 10px;
    height: 10px;
    cursor: pointer;
  }
}
</style>
