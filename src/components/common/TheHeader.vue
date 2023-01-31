<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-09 19:25:26
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-31 14:08:18
 * @FilePath: \big-screen\src\components\common\TheHeader.vue
 * @Description:
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import areaIcon from '~/assets/image/common/areaIcon.png'
import timeIcon from '~/assets/image/common/timeIcon.png'

/**
 * @description: 实时时间
 */
const realTime = ref(formatDate(getNowDate(), 'yyyy-MM-dd-cn'))

/**
 * @description: 周数据字典
 */
const weekMap = new Map().set(1, '一').set(2, '二').set(3, '三').set(4, '四').set(5, '五').set(6, '六').set(0, '日')

/**
 * @description: 当前周数据
 */
const nowWeek = ref(`星期${weekMap.get(getNowWeek())}`)

/**
 * @description: 路由对象
 */
const router = useRouter()

/**
 * @description: 跳转登录方法
 * @return {void}
 */
const jumpToLogin = () => {
  const backLen = history.length - 2
  const userInfo = useUserStore()
  userInfo.userCode = ''
  userInfo.token = ''
  userInfo.userRole = ''
  router.go(backLen - (backLen * 2))
}
</script>

<template>
  <div class="the-header-box" hPE-10 flex flex-row-center po-r z-10 cross-axis-center pl-21 pr-27 pb-23>
    <div class="area-select-box" po-a pol-21 h-41 flex cross-axis-center>
      <el-image cursor-p class="area-icon" :src="areaIcon" fit="fill" @click="jumpToLogin" />
      <span fs-20 color="#FFFFFF" ml-9>工业大数据平台</span>
    </div>
    <span fx-40 fw-800 color="#FFFFFF">麦可思工业大数据中心</span>
    <div class="time-box" po-a por-27 h-41 flex cross-axis-center>
      <div class="time-content" flex flex-column-center cross-axis-end>
        <span fs-30 color="#FFFFFF">{{ nowWeek }}</span>
        <span fs-16 color="#9FDBFD">{{ realTime }}</span>
      </div>
      <el-image class="time-icon" :src="timeIcon" fit="fill" />
    </div>
  </div>
</template>

<style lang="scss">
.the-header-box {
  background: no-repeat url("~/assets/image/common/headerBg.png");
  background-size: 100% 100%;

  :deep(.area-icon) {
    width: 43px;
    height: 41px;
  }

  :deep(.time-icon) {
    width: 62px;
    height: 62px;
  }
}
</style>
