<template>
  <header>
    <div class="menu">
      <div
        :class="'menu-item ' + (props.nowIndex === index ? 'item-active' : '')"
        v-for="(item, index) in menuList"
        :key="index"
        @click="positionFixed(item)"
      >
        {{ item.title }}
      </div>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import localCache from '@/utils/LocalStorage'
import type { menuItemType } from '@/types'

const userName = ref('')
const router = useRouter()
const activeIndex = ref('1')

const props = defineProps({
  nowIndex: Number,
  menuList: Array<menuItemType>
})

onMounted(() => {
  userName.value = localCache.getCache('nickName') || '陌生人'
})

// 点击菜单方法
const positionFixed = (item: menuItemType) => {
  const activeItem = document.querySelector(`#${item.id}`)
  activeItem &&
    activeItem.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    })
}

// 右上角返回首页
const backToHome = () => {
  localCache.deleteCache('token')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
@keyframes activeItem {
  0% {
    border: 1px solid #615e5ece;
    width: 0;
  }
  50% {
    border: 1px solid #615e5ece;
    width: 100%;
  }
  100% {
    border: 1px solid #615e5ece;
    width: 0;
  }
}
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
  background-image: linear-gradient(to top, #99919159, rgb(122 122 122) 100%);
  .menu {
    height: 100%;
    display: flex;
    align-items: center;
    flex: 1;
    .menu-item {
      width: 1rem;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.17rem;
      color: #272626d5;
      margin-right: 0.1rem;
      cursor: pointer;
    }
    .item-active {
      position: relative;
      color: rgb(0, 0, 0);
      &::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        bottom: 0;
        animation: activeItem 2s ease-in-out infinite;
        animation-delay: 300ms;
      }
    }
  }
  .right-tool {
    display: flex;
    align-items: center;
    font-size: 0.16rem;
  }
}
</style>
