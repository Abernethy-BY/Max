<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-12-07 17:54:34
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-20 23:29:35
 * @FilePath: \big-screen\src\components\pandect\parkMap.vue
 * @Description: 园区图片组件
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import indexBg from '~/assets/image/Abernethy/aaa.jpg'
const propObj = withDefaults(defineProps<{ parkName: string }>(), { parkName: '' })

const emit = defineEmits(['showMap'])

/**
 * @description: 用户信息
 */
const userInfo = useUserStore()

/**
 * @description: 退回地图方法
 * @return {void}
 */
const goLast = () => {
  emit('showMap')
}

const getParkImage = async () => {
  try {
    const submitId = new Date().getTime()
    const param = {
      submitid: submitId,
      usercode: userInfo.userCode,
      sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
      address: propObj.parkName,
    }
    await getimg(param)
  }
  catch (error) {
    consola.fatal(error)
  }
}
defineExpose({ getParkImage })
</script>

<template>
  <div wPE-100 hPE-94 po-f potPE-8 pol-0 z-1>
    <el-image style="width: 100%; height: 98%" :src="indexBg" fit="cover" />

    <map-operate icon-position="left" content-type="parkImage" margin="29%" bottom="70px" @go-last="goLast" />
  </div>
</template>
