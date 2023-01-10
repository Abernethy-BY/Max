<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-12-07 17:54:34
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-10 16:53:43
 * @FilePath: \big-screen\src\components\pandect\parkMap.vue
 * @Description: 园区图片组件
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import indexBg from '~/assets/image/Abernethy/aaa.jpg'

const emit = defineEmits(['showMap'])

/**
 * @description: 退回地图方法
 * @return {void}
 */
const goLast = () => {
  emit('showMap')
}
</script>

<template>
  <div wPE-100 hPE-100 po-r>
    <el-image style="width: 100%; height: 98%" :src="indexBg" fit="cover" />
    <!-- <div
      class="icon-box" :style="propObj.iconPosition === 'left' ? { left: '5%' } : { right: '5%' }" po-a pob-50 z-50
      flex-column-start
    >
      <el-image
        class="operate-icon" :src="magnify" fit="fill" @mousedown.prevent="goMagnifyMapStart(mapChart, option)"
        @mouseup.prevent="goMagnifyMapTouchEnd(mapChart, option)"
      />
      <el-image
        class="operate-icon" :src="shrink" fit="fill" @mousedown.prevent="goShrinkMapStart(mapChart, option)"
        @mouseup.prevent="goShrinkMapEnd(mapChart, option)"
      />
      <el-image class="operate-icon" :src="fanhui" fit="fill" @click="goLast" />
    </div> -->
    <map-operate icon-position="left" content-type="parkImage" @go-last="goLast" />
  </div>
</template>
