<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-16 20:17:52
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-06 09:55:39
 * @FilePath: \big-screen\src\pages\index.vue
 * @Description:首页
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
const user = useUserStore()

/**
 * @description: 地图区域字典
 */
const areaNameMap = new Map().set('工信厅', user.province).set('工信局', user.city).set('园区', user.compname)

/**
 * @description: adcode字符
 */
const adCodeRes = ref<string>('')

/**
 * @description: 用户区域名称
 */
const areaName = computed(() => areaNameMap.get(user.userRole))

/**
 * @description: 获取用户地区adcode
 * @return {*}
 */
const getAdCode = async () => {
  if (user.userRole === '工信厅')
    adCodeRes.value = await getMapAdCode(user.province)

  else if (user.userRole === '工信局')
    adCodeRes.value = await getMapAdCode(user.city)
}

getAdCode()

const industryRankingData = ref([])
const constructionProgressData = ref([])
const progressData = ref([])
const incomeData = ref([])

const getYqzl = async (val?) => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: user.userCode,
    sign: hexMD5(submitId + user.userCode + user.token),
    address: val,
  }
  const res: any = await yqzl(param)
  industryRankingData.value = res?.filter(e => e['位置'] === 'top10产业排名')
  constructionProgressData.value = res?.filter(e => e['位置'] === '右下')
  progressData.value = res?.find(e => e['位置'] === '五好园区建设进度')
  incomeData.value = res?.filter(e => e['位置'] === '各产业主营业务收入占比')
}
</script>

<template>
  <div hPE-100 wPE-100 flex flex-row-between>
    <div wPE-25 hPE-100>
      <div class="top10" wPE-100 hPE-61>
        <industry-ranking :industry-ranking-prop="industryRankingData" />
      </div>
      <div class="Income" mt-30 wPE-100 hPE-29>
        <income :income-prop="incomeData" />
      </div>
    </div>
    <div class="pandect-center" wPE-45 hPE-100>
      <pandect-map :ad-code="adCodeRes" :area-name="areaName" @refresh="getYqzl" />
    </div>
    <div class="pandect-right" wPE-28 hPE-94>
      <construction-progress :construction-progress-prop="constructionProgressData" :progress-prop="progressData" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: screen
</route>

