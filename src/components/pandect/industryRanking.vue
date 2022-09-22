<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-16 20:17:52
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-22 15:03:24
 * @FilePath: \big-screen\src\components\pandect\industryRanking.vue
 * @Description: 首页柱状图
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { EChartsType } from 'echarts'

const prop = defineProps({
  industryRankingProp: Array,
})

const industryEankingRef = ref<HTMLElement | null>(null)
const barOption = ref<any>({
  grid: { top: '10%', left: '5%', right: '15%', bottom: '5%', containLabel: true },
  xAxis: {
    show: false,
    max(value) {
      return value.max
    },
  },

  yAxis: {
    type: 'category',
    inverse: true,
    data: [],
    axisTick: { show: false },
    axisLabel: { color: '#00B8FF', margin: 14 }, // y轴文字配置
    axisLine: { show: false },
  },
  dataZoom: [{
    type: 'slider',
    show: false, // 隐藏或显示（true）组件
    backgroundColor: 'rgb(19, 63, 100)', // 组件的背景颜色。
    fillerColor: 'rgb(16, 171, 198)', // 选中范围的填充颜色。
    borderColor: 'rgb(19, 63, 100)', // 边框颜色
    showDetail: false, // 是否显示detail，即拖拽时候显示详细数值信息
    startValue: 0, // 数据窗口范围的起始数值
    endValue: 10, // 数据窗口范围的结束数值（一页显示多少条数据）
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
  series: [
    { // 柱底圆片
      name: '',
      type: 'pictorialBar',
      symbolSize: [10, 20], // 调整截面形状

      z: 120,
      itemStyle: { color: '#FFC2A7' },
      data: [],
    },
    {
      name: '柱体',
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
          colorStops: [{
            offset: 0, color: '#F4A746', // 0% 处的颜色
          }, {
            offset: 1, color: '#FFFB81', // 100% 处的颜色
          }],
          global: false,
        },
      },
      showBackground: true,
      backgroundStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#39ED6D', // 0% 处的颜色
          }, {
            offset: 1, color: '#7DFBBD', // 100% 处的颜色
          }],
          global: false,
        },
      },
      data: [],
      label: { show: false },
    },
    { // 柱顶圆片
      name: '',
      type: 'pictorialBar',
      symbolSize: [10, 20], // 调整截面形状
      symbolOffset: [5, 0],
      z: 12,
      symbolPosition: 'end',
      itemStyle: { color: '#E9B500' },
      data: [],
    },
    {
      name: '结束圆片',
      type: 'pictorialBar',
      symbolSize: [10, 20], // 调整截面形状
      symbolOffset: [5, 0],
      z: 12,
      symbolPosition: 'end',
      itemStyle: { color: '#00B8FF' },
      data: [],
    },
  ],
})

let industryEankingRefChart: EChartsType | null = null

const initChart = () => {
  if (!industryEankingRefChart)
    industryEankingRefChart = eCharts.init(industryEankingRef.value!)

  window.addEventListener('resize', () => {
    industryEankingRefChart!.resize()
  })
}
let YInterval: NodeJS.Timer | null | any = null
const initIndustryEankingRefChart = () => {
  initChart()

  const dataTemp: any = prop?.industryRankingProp?.map((e: any) => { return e['值1'] === '' ? 0 : e['值1'] })

  barOption.value.series[0].data = dataTemp.map((e) => { return { value: e, symbolOffset: e === 0 || !e ? [5, 0] : [-5, 0] } })

  barOption.value.series[1].data = dataTemp
  barOption.value.series[2].data = dataTemp

  const maximum = Math.max(...dataTemp)
  const maximumList: Array<number | { type: string }> = []
  for (let index = 0; index < dataTemp.length; index++)
    maximumList.push(maximum)

  barOption.value.series[3].data = maximumList

  const pollingYTemp = prop.industryRankingProp?.map((e: any) => e['数据']) || []
  const yAxisLengthTemp = pollingYTemp.length
  barOption.value.yAxis.data = pollingYTemp
  industryEankingRefChart?.setOption(barOption.value)
  YInterval = setInterval(() => {
    // 每次向后滚动一个，最后一个从头开始。
    if (barOption.value.dataZoom[0].endValue === yAxisLengthTemp) {
      barOption.value.dataZoom[0].endValue = 10
      barOption.value.dataZoom[0].startValue = 0
    }
    else {
      barOption.value.dataZoom[0].endValue = barOption.value.dataZoom[0].endValue + 1
      barOption.value.dataZoom[0].startValue = barOption.value.dataZoom[0].startValue + 1
    }
    industryEankingRefChart?.setOption(barOption.value)
  }, 2000)
}

watch(() => prop.industryRankingProp, (val) => {
  clearInterval(YInterval)
  initIndustryEankingRefChart()
})

onMounted(() => {
  initChart()
})
</script>

<template>
  <div class="industry-ranking-box">
    <span class="industry-ranking-title">产业排名</span>
    <div ref="industryEankingRef" class="industry-ranking-contain" />
  </div>
</template>

<style lang="scss" scoped>
.industry-ranking-box {
  width: 100%;
  height: 100%;

  position: relative;

  display: flex;
  justify-content: center;

  background-image: url("~/assets/image/pandect/industryRankingBg.png");
  background-size: 100% 100%;

  .industry-ranking-contain {
    width: 100%;
    height: 100%;
  }

  .industry-ranking-title {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
    // line-height: 45px;
    position: absolute;
    top: 13px;
  }
}
</style>
