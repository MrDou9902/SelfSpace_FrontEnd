<template>
  <div class="music-player-wrapper">
    <div :class="isPlaying ? 'img' : 'img rotate'">
      <img :src="playImg" alt="" />
    </div>
    <div class="play-controls">
      <div class="music-detail">
        <span> {{ ' ' + bgmNow.musicName + ' ' }}</span>
      </div>
      <span class="time-process">{{ currentTime }} / {{ bgmNow.allTime }}</span>
      <el-slider
        v-model="sliderValue"
        :show-tooltip="false"
        :max="bgmNow.sliderLength"
        :disabled="sliderDisabled"
        @change="sliderChange"
        @input="sliderMousedownChange"
      />
      <div class="icon-group">
        <el-icon @click="preOne"><ArrowLeftBold /></el-icon>
        <el-icon class="specialIcon" v-if="!isPlaying" @click="play"
          ><CaretRight
        /></el-icon>
        <el-icon class="specialIcon" v-else @click="pause"
          ><VideoPause
        /></el-icon>
        <el-icon @click="nextOne"><ArrowRightBold /></el-icon>
      </div>
    </div>
    <audio
      ref="musicAudio"
      class="audio-component"
      preload="auto"
      :src="bgmNow.src"
      @durationchange="durationchange"
      @timeupdate="timeupdate"
    />
  </div>
</template>

<script lang="ts" setup>
import playImg from '@/assets/musicImg.jpg'
import { musicList, singleMusic } from './musicList'
import { ref } from 'vue'

const currentTime = ref('00:00')
const sliderValue = ref(0)
const musicAudio = ref()
const sliderDisabled = ref(true)
const index = ref(0)
const bgmNow = ref<singleMusic>(musicList[index.value])
const isPlaying = ref(false)
const isHold = ref(false)

// 时间格式转换
const timeFormat = (timeNumber: number): string => {
  const currTime = Math.floor(timeNumber)
  const minute = Math.floor(currTime / 60)
  const seconds = currTime % 60
  return (
    (minute.toString().length === 1 ? '0' + minute : minute) +
    ':' +
    (seconds.toString().length === 1 ? '0' + seconds : seconds)
  )
}

// 播放中钩子
const durationchange = () => {
  console.log('BGM播放中...')
}

// 滑块鼠标按下时钩子
const sliderMousedownChange = (val: number) => {
  isHold.value = true
  currentTime.value = timeFormat(val)
}

// 滑块鼠标松开时钩子
const sliderChange = (val: number) => {
  isHold.value = false
  musicAudio.value.currentTime = val
}

// 播放中钩子，每0.25s触发一次
const timeupdate = () => {
  if (!isHold.value) {
    currentTime.value = timeFormat(musicAudio.value.currentTime)
    sliderValue.value = Math.floor(musicAudio.value.currentTime)
    if (sliderValue.value === bgmNow.value.sliderLength) {
      sliderValue.value = 0
      nextOne()
    }
  }
}

// 播放按钮
const play = () => {
  sliderDisabled.value = false
  musicAudio.value.play()
  isPlaying.value = true
}

// 暂停按钮
const pause = () => {
  musicAudio.value.pause()
  isPlaying.value = false
}

// 上一首按钮
const preOne = async () => {
  isPlaying.value = true
  index.value = (index.value - 1 + musicList.length) % musicList.length
  await (bgmNow.value = musicList[index.value])
  musicAudio.value.play()
}

// 下一首按钮
const nextOne = async () => {
  isPlaying.value = true
  index.value = (index.value + 1) % musicList.length
  await (bgmNow.value = musicList[index.value])
  musicAudio.value.play()
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes bgmTitleScroll {
  from {
    left: 100%;
  }
  to {
    transform: translateX(-100%);
    left: 0;
  }
}
.music-player-wrapper {
  height: 400px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  // background-color: #fff;
  background-color: rgba(255, 255, 255, 0.729);
  backdrop-filter: blur(10px);
  padding-left: 20px;
  .img {
    width: 70px;
    height: 70px;
    left: 20px;
    opacity: 0.8;
    margin-top: 60px;
    animation: rotate 15s linear infinite;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .rotate {
    animation-play-state: paused !important;
  }
  .play-controls {
    width: 250px;
    font-size: 25px;
    color: #8ec5fc;
    .music-detail {
      position: relative;
      display: inline-block;
      width: 250px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      span {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        min-width: 150px;
        animation: bgmTitleScroll 6s linear infinite;
      }
    }
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
    .time-process {
      font-size: 14px;
    }
  }
}
:deep(.el-slider__bar) {
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  border-radius: 3px;
}
:deep(.el-slider__button-wrapper) {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .el-slider__button {
    visibility: hidden;
  }
}
</style>
