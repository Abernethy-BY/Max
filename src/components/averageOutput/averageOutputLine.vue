<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-13 20:58:59
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-14 00:14:27
 * @FilePath: \big-screen\src\components\averageOutput\averageOutputLine.vue
 * @Description:亩均产值折线图
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { EChartsType } from 'echarts'
import left from '~/assets/image/common/left.png'
import right from '~/assets/image/common/right.png'
import type { InterfaceModel } from '~/model'
const propObj = withDefaults(defineProps<{ averageOutputLineProp?: Array<InterfaceModel> }>(), { averageOutputLineProp: () => [] })

const averageOutputLineRef = ref()

const handoffFun = (val) => { }

const option: any = {
  backgroundColor: 'rgba(10,30,82,0.4)',
  tooltip: { trigger: 'axis' },
  legend: { data: [] },
  grid: { top: '20%', left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    axisLine: { show: true, lineStyle: { color: '#fffff' } },
    splitLine: { lineStyle: { color: '#6379B7' } },
  },
  color: ['#7A79F7', '#60C1FF', '#FFC554', '#FF5F5F'],
  yAxis: {
    type: 'value',
    axisLine: { show: true, lineStyle: { color: 'white' } },
  },
  series: [],
}

let myChart: EChartsType | null = null

const initChart = () => {
  if (!myChart) {
    myChart = eCharts.init(averageOutputLineRef.value)
    window.addEventListener('resize', () => { myChart?.resize() })
  }
}

const loadChart = () => {
  consola.start(option)
  myChart?.setOption(option)
}

onMounted(() => {
  initChart()
})

watch(() => propObj.averageOutputLineProp, () => {
  initChart()
  option.series = propObj.averageOutputLineProp.map((e) => { return { name: e.数据, type: 'line', stack: 'Total', data: e.数值1.split(',') } })
  option.legend.data = propObj.averageOutputLineProp.map(e => e.数据)
  loadChart()
})
</script>

<template>
  <div class="average-output-line-box" wPE-100 hPE-100 po-r>
    <div wPE-100 class="title-box" po-a flex flex-row-between>
      <span class="title">月数据趋势</span>
      <div class="button-box">
        <el-image class="handoff-icon" :src="left" fit="cover" @click="handoffFun('left')" />
        <el-image class="handoff-icon" :src="right" fit="cover" @click="handoffFun('right')" />
      </div>
    </div>
    <div ref="averageOutputLineRef" wPE-100 hPE-100 />
  </div>
</template>

<style lang="scss" scoped>
.average-output-line-box {

  .title-box {
    padding: 10px 40px 0;
  }

  .title {
    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;
    line-height: 47px;
  }

  :deep(.handoff-icon) {
    width: 45px;
    height: 45px;
    margin: 0 20px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
