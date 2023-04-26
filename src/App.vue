<template>
  <Transition>
    <router-view></router-view>
  </Transition>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.35s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0.3;
}
</style>
