<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-27 10:35:21
 * @FilePath: \big-screen\src\components\publicOpinionMonitoring\enterpriseRiskCom.vue
 * @Description: 舆情监控模块
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { EChartsOption, EChartsType } from 'echarts'

const prop = defineProps({ title: String, enterpriseRiskComLineProp: Array, pieProp: Array })
const emit = defineEmits(['editConfirm'])
/**
 * @description: 搜索输入框
 */
const input = ref<string>('')

/**
 * @description: 柱状图节点
 */
const riskDistribution = ref<HTMLElement>()

/**
 * @description: 柱状图图表
 */
let riskDistributionChart: EChartsType | null = null

const riskDistributionOption: EChartsOption | any = {
  tooltip: {
    trigger: 'axis',
    formatter: '{b} : {c}',
    axisPointer: { type: 'shadow' },
  },
  grid: { left: '5%', top: '5%', right: '5%', bottom: '20%' },
  xAxis: {
    data: [],
    // 坐标轴
    axisLine: { lineStyle: { color: '#3eb2e8' } },
    // 坐标值标注
    axisLabel: { show: true, color: '#fff', hideOverlap: false, rotate: 50, margin: 15 },
  },
  yAxis: { show: false },
  series: [{
    name: 'a',
    tooltip: { show: false },
    type: 'bar',
    barWidth: 20.5,
    itemStyle: {

      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: '#0B4EC3' },
          { offset: 0.6, color: '#138CEB' },
          { offset: 1, color: '#17AAFE' },
        ],
        global: false,
      },

    },
    data: [],
    barGap: 0,
  }, {
    type: 'bar',
    barWidth: 15,
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: '#09337C' },
          { offset: 0.6, color: '#0761C0' },
          { offset: 1, color: '#0761C0' },
        ],
        global: false,
      },

    },
    barGap: 0,
    data: [],
  },
  {
    name: 'b',
    tooltip: { show: false },
    type: 'pictorialBar',
    itemStyle: {
      borderWidth: 1,
      borderColor: '#0571D5',
      color: '#1779E0',
    },
    symbol: 'diamond',
    symbolOffset: [0, '-50%'],
    symbolSize: [35, 10],
    symbolPosition: 'end',
    data: [],
    z: 3,
  },
  ],
}

/**
 * @description: 图表初始化方法
 */
const initChart = () => {
  if (!riskDistributionChart) {
    riskDistributionChart = eCharts.init(riskDistribution.value!)
    window.addEventListener('resize', () => {
      riskDistributionChart?.resize()
    })
  }
}

/**
 * @description: 监听柱状图数据 --- 生成柱状图
 * @return {*}
 */
watch(() => prop.enterpriseRiskComLineProp, () => {
  initChart()

  riskDistributionOption.xAxis.data = prop.enterpriseRiskComLineProp?.map((e: any) => e?.['数据'])
  riskDistributionOption.series[0].data = prop.enterpriseRiskComLineProp?.map((e: any) => e?.['值1'])

  riskDistributionOption.series[1].data = prop.enterpriseRiskComLineProp?.map((e: any) => e?.['值1'])
  riskDistributionOption.series[2].data = prop.enterpriseRiskComLineProp?.map((e: any) => e?.['值1'])
  riskDistributionChart?.setOption(riskDistributionOption)
})

const getYqjk = (val) => { emit('editConfirm', val) }

/**
 * @description: 3D饼图节点
 */
const riskRef = ref<HTMLElement>()

/**
 * @description: 3D饼图图表
 */
let riskChart: EChartsType | null = null

// const selectedIndex = ''
let hoveredIndex = ''

/**
 * @description: // 生成扇形的曲面参数方程
 * @param {*} startRatio
 * @param {*} endRatio
 * @param {*} isSelected
 * @param {*} isHovered
 * @param {*} k
 * @param {*} h
 * @return {*}
 */
const getParametricEquation = (startRatio, endRatio, isSelected, isHovered, k, h) => {
  // 计算
  const midRatio = (startRatio + endRatio) / 2

  const startRadian = startRatio * Math.PI * 2
  const endRadian = endRatio * Math.PI * 2
  const midRadian = midRatio * Math.PI * 2

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1)

    isSelected = false

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）

  k = typeof k !== 'undefined' ? k : 1 / 3

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1

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
        return Math.sin(u) * h * 0.1

      // 当前图形的高度是Z根据h（每个value的值决定的）
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
    },
  }
}

