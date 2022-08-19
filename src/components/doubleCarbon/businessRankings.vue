<!--
 * @Author: By
 * @Date: 2022-07-27 11:38:24
 * @LastEditTime: 2022-08-19 19:05:58
 * @LastEditors: By
 * @Description: 企业排名组件
 * @FilePath: \big-screen-vue3\src\components\doubleCarbon\businessRankings.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script>
export default {
  props: ['businessRankingsProp'],
  data() {
    return {
      // progressBarBg: require('@/assets/img/doubleCarbon/progressBarBg.png'),
      businessRankingsOption: {
        grid: {
          top: '10%',
          left: '5%',
          right: '10%',
          bottom: '0%',
          containLabel: true,
        },
        xAxis: {
          show: false,
          max(value) {
            return value.max
          },
        },
        yAxis: [{
          type: 'category',
          inverse: true,
          data: [],
          axisTick: { show: false },
          axisLabel: { color: '#00B8FF', margin: 37 }, // y轴文字配置
          axisLine: { show: false },
        }, {
          name: '单位（亿元）',
          axisTick: { show: false },
          axisLabel: { show: false },
          axisLine: { show: false },
          data: [],
          nameTextStyle: {
            color: '#00B8FF',
          },
        }],
        series: [{ // 柱底圆片
          name: '',
          type: 'pictorialBar',
          symbolSize: [10, 25], // 调整截面形状
          symbolOffset: [-5, 0],
          itemStyle: { color: '#FFC2A7' },
          data: [],
        }, { // 柱体
          name: '',
          type: 'bar',
          barWidth: 25,
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
          symbolSize: [10, 25], // 调整截面形状
          symbolOffset: [5, 0],
          symbolPosition: 'end',
          itemStyle: { color: '#E9B500' },
          data: [],
        }, { // 结束圆片
          name: '',
          type: 'pictorialBar',
          symbolSize: [10, 25], // 调整截面形状
          symbolOffset: [5, 0],
          symbolPosition: 'end',
          itemStyle: { color: '#7DFBBD' },
          data: [],
        }],
      },
      businessRankingsChart: null,
    }
  },
  watch: { businessRankingsProp() { this.initBusinessRankingsChart() } },
  methods: {
    initBusinessRankingsChart() {
      this.initCharts()
      this.businessRankingsOption.yAxis[0].data = this.businessRankingsProp.map((e) => { return e?.['数据'] })
      const dataTemp = this.businessRankingsProp.map((e) => { return e?.['数值1'] })
      const maximum = new Big(dataTemp.sort((a, b) => b['值1'] - a['值1'])[dataTemp.length - 1]).times(1.5).toFixed(0)
      this.businessRankingsOption.series.forEach((element, index) => {
        if (index === this.businessRankingsOption.series.length - 1)
          for (let index = 0; index < dataTemp.length; index++) element.data.push(maximum)
        else
          element.data = dataTemp
      })
      this.businessRankingsChart.setOption(this.businessRankingsOption)
    },
    initCharts() {
      this.businessRankingsChart = eCharts.init(this.$refs.businessRankingsRef)
      window.addEventListener('resize', () => {
        this.businessRankingsChart.resize()
      })
    },
  },
}
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
    // line-height: 45px;
    position: absolute;
    top: 13px;
  }

  .business-rankings {
    width: 100%;
    height: 100%;
  }
}
</style>
