<template>
  <div class="theme-container">
    <headerBar></headerBar>
    <div class="contain">
      <sideBar></sideBar>
      <div class="content">
        <router-view></router-view>
      </div>
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
  width: 100%;
  display: flex;
  height: calc(100% - 50px);
  .content{
    flex: 1;
    overflow: auto;
  }
}
</style>
