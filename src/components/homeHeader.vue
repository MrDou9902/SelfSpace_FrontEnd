<template>
  <Transition>
    <header>
      <span>{{ '哈喽哇，' + userName }}</span>
      <el-icon class="back-btn" @click="backToHome"><SwitchButton /></el-icon>
    </header>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import localCache from '@/utils/LocalStorage'

const userName = ref('')
const router = useRouter()

onMounted(() => {
  userName.value = localCache.getCache('nickName') || '陌生人'
})

// 右上角返回首页
const backToHome = () => {
  localCache.deleteCache('token')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: right;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1;
  color: #413f3f;
  font-weight: 500;
  border-bottom: 2px solid rgba(155, 151, 151, 0.322);
  backdrop-filter: blur(5px);
  padding: 0 10px;
  .back-btn {
    margin-left: 20px;
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0.3;
}
</style>