/**
 * @description: 生成模拟 3D 饼图的配置项
 * @param {*} pieData  饼图数据
 * @param {*} internalDiameterRatio
 * @return {*}
 */
const getPie3D = (pieData, internalDiameterRatio) => {
  const series: any = []
  // 总和
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  const legendData: any = []
  const k
    = typeof internalDiameterRatio !== 'undefined'
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i += 1) {
    sumValue += pieData[i].value

    const seriesItem: any = {
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

    if (typeof pieData[i].itemStyle !== 'undefined') {
      const { itemStyle } = pieData[i]

      // eslint-disable-next-line no-unused-expressions
      typeof pieData[i].itemStyle.color !== 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null
      // eslint-disable-next-line no-unused-expressions
      typeof pieData[i].itemStyle.opacity !== 'undefined'
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null

      seriesItem.itemStyle = itemStyle
    }
    series.push(seriesItem)
  }
  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。)
  for (let i = 0; i < series.length; i += 1) {
    endValue = startValue + series[i].pieData.value

    series[i].pieData.startRatio = startValue / sumValue
    series[i].pieData.endRatio = endValue / sumValue
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      // 我这里做了一个处理，使除了第一个之外的值都是10
      series[i].pieData.value === series[0].pieData.value ? 35 : 10,
    )

    startValue = endValue

    legendData.push(series[i].name)
  }

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    // animation: false,
    tooltip: {
      formatter: (params) => {
        if (params.seriesName !== 'mouseoutSeries') {
          return `${params.seriesName
            }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color
            };"></span>${option.series[params.seriesIndex].pieData.value}`
        }
        return ''
      },
    },
    legend: {
      show: true,
      type: 'scroll',
      data: legendData,
      orient: 'vertical',
      right: '10%',
      top: 'center',
      icon: 'circle',
      itemHeight: 6,
      textStyle: {
        color: '#ffffff',
      },
      selectedMode: false,
    },
    xAxis3D: { min: -1, max: 1 },
    yAxis3D: { min: -1, max: 1 },
    zAxis3D: { min: -1, max: 1 },
    grid3D: {
      show: false,
      boxHeight: 5,
      top: '0%',
      left: '-18%',
      viewControl: {
        // 3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 30,
        // beta: 30,
        rotateSensitivity: 1,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: false,
        distance: 180,
      },
      // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
      postEffect: {
        // 配置这项会出现锯齿，请自己去查看官方配置有办法解决
        enable: false,
        bloom: { enable: true, bloomIntensity: 0.1 },
        SSAO: { enable: true, quality: 'medium', radius: 2 },
      },
    },
    series,
  }
  return option
}

