<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-16 20:17:52
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-30 19:35:08
 * @FilePath: \big-screen\src\pages\overviewOfPark.vue
 * @Description:首页
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { DefineComponent } from 'vue'
import type { REAR_DATA_MODEL } from '~/model'

const user = useUserStore()

/**
 * @description: top10产业排名数据
 */
const industryRankingData = ref([])
/**
 * @description: 动态数据
 */
const constructionProgressData = ref([])
/**
 * @description: 五好园区建设进度数据
 */
const progressData = ref([])
/**
 * @description: 各产业主营业务收入占比数据
 */
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
 * @description: 园区图片节点
 */
const parkMapRef = ref<DefineComponent>()

/**
 * @description: 园区名称
 */
const parkName = ref<string>('')

/**
 * @description: 关闭地图，显示园区图片
 * @param {string} name 园区名称
 * @return {void}
 */
const showParkImage = (name: string): void => {
  mapFlag.value = false
  parkName.value = name
  nextTick(() => {
    parkMapRef.value?.getParkImage()
  })
}
/**
 * @description: 地图组件节点
 */
const pandectMapRef = ref<DefineComponent>()

/**
 * @description: 关闭园区，显示地图
 * @return {void}
 */
const showMap = (): void => {
  mapFlag.value = true

  nextTick(() => {
    pandectMapRef.value?.protractMap()
  })
}

/**
 * @description: 模块隐藏方法
 * @return {void}
 */
const modulesHideFun = (): void => {

}
</script>

<template>
  <div hPE-100 wPE-100 flex flex-row-between>
    <div wPE-25 hPE-100 po-r z-10>
      <div class="top10" wPE-100 hPE-61>
        <industry-ranking :industry-ranking-prop="industryRankingData" />
      </div>
      <div class="Income" mt-30 wPE-100 hPE-29>
        <income :income-prop="incomeData" />
      </div>
    </div>
    <div class="pandect-center" w-45 h-100>
      <pandect-map v-if="mapFlag" ref="pandectMapRef" icon-position="left" :area-data="areaData" @show-park-image="showParkImage" @get-page-data="getYqzl" />
      <park-map v-else ref="parkMapRef" :park-name="parkName" @modules-hide="modulesHideFun" @show-map="showMap" />
    </div>
    <div class="pandect-right" wPE-28 hPE-94 po-r z-10>
      <construction-progress :construction-progress-prop="constructionProgressData" :progress-prop="progressData" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: screen
</route>
