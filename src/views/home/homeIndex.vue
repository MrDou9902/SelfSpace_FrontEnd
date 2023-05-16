<template>
  <div id="home">
    <homeHeader :menuList="menuList" :nowIndex="nowIndex" />
    <article>
      <div
        :id="item.id"
        class="page"
        v-for="(item, index) in menuList"
        :key="index"
      >
        <Transition>
          <div v-show="item.isShow" class="container">
            {{ item.title }}
          </div>
        </Transition>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import homeHeader from './components/homeHeader.vue'
import type { menuItemType } from '@/types'

const nowIndex = ref(0)
const menuList = reactive<menuItemType[]>([
  {
    isShow: false,
    title: '主页',
    id: 'index'
  },
  {
    isShow: false,
    title: '有点儿意思',
    id: 'fun'
  },
  {
    isShow: false,
    title: '我爱学习',
    id: 'study'
  },
  {
    isShow: false,
    title: '一路荆棘',
    id: 'thorns'
  },
  {
    isShow: false,
    title: '生活纪实',
    id: 'live'
  }
])

// article 滚动条监听
function handleScroll() {
  const article = document.querySelector('article')
  const elHeight = window.innerHeight - 80
  const articleScrollTop = article?.scrollTop || 0
  let fakeNowIndex = articleScrollTop / elHeight
  nowIndex.value = Math.floor(fakeNowIndex + 0.5)
  if (Math.floor(fakeNowIndex) > 0.5) {
    menuList[Math.floor(fakeNowIndex - 0.5)].isShow = false
  }
  if (Math.floor(fakeNowIndex) < menuList.length - 2) {
    menuList[Math.floor(fakeNowIndex + 1.5)].isShow = false
  }
  menuList[Math.floor(fakeNowIndex + 0.5)].isShow = true
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, true)
  setTimeout(() => {
    menuList[0].isShow = true
  }, 1000)
})
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  article {
    height: calc(100% - 0.8rem);
    overflow: auto;
    .page {
      width: 100%;
      height: calc(100vh - 0.8rem);
      display: flex;
      align-items: center;
      background-color: #99919159;
      font-size: 0.3rem;
      border-bottom: 2px solid #504a4a81;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0.2;
}

article::-webkit-scrollbar {
  width: 0 !important;
}

article {
  -ms-overflow-style: none;
}
</style>
