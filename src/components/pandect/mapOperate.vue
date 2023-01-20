<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-10 16:28:43
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-20 23:07:51
 * @FilePath: \big-screen\src\components\pandect\mapOperate.vue
 * @Description: 地图操作组件
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import magnify from '~/assets/image/pandect/magnify.png'
import shrink from '~/assets/image/pandect/shrink.png'
import fanhui from '~/assets/image/common/navBg/fanhui.png'
const propObj = withDefaults(defineProps<{ iconPosition: string; contentType: string; margin: number | string; bottom: number | string }>(),
  { iconPosition: 'left', contentType: 'map', margin: '5%', bottom: '50px' })

const emit = defineEmits(['goLast', 'magnifyMap', 'shrinkMap'])

/**
 * @description: 退回上级方法
 * @return {*}
 */
const goLast = () => {
  emit('goLast')
}

/**
 * @description: 地图放大倍数定时器
 */
let operateTimeOutEvent: NodeJS.Timeout | number = 0

/**
 * @description: 鼠标按下地图放大按钮
 * @return {void}
 */
const goMagnifyMapStart = () => {
  clearInterval(operateTimeOutEvent)
  operateTimeOutEvent = setInterval(() => {
    emit('magnifyMap')
  }, 600)
}

/**
 * @description: 鼠标抬起地图放大按钮
 * @return {void}
 */
const goMagnifyMapTouchEnd = () => {
  clearInterval(operateTimeOutEvent)
  if (operateTimeOutEvent !== 0)
    emit('magnifyMap')
}

/**
 * @description: 鼠标按下缩小按钮
 * @return {void}
 */
const goShrinkMapStart = () => {
  clearInterval(operateTimeOutEvent)
  operateTimeOutEvent = setInterval(() => {
    emit('shrinkMap')
  }, 600)
}

/**
 * @description: 鼠标抬起缩小按钮
 * @return {void}
 */
const goShrinkMapEnd = () => {
  clearInterval(operateTimeOutEvent)
  if (operateTimeOutEvent !== 0)
    emit('shrinkMap')
}
</script>

<template>
  <div
    class="map-operate-box"
    :style="propObj.iconPosition === 'left' ? { left: propObj.margin, bottom: propObj.bottom } : { right: propObj.margin, bottom: propObj.bottom }"
    po-a z-50 flex-column-start
  >
    <el-image
      v-if="propObj.contentType === 'map'" class="operate-icon" :src="magnify" fit="fill"
      @mousedown.prevent="goMagnifyMapStart()" @mouseup.prevent="goMagnifyMapTouchEnd()"
    />
    <el-image
      v-if="propObj.contentType === 'map'" class="operate-icon" :src="shrink" fit="fill"
      @mousedown.prevent="goShrinkMapStart()" @mouseup.prevent="goShrinkMapEnd()"
    />
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
