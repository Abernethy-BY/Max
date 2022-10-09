<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-16 20:17:52
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-10-09 15:33:19
 * @FilePath: \big-screen\src\pages\index.vue
 * @Description:首页
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
const userInfo = useUserStore()

const industryRankingData = ref([])
const constructionProgressData = ref([])
const progressData = ref([])
const incomeData = ref([])

const getYqzl = async (val?) => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: userInfo.userCode,
    sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
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
        <industryRanking :industry-ranking-prop="industryRankingData" />
      </div>
      <div class="Income" mt-30 wPE-100 hPE-29>
        <income :income-prop="incomeData" />
      </div>
    </div>
    <div class="pandect-center" wPE-45 hPE-100>
      <pandectMap @refresh="getYqzl" />
    </div>
    <div class="pandect-right" wPE-28 hPE-94>
      <constructionProgress :construction-progress-prop="constructionProgressData" :progress-prop="progressData" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: screen
</route>

