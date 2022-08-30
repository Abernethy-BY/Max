<!--
 * @Author: By
 * @Date: 2022-07-27 19:29:16
 * @LastEditTime: 2022-08-30 19:45:12
 * @LastEditors: By
 * @Description: 企业工业用电量（单位：万度）
 * @FilePath: \big-screen-vue3\src\components\corporatePortrait\businessElectricityConsumption.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script>
// import EleResize from '@/util/esresize'
export default {
  props: ['businessElectricityConsumptionProp'],
  data() {
    return {
      businessElectricityConsumptionOption: {
        grid: {
          top: '30%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: [],
          axisTick: { show: false },
          axisLabel: { color: '#FFFFFF' }, // y轴文字配置
          axisLine: { show: true },
        },
        yAxis: [{
          type: 'value',
          axisTick: { show: false },
          axisLabel: { color: '#FFFFFF' }, // y轴文字配置
          axisLine: { show: true },
        }],
        series: [{ // 柱底圆片
          name: '',
          type: 'pictorialBar',
          symbolSize: [25, -10], // 调整截面形状
          symbolOffset: [0, -5],
          z: 120,
          itemStyle: { color: '#B5C334' },
          data: [],
        }, { // 柱体
          name: '',
          type: 'bar',
          barWidth: 25,
          barGap: '0%',
          itemStyle: { color: '#B5C334', opacity: 0.7 },
          showBackground: false,
          // backgroundStyle: { color: 'rgba(255,251,129,0.9000) ' },
          data: [],
          label: { show: false },
        }, { // 柱顶圆片
          name: '',
          type: 'pictorialBar',
          symbolSize: [25, 10], // 调整截面形状
          symbolOffset: [0, -5],
          z: 12,
          symbolPosition: 'end',
          itemStyle: { color: '#00B8FF' },
          data: [],
        },
        ],
      },
      businessElectricityConsumptionChart: null,
    }
  },
  watch: {
    businessElectricityConsumptionProp: {
      handler() {
        this.initBusinessElectricityConsumptionChart()
      },
      deep: true,
    },
  },
  methods: {
    initBusinessElectricityConsumptionChart() {
      this.$nextTick(() => {
        this.initCharts()
        this.businessElectricityConsumptionOption.xAxis.data = this.businessElectricityConsumptionProp.map(e => e['数据'])
        const temp = this.businessElectricityConsumptionProp.map(e => e['值1'])
        this.businessElectricityConsumptionOption.series[0].data = temp
        this.businessElectricityConsumptionOption.series[1].data = temp
        this.businessElectricityConsumptionOption.series[2].data = temp
        this.businessElectricityConsumptionChart.setOption(this.businessElectricityConsumptionOption)
      })
    },
    initCharts() {
      this.businessElectricityConsumptionChart = eCharts.init(this.$refs.businessElectricityConsumptionRef)
      window.addEventListener('resize', () => {
        this.businessElectricityConsumptionChart.resize()
      })
    },
  },
}
</script>

<template>
  <div class="business-electricity-consumption">
    <span class="business-electricity-consumption-title">企业工业用电量（单位：万度）</span>
    <div ref="businessElectricityConsumptionRef" class="business-electricity-consumption-content" />
  </div>
</template>

<style lang="scss" scoped>
.business-electricity-consumption {
  width: 100%;
  height: 100%;
  background-image: url("~/assets/image/corporatePortrait/businessElectricityConsumption/businessElectricityConsumptionBg.png");
  // background-size: cover;
  background-size: 100% 100%;
  position: relative;

  .business-electricity-consumption-title {
    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;
    position: absolute;
    top: 14px;
    left: 16px;
  }

  .business-electricity-consumption-content {
    width: 100%;
    height: 100%;
  }
}
</style>
