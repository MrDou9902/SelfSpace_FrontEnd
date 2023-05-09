<template>
  <div class="circle"></div>
  <div class="circle delay1"></div>
  <div class="circle delay2"></div>
  <div class="circle delay3"></div>
  <div class="circle delay4"></div>
  <div class="circle delay5"></div>
  <div class="circle delay6"></div>
  <div class="circle delay7"></div>
  <div class="circle delay8"></div>
  <div class="circle delay9"></div>
  <div class="circle"></div>
  <div class="circle delay1"></div>
  <div class="circle delay2"></div>
  <div class="circle delay3"></div>
  <div class="circle delay4"></div>
  <div class="circle delay5"></div>
  <div class="circle delay6"></div>
  <div class="circle delay7"></div>
  <div class="circle delay8"></div>
  <div class="circle delay9"></div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'

const props = defineProps({
  isPlaying: Boolean
})

watch(
  () => props.isPlaying,
  (val) => {
    document.querySelectorAll('circle').forEach((el) => {
      el.style.setProperty('--bg-color', 'pink')
    })
  }
)
</script>

<style lang="scss" scoped>
@keyframes articleWave {
  0% {
    transform: translateY(120%);
  }
  50% {
    transform: translateY(-120%);
  }
  100% {
    transform: translateY(120%);
  }
}
.circle {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-image: linear-gradient(120deg, #e0c3fc3c 0%, #8ec5fc43 100%);
  animation: articleWave 2s ease-in-out infinite;
}
.delay1 {
  animation-delay: 0.2s;
}
.delay2 {
  animation-delay: 0.4s;
}
.delay3 {
  animation-delay: 0.6s;
}
.delay4 {
  animation-delay: 0.8s;
}
.delay5 {
  animation-delay: 1s;
}
.delay6 {
  animation-delay: 1.2s;
}
.delay7 {
  animation-delay: 1.4s;
}
.delay8 {
  animation-delay: 1.6s;
}
.delay9 {
  animation-delay: 1.8s;
}
</style>
