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
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0.3;
}
</style>
