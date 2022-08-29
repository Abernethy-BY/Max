<!-- eslint-disable no-unused-expressions -->
<!--
 * @Author: By
 * @Date: 2022-08-08 20:44:04
 * @LastEditTime: 2022-08-29 17:03:52
 * @LastEditors: By
 * @Description:
 * @FilePath: \big-screen-vue3\src\components\pandect\income.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<!-- eslint-disable prefer-const -->
<script setup lang="ts">
import 'echarts/lib/chart/pie'
import 'echarts-gl'
import 'echarts/theme/macarons'
import constructionProgressVue from './constructionProgress.vue'

const propObj = defineProps({
  incomeProp: Array,
})

const incomeRef = ref()
const angle = ref(0)
const chart = ref('')
// const // = ref(value: 70)
const reginCode = ref('')
// const // = ref(据渲)
const amountList = ref([])
const businessList = ref([])
const barData = ref([])
// const optionData = ref(null)

const getParametricEquation = (startRatio, endRatio, isSelected, isHovered, k, h) => {
  // 计算
  let midRatio = (startRatio + endRatio) / 2

  let startRadian = startRatio * Math.PI * 2
  let endRadian = endRatio * Math.PI * 2
  let midRadian = midRatio * Math.PI * 2
  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1)
    isSelected = false

  k = typeof k !== 'undefined' ? k : 1 / 3

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : -0.5
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : -1

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 2

  // 返回曲面参数方程
  return {

    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },

    x(u, v) {
      if (u < startRadian)
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate

      if (u > endRadian)
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate

      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    y(u, v) {
      if (u < startRadian)
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate

      if (u > endRadian)
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate

      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    z(u, v) {
      if (u < -Math.PI * 0.5)
        return Math.sin(u)

      if (u > Math.PI * 2.5)
        return Math.sin(u) * (h * 10) * 0.1

      return Math.sin(v) > 0 ? 1 * (h * 10) * 0.1 : -1
    },
  }
}

const getPie3D = (pieData, internalDiameterRatio) => {
  let series: any = []
  let sumValue: any = 0
  let startValue: any = 0
  let endValue: any = 0
  let legendData: any = []
  let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3

  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value

    let seriesItem: any = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k,
      },
    }

    if (typeof pieData[i].itemStyle != 'undefined') {
      let itemStyle: any = {}

      typeof pieData[i].itemStyle.color != 'undefined' ? itemStyle.color = pieData[i].itemStyle.color : null
      typeof pieData[i].itemStyle.opacity != 'undefined' ? itemStyle.opacity = pieData[i].itemStyle.opacity : null

      seriesItem.itemStyle = itemStyle
    }
    series.push(seriesItem)
  }

  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value

    series[i].pieData.startRatio = startValue / sumValue
    series[i].pieData.endRatio = endValue / sumValue
    series[i].parametricEquation = getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio, false, false, k, series[i].pieData.value)

    startValue = endValue

    legendData.push(series[i].name)
  }

  series.push({
    name: 'mouseoutSeries',
    type: 'pie',
    radius: ['40%', '90%'],
    center: ['50%', '50%'],
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 0,
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x(u, v) {
        return Math.sin(v) * Math.sin(u) + Math.sin(u)
      },
      y(u, v) {
        return Math.sin(v) * Math.cos(u) + Math.cos(u)
      },
      z(u, v) {
        return Math.cos(v) > 0 ? 0.1 : -0.1
      },
    },
  })

  let option = {
    // animation: true,
    // title: {
    //   text: 'Referer of a Website',
    //   subtext: 'Fake Data',
    //   left: '40'
    // },
    legend: {
      show: true,
      data: legendData,
      orient: 'vertical',
      right: '30',
      top: 'center',
      icon: 'circle',
      itemHeight: 6,
      textStyle: {
        color: '#ffffff',
      },
    },
    tooltip: {
      formatter: (params) => {
        if (params.seriesName !== 'mouseoutSeries')
          return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${option.series[params.seriesIndex].pieData.value}%`
      },
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: 1,
    },
    grid3D: {
      show: false,
      boxHeight: 0.8,
      viewControl: {
        alpha: 30,
        beta: 130,
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: false,
      },
      postEffect: {
        enable: true,
        bloom: {
          enable: true,
          bloomIntensity: 0.1,
        },
        SSAO: {
          enable: true,
          quality: 'medium',
          radius: 2,
        },
      },
    },
    series,
  }
  return option
}

watch(() => propObj.incomeProp, () => {
  consola.info(propObj.incomeProp)
  const temp = propObj.incomeProp?.map((e) => { return { name: e?.['数据'], value: e?.['值1'] } })
  consola.info(temp)

  const myChart = eCharts.init(incomeRef.value)
  const option = getPie3D(temp, 0.6)

  myChart.setOption(option)
  // this.chart.setOption(this.option)
  // const option = getPie3D(temp)

  //   0:
  // 位置: "各产业主营业务收入占比"
  // 值1: "1001"
  // 值2: ""
  // 图标: ""
  // 数据: "电子信息"
})
</script>

<template>
  <div class="income-box">
    <span class="income-title">各产业主营业务收入占比 </span>
    <div ref="incomeRef" class="income-content" />
  </div>
</template>

<style lang="scss" scoped>
.income-box {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;

  background-image: url("~/assets/image/pandect/incomeBg.png");
  background-size: 100% 100%;

  .income-title {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
    position: absolute;
    top: 13px;
  }

  .income-content {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>
