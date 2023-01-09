<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-16 20:17:52
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-06 17:02:00
 * @FilePath: \big-screen\src\pages\index.vue
 * @Description:首页
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { REAR_DATA_MODEL } from '~/model'

const user = useUserStore()

const industryRankingData = ref([])
const constructionProgressData = ref([])
const progressData = ref([])
const incomeData = ref([])

/**
 * @description: 获取页面数据
 * @param {string} val 地区数据
 * @return {Promise<void>}
 */
const getYqzl = async (val: string): Promise<void> => {
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

/**
 * @description: 地图显示标识
 */
const mapFlag = ref<boolean>(true)

/**
 * @description: 区域信息
 */
const areaData = ref<REAR_DATA_MODEL>({ adCode: '', areaName: '' })

/**
 * @description: 工信局加载方法
 * @return {Promise<void>}
 */
const BITFun = async (): Promise<void> => {
  try {
    areaData.value.adCode = await getMapAdCode(user.city)
    areaData.value.areaName = user.city
    getYqzl(user.city)
  }
  catch (error) {
    consola.fatal(error)
  }
}

/**
 * @description: 工信厅加载方法
 * @return {Promise<void>}
 */
const DITFun = async (): Promise<void> => {
  try {
    areaData.value.adCode = await getMapAdCode(user.province)
    areaData.value.areaName = user.province
    getYqzl(user.province)
  }
  catch (error) {
    consola.fatal(error)
  }
}

/**
 * @description: 权限方法字典
 */
const permissionsMap: Map<string, Function> = new Map().set('工信厅', DITFun).set('工信局', BITFun).set('系统管理员', DITFun)

onMounted(() => {
  permissionsMap.get(user.userRole) && permissionsMap.get(user.userRole)?.call(this)
})

/**
 * @description: 关闭地图，显示园区图片
 * @return {void}
 */
const showParkImage = (): void => {
  mapFlag.value = false
}

/**
 * @description: 关闭园区，显示地图
 * @return {void}
 */
const showMap = (): void => {
  mapFlag.value = true
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
    <div class="pandect-center" w-45 h-100>
      <pandect-map v-if="mapFlag" icon-position="left" :area-data="areaData" @show-park-image="showParkImage" @get-page-data="getYqzl" />
      <park-map v-else @show-map="showMap" />
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

