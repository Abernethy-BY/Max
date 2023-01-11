<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-09 18:50:54
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-11 16:43:38
 * @FilePath: \big-screen\src\pages\index.vue
 * @Description: 首页
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
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
 * @description: 获取各产业主营业务收入占比数据
 * @param {string} val 地区数据
 * @return {Promise<void>}
 */
const getYqzl = async (val: string): Promise<void> => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: userInfo.userCode,
    sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
    address: val,
  }
  const res: any = await yqzl(param)
  incomeData.value = res?.filter(e => e['位置'] === '各产业主营业务收入占比')
}
/**
  * @description: 获取用电数据
  * @return {Promise<void>}
  */
const getStjc = async (): Promise<void> => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: userInfo.userCode,
    sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
  }
  const res: any = await stjc(param)
  // businessRankingsData.value = res?.filter(e => e?.['位置'] === '当前用电量TOP前10')
  // electricityUsedProportionData.value = res?.filter(e => e?.['位置'] === '园区各产业单月用电量及占比')
  electricityUsageData.value = res?.filter(e => e?.['位置'] === '园区工业用电情况')
}

getYqzl(userInfo.city)
getStjc()
</script>

<template>
  <div wPE-100 hPE-100 po-r flex-row-between>
    <div h-100 w-30 flex-column-between>
      <div w-100 h-48>
        <income :income-prop="incomeData" />
      </div>
      <div w-100 h-48 bg="#ff7f50" />
    </div>
    <div h-100 w-30 flex-column-between>
      <div w-100 h-48>
        <electricityUsage :electricity-usage-prop="electricityUsageData" />
      </div>
      <div w-100 h-48 bg="#ffd32a" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
