<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-13 20:58:59
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-10-11 10:54:16
 * @FilePath: \big-screen\src\components\averageOutput\averageOutputLine.vue
 * @Description:亩均产值折线图
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { EChartsType } from 'echarts'
const propObj = withDefaults(defineProps<{ title?: string }>(), { title: '' })

const averageOutputLineRef = ref()
const userInfo = useUserStore()

const option: any = {
  backgroundColor: 'rgba(10,30,82,0.4)',
  tooltip: { trigger: 'axis' },
  legend: {
    data: [],
    top: '7%',
    textStyle: { color: 'white' },
  },
  grid: { top: '20%', left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    axisLine: { show: true, lineStyle: { color: '#fffff' } },
    splitLine: { lineStyle: { color: '#6379B7' } },
  },
  color: ['#ff4757', '#eccc68'],
  yAxis: {
    type: 'value',
    axisLine: { show: true, lineStyle: { color: 'white' } },
  },
  series: [],
  animationDuration: 3000,
}

let myChart: EChartsType | null = null

const initChart = async () => {
  if (!myChart) {
    myChart = eCharts.init(averageOutputLineRef.value)
    window.addEventListener('resize', () => { myChart?.resize() })

    const submitId = new Date().getTime()
    const param = {
      submitid: submitId,
      usercode: userInfo.userCode,
      sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
      type: propObj.title,
    }
    const res: any = await mjcz(param)

    let temp: any = []

    if (propObj.title === '工业项目')
      temp = res?.filter(e => e?.['位置'] === '工业项目月数据趋势')

    else
      temp = res?.filter(e => e?.['位置'] === '产业项目月数据趋势')

    option.series = temp.map((e: any) => { return { name: e.数据, type: 'line', data: propObj.title === '工业项目' ? e.数值1.split('，') : e.数值1.split(',') } })
    option.legend.data = temp.map(e => e.数据)
    myChart?.setOption(option)
  }
}

onMounted(() => {
  initChart()
})
</script>

<template>
  <div class="average-output-line-box" wPE-100 hPE-100 po-r>
    <div wPE-100 class="title-box" po-a flex flex-row-between>
      <span class="title">{{ propObj.title }}月数据趋势</span>
    </div>
    <div ref="averageOutputLineRef" wPE-100 hPE-100 />
  </div>
</template>

<style lang="scss" scoped>
.average-output-line-box {

  .title-box {
    padding: 0px 40px 0;
    z-index: 10;
  }

  .title {
    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;
    line-height: 47px;

  }

  :deep(.handoff-icon) {
    width: 45px;
    height: 45px;
    margin: 0 20px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
