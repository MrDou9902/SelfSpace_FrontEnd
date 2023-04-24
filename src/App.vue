<template>
  <div class="theme-container">
    <el-button type="primary" size="default" @click="getGoodsList"
      >查询数据</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="goodsName" label="商品名称" width="180" />
      <el-table-column prop="goodsPrice" label="商品价格" width="180" />
      <el-table-column prop="goodsNum" label="商品数量" />
      <el-table-column prop="goodsImg" label="商品图片" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { baseType2 } from '@/types/interface'
import axios from 'axios';

let tableData = ref<Array<object>>([]);
const getGoodsList = () => {
  axios
    .get('http://localhost:8000/goods/getGoodsList', {
      params: {
        page: 0,
        size: 10,
      },
    })
    .then((res) => {
      tableData.value = res.data.result;
    });
};
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
</style>
