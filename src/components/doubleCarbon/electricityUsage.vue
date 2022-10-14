<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-08 11:57:45
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-10-14 15:57:09
 * @FilePath: \big-screen\src\components\doubleCarbon\electricityUsage.vue
 * @Description:园区工业用电情况（单位：万度）
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script>
export default {
  props: ['electricityUsageProp'],
  data() {
    return {
      electricityUsageOption: {
        legend: {
          show: true,
          top: 'bottom',
          left: 'center',
          itemGap: 200,
          textStyle: {
            color: '#E6E6E6',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { animation: false },
        },
        grid: { left: '3%', right: '4%', top: '20%', bottom: '10%', containLabel: true },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLine: { lineStyle: { color: '#dcdcdc' } },
          triggerEvent: true,
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#dcdcdc' } },

          splitLine: {
            show: true,
            lineStyle: { type: 'dashed' },
          },
        },
        color: ['#60C1FF', '#FFC554', '#FF5F5F'],
        series: [
          { name: '本月', type: 'line', data: [], lineStyle: { width: 3, cap: 'round' }, smooth: true },
          { name: '去年同月', type: 'line', data: [], lineStyle: { width: 3, cap: 'round' }, smooth: true },
          { name: '增长率', type: 'line', data: [], lineStyle: { width: 3, cap: 'round' }, smooth: true },
        ],
        animationDuration: 3000,
      },
      electricityUsageChart: null,
    }
  },
  watch: { electricityUsageProp() { this.initElectricityUsageChart() } },
  methods: {
    initElectricityUsageChart() {
      const temp = eCharts.init(this.$refs.electricityUsageRef)
      window.addEventListener('resize', () => {
        this.electricityUsageChart.resize()
      })
      this.electricityUsageOption.xAxis.data = this.electricityUsageProp.map((e) => { return e['数据'] })
      this.electricityUsageOption.series[0].data = this.electricityUsageProp.map((e) => { return Number(e['数值1']) })
      this.electricityUsageOption.series[1].data = this.electricityUsageProp.map((e) => { return Number(e['数值2']) })
      this.electricityUsageOption.series[2].data = this.electricityUsageProp.map((e) => { return Number(e['图标']) })
      temp.setOption(this.electricityUsageOption)
      this.electricityUsageChart = temp
    },

  },

}
</script>

<template>
  <div class="electricity-usage">
    <span class="electricity-usage-title">园区工业用电情况（单位：万度） </span>
    <div ref="electricityUsageRef" class="electricity-usage-content" />
  </div>
</template>

<style lang="scss" scoped>
.electricity-usage {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;

  background-image: url("~/assets/image/doubleCarbon/electricityUsageBg.png");
  background-size: 100% 100%;

  .electricity-usage-title {
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #92FCFF;

    position: absolute;
    top: 12px;
    left: 30px;
  }

  .electricity-usage-content {
    width: 100%;
    height: 100%;
  }
}
</style>
