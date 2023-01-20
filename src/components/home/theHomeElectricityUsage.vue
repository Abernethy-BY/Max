<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-13 17:26:25
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-19 11:29:50
 * @FilePath: \big-screen\src\components\home\theHomeElectricityUsage.vue
 * @Description: 工业用电情况
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { EChartsOption, EChartsType } from 'echarts'
import type { InterfaceModel } from '~/model'
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
  grid: {
    left: '5%',
    right: '7%',
    bottom: '10%',
    containLabel: true,
  },
  color: ['#60C1FF', '#FFC554', '#FF5F5F'],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    axisLabel: { color: '#FFFFFF', fontFamily: 'Source Han Sans CN', fontWeight: 400, fontSize: 14, margin: 13 },
  },
  yAxis: {
    type: 'value',
    axisLine: { show: true, lineStyle: { color: 'rgba(255,255,255,.4)' } },
    axisLabel: { color: '#FFFFFF', fontFamily: 'Source Han Sans CN', fontWeight: 400, fontSize: 14, margin: 14 },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,.4)' } },
  },
  series: [
    { type: 'line', data: [] },
    { type: 'line', data: [] },
    { type: 'line', data: [] },
  ],
}

watch(() => propObj.homeElectricityUsageProp, () => {
  option.series && (option.series[0].data = propObj.homeElectricityUsageProp)
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
