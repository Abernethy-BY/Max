`<!--
 * @Author: By
 * @Date: 2022-07-27 16:51:06
 * @LastEditTime: 2022-07-27 19:06:51
 * @LastEditors: By
 * @Description: 亩均效益总览（万元）
 * @FilePath: \big-screen\src\views\corporatePortrait\module\subItemization.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script>
// import EleResize from '@/util/esresize'
export default {
  props: ['subItemizationProp'],
  data() {
    return {
      averageList: [
        { label: '亩均产值', value: '', ref: 'averageOutputRef', ranking: '' },
        { label: '亩均利润', value: '', ref: 'averageProfitRef', ranking: '' },
        { label: '亩均税收', value: '', ref: 'averageTaxRef', ranking: '' },
      ],

      averageOption: {
        tooltip: { show: false, formatter: '{a} <br/>{b} : {c}%' },
        max: 100,
        graphic: {
          type: 'image',
          z: 2,
          bounding: 'raw',
          left: '60%',
          top: '50%',
          style: { image: '', width: 20, height: 30 },
        },
        series: {
          type: 'gauge', // 类型：仪表盘图
          title: { show: false },
          center: ['50%', '50%'], // 仪表盘图的中心点相对于dom容器的位置
          data: [],
          risk: '',
          radius: '100%', // 环形的大小
          clockwise: true,
          startAngle: 90,
          endAngle: -270,
          axisLine: {
            show: true,
            lineStyle: {
              color: [[1, '#2050B4']],
              width: 10, // 环形的粗细
            },
          },
          splitLine: { show: false }, // 不显示分隔线
          axisTick: { show: false }, // 不显示仪表盘刻度
          axisLabel: { show: false },
          pointer: { show: false }, // 不显示仪表盘指针
          detail: {
            show: false,
            color: '#00FFFF',
            fontSize: 16,
            lineHeight: 22,
            padding: [0, 0, 20, 0],
            height: '100%',
            offsetCenter: [0, '10%'],
            fontWeight: '400',
          },
          progress: {
            show: true,
            width: 10,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0, color: '#0093FF', // 0% 处的颜色
                }, {
                  offset: 1, color: '#00FFFF', // 100% 处的颜色
                }],
                global: false, // 缺省为 false
              },
              borderCap: 'round',
              clip: true,
            },
          },
        },
      },

      averageOutputChart: null,
      averageProfitChart: null,
      averageTaxChart: null,
    }
  },
  watch: {
    subItemizationProp: {
      handler() {
        this.initAverageChart()
      },
      deep: true,
    },
  },

  methods: {
    initAverageChart() {
      this.initCharts()
      const averageOutputTemp = clone(this.averageOption)
      averageOutputTemp.series.data = this.subItemizationProp.find(e => e?.['数据'] === '亩均产值')['值1']
      const averageOutputDetailTemp = this.subItemizationProp.find(e => e?.['数据'] === '亩均产值')['值2'].slice(2)
      averageOutputTemp.series.detail.formatter = () => { return averageOutputDetailTemp }
      anime({ targets: this.$refs.rankingRef[0], innerHTML: [0, averageOutputDetailTemp], easing: 'linear', round: 10, duration: 3000 })
      this.averageOutputChart.setOption(averageOutputTemp)
      this.averageList.find(e => e.label === '亩均产值').value = this.subItemizationProp.find(e => e?.['数据'] === '亩均产值')['值1']
      anime({ targets: this.$refs.valueRef[0], innerHTML: [0, this.subItemizationProp.find(e => e?.['数据'] === '亩均产值')['值1']], easing: 'linear', round: 10, duration: 3000 })

      const averageProfitTemp = clone(this.averageOption)
      averageProfitTemp.series.data = this.subItemizationProp.find(e => e?.['数据'] === '亩均利润')['值1']
      const averageProfitDetailTemp = this.subItemizationProp.find(e => e?.['数据'] === '亩均利润')['值2'].slice(2)
      averageProfitTemp.series.detail.formatter = () => { return averageProfitDetailTemp }
      this.averageProfitChart.setOption(averageProfitTemp)
      anime({ targets: this.$refs.rankingRef[1], innerHTML: [0, averageProfitDetailTemp], easing: 'linear', round: 10, duration: 3000 })
      this.averageList.find(e => e.label === '亩均利润').value = this.subItemizationProp.find(e => e?.['数据'] === '亩均利润')['值1']
      anime({ targets: this.$refs.valueRef[1], innerHTML: [0, this.subItemizationProp.find(e => e?.['数据'] === '亩均利润')['值1']], easing: 'linear', round: 10, duration: 3000 })

      const averageTaxChartTemp = clone(this.averageOption)
      averageTaxChartTemp.series.data = this.subItemizationProp.find(e => e?.['数据'] === '亩均税收')['值1']
      const averageTaxChartDetailTemp = this.subItemizationProp.find(e => e?.['数据'] === '亩均税收')['值2'].slice(2)
      averageTaxChartTemp.series.detail.formatter = () => { return averageTaxChartDetailTemp }
      anime({ targets: this.$refs.rankingRef[2], innerHTML: [0, averageTaxChartDetailTemp], easing: 'linear', round: 10, duration: 3000 })
      this.averageTaxChart.setOption(averageTaxChartTemp)
      this.averageList.find(e => e.label === '亩均税收').value = this.subItemizationProp.find(e => e?.['数据'] === '亩均税收')['值1']
      anime({ targets: this.$refs.valueRef[2], innerHTML: [0, this.subItemizationProp.find(e => e?.['数据'] === '亩均税收')['值1']], easing: 'linear', round: 10, duration: 3000 })
    },
    initCharts() {
      this.averageOutputChart = eCharts.init(this.$refs.averageOutputRef[0])
      this.averageProfitChart = eCharts.init(this.$refs.averageProfitRef[0])
      this.averageTaxChart = eCharts.init(this.$refs.averageTaxRef[0])

      window.addEventListener('resize', () => {
        this.averageOutputChart.resize()
        this.averageProfitChart.resize()
        this.averageTaxChart.resize()
      })
    },
  },
}
</script>

<template>
  <div class="sub-itemization">
    <span class="sub-itemization-title">亩均效益总览（万元）</span>
    <div class="average-box">
      <div v-for="(item, index) in averageList" :key="index" class="average">
        <div class="average-main" po-r flex>
          <div :ref="item.ref" wPE-100 hPE-100 />
          <span po-a class="ranking-span">
            <span wPE-50 flex flex-row-end>排名</span>
            <span ref="rankingRef" wPE-50 />
          </span>
        </div>
        <span ref="valueRef" class="average-value">
          <!-- {{ item.value }} -->
        </span>
        <span class="average-label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sub-itemization {
  width: 100%;
  height: 100%;
  background-image: url("~/assets/image/corporatePortrait/subItemization/subItemizationBg.png");
  background-size: 100% 100%;
  position: relative;
  padding: 60px 31px 22px;

  .ranking-span {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #00FFFF;
    line-height: 48px;
  }

  .sub-itemization-title {
    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;

    position: absolute;
    top: 15px;
    left: 16px;
  }

  .average-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .average {
    // margin: 0 22px;
    width: 83px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    // &:first-child {
    //   margin-left: 0;
    // }

    // &:last-child {
    //   margin-right: 0;
    // }

    .average-main {
      width: 83px;
      height: 83px;
      justify-content: center;
      align-items: center;
    }

    .average-value {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #F8B62D;
      margin: 5px 0;
    }

    .average-label {
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #FFFFFF;
    }
  }
}
</style>
