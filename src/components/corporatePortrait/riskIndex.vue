<!--
 * @Author: By
 * @Date: 2022-07-28 09:41:12
 * @LastEditTime: 2022-08-19 18:35:17
 * @LastEditors: By
 * @Description: 风险指数
 * @FilePath: \big-screen-vue3\src\components\corporatePortrait\riskIndex.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script>
// import EleResize from '@/util/esresize'
export default {
  props: ['riskIndexProp'],
  data() {
    return {
      riskIndexOption: {
        radar: {
          center: ['50%', '50%'],
          radius: '65%',
          indicator: [],
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: true, lineStyle: { color: ['#1B47D4'] } },
          splitArea: { show: false },
        },
        series: {
          type: 'radar',
          symbol: 'none',
          lineStyle: { width: 1 },
          colorBy: 'data',
          emphasis: { areaStyle: { color: 'rgba(0,250,0,0.3)' } },
          data: [{
            value: [],
            areaStyle: {
              color: 'rgba(67,246,252,0.7000)',
            },
          }, {
            value: [],
            areaStyle: {
              color: 'rgba(1,109,219,0.7000);',
            },
          }],
        },
      },
      riskIndexChart: null,
    }
  },
  watch: {
    riskIndexProp: {
      handler() {
        this.initRiskIndex()
      },
      deep: true,
    },
  },
  methods: {
    initRiskIndex() {
      this.initCharts()
      this.riskIndexOption.radar.indicator = this.riskIndexProp.map((e) => { return { name: e['数据'], max: 50 } })
      this.riskIndexOption.series.data[0].value = this.riskIndexProp.map(e => e['值1'])
      this.riskIndexOption.series.data[1].value = this.riskIndexProp.map(e => e['值2'])
      this.riskIndexChart.setOption(this.riskIndexOption)
    },
    initCharts() {
      this.riskIndexChart = eCharts.init(this.$refs.riskIndexRef)
      window.addEventListener('resize', () => {
        this.riskIndexChart.resize()
      })
    },
  },
}
</script>

<template>
  <div class="risk-index">
    <span class="risk-index-title">风险指数</span>
    <div ref="riskIndexRef" class="risk-index-content" />
  </div>
</template>

<style lang="scss" scoped>
.risk-index {
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 11%;

  background-image: url("~/assets/image/corporatePortrait/riskIndex/riskIndex.png");
  // background-size: cover;
  background-size: 100% 100%;

  .risk-index-title {
    position: absolute;
    top: 14px;
    left: 16px;

    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;
  }

  .risk-index-content {
    width: 100%;
    height: 100%;
  }
}
</style>
