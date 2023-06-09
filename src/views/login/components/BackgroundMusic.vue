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
        <el-icon @click="changeBGM(false)"><ArrowLeftBold /></el-icon>
        <el-icon class="specialIcon" v-if="!isPlaying" @click="play"
          ><CaretRight
        /></el-icon>
        <el-icon class="specialIcon" v-else @click="pause"
          ><VideoPause
        /></el-icon>
        <el-icon @click="changeBGM(true)"><ArrowRightBold /></el-icon>
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
import playImg from '@/assets/img/musicImg.jpg'
import { musicList, singleMusic } from '../opts/musicList'
import { ref } from 'vue'

const currentTime = ref('00:00')
const sliderValue = ref(0)
const musicAudio = ref()
const sliderDisabled = ref(true)
const index = ref(0)
const bgmNow = ref<singleMusic>(musicList[index.value])
const isPlaying = ref(false)
const isHold = ref(false)

const emit = defineEmits(['playingStatusChange'])

// 向主页专递是否正在播放BGM标识
const changePlayingStatus = (isPlaying: boolean) => {
  emit('playingStatusChange', isPlaying)
}

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
  console.log('BGM开始播放...')
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
    musicAudio.value.currentTime &&
      (currentTime.value = timeFormat(musicAudio.value.currentTime))
    musicAudio.value.currentTime &&
      (sliderValue.value = Math.floor(musicAudio.value.currentTime))
    if (sliderValue.value === bgmNow.value.sliderLength) {
      sliderValue.value = 0
      changeBGM(true)
    }
  }
}

// 播放按钮
const play = () => {
  sliderDisabled.value = false
  musicAudio.value.play()
  isPlaying.value = true
  changePlayingStatus(isPlaying.value)
}

// 暂停按钮
const pause = () => {
  musicAudio.value.pause()
  isPlaying.value = false
  changePlayingStatus(isPlaying.value)
}

// 上一首/下一首按钮
const changeBGM = async (type: boolean) => {
  isPlaying.value = true
  index.value =
    (index.value + (type ? 1 : musicList.length - 1)) % musicList.length
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
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(0.1rem);
  padding-left: 0.2rem;
  .img {
    width: 0.7rem;
    height: 0.7rem;
    left: 0.2rem;
    opacity: 0.7;
    margin-top: 0.3rem;
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
    width: 2.5rem;
    font-size: 0.25rem;
    color: rgba(255, 255, 255, 0.664);
    .music-detail {
      position: relative;
      display: inline-block;
      width: 2.5rem;
      height: 0.3rem;
      line-height: 0.3rem;
      overflow: hidden;
      span {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        min-width: 1.5rem;
        animation: bgmTitleScroll 6s linear infinite;
      }
    }
    .icon-group {
      display: flex;
      justify-content: space-around;
      line-height: 0.35rem;
      color: #58575798;
      .specialIcon {
        font-size: 0.35rem;
        transform: translateY(-0.04rem);
      }
      .el-icon {
        cursor: pointer;
      }
    }
    .time-process {
      font-size: 0.14rem;
    }
  }
}
:deep(.el-slider__bar) {
  background-image: linear-gradient(120deg, #ffffff 0%, #6a6969 100%);
  border-radius: 0.03rem;
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
