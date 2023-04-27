<template>
  <div class="headerBar-container">
    <div class="button-group">
      <el-icon color="rgb(255, 255, 255)" size="25" @click="backToLogin"
        ><SwitchButton
      /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import localCache from '@/utils/LocalStorage'
const router = useRouter()
const backToLogin = () => {
  localCache.deleteCache('token')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.headerBar-container {
  width: 100%;
  height: 50px;
  background-color: #2e2a2ac2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  .button-group {
    flex: 1;
    text-align: right;
    .el-icon {
      cursor: pointer;
    }
  }
}
</style>
