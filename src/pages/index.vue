<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-09 18:50:54
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-31 14:25:16
 * @FilePath: \big-screen\src\pages\index.vue
 * @Description: 首页
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import type { INDUSTRIAL_PROJECTS_PROP_MODEL, InterfaceModel } from '~/model'

/**
 * @description: 用户信息
 */
const userInfo = useUserStore()

/**
 * @description: 各产业主营业务收入占比数据
 */
const incomeData = ref([])

/**
 * @description: 工业用电情况数据
 */
const electricityUsageData = ref([])

/**
 * @description: 经济运行总览数据
 */
const economicalOperationData = ref<InterfaceModel[]>([])

/**
 * @description: 工业项目月数据趋势
 */
const industrialProjectsData = ref<INDUSTRIAL_PROJECTS_PROP_MODEL>({ industrialProjectsData: [], gdpData: [] })

/**
 * @description: 获取经济运行总览数据
 * @param {*} val
 * @return {*}
 */
const getHomeData = async (val) => {
  const submitIdTemp = new Date().getTime()
  const usercode = userInfo.userCode

  // 获取经济运行总览数据
  const qyhxSubmitId = `${submitIdTemp}${randomTwoDigitsNumber(4)}`
  const qyhxSign = hexMD5(`${qyhxSubmitId}${userInfo.userCode}${userInfo.token}`)
  const qyhxRes: any = await qyhx({ submitid: qyhxSubmitId, usercode, sign: qyhxSign })
  economicalOperationData.value = qyhxRes?.filter(e => e?.['位置'] === '经济运行总览')
  // // 园区工业用电情况（单位：万度）
  const stjcSubmitId = `${submitIdTemp}${randomTwoDigitsNumber(4)}`
  const stjcSign = hexMD5(`${stjcSubmitId}${userInfo.userCode}${userInfo.token}`)
  const stjcRes: any = await stjc({ submitid: stjcSubmitId, usercode, sign: stjcSign })
  electricityUsageData.value = stjcRes?.filter(e => e?.['位置'] === '园区工业用电情况')
  // 获取各产业主营业务收入占比数据
  const incomeSubmitId = `${submitIdTemp}${randomTwoDigitsNumber(4)}`
  const incomeSign = hexMD5(`${incomeSubmitId}${userInfo.userCode}${userInfo.token}`)
  const incomeRes: any = await yqzl({ submitid: incomeSubmitId, usercode, sign: incomeSign, address: val })
  const incomeTemp = incomeRes?.filter(e => e['位置'] === '各产业主营业务收入占比')
  const sumWithInitial = incomeTemp?.reduce(
    (previousValue: any, currentValue: any) => previousValue + (currentValue?.['值1'] === '' ? 0 : Number(currentValue?.['值1'])),
    0,
  )
  const colorList = ['#FFEE62', '#00A8FF', '#FB2F00', '#DD6391']
  const incomeDataTemp = incomeTemp?.map((e: any, i) => {
    return {
      name: e?.['数据'],
      value: sumWithInitial === 0 ? 0 : Number(new Big(Number(e?.['值1'])).div(sumWithInitial).times(100).toFixed(0)),
      itemStyle: { color: colorList[i] },
    }
  })
  incomeData.value = incomeDataTemp
  // 工业项目月数据趋势
  const yqjkSubmitId = `${submitIdTemp}${randomTwoDigitsNumber(4)}`
  const qyjkSign = hexMD5(`${yqjkSubmitId}${userInfo.userCode}${userInfo.token}`)
  const yqjkRes: any = await mjcz({ submitid: yqjkSubmitId, usercode, sign: qyjkSign, type: '工业项目' })
  const yqjkTemp = yqjkRes?.filter(e => e?.['位置'] === '工业项目月数据趋势')
  industrialProjectsData.value.industrialProjectsData = yqjkTemp?.find(e => e.数据 === '园区税收')?.数值1.split('，')
  industrialProjectsData.value.gdpData = yqjkTemp?.find(e => e.数据 === '园区GDP')?.数值1.split('，')
}

getHomeData(userInfo.city)

/**
 * @description: home元素节点
 */
const homeRef = ref<HTMLAttributes>()
onMounted(() => {
  setTimeout(() => {
    anime({ targets: homeRef.value, round: 10, duration: 5000, opacity: 0 })
  }, 1000 * 15)
})
</script>

<template>
  <div ref="homeRef" class="Home-box" wPE-100 hPE-100 po-r flex-row-between>
    <div h-100 w-30 flex-column-between>
      <div w-100 h-48 class="in-come-box modules-box" flex-column-start>
        <span flex-row-center>各产业主营业务收入占比 </span>
        <the-pie :pie-prop="incomeData" pie-title="" />
      </div>
      <div class="modules-box" flex-column-start w-100 h-48>
        <span flex-row-center>经济运行总览</span>
        <run-overview :run-overview-prop="economicalOperationData" />
      </div>
    </div>
    <div h-100 w-30 flex-column-between>
      <div class="modules-box" flex-column-start w-100 h-48>
        <span flex-row-center>园区工业用电情况（单位：万度） </span>
        <the-home-electricity-usage :home-electricity-usage-prop="electricityUsageData" />
      </div>
      <div class="modules-box" w-100 h-48 flex-column-start>
        <span flex-row-center>工业项目月数据趋势</span>
        <the-industrial-projects :industrial-projects-prop="industrialProjectsData" />
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style lang="scss" scoped>
.Home-box {
  .modules-box {
    background-image: url("~/assets/image/pandect/incomeBg.png");
    background-size: 100% 100%;

    span {
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 62px;
    }
  }
}
</style>
