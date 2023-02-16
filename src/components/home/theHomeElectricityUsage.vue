<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-13 17:26:25
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-31 15:16:25
 * @FilePath: \big-screen\src\components\home\theHomeElectricityUsage.vue
 * @Description: 工业用电情况
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { EChartsOption, EChartsType } from 'echarts'
import type { InterfaceModel } from '~/model'
import type { XAXisOption1 } from '~/model/chart'
const propObj = withDefaults(defineProps<{ homeElectricityUsageProp: InterfaceModel[] }>(), { homeElectricityUsageProp: () => [] })

/**
 * @description: 图标元素节点
 */
const homeElectricityUsageBox = ref<HTMLElement>()

/**
 * @description: 图表对象
 */
let homeElectricityUsageChart: EChartsType | null = null

/**
 * @description: 图表配置
 */
const option: EChartsOption = {
  legend: {
    show: true,
    top: '5%',
    left: 'center',
    itemGap: 50,
    textStyle: { color: '#E6E6E6' },
  },
  grid: {
    left: '5%',
    right: '7%',
    bottom: '10%',
    containLabel: true,
  },
  color: ['#FF5F5F', '#FFC554', '#60C1FF'],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    axisLabel: { color: '#FFFFFF', fontFamily: 'Source Han Sans CN', fontWeight: 400, fontSize: 14, margin: 13 },
  },
  yAxis: {
    type: 'value',
    axisLine: { show: true, lineStyle: { color: 'rgba(255,255,255,.4)' } },
    axisLabel: { color: '#FFFFFF', fontFamily: 'Source Han Sans CN', fontWeight: 400, fontSize: 14, margin: 14 },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,.4)' } },
  },
  series: [
    { type: 'line', name: '本月', data: [] },
    { type: 'line', name: '去年同月', data: [] },
    { type: 'line', name: '增长率', data: [] },
  ],
  animationDuration: 10000,
}

watch(() => propObj.homeElectricityUsageProp, () => {
  option.xAxis && ((option.xAxis as XAXisOption1).data = propObj.homeElectricityUsageProp.map(e => e.数据))
  option.series && (option.series[0].data = propObj.homeElectricityUsageProp.map(e => e.数值1))
  option.series && (option.series[1].data = propObj.homeElectricityUsageProp.map(e => e.数值2))
  option.series && (option.series[2].data = propObj.homeElectricityUsageProp.map(e => e.图标))

  if (homeElectricityUsageBox.value && !homeElectricityUsageChart) {
    homeElectricityUsageChart = eCharts.init(homeElectricityUsageBox.value)
    window.addEventListener('resize', () => homeElectricityUsageChart?.resize())
  }
  homeElectricityUsageChart?.setOption(option)
})
</script>

<template>
  <div ref="homeElectricityUsageBox" flex-1 class="home-electricity-usage-box" />
</template>
