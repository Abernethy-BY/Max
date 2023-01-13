<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-13 14:28:44
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-13 17:23:31
 * @FilePath: \big-screen\src\components\home\runOverview.vue
 * @Description:
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { EChartsOption, EChartsType } from 'echarts'
import type { InterfaceModel } from '~/model'

const propObj = withDefaults(defineProps<{ runOverviewProp: InterfaceModel[] }>(), { runOverviewProp: () => [] })

/**
 * @description: 图表配置
 */
const chartOption: EChartsOption | any = {
  grid: {
    left: '3%',
    right: '10%',
    bottom: '3%',
    top: 0,
    containLabel: true,
    width: '80%',
  },
  xAxis: {
    show: true,
    type: 'value',
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: { show: false },
    axisLabel: { show: false },
  },
  yAxis: {
    show: true,
    type: 'category',
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: { show: false },
    axisLabel: { color: '#FFFFFF', fontSize: '0.37rem', fontFamily: 'Source Han Sans CN', fontWeight: 400 },
    data: [],
  },
  series: [{
    type: 'bar',
    data: [],
    barWidth: 10,
    barMinHeight: 70,
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          { offset: 0, color: '#00269E' },
          { offset: 1, color: '#00A3DF' },
        ],
      },
    },
    label: {
      show: true,
      distance: 10,
      fontSize: 14,
      position: 'right',
      verticalAlign: 'middle',
      color: '#FFFFFF',
      overflow: 'breakAll',
    },
  }],

}

/**
 * @description: 图标元素节点
 */
const runOverviewRef = ref<HTMLElement>()

/**
 * @description: 图表对象
 */
let runOverviewChart: EChartsType | null = null

watch(() => propObj.runOverviewProp, () => {
  const seriesTemp: (string | undefined)[] = propObj.runOverviewProp.map(e => e.值1)
  chartOption.series && (chartOption.series[0].data = seriesTemp)
  const yAxisTemp: string[] = propObj.runOverviewProp.map(e => e.数据)
  chartOption.yAxis && (chartOption.yAxis.data = yAxisTemp)
  runOverviewRef.value && (runOverviewChart = eCharts.init(runOverviewRef.value))
  window.addEventListener('resize', () => runOverviewChart?.resize())
  runOverviewChart?.setOption(chartOption)
})
</script>

<template>
  <div ref="runOverviewRef" flex-1 />
</template>
