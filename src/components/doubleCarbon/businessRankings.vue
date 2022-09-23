<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-15 20:02:08
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-20 19:58:15
 * @FilePath: \big-screen\src\components\doubleCarbon\businessRankings.vue
 * @Description:企业排名组件
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { EChartsType } from 'echarts'
import type { InterfaceModel } from '~/model'

const propObj = withDefaults(defineProps<{ businessRankingsProp?: Array<InterfaceModel> }>(), { businessRankingsProp: () => [] })
const businessRankingsRef = ref()
let myChart: EChartsType | null = null
const option: any = {
  grid: {
    top: '10%',
    left: '5%',
    right: '10%',
    bottom: '0%',
    containLabel: true,
  },
  xAxis: {
    show: false,
    max(value) { return value.max },
  },
  yAxis: [{
    type: 'category',
    inverse: true,
    data: [],
    axisTick: { show: false },
    axisLabel: { color: '#00B8FF', margin: 37 }, // y轴文字配置
    axisLine: { show: false },
  }, {
    name: '单位（万度）',
    axisTick: { show: false },
    axisLabel: { show: false },
    axisLine: { show: false },
    data: [],
    nameTextStyle: { color: '#00B8FF' },
  }],
  dataZoom: [{
    type: 'slider',
    show: false, // 隐藏或显示（true）组件
    backgroundColor: 'rgb(19, 63, 100)', // 组件的背景颜色。
    fillerColor: 'rgb(16, 171, 198)', // 选中范围的填充颜色。
    borderColor: 'rgb(19, 63, 100)', // 边框颜色
    showDetail: false, // 是否显示detail，即拖拽时候显示详细数值信息
    startValue: 0, // 数据窗口范围的起始数值
    endValue: 9, // 数据窗口范围的结束数值（一页显示多少条数据）
    yAxisIndex: [0, 1], // 控制哪个轴，如果是 number 表示控制一个轴，如果是 Array 表示控制多个轴。此处控制第二根轴
    filterMode: 'empty',
    width: 8, // 滚动条高度
    height: '80%', // 滚动条显示位置
    right: 10, // 距离右边
    handleSize: 0, // 控制手柄的尺寸
    zoomLoxk: true, // 是否锁定选择区域（或叫做数据窗口）的大小
    top: 'middle',
  },
  {
    // 没有下面这块的话，只能拖动滚动条，鼠标滚轮在区域内不能控制外部滚动条
    type: 'inside',
    yAxisIndex: [0, 1], // 控制哪个轴，如果是 number 表示控制一个轴，如果是 Array 表示控制多个轴。此处控制第二根轴
    zoomOnMouseWheel: false, // 滚轮是否触发缩放
    moveOnMouseMove: true, // 鼠标移动能否触发平移
    moveOnMouseWheel: true, // 鼠标滚轮能否触发平移
  }],
  series: [{ // 柱底圆片
    name: '',
    type: 'pictorialBar',
    symbolSize: [10, 20], // 调整截面形状
    symbolOffset: [-5, 0],
    itemStyle: { color: '#FFC2A7' },
    data: [],
  }, { // 柱体
    name: '',
    type: 'bar',
    barWidth: 20,
    barGap: '0%',
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: '#F4A746' },
          { offset: 1, color: '#FFFB81' },
        ],
        global: false, // 缺省为 false
      },
      opacity: 0.7,
    },
    showBackground: true,
    backgroundStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: '#39ED6D' },
          { offset: 1, color: '#7DFBBD' },
        ],
        global: false, // 缺省为 false
      },
    },
    data: [],
    label: { show: false },
  }, { // 柱顶圆片
    name: '',
    type: 'pictorialBar',
    symbolSize: [10, 20], // 调整截面形状
    symbolOffset: [5, 0],
    symbolPosition: 'end',
    itemStyle: { color: '#E9B500' },
    data: [],
  }, { // 结束圆片
    name: '',
    type: 'pictorialBar',
    symbolSize: [10, 20], // 调整截面形状
    symbolOffset: [5, 0],
    symbolPosition: 'end',
    itemStyle: { color: '#7DFBBD' },
    data: [],
  }],
}

/**
 * @description: 图标生成方法
 * @return {*}
 */
const initChart = () => {
  if (!myChart)
    myChart = eCharts.init(businessRankingsRef.value)
  window.addEventListener('resize', () => { myChart?.resize() })
}

watch(() => propObj.businessRankingsProp, () => {
  initChart()

  const temp = propObj.businessRankingsProp
  // 排序
  const sortTemp = temp.sort((a, b) => Number(b.数值1) - Number(a.数值1))

  const dataTemp: any = sortTemp.map((e) => { return e?.['数值1'] })
  option.series[0].data = dataTemp
  option.series[1].data = dataTemp
  option.series[2].data = dataTemp
  const maximum = Math.max(...dataTemp)

  const maximumList: Array<number | { type: string }> = []
  for (let index = 0; index < dataTemp.length; index++)
    maximumList.push(maximum)

  option.series[3].data = maximumList
  const yAxisTemp = sortTemp.map((e) => { return e?.['数据'] }) || []

  option.yAxis[0].data = yAxisTemp
  myChart?.setOption(option)

  setInterval(() => {
    if (option.dataZoom[0].endValue === yAxisTemp.length) {
      option.dataZoom[0].endValue = 8
      option.dataZoom[0].startValue = 0
    }
    else {
      option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1
      option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1
    }
    myChart?.setOption(option)
  }, 2000)
})
</script>

<template>
  <div class="business-rankings-box">
    <span class="business-rankings-title">当前用电量TOP10企业</span>
    <div ref="businessRankingsRef" class="business-rankings" />
  </div>
</template>

<style lang="scss" scoped>
.business-rankings-box {
  width: 100%;
  height: 100%;
  background-image: url("~/assets/image/doubleCarbon/progressBarBg.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .business-rankings-title {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
    position: absolute;
    top: 1%;
  }

  .business-rankings {
    width: 100%;
    height: 100%;
  }
}
</style>
