<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-09 18:50:54
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-13 17:41:31
 * @FilePath: \big-screen\src\pages\index.vue
 * @Description: 首页
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { InterfaceModel } from '~/model'

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
 * @description: 获取经济运行总览数据
 * @param {*} val
 * @return {*}
 */
const getHomeData = async (val) => {
  const submitid = new Date().getTime()
  const usercode = userInfo.userCode
  const sign = hexMD5(submitid + userInfo.userCode + userInfo.token)
  // 获取经济运行总览数据
  const qyhxRes: any = await qyhx({ submitid, usercode, sign })
  economicalOperationData.value = qyhxRes?.filter(e => e?.['位置'] === '经济运行总览')
  // 获取各产业主营业务收入占比数据
  const incomeRes: any = await yqzl({ submitid, usercode, sign, address: val })
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
}

getHomeData(userInfo.city)
</script>

<template>
  <div class="Home-box" wPE-100 hPE-100 po-r flex-row-between>
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
        <home-electricity-usage-box />
      </div>
      <div w-100 h-48 bg="#ffd32a" />
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
