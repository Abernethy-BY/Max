<!--
 * @Author: By
 * @Date: 2022-07-28 11:09:06
 * @LastEditTime: 2022-08-19 18:42:11
 * @LastEditors: By
 * @Description: 企业知识产权  (智能制造 、R&D研发经费)
 * @FilePath: \big-screen-vue3\src\components\corporatePortrait\corporateIntellectualProperty.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script>
// import EleResize from '@/util/esresize'
export default {
  props: ['corporateIntellectualPropertyProp'],
  data() {
    return {
      // corporateIntellectualPropertyList: [
      //   { label: '软件著名', value: '0', bgc: '#A859FF' },
      //   { label: '证书资质', value: '2', bgc: '#FF9745' },
      //   { label: '作品著作', value: '0', bgc: '#34ABFF' },
      //   { label: '商标', value: '0', bgc: '#0075EA' },
      //   { label: '网站域名', value: '0', bgc: '#FE8E82' },
      //   { label: '专利', value: '35', bgc: '#9923FF' },
      // ]
      topList: [
        { label: '软件著名', value: 0, bgc: '#A859FF', ref: 'softwareFamous' },
        { label: '证书资质', value: 0, bgc: '#FF9745', ref: 'certificateQualification' },
        { label: '作品著作', value: 0, bgc: '#34ABFF', ref: 'works' },
      ],
      bottomList: [
        { label: '商标', value: 0, bgc: '#A859FF', ref: 'trademark' },
        { label: '证书资质', value: 0, bgc: '#FF9745', ref: 'websiteDomainJame' },
        { label: '专利', value: 0, bgc: '#34ABFF', ref: 'patent' },
      ],
      generalOption: {
        tooltip: { show: false, formatter: '{a} <br/>{b} : {c}%' },
        max: 100,
        graphic: {
          type: 'text',
          z: 99,
          bottom: '0',
          left: 'center',
          style: {
            text: '',
            font: '500 0.3rem "Source Han Sans CN"',
            fill: '#FFFFFF',
          },
        },
        series: {
          type: 'gauge', // 类型：仪表盘图
          title: { show: false },
          center: ['50%', '50%'], // 仪表盘图的中心点相对于dom容器的位置
          data: [50],
          radius: '60%', // 环形的大小
          clockwise: true,
          startAngle: 90,
          endAngle: -270,
          axisLine: {
            show: true,
            lineStyle: {
              color: [[1, '#2050B4']],
              width: 7, // 环形的粗细
            },
          },
          splitLine: { show: false }, // 不显示分隔线
          axisTick: { show: false }, // 不显示仪表盘刻度
          axisLabel: { show: false },
          pointer: { show: false }, // 不显示仪表盘指针
          detail: {
            show: true,
            color: '#00FFFF',
            fontSize: 16,
            lineHeight: 22,
            padding: [0, 0, 20, 0],
            height: '100%',
            offsetCenter: [0, '10%'],
            fontWeight: '400',
            // formatter: (e) => { return `排名:${e}` }
          },
          progress: {
            show: true,
            width: 7,
            itemStyle: { color: '#4BE2B4' },
          },
        },
      },
    }
  },
  watch: { corporateIntellectualPropertyProp: { handler() { this.initTopChart() } } },
  methods: {
    initTopChart() {
      const chartArr = []
      this.topList.forEach((element) => {
        element.value = this.corporateIntellectualPropertyProp.find(e => element.label === e['数据'])?.['值1']

        chartArr.push(eCharts.init(this.$refs[element.ref][0]))
        const chartTemp = eCharts.init(this.$refs[element.ref][0])
        // EleResize.on(this.$el, () => { chartTemp.resize() })

        const elementOption = clone(this.generalOption)
        elementOption.graphic.style.text = element.label
        elementOption.series.data[0] = Number(element.value)
        chartTemp.setOption(elementOption)

        window.addEventListener('resize', () => {
          chartTemp.resize()
        })
      })

      this.bottomList.forEach((element) => {
        element.value = this.corporateIntellectualPropertyProp.find(e => element.label === e['数据'])?.['值1']

        chartArr.push(eCharts.init(this.$refs[element.ref][0]))
        const chartTemp = eCharts.init(this.$refs[element.ref][0])
        // EleResize.on(this.$el, () => { chartTemp.resize() })

        const elementOption = clone(this.generalOption)
        elementOption.graphic.style.text = element.label
        elementOption.series.data[0] = Number(element.value)

        chartTemp.setOption(elementOption)
        window.addEventListener('resize', () => {
          chartTemp.resize()
        })
      })
    },

  },

}
</script>

<template>
  <div class="corporate-intellectual-property">
    <span class="corporate-intellectual-property-title">企业知识产权 (智能制造 、R&D研发经费) </span>
    <!-- <div class="corporate-intellectual-property-item" v-for="(item, index) in corporateIntellectualPropertyList"
      :key="index">
      <div class="image">{{ item.value }}</div>
      <div class="label">{{ item.label }}</div>
    </div> -->
    <div class="corporate-intellectual-property-top">
      <div v-for="(item, index) in topList" :key="index" :ref="item.ref" class="corporate-intellectual-property-item" />
    </div>

    <div class="corporate-intellectual-property-bottom">
      <div
        v-for="(item, index) in bottomList" :key="index" :ref="item.ref"
        class="corporate-intellectual-property-item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.corporate-intellectual-property {

  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 53px;
  padding-bottom: 3px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-around;
  align-items: center;
  background-image: url("~/assets/image/corporatePortrait/riskIndex/riskIndex.png");
  // background-size: cover;
  background-size: 100% 100%;

  .corporate-intellectual-property-title {
    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;

    position: absolute;
    top: 14px;
    left: 16px;
  }

  // .corporate-intellectual-property-item {
  //   width: 78px;
  //   height: 110px;
  //   // background-color: red;

  //   margin: 0 17px;

  // }
  .corporate-intellectual-property-top,
  .corporate-intellectual-property-bottom {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .corporate-intellectual-property-item {
      width: 33%;
      height: 100%;
    }
  }
}
</style>
