<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-09 23:30:28
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-02-02 09:57:53
 * @FilePath: \big-screen\src\pages\enterprise.vue
 * @Description:产业图鉴
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { DefineComponent } from 'vue'
import type { InterfaceModel, REAR_DATA_MODEL } from '~/model'
import { PARK_DISPLAY_MODE_ENUM } from '~/model/parkImage'

const subItemizationData = ref<InterfaceModel[]>([])
const enterpriseProgressData = ref<InterfaceModel[]>([])

/**
 * @description: 区域信息
 */
const areaData = ref<REAR_DATA_MODEL>({ adCode: '', areaName: '' })

/**
 * @description: 用户信息对象
 */
const user = useUserStore()

/**
 * @description: 获取产业图鉴数据
 * @param {string} val 地区名
 * @return {Promise<void>}
 */
const getCytj = async (val: string): Promise<void> => {
  try {
    const submitId: number = new Date().getTime()
    const param = { submitid: submitId, usercode: user.userCode, sign: hexMD5(submitId + user.userCode + user.token), address: val }
    const res: any = await cytj(param)
    subItemizationData.value = res?.filter(e => e?.['位置'] === '下面')
    enterpriseProgressData.value = res?.filter(e => e?.['位置'] === '右上')
  }
  catch (error: any) {
    consola.fatal(error)
  }
}

/**
 * @description: 工信局加载方法
 * @return {Promise<void>}
 */
const BITFun = async (): Promise<void> => {
  try {
    areaData.value.adCode = await getMapAdCode(user.city)
    areaData.value.areaName = user.city
    getCytj(user.city)
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
    getCytj(user.city)
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
 * @description: 园区名称
 */
const parkName = ref<string>('')

/**
 * @description: 地图显示标识
 */
const mapShowFlag = ref<boolean>(true)

/**
 * @description: 显示地图方法
 * @return {void}
 */
const showMap = (): void => {
  mapShowFlag.value = true
}

/**
 * @description: 园区图片节点
 */
const parkMapRef = ref<DefineComponent>()

/**
 * @description: 显示园区图片
 * @param {string} parkName 园区名称
 * @return {void}
 */
const showParkImage = (name: string): void => {
  parkName.value = name
  mapShowFlag.value = false

  nextTick(() => {
    parkMapRef.value && (parkMapRef.value.getParkImage())
  })
}

/**
 * @description: 图片半屏展示
 */
const displayMode = ref<PARK_DISPLAY_MODE_ENUM>(PARK_DISPLAY_MODE_ENUM.halfScreen)
</script>

<template>
  <div hPE-100 wPE-100 flex flex-column-between pbPE-2>
    <div flex-shrink-0 flex-basis-0 flex-basis-PE-73 flex flex-row-between>
      <div flex-1 po-r>
        <pandect-map v-if="mapShowFlag" icon-position="right" :area-data="areaData" @show-park-image="showParkImage" @get-page-data="getCytj" />
        <park-map v-else ref="parkMapRef" :park-name="parkName" :park-display-mode="displayMode" @show-map="showMap" />
      </div>
      <div po-r z-10 flex-shrink-0 flex-basis-0 flex-basis-PE-32 mlPE-5 pbPE-3>
        <enterpriseProgress :enterprise-progress-prop="enterpriseProgressData" />
      </div>
    </div>
    <div po-r z-10 flex-shrink-0 flex-basis-0 flex-basis-PE-28>
      <sub-itemization :sub-itemization-prop="subItemizationData" />
    </div>
  </div>
</template>
