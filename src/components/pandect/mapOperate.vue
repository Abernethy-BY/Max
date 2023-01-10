<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-10 16:28:43
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-10 16:50:19
 * @FilePath: \big-screen\src\components\pandect\mapOperate.vue
 * @Description: 地图操作组件
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import magnify from '~/assets/image/pandect/magnify.png'
import shrink from '~/assets/image/pandect/shrink.png'
import fanhui from '~/assets/image/common/navBg/fanhui.png'
const propObj = withDefaults(defineProps<{ iconPosition: string; contentType: string }>(), { iconPosition: 'left', contentType: 'map' })

const emit = defineEmits(['goLast'])

/**
 * @description: 退回上级方法
 * @return {*}
 */
const goLast = () => {
  emit('goLast')
}
</script>

<template>
  <div
    class="map-operate-box" :style="propObj.iconPosition === 'left' ? { left: '5%' } : { right: '5%' }" po-a pob-50
    z-50 flex-column-start
  >
    <!-- {{ propObj.contentType }} -->
    <!-- <el-image
      class="operate-icon" :src="magnify" fit="fill" @mousedown.prevent="goMagnifyMapStart(mapChart, option)"
      @mouseup.prevent="goMagnifyMapTouchEnd(mapChart, option)"
    /> -->
    <el-image v-if="propObj.contentType === 'map'" class="operate-icon" :src="magnify" fit="fill" />
    <!-- <el-image
      class="operate-icon" :src="shrink" fit="fill" @mousedown.prevent="goShrinkMapStart(mapChart, option)"
      @mouseup.prevent="goShrinkMapEnd(mapChart, option)"
    /> -->
    <el-image v-if="propObj.contentType === 'map'" class="operate-icon" :src="shrink" fit="fill" />
    <!-- <el-image class="operate-icon" :src="fanhui" fit="fill" @click="goLast" /> -->
    <el-image class="operate-icon" :src="fanhui" fit="fill" @click="goLast" />
  </div>
</template>

<style lang="scss" scoped>
.map-operate-box {
  :deep(.operate-icon) {
    margin: 10px 0;
    cursor: pointer;
  }
}
</style>
