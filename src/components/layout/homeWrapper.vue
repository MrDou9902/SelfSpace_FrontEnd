<template>
  <router-view v-slot="{ Component }">
    <Transition>
      <component :is="Component"></component>
    </Transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
