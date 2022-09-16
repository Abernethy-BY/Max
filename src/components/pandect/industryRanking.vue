<!--
 * @Author: By
 * @Date: 2022-08-05 18:38:47
 * @LastEditTime: 2022-09-16 11:31:46
 * @LastEditors: BY by15242952083@outlook.com
 * @Description:
 * @FilePath: \big-screen\src\components\pandect\industryRanking.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script lang="ts" setup>
// export default {
//   methods: {
//     initIndustryEankingRefChart() {
//   const industryEankingChart = this.$eCharts.init(this.$refs.industryEankingRef)
//   eleResize.on(this.$el, () => { industryEankingChart.resize() })
//   const dataTemp = this.industryRankingProp.map(e => e['值1'])
//   this.barOption.yAxis.data = this.industryRankingProp.map(e => e['数据'])
//   this.barOption.series[0].data = dataTemp
//   this.barOption.series[1].data = dataTemp
//   this.barOption.series[2].data = dataTemp
//   const maximum = new Big(dataTemp.sort((a, b) => b['值1'] - a['值1'])[dataTemp.length - 1]).times(1.5).toFixed(0)
//   const maximumList = []
//   for (let index = 0; index < dataTemp.length; index++)
//     maximumList.push(maximum)

import type { EChartsType } from 'echarts'

const prop = defineProps({
  industryRankingProp: Array,
})

//   this.barOption.series[3].data = maximumList
//   industryEankingChart.setOption(this.barOption)
// },
//   },
// }
//
const industryEankingRef = ref<HTMLElement | null>(null)
const barOption = ref<any>({
  grid: { top: '10%', left: '5%', right: '15%', bottom: '5%', containLabel: true },
  xAxis: {
    show: false,
    max(value) {
      return value.max
    },
  },
  dataZoom: [
    {
      type: 'slider',
      show: true, // 隐藏或显示（true）组件
      backgroundColor: 'rgb(19, 63, 100)', // 组件的背景颜色。
      fillerColor: 'rgb(16, 171, 198)', // 选中范围的填充颜色。
      borderColor: 'rgb(19, 63, 100)', // 边框颜色
      showDetail: false, // 是否显示detail，即拖拽时候显示详细数值信息
      startValue: 0, // 数据窗口范围的起始数值
      endValue: 5, // 数据窗口范围的结束数值（一页显示多少条数据）
      yAxisIndex: [0, 1], // 控制哪个轴，如果是 number 表示控制一个轴，如果是 Array 表示控制多个轴。此处控制第二根轴
      filterMode: 'empty',
      width: 8, // 滚动条高度
      height: '80%', // 滚动条显示位置
      right: 2, // 距离右边
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
    },
  ],

  yAxis: {
    type: 'category',
    inverse: true,
    data: [],
    axisTick: { show: false },
    axisLabel: { color: '#00B8FF', margin: 14 }, // y轴文字配置
    axisLine: { show: false },
  },
  series: [{ // 柱底圆片
    name: '',
    type: 'pictorialBar',
    symbolSize: [10, 25], // 调整截面形状
    symbolOffset: [5, 0],
    z: 120,
    itemStyle: { color: '#B5C334' },
    data: [],
  }, { // 柱体
    name: '',
    type: 'bar',
    barWidth: 25,
    barGap: '0%',
    itemStyle: { color: '#B5C334', opacity: 0.7 },
    showBackground: true,
    backgroundStyle: { color: 'rgba(255,251,129,0.9000) ' },
    data: [],
    label: { show: false },
  }, { // 柱顶圆片
    name: '',
    type: 'pictorialBar',
    symbolSize: [10, 25], // 调整截面形状
    symbolOffset: [5, 0],
    z: 12,
    symbolPosition: 'end',
    itemStyle: { color: '#00B8FF' },
    data: [],
  }, { // 结束圆片
    name: '',
    type: 'pictorialBar',
    symbolSize: [10, 25], // 调整截面形状
    symbolOffset: [-5, 0],
    z: 12,
    symbolPosition: 'end',
    itemStyle: { color: '#00B8FF' },
    data: [],
  }],
})

// const timeOut = null

// const autoMove = () => {
//   //this.dataList.seriesData为柱形图数据3
//   timeOut = setInterval(() => {
//     // clearInterval(this.timeOut)
//     // 每次向后滚动一个，最后一个从头开始。
//     // if(this.stopMove){ return }
//     if (Number(barOption.value.dataZoom[0].endValue) === this.dataList.seriesData.length - 1) {
//       this.option.dataZoom[0].endValue = this.end;
//       this.option.dataZoom[0].startValue = 0;
//     } else {
//       this.option.dataZoom[0].endValue = this.option.dataZoom[0].endValue + 1;
//       this.option.dataZoom[0].startValue = this.option.dataZoom[0].startValue + 1;
//     }
//     this.chart.setOption(this.option)
//   }, 3000);
// },

/**
   * @description: 生成图表
   * @return {*}
   */
let industryEankingRefChart: EChartsType | null = null
const initIndustryEankingRefChart = () => {
  industryEankingRefChart = eCharts.init(industryEankingRef.value!)
  // eleResize.on(industryEankingRefChart, () => { industryEankingRefChart!.resize() })

  const dataTemp: any = prop?.industryRankingProp?.map((e: any) => { return e['值1'] === '' ? 0 : e['值1'] })
  // barOption.value.yAxis.data = prop?.industryRankingProp?.map((e: any) => { return e['数据'] === '' ? 1 : e['数据'] })
  barOption.value.yAxis.data = prop.industryRankingProp?.map((e: any) => e['数据'])
  barOption.value.series[0].data = dataTemp
  barOption.value.series[1].data = dataTemp
  barOption.value.series[2].data = dataTemp
  const maximum = new Big(dataTemp?.sort((a, b) => b['值1'] - a['值1'])[dataTemp.length - 1]).times(1.5).toFixed(0) as number
  const maximumList: Array<number> = []
  for (let index = 0; index < dataTemp.length; index++)
    maximumList.push(maximum)

  barOption.value.series[3].data = maximumList
  industryEankingRefChart.setOption(barOption.value)
}

watch(() => prop.industryRankingProp, (val) => {
  initIndustryEankingRefChart()
})

onMounted(() => {
  window.addEventListener('resize', () => {
    industryEankingRefChart!.resize()
  })
})
</script>

<template>
  <div class="industry-ranking-box">
    <span class="industry-ranking-title">TOP10产业排名</span>
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
