<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-21 19:56:20
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-21 20:56:19
 * @FilePath: \big-screen\src\components\login\enterInformation.vue
 * @Description:信息录入
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import closeIcon from '~/assets/image/login/closeIcon.png'
import headerBg from '~/assets/image/login/headerBg.png'
// headerBg
/**
 * @description: 弹窗弹出标识
 */
const enterInformationFlag = ref<boolean>(false)

/**
 * @description: 弹窗弹出方法
 * @return {*}
 */
const openPop = () => {
  enterInformationFlag.value = true
}

defineExpose({ openPop })
</script>

<template>
  <div v-if="enterInformationFlag" flex flex-column-start wPE-52 hPE-88 po-r z-10 class="enter-information-box">
    <el-image class="close-icon" :src="closeIcon" fit="cover" />
    <header mt-17 po-r flex flex-row-center cross-axis-center wPE-100>
      <el-image class="header-bg" :src="headerBg" fit="cover" />
      <span>录入企业、园区信息</span>
    </header>
    <main mt-17 flex-1 />
    <footer wPE-100 h-32 mt-34 flex flex-row-center mb-21>
      <el-button class="next-button" type="primary">
        下一步
      </el-button>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.enter-information-box {
  background: rgba(2, 56, 152, 0.9);
  border: 1px solid #1A8BFF;
  border-radius: 7px;

  :deep(.close-icon) {
    width: 39px;
    height: 39px;
    position: absolute;
    top: 14px;
    right: 13px;
  }

  header {
    :deep(.header-bg) {
      position: absolute;
      height: 10px;
      width: 60%;
      z-index: 1;
    }

    span {
      font-size: 21px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #1ADCFF;
      display: flex;
      line-height: 21px;
    }
  }

  main {}

  footer {
    :deep(.next-button) {
      width: 80px;
      height: 32px;
      background: #1ADCFF;
      border-radius: 3px;

      span {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #02389B;
        line-height: 25px;
      }
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: login
</route>