watch(() => prop.pieProp, () => {
  if (!riskChart) {
    riskChart = eCharts.init(riskRef.value!)
    window.addEventListener('resize', () => { riskChart?.resize() })
  }

  consola.info(prop.pieProp)

  //   {
  //     "位置": "舆情级别分布",
  //     "数据": "良好信息",
  //     "值1": "90",
  //     "值2": "",
  //     "图标": ""
  // }
  const colorList = ['#FFEE62', '#00A8FF', '#FB2F00', '#DD6391']

  const temp = prop?.pieProp?.map((e: any, i: any) => {
    return {
      name: e.数据,
      value: Number(e.值1),
      itemStyle: { color: colorList[i] },
    }
  })

  const option = getPie3D(temp, 0.59)

  // const option = getPie3D(
  //   [
  //     { name: 'cc', value: 47, itemStyle: { color: '#f77b66' } },
  //     { name: 'aa', value: 44, itemStyle: { color: '#3edce0' } },
  //     { name: 'bb', value: 32, itemStyle: { color: '#f94e76' } },
  //     { name: 'ee', value: 16, itemStyle: { color: '#018ef1' } },
  //     { name: 'dd', value: 23, itemStyle: { color: '#9e60f9' } },
  //   ],
  //   0.59,
  // )

  riskChart.setOption(option)

  //  修正取消高亮失败的 bug
  // 监听 mouseover，近似实现高亮（放大）效果
  riskChart.on('mouseover', (params: any) => {
    // 准备重新渲染扇形所需的参数
    let isSelected
    let isHovered
    let startRatio
    let endRatio
    let k
    let i

    // 如果触发 mouseover 的扇形当前已高亮，则不做操作
    if (Number(hoveredIndex) === params.seriesIndex) {

      // 否则进行高亮及必要的取消高亮操作
    }
    else {
      // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
      if (hoveredIndex !== '') {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
        isSelected = option.series[hoveredIndex].pieStatus.selected
        isHovered = false
        startRatio = option.series[hoveredIndex].pieData.startRatio
        endRatio = option.series[hoveredIndex].pieData.endRatio
        k = option.series[hoveredIndex].pieStatus.k
        i = option.series[hoveredIndex].pieData.value === option.series[0].pieData.value ? 35 : 10
        // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
        option.series[hoveredIndex].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          i,
        )
        option.series[hoveredIndex].pieStatus.hovered = isHovered

        // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
        hoveredIndex = ''
      }

      // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
      if (params.seriesName !== 'mouseoutSeries') {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
        isSelected = option.series[params.seriesIndex].pieStatus.selected
        isHovered = true
        startRatio = option.series[params.seriesIndex].pieData.startRatio
        endRatio = option.series[params.seriesIndex].pieData.endRatio
        k = option.series[params.seriesIndex].pieStatus.k

        // 对当前点击的扇形，执行高亮操作（对 option 更新）
        option.series[params.seriesIndex].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          option.series[params.seriesIndex].pieData.value + 5,
        )
        option.series[params.seriesIndex].pieStatus.hovered = isHovered

        // 记录上次高亮的扇形对应的系列号 seriesIndex
        hoveredIndex = params.seriesIndex
      }

      // 使用更新后的 option，渲染图表
      riskChart?.setOption(option)
    }
  })

  // 修正取消高亮失败的 bug
  riskChart.on('globalout', () => {
    if (hoveredIndex !== '') {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
      const isSelected = option.series[hoveredIndex].pieStatus.selected
      const isHovered = false
      const k = option.series[hoveredIndex].pieStatus.k
      const startRatio = option.series[hoveredIndex].pieData.startRatio
      const endRatio = option.series[hoveredIndex].pieData.endRatio
      // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
      const i = option.series[hoveredIndex].pieData.value === option.series[0].pieData.value ? 35 : 10
      option.series[hoveredIndex].parametricEquation = getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        i,
      )
      option.series[hoveredIndex].pieStatus.hovered = isHovered

      // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
      hoveredIndex = ''
    }

    // 使用更新后的 option，渲染图表
    riskChart?.setOption(option)
  })
})
</script>

<template>
  <div
    class="enterprise-risk-com-box" bg="red" wPE-100 hPE-100 pt-16 pr-9 pb-34 pl-15 flex flex-column-between
    cross-axis-center
  >
    <el-input v-model="input" class="enterprise-risk-input" placeholder="全部企业" @change="getYqjk">
      <template #suffix>
        <el-icon class="search-icon">
          <i-ep-search />
        </el-icon>
      </template>
    </el-input>

    <div wPE-100 hPE-53 po-r class="risk-distribution-box">
      <span class="risk-distribution-title" po-a pol-17 pot-17 z-10>{{ prop.title }}分布</span>
      <div ref="riskDistribution" wPE-100 hPE-100 />
    </div>

    <div wPE-100 hPE-38 po-r class="Risk-level-box">
      <span class="Risk-level-title" po-a pol-17 pot-17 z-10>{{ prop.title }}分布</span>
      <div ref="riskRef" wPE-100 hPE-100 />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.enterprise-risk-com-box {
  width: 100%;
  height: 100%;

  background: no-repeat url("~/assets/image/publicOpinionMonitoring/enterpriseRiskBg.png");
  background-size: 100% 100%;

  :deep(.enterprise-risk-input) {
    .el-input__wrapper {
      width: 100%;
      background: rgba(255, 255, 255, 0);

      box-shadow: none !important;
      background-image: url("~/assets/image/publicOpinionMonitoring/inputBg.png");
      background-size: 100% 100%;
      border: none;
    }

    .el-input__inner {
      width: 100%;
      height: 54px;

      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FFFFFF;

      -webkit-padding-start: 30px;

      &::-webkit-input-placeholder {
        color: white;
      }
    }

    .el-input__suffix {
      .el-input__icon {
        font-size: 22px;
        color: #93B1C8;
        margin-right: 22px;
        display: flex;
        align-items: center;
      }
    }

    .search-icon {
      font-size: 22px;
      color: white;
      margin-right: 22px;
    }
  }

  .risk-distribution-box {
    .risk-distribution-title {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FFFFFF;

    }
  }

  .Risk-level-box {
    background-image: url("~/assets/image/publicOpinionMonitoring/riskLevelBg.png");
    background-size: 100% 100%;

    .Risk-level-title {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FFFFFF;

    }
  }
}
</style>
