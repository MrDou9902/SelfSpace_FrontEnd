<template>
  <router-view v-slot="{ Component }">
    <Transition>
      <component :is="Component"></component>
    </Transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0.3;
}

.el-notification {
  border-radius: 30px !important;
  background-image: linear-gradient(-225deg, #e3fdf5 0%, #ffe6fa 100%);
  border: none;
}
</style>
