<template>
  <div class="theme-container">
    <headerBar></headerBar>
    <sideBar></sideBar>
    <router-view class="contain"></router-view>
  </div>
</template>

<script setup lang="ts">
import sideBar from '@/components/sideBar.vue'
import headerBar from '@/components/headerBar.vue'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
// setTimeout(async () => {
//   await router.push({ name: `about`, params: { id: 5 } });
//   console.log(route.params);
// }, 2000);
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
.contain{
  position: absolute;
  left: 200px;
  top: 50px;
}
</style>
