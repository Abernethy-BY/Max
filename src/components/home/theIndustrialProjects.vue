<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-18 17:10:08
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-02-16 22:59:34
 * @FilePath: \big-screen\src\components\home\theIndustrialProjects.vue
 * @Description: 工业项目月数据趋势
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { EChartsOption, EChartsType } from 'echarts'
import type { INDUSTRIAL_PROJECTS_PROP_MODEL } from '~/model'
const propObj = withDefaults(defineProps<{ industrialProjectsProp: INDUSTRIAL_PROJECTS_PROP_MODEL }>(), { industrialProjectsProp: () => ({ industrialProjectsData: [], gdpData: [] }) })

/**
 * @description: 图表元素节点
 */
const industrialProjectsRef = ref<HTMLElement>()

/**
 * @description: 图表对象
 */
let industrialProjectsChart: EChartsType | null = null

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
  color: ['#60C1FF', '#FFC554'],
  legend: {
    data: ['园区GDP', '园区税收'],
    top: '5%',
    textStyle: { color: '#E6E6E6', fontWeight: 400, fontSize: 14 },
    lineStyle: {},
  },
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
    { type: 'line', name: '园区税收', data: [] },
    { type: 'line', name: '园区GDP', data: [] },
  ],
  animationDuration: 10000,
}

watch(() => propObj.industrialProjectsProp, () => {
  option.series && (option.series[0].data = propObj.industrialProjectsProp.industrialProjectsData)
  option.series && (option.series[1].data = propObj.industrialProjectsProp.gdpData)
  if (industrialProjectsRef.value && !industrialProjectsChart) {
    industrialProjectsChart = eCharts.init(industrialProjectsRef.value)
    window.addEventListener('resize', () => industrialProjectsChart?.resize())
  }
  industrialProjectsChart?.setOption(option)
}, { deep: true })
</script>

<template>
  <div ref="industrialProjectsRef" flex-1 class="the-industrial-projects" />
</template>
