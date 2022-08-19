<!--
 * @Author: By
 * @Date: 2022-07-27 14:16:32
 * @LastEditTime: 2022-08-19 19:08:07
 * @LastEditors: By
 * @Description: 园区工业用电情况（单位：万度）
 * @FilePath: \big-screen-vue3\src\components\doubleCarbon\electricityUsage.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script>
export default {
  props: ['electricityUsageProp'],
  data() {
    return {
      electricityUsageOption: {
        legend: {
          type: 'plain',
          show: true,
          left: 'center',
          top: 'bottom',
          width: '50%',
          itemWidth: '300',
          orient: 'horizontal',
        },
        tooltip: { trigger: 'axis' },
        grid: {
          left: '3%',
          right: '4%',
          top: '20%',
          bottom: '10%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLine: { lineStyle: { color: '#FFFFFF' } },
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#FFFFFF' } },
        },
        series: [{
          name: '本月',
          type: 'line',
          stack: 'Total',
          data: [],
        }, {
          name: '去年同月',
          type: 'line',
          stack: 'Total',
          data: [],
        }, {
          name: '增长率',
          type: 'line',
          stack: 'Total',
          data: [],
        }],
      },
      electricityUsageChart: null,
    }
  },
  watch: { electricityUsageProp() { this.initElectricityUsageChart() } },
  methods: {
    initElectricityUsageChart() {
      this.initCharts()
      this.electricityUsageOption.xAxis.data = this.electricityUsageProp.map((e) => { return e['数据'] })
      this.electricityUsageOption.series[0].data = this.electricityUsageProp.map((e) => { return e['数值1'] })
      this.electricityUsageOption.series[1].data = this.electricityUsageProp.map((e) => { return e['数值2'] })
      this.electricityUsageOption.series[2].data = this.electricityUsageProp.map((e) => { return e['图标'] })
      this.electricityUsageChart.setOption(this.electricityUsageOption)
    },
    initCharts() {
      this.electricityUsageChart = eCharts.init(this.$refs.electricityUsageRef)
      window.addEventListener('resize', () => {
        this.electricityUsageChart.resize()
      })
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
