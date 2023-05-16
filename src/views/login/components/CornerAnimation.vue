<template>
  <div class="left-top">
    <div class="single-wave"></div>
    <div class="single-wave delay1"></div>
    <div class="single-wave delay2"></div>
    <div class="single-wave delay3"></div>
    <div class="single-wave delay4"></div>
  </div>
  <div class="left-bottom">
    <div class="single-wave"></div>
    <div class="single-wave delay1"></div>
    <div class="single-wave delay2"></div>
    <div class="single-wave delay3"></div>
    <div class="single-wave delay4"></div>
  </div>
  <div class="right-top">
    <div class="single-wave"></div>
    <div class="single-wave delay1"></div>
    <div class="single-wave delay2"></div>
    <div class="single-wave delay3"></div>
    <div class="single-wave delay4"></div>
  </div>
  <div class="right-bottom">
    <div class="single-wave"></div>
    <div class="single-wave delay1"></div>
    <div class="single-wave delay2"></div>
    <div class="single-wave delay3"></div>
    <div class="single-wave delay4"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@keyframes articleWave {
  0% {
    width: 0;
    height: 0;
    border: 0.1rem solid #d4b6dba2;
    opacity: 0.8;
  }
  100% {
    width: 6rem;
    height: 6rem;
    border: 0.03rem solid #ffff;
    opacity: 0;
  }
}
.left-top {
  position: absolute;
  left: 0;
  top: 0;
}
.left-bottom {
  position: absolute;
  left: 0;
  bottom: 0;
}
.right-top {
  position: absolute;
  right: 0;
  top: 0;
}
.right-bottom {
  position: absolute;
  right: 0;
  bottom: 0;
}
.single-wave {
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  animation: articleWave 3s ease-out infinite;
}
.delay1 {
  animation-delay: 0.6s;
}
.delay2 {
  animation-delay: 1.2s;
}
.delay3 {
  animation-delay: 1.8s;
}
.delay4 {
  animation-delay: 2.4s;
}
</style>
