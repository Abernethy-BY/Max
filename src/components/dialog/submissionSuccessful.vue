<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-19 16:25:38
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-24 16:09:19
 * @FilePath: \big-screen\src\components\dialog\submissionSuccessful.vue
 * @Description: 提交成功弹窗
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import closeIcon from '~/assets/image/common/closeIcon.png'
import type { MESSAGE_MODEL } from '~/model'
const propObj = withDefaults(defineProps<MESSAGE_MODEL>(), { onCancel: () => { }, onConfirm: () => { } })
const jumpToIndex = () => {
  propObj.onConfirm()
}
</script>

<template>
  <div class="submission-successful-box" flex flex-column-center cross-axis-center po-r>
    <el-image class="close-icon" :src="closeIcon" fit="fill" @click="jumpToIndex" />
    <span>提交成功</span>
    <el-button class="confirm-button" @click="jumpToIndex">
      确定
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.submission-successful-box {
  background: no-repeat url("~/assets/image/pop/submissionSuccessfulBg.png");
  background-size: 100% 100%;

  :deep(.closeIcon) {
    width: 48px;
    height: 48px;
    position: absolute;
    top: 26px;
    right: 19px;
    z-index: 10;
  }

  :deep(.confirm-button) {
    width: 317px;
    height: 53px;
    border: none;
    position: absolute;
    top: 15px;

    span {
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #0A3D75;
      line-height: 33px;
    }
  }

}
</style>
