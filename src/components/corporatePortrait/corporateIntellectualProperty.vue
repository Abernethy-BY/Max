<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-01 16:29:28
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-10-14 18:05:45
 * @FilePath: \big-screen\src\components\corporatePortrait\corporateIntellectualProperty.vue
 * @Description:企业知识产权  (智能制造 、R&D研发经费)
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script setup lang="ts">
import type { EChartsType } from 'echarts'

const propObj = defineProps({
  corporateIntellectualPropertyProp: Object,
})

const domArr = ref<any>([])
const chartRef = ref()
const chartLabel = ref()

const generalOption = {
  tooltip: { show: false, formatter: '{a} <br/>{b} : {c}%' },
  max: 100,
  graphic: {
    type: 'text',
    z: 99,
    bottom: '0',
    left: 'center',
    style: {
      text: '',
      font: '500 0.3rem "Source Han Sans CN"',
      fill: '#FFFFFF',
    },
  },
  series: {
    type: 'gauge',
    title: { show: false },
    center: ['50%', '50%'],
    data: [50],
    radius: '60%',
    clockwise: true,
    startAngle: 90,
    endAngle: -270,
    axisLine: {
      show: true,
      lineStyle: {
        color: [[1, '#2050B4']],
        width: 7,
      },
    },
    splitLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
    pointer: { show: false },
    detail: {
      show: false,
      color: '#00FFFF',
      fontSize: 16,
      lineHeight: 22,
      padding: [0, 0, 20, 0],
      height: '100%',
      offsetCenter: [0, '10%'],
      fontWeight: '400',
    },
    progress: {
      show: true,
      width: 7,
      itemStyle: { color: '#4BE2B4' },
    },
  },
}
watch(() => propObj.corporateIntellectualPropertyProp, () => {
  domArr.value = propObj.corporateIntellectualPropertyProp || []
  nextTick(() => {
    domArr.value.forEach((element, index) => {
      const chartTemp: EChartsType = eCharts.init(chartRef.value[index])
      const elementOption = clone(generalOption)
      elementOption.graphic.style.text = element['数据']
      anime({ targets: chartLabel.value[index], innerHTML: [0, element['值1']], easing: 'linear', round: 10, duration: 3000 })
      elementOption.series.data[0] = Number(element['值1'])
      chartTemp.setOption(elementOption)
      window.addEventListener('resize', () => {
        chartTemp.resize()
      })
    })
  })
})
</script>

<template>
  <div wPE-100 hPE-100 po-r flex cross-axis-end class="corporate-intellectual-property">
    <span po-a pot-14 pol-16 fs-18 fw-900 color="#ffffff" class="corporate-intellectual-property-title">企业知识产权 (智能制造
      、R&D研发经费) </span>
    <div class="chart-box" flex hPE-82 wPE-100 fw flex-row-between>
      <div v-for="(item) in domArr" :key="item" flex po-r flex-row-center cross-axis-center hPE-40 class="corporate-intellectual-property-item">
        <div ref="chartRef" wPE-100 hPE-100 />
        <span ref="chartLabel" po-a class="chart-label" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.corporate-intellectual-property {
  background-image: url("~/assets/image/corporatePortrait/riskIndex/riskIndex.png");
  background-size: 100% 100%;

  .corporate-intellectual-property-item {
    flex: 0 0 30%;
    // margin: 10px 10px 10px 10px;
  }

  .chart-label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #FF9745;
  }
}
</style>
