<template>
  <div class="img-group">
    <div class="img-wrapper"><img :src="img4" alt="" /></div>
    <div class="img-wrapper"><img :src="img2" alt="" /></div>
    <div class="img-wrapper"><img :src="img1" alt="" /></div>
    <!-- <img :src="img3" alt="" /> -->
  </div>
</template>

<script lang="ts" setup>
import img1 from './图片1.png'
import img2 from './图片2.png'
import img4 from './图片4.png'
</script>

<style lang="scss" scoped>
.img-group {
  flex: 1;
  display: flex;
  left: 0;
  justify-content: space-around;
}
.img-wrapper {
  height: 300px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fff;
  backdrop-filter: blur(10px);
  img {
    height: 120px;
  }
}
</style>
