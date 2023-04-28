<template>
  <!--音乐播放器-->
  <div
    class="music-container"
    :class="{ 'music-active-switch': offsetThreshold }"
  >
    <div class="music-disk">
      <!--唱片图片-->
      <img
        class="music-disk-picture"
        :class="{ 'music-disk-playing-style': playState }"
        src="./R-C.png"
        alt=""
      />
    </div>

    <!--进度条-->
    <div class="music-slider">
      <el-slider
        v-model="playTime"
        :format-tooltip="tooltipFormat"
        size="small"
        :max="sliderLength"
        @change="changePlayTime"
      />
    </div>

    <!--按钮组-->
    <div class="button-group">
      <!--上一曲 按钮-->
      <button class="play-button" @click="lastButtonClick">
        <icon-go-start
          theme="outline"
          size="23"
          fill="#939393"
          :strokeWidth="3"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        />
      </button>
      <!--播放 按钮-->
      <button class="play-button" @click="playButtonClick">
        <icon-play-one
          v-if="!playState"
          theme="outline"
          size="23"
          fill="#939393"
          :strokeWidth="3"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        />
        <icon-pause
          v-if="playState"
          theme="outline"
          size="23"
          fill="#939393"
          :strokeWidth="3"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        />
      </button>
      <!--下一曲 按钮-->
      <button class="play-button" @click="nextButtonClick">
        <icon-go-end
          theme="outline"
          size="23"
          fill="#939393"
          :strokeWidth="3"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        />
      </button>
      <!--音量按钮-->
      <div class="voice-container">
        <button class="voice-button" @click="voiceButtonClick">
          <icon-volume-notice
            v-if="!voiceMute"
            theme="outline"
            size="23"
            fill="#939393"
            :strokeWidth="3"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />
          <icon-volume-mute
            v-if="voiceMute"
            theme="outline"
            size="23"
            fill="#939393"
            :strokeWidth="3"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />
        </button>
        <div class="voice-slider">
          <el-slider
            v-model="voicePower"
            :max="1"
            :step="0.1"
            size="small"
            @change="changeVoicePower"
          />
        </div>
      </div>
    </div>

    <audio
      ref="musicAudio"
      class="audio-component"
      controls
      preload="auto"
      @canplay="changeDuration"
    >
      <source ref="musicSource" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { musicArrTypes } from '@/types/index'

//是否正在播放
const playState = ref(false)

//现在的播放时间
const playTime = ref(0.0)

//歌曲的时间长度
const playDuration = ref(0.0)

//进度条长度
const sliderLength = ref(100)

//歌曲URL
const musicUrl = ref('')

//播放器标签
const musicAudio = ref()

//实现音乐播放的标签
const musicSource = ref()

//是否静音
const voiceMute = ref(false)

//音量大小
const voicePower = ref(0.5)

const musicState = reactive<musicArrTypes>({
  musicArr: [],
  musicCount: 0
})

const musicCursor = ref(0)

//页面偏移量
const pageOffset = ref(0)

//是否达到阈值，达到阈值就显示播放器，反之
const offsetThreshold = ref(false)

//激活播放器
const operateMusicPlayer = () => {
  pageOffset.value = window.scrollY
  //当页面滚动偏移达到800，激活用户框
  if (pageOffset.value > 800) {
    offsetThreshold.value = true
  } else {
    //反之
    offsetThreshold.value = false
  }
}

//播放按钮点击回调
const playButtonClick = () => {
  if (playState.value) {
    musicAudio.value.pause()
  } else {
    musicAudio.value.play()
  }

  //修改播放时间【设置这个，当一首歌正常播放结束之后，再次点击播放按钮，进度条会得到重置】
  playTime.value = musicAudio.value.currentTime

  //重新设置播放状态
  playState.value = !playState.value
}

//上一曲按钮点击回调
const lastButtonClick = () => {
  musicCursor.value -= 1

  changeMusic()
}

//下一曲按钮点击回调
const nextButtonClick = () => {
  musicCursor.value += 1

  changeMusic()
}

//歌曲进度条文本提示
const tooltipFormat = () => {
  let strTime = playTime.value

  let strMinute = parseInt(strTime / 60 + '')

  let strSecond = parseInt((strTime % 60) + '')

  return strMinute + ':' + strSecond
}

//当歌曲能播放时【亦即在canplay钩子函数中】，musicAudio.value.duration才不会是NaN，才能进行歌曲长度的设置
const changeDuration = () => {
  if (playDuration.value != musicAudio.value.duration) {
    //修改进度条的最大值
    sliderLength.value = musicAudio.value.duration

    //修改歌曲播放时间
    playDuration.value = musicAudio.value.duration
  }
}

