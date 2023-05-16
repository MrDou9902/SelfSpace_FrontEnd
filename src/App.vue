<template>
  <!-- <router-view v-slot="{ Component }">
    <Transition>
      <component :is="Component"></component>
    </Transition>
  </router-view> -->
  <router-view></router-view>
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
  border-radius: 0.3rem !important;
  background-image: linear-gradient(-225deg, #e8dfeb5e 0%, #e6e8f36e 100%);
  border: none;
}
.el-message--warning {
  border-radius: 0.3rem !important;
  background-image: linear-gradient(-20deg, #f1b3be4f 0%, #fae2d248 100%);
  border: none;
  i {
    font-size: 0.16rem;
  }
}
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
