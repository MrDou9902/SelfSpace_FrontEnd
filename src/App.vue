<template>
  <div class="theme-container">
    <button class="btn" @click="handleChangeTheme">切换主题</button>
    <h1 ref="aaa">{{ test }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { baseType2 } from '@/types/interface'
const bol = ref<Boolean>(false)
const aaa = ref(null)
let test = ref('测试响应式')
setTimeout(() => {
  test.value = '变化'
  console.log(aaa)
}, 5000)
const handleChangeTheme = () => {
  bol.value = !bol.value
  if (bol.value) {
    document.body.className = 'dark'
  } else {
    document.body.className = ''
  }
}
</script>

<style lang="scss" scoped>
.theme-container {
  width: 100vw;
  height: 100vh;
  background: var(--theme-bg-color);
  .btn {
    color: var(--btn-color);
  }
}
</style>
