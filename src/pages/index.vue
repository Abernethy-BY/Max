<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-16 20:17:52
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-07 20:14:05
 * @FilePath: \big-screen\src\pages\index.vue
 * @Description:首页
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
// /**
//  * @description: 地图区域字典
//  */
// const areaNameMap = new Map().set('工信厅', user.province).set('工信局', user.city).set('园区', user.compname)

import type { REAR_DATA_MODEL } from '~/model'

// /**
//  * @description: adcode字符
//  */
// const adCodeRes = ref<string>('')

// /**
//  * @description: 用户区域名称
//  */
// const areaName = computed(() => areaNameMap.get(user.userRole))

// /**
//  * @description: 地图显示标识
//  */
// const mapFlag = ref<boolean>(true)

// /**
//  * @description: 获取用户地区adcode
//  * @return {*}
//  */
// const getAdCode = async () => {
//   try {
//     if (user.userRole === '工信厅') {
//       mapFlag.value = true
//       adCodeRes.value = await getMapAdCode(user.province)
//     }

//     else if (user.userRole === '工信局') {
//       mapFlag.value = true
//       const res = await getMapAdCode(user.city)
//       adCodeRes.value = res
//     }

//     else if (user.userRole === '园区专员' || user.userRole === '园区管理员') {
//       mapFlag.value = false
//     }
//   }
//   catch (error) {

//   }
// }

// getAdCode()

// /**
//  * @description: 页面数据
//  */

// /**
//  * @description:获取页面数据
//  * @param {*} val 地区数据
//  * @return {*}
//  */
// const getYqzl = async (val?) => {
//   const submitId = new Date().getTime()
//   const param = {
//     submitid: submitId,
//     usercode: user.userCode,
//     sign: hexMD5(submitId + user.userCode + user.token),
//     address: val,
//   }
//   const res: any = await yqzl(param)
//   industryRankingData.value = res?.filter(e => e['位置'] === 'top10产业排名')
//   constructionProgressData.value = res?.filter(e => e['位置'] === '右下')
//   progressData.value = res?.find(e => e['位置'] === '五好园区建设进度')
//   incomeData.value = res?.filter(e => e['位置'] === '各产业主营业务收入占比')
// }

const user = useUserStore()

const industryRankingData = ref([])
const constructionProgressData = ref([])
const progressData = ref([])
const incomeData = ref([])

/**
 * @description: 获取页面数据
 * @param {*} val 地区数据
 * @return {*}
 */
const getYqzl = async (val) => {
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
 * @return {*}
 */
const BITFun = async () => {
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
 * @return {*}
 */
const DITFun = async () => {
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
const permissionsMap = new Map().set('工信厅', DITFun).set('工信局', BITFun)

onMounted(() => {
  permissionsMap.get(user.userRole) && permissionsMap.get(user.userRole).call(this)
})
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
    <!-- :ad-code="adCodeRes" :area-name="areaName" @refresh="getYqzl"  -->
    <div class="pandect-center" w-45 h-100>
      <pandect-map v-if="mapFlag" :area-data="areaData" />
      <park-map v-else />
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

