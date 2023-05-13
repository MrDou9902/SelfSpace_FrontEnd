<template>
  <el-button size="large" @click="showHeart" round>心形曲线</el-button>
  <el-button size="large" @click="showDouble" round>双曲螺线</el-button>
  <div ref="canvasEl" class="echarts-container"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import useChart from '@/utils/echarts'

const { myChart, canvasEl } = useChart()

onMounted(() => {
  showDouble()
})

// 心形曲线
const showHeart = () => {
  const data: number[][] = []
  for (let i = 0; i <= 100; i++) {
    let theta = (i / 100) * 360
    let r = 5 * (1 + Math.sin((theta / 180) * Math.PI))
    data.push([r, theta])
  }
  const heartOption = {
    title: {
      text: 'r = 5(1+sinθ)'
    },
    legend: {
      data: ['line']
    },
    polar: {},
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    angleAxis: {
      type: 'value',
      startAngle: 0
    },
    radiusAxis: {},
    series: [
      {
        coordinateSystem: 'polar',
        showSymbol: false,
        name: 'line',
        type: 'line',
        data: data
      }
    ]
  }
  myChart.value.setOption(heartOption)
}

// 双曲螺线
const showDouble = () => {
  const data: number[][] = []
  for (let i = 0; i <= 100; i++) {
    let theta = (i / 100) * 360
    let r = 2 * theta
    data.push([r, theta])
  }
  const doubleOption = {
    title: {
      text: 'r = 5/θ'
    },
    legend: {
      data: ['line']
    },
    polar: {},
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    angleAxis: {
      type: 'value',
      startAngle: 0
    },
    radiusAxis: {},
    series: [
      {
        coordinateSystem: 'polar',
        showSymbol: false,
        name: 'line',
        type: 'line',
        data: data
      }
    ]
  }
  myChart.value.setOption(doubleOption)
}
</script>

<style lang="scss" scoped>
.echarts-container {
  width: 50%;
  height: 100%;
}
</style>
