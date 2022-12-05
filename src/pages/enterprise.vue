<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-09 23:30:28
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-05 20:04:01
 * @FilePath: \big-screen\src\pages\enterprise.vue
 * @Description:产业图鉴
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { InterfaceModel } from '~/model'

const userInfo = useUserStore()

const subItemizationData = ref([])
const enterpriseProgressData = ref([])
const coordinateData = ref<InterfaceModel>()

const getData = async (val = '湖南省') => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: userInfo.userCode,
    sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
    address: val,
  }
  const res: any = await cytj(param)
  subItemizationData.value = res?.filter(e => e?.['位置'] === '下面')
  enterpriseProgressData.value = res?.filter(e => e?.['位置'] === '右上')
  coordinateData.value = res?.find(e => e?.['位置'] === '左上')
}
// getData()
setInterval(() => {
  getData()
}, 1000 * 60 * 30)
</script>

<template>
  <div hPE-100 wPE-100 flex flex-column-between pbPE-2>
    <div flex-shrink-0 flex-basis-0 flex-basis-PE-73 flex flex-row-between>
      <div flex-1>
        <enterpriseMap :coordinate-prop="coordinateData" @refresh="getData" />
      </div>
      <div flex-shrink-0 flex-basis-0 flex-basis-PE-32 mlPE-5 pbPE-3>
        <enterpriseProgress :enterprise-progress-prop="enterpriseProgressData" />
      </div>
    </div>
    <div flex-shrink-0 flex-basis-0 flex-basis-PE-28>
      <subItemization :sub-itemization-prop="subItemizationData" />
    </div>
  </div>
</template>
