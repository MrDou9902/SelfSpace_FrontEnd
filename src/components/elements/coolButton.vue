<template>
  <div class="wrapper" @click="btnClick">
    <div class="container">
      <el-icon><Right /></el-icon>
    </div>
    <div class="text">
      {{ props.btnText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const props = defineProps({
  btnText: {
    default: '',
    type: String
  },
  direction: {
    default: 'left',
    type: String
  },
  theme: {
    default: 'light',
    type: String
  }
})

const directionOpt = reactive({
  textMargin: props.direction === 'left' ? '0 0 0 50px' : '0 50px 0 0',
  containerRight: props.direction === 'left' ? 'auto' : '0'
})
const lightColor = props.theme === 'light' ? ref('#fff') : ref('#333')
const darkColor = props.theme === 'dark' ? ref('#fff') : ref('#333')

const emit = defineEmits(['btnClick'])

const btnClick = () => {
  emit('btnClick')
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 45px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .container {
    height: 45px;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: v-bind('directionOpt.containerRight');
    z-index: -1;
    border-radius: 999px;
    color: v-bind('lightColor');
    background-color: v-bind('darkColor');
    user-select: none;
    transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    .el-icon {
      font-size: 20px;
    }
  }
  .text {
    margin: v-bind('directionOpt.textMargin');
    font-family: 'Roobert', system-ui, sans-serif;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  &:hover {
    .text {
      color: v-bind('lightColor');
      margin: 0 25px 0 25px;
    }
    .container {
      width: 100%;
      .el-icon {
        display: none;
      }
    }
  }
}
</style>
