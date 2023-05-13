<template>
  <header>
    <span>{{ '哈喽哇，' + userName + ' | ' }}</span>
    <coolButton
      class="logout-btn"
      btnText="Logout"
      direction="right"
      @btnClick="backToHome"
    ></coolButton>
  </header>
  <el-divider content-position="right">{{ tabName }}</el-divider>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import localCache from '@/utils/LocalStorage'

const userName = ref('')
const router = useRouter()
const tabName = ref('Default Page')

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
  color: #413f3f;
  font-weight: 500;
  backdrop-filter: blur(5px);
  padding: 0 10px;
}
</style>
