<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-12-07 17:54:34
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-30 19:12:39
 * @FilePath: \big-screen\src\components\pandect\parkMap.vue
 * @Description: 园区图片组件
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
const propObj = withDefaults(defineProps<{ parkName: string }>(), { parkName: '' })
// import indexBg from '~/assets/image/Abernethy/aaa.jpg'
const emit = defineEmits(['showMap', 'modulesHide'])

/**
 * @description: 用户信息
 */
const userInfo = useUserStore()

/**
 * @description: 图片路径
 */
const picUrl = ref<string>('')

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
    const res = await getimg(param)

    picUrl.value = `http://175.6.101.127:8700/${res?.[0]?.imgurl}`
  }
  catch (error) {
    consola.fatal(error)
  }
}

/**
 * @description: 图片节点
 */
const imgRef = ref()

/**
 * @description: 图片加载失败方法
 * @return {void}
 */
const errorFun = (): void => {
  imgRef.value.$el.style.display = 'none'
}

/**
 * @description: 图片加载成功方法
 * @return {void}
 */
const loadFun = (): void => {
  imgRef.value.$el.style.display = 'block'
  emit('modulesHide')
}

defineExpose({ getParkImage })
</script>

<template>
  <div wPE-100 hPE-94 po-f potPE-8 pol-0 z-1>
    <ElImage ref="imgRef" style="width: 100%; height: 98%" :src="picUrl" fit="cover" @error="(err) => errorFun()" @load="(e) => loadFun()" />

    <map-operate icon-position="left" content-type="parkImage" margin="29%" bottom="70px" @go-last="goLast" />
  </div>
</template>