//el-slider的钩子函数，拖动进度条时快进歌曲，改变当前播放进度
const changePlayTime = (val: any) => {
  musicAudio.value.currentTime = val
}

//音量按钮点击回调
const voiceButtonClick = () => {
  voiceMute.value = !voiceMute.value

  if (!voiceMute.value) {
    voicePower.value = 1

    musicAudio.value.volume = 1
  } else {
    voicePower.value = 0

    musicAudio.value.volume = 0
  }
}

//el-slider的钩子函数，用于调节音量
const changeVoicePower = (val = 0) => {
  musicAudio.value.volume = val

  voicePower.value = val

  if (val > 0) {
    voiceMute.value = false
  } else {
    voiceMute.value = true
  }
}

//播放状态下，进度条里的数值每秒递增。而Audio因为在播放状态下，currentTime会自己递增，所以不用处理
const updatePlayTimePerSecond = () => {
  if (playState.value) {
    playTime.value += 1

    if (playTime.value >= playDuration.value) {
      //代表当前歌曲已经播放完毕，进行切歌
      musicCursor.value++

      changeMusic()
    }
  }
}

//切歌
const changeMusic = () => {
  //切歌【这里的music_url是后端返回给前端的json字符串中，用于存储歌曲在线链接的属性名是：music_url，所以要实现自己的请求逻辑，将这里的music_url改为自己的即可】
  musicSource.value.src =
    musicState.musicArr[musicCursor.value % musicState.musicCount].url

  // 当刷新了url之后，需要执行load方法才能播放这个音乐
  musicAudio.value.load()

  playTime.value = musicAudio.value.currentTime

  sliderLength.value = musicAudio.value.duration

  musicAudio.value.play()

  playState.value = true
}

//初始化歌曲源【将这里替换成自己的请求逻辑】
const initMusicArr = () => {
  // requests.get('/Music/QueryAllMusic').then(function (res: any) {
  musicState.musicArr = []

  musicState.musicCount = 0
  // })
}

onMounted(() => {
  initMusicArr()

  //播放状态下，使播放进度自增1，以与Audio内置的currentTime相匹配
  setInterval(updatePlayTimePerSecond, 1000)

  //添加滚动事件
  window.addEventListener('scroll', operateMusicPlayer)
})

onUnmounted(() => {
  window.removeEventListener('scroll', operateMusicPlayer)
})
</script>

<style scoped>
.music-container {
  position: fixed;
  justify-content: center;
  width: 280px;
  height: 110px;
  background-color: white;
  border-radius: 15px;
  bottom: 15px;
  left: 10px;
  opacity: 0;
  transition: 0.5s;
}

.music-disk {
  position: absolute;
  width: 90px;
  height: 90px;
  left: 15px;
  top: 10px;
  border-radius: 50%;
}

.music-disk-picture {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  /*设置图片不可点击*/
  pointer-events: none;
}

.music-disk-playing-style {
  animation: music-disk-rotate 5s linear infinite;
}

@keyframes music-disk-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.button-group {
  position: absolute;
  width: 330px;
  height: 38px;
  left: 90px;
  bottom: 13px;
  margin-left: 10px;
}

.button-group > button {
  margin-left: 10px;
}

.play-button {
  float: left;
  width: 31px;
  height: 31px;
  padding: 4px;
  /*margin: 0px;*/
  border: 0px;
  border-radius: 50%;
  margin: 7px 0px 0px 0px;
}

.voice-button {
  float: left;
  width: 31px;
  height: 31px;
  padding: 0px;
  /*margin: 0px;*/
  border: 0px;
  border-radius: 50%;
  margin: 7px 0px 0px 0px;
  background-color: transparent;
}

.music-slider {
  position: absolute;
  top: 20px;
  left: 120px;
  width: 50%;
}

.voice-container {
  float: left;
  margin-left: 12px;
  width: 31px;
  height: 38px;
  overflow: hidden !important;
  transition: 0.5s;
}

.voice-container:hover {
  width: 160px;
}

.voice-slider {
  position: relative;
  top: 2px;
  right: -30px;
  width: 90px;
  height: 35px;
  background-color: white;
  border-radius: 10px;
  padding: 0px 15px 0px 15px;
  transition: 0.2s;
}

.audio-component {
  width: 300px;
  height: 200px;
  top: 100px;
  display: none;
}

.music-active-switch {
  opacity: 1;
}
</style>
