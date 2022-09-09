<!--
 * @Author: By
 * @Date: 2022-08-05 18:38:47
 * @LastEditTime: 2022-09-09 16:00:06
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
  grid: { top: '10%', left: '5%', right: '5%', bottom: '5%', containLabel: true },
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
