<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-03 01:56:14
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-11 16:42:26
 * @FilePath: \big-screen\src\pages\doubleCarbon.vue
 * @Description:双碳检测
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
const userInfo = useUserStore()
const businessRankingsData = ref([])
const electricityUsedProportionData = ref([])
const electricityUsageData = ref([])

const getStjc = async () => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: userInfo.userCode,
    sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
  }
  const res: any = await stjc(param)
  businessRankingsData.value = res?.filter(e => e?.['位置'] === '当前用电量TOP前10')
  electricityUsedProportionData.value = res?.filter(e => e?.['位置'] === '园区各产业单月用电量及占比')
  electricityUsageData.value = res?.filter(e => e?.['位置'] === '园区工业用电情况')
}
getStjc()
</script>

<template>
  <div wPE-100 hPE-100 flex flex-column-between pbPE-4>
    <div flex-basis-PE-58 flex flex-row-between>
      <div flex-basis-PE-29>
        <businessRankings :business-rankings-prop="businessRankingsData" />
      </div>
      <div flex-basis-PE-69>
        <electricityUsage :electricity-usage-prop="electricityUsageData" />
      </div>
    </div>
    <div flex-basis-PE-37 hPE-5>
      <electricityUsedProportion :electricity-used-proportion-prop="electricityUsedProportionData" />
    </div>
  </div>
</template>
