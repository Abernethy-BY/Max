<!--
 * @Author: By
 * @Date: 2022-08-09 18:54:19
 * @LastEditTime: 2022-09-17 16:50:29
 * @LastEditors: BY by15242952083@outlook.com
 * @Description:
 * @FilePath: \big-screen\src\components\enterprise\enterpriseProgress.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script>
export default {
  props: ['enterpriseProgressProp'],
  data() {
    return {
      barOption: {
        grid: { top: '15%', left: '5%', right: '8%', bottom: '5%', containLabel: true },
        xAxis: {
          show: true,
          max(value) { return value.max },
          splitLine: {
            show: true,
            lineStyle: { color: 'rgba(0,184,255,0.5)' },
          },
          axisLabel: { color: '#00B8FF' },
        },
        yAxis: [{
          z: 10,
          type: 'category',
          inverse: true,
          data: [],
          axisTick: { show: false },
          axisLabel: { color: '#00B8FF', margin: 14 }, // y轴文字配置
          axisLine: {
            show: true,
            lineStyle: { color: '#00B8FF' },
          },
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
          z: 120,
          itemStyle: { color: '#FFC2A7' },
          data: [],
        }, { // 柱体
          name: '',
          type: 'bar',
          barWidth: 25,
          barGap: '0%',
          z: 10,
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
          label: {
            show: true,
            distance: 15,
            color: '#00B8FF',
            fontSize: 16,
            // position
            position: 'top',
            align: 'center',
          },
          data: [],
          // label: { show: false },
        }, { // 柱顶圆片
          name: '',
          type: 'pictorialBar',
          symbolSize: [10, 25], // 调整截面形状
          symbolOffset: [5, 0],
          z: 12,
          symbolPosition: 'end',
          itemStyle: { color: '#E9B500' },
          data: [],
        }, { // 结束圆片
          name: '',
          type: 'pictorialBar',
          symbolSize: [10, 25], // 调整截面形状
          symbolOffset: [5, 0],
          z: 12,
          symbolPosition: 'end',
          itemStyle: { color: '#7DFBBD' },
          data: [],
        }],
      },
    }
  },
  watch: { enterpriseProgressProp() { this.initEnterpriseProgress() } },

  methods: {
    initEnterpriseProgress() {
      const enterpriseProgressChart = eCharts.init(this.$refs.enterpriseProgressRef)
      this.barOption.yAxis[0].data = this.enterpriseProgressProp?.map(e => e?.['数据'])
      const valueTemp = this.enterpriseProgressProp?.map(e => e?.['值1'])
      this.barOption.series.forEach((element, index) => {
        if (index === this.barOption.series.length - 1) {
          const temp = valueTemp.sort((a, b) => b['值1'] - a['值1'])[valueTemp.length - 1]
          if (temp === '') {
            const maximum = 0
            for (let index = 0; index < valueTemp.length; index++) element.data.push(maximum)
          }
          else {
            const maximum = new Big(temp).times(1.5).toFixed(0)
            for (let index = 0; index < valueTemp.length; index++) element.data.push(maximum)
          }
        }

        else { element.data = valueTemp }
      })
      enterpriseProgressChart.setOption(this.barOption)
      window.addEventListener('resize', () => {
        enterpriseProgressChart.resize()
      })
    },
  },

}
</script>

<template>
  <div class="enterprise-progress-box">
    <div ref="enterpriseProgressRef" class="enterprise-progress-content" />
  </div>
</template>

<style lang="scss" scoped>
.enterprise-progress-box {
  width: 100%;
  height: 100%;
  background: url("~/assets/image/enterprise/enterpriseProgressBg.png");
  // enterpriseProgressBg
  background-size: 100% 100%;

  .enterprise-progress-content {
    width: 100%;
    height: 100%;
  }
}
</style>
