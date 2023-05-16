<template>
  <div id="home">
    <header>
      <div class="menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
        >
          <el-menu-item index="0">LOGO</el-menu-item>
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="right-tool">
        <div>{{ '哈喽哇，' + userName }}</div>
        <span style="margin: 0 0.1rem; color: #b6a9a9c9"> | </span>
        <coolButton
          class="logout-btn"
          btnText="Logout"
          direction="right"
          @btnClick="backToHome"
        ></coolButton>
      </div>
    </header>
    <el-divider content-position="right">{{ tabName }}</el-divider>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import localCache from '@/utils/LocalStorage'

const userName = ref('')
const router = useRouter()
const tabName = ref('Default Page')
const activeIndex = ref('1')

onMounted(() => {
  userName.value = localCache.getCache('nickName') || '陌生人'
})

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// 右上角返回首页
const backToHome = () => {
  localCache.deleteCache('token')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 0.8rem;
  display: flex;
  align-items: center;
  color: #413f3f;
  font-weight: 500;
  backdrop-filter: blur(0.05rem);
  padding: 0 0.1rem;
  user-select: none;
  .menu {
    flex: 1;
    height: 100%;
  }
  .right-tool {
    display: flex;
    align-items: center;
    font-size: 0.16rem;
  }
}
</style>
