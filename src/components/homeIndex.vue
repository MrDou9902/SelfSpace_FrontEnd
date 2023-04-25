<template>
  <div class="theme-container">
    <headerBar></headerBar>
    <sideBar></sideBar>
    <div class="contain">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import sideBar from '@/components/sideBar.vue';
import headerBar from '@/components/headerBar.vue';
</script>

<style lang="scss" scoped>
.theme-container {
  width: 100vw;
  height: 100vh;
  background: var(--theme-bg-color);
  display: flex;
  flex-wrap: wrap;
  .btn {
    color: var(--btn-color);
  }
}
.contain {
  flex: 1;
}
</style>
