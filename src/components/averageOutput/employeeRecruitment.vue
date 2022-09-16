<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-12 22:55:35
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-16 11:07:15
 * @FilePath: \big-screen\src\components\averageOutput\employeeRecruitment.vue
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { InterfaceModel } from '~/model'

const propObj = withDefaults(defineProps<{ employeeRecruitmentProp?: Array<InterfaceModel> }>(), { employeeRecruitmentProp: () => [] })
</script>

<template>
  <div class="employee-recruitment-box" wPE-100 hPE-100 po-r>
    <span po-a pot-14 pol-19 class="title">员工招聘</span>
    <div class="employee-recruitment-content" po-a pob-0 polPE-5 prPE-5 wPE-100 hPE-80 flex flex-column-start>
      <div
        v-for="(item, index) in propObj.employeeRecruitmentProp" :key="index" class="employee-recruitment-item" flex
        flex-column-start
      >
        <span class="employee-recruitment-title noticeImg ">{{ item['数据'] }}</span>
        <span class="employee-recruitment-text noticeImg ">{{ item['数值1'] }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.employee-recruitment-box {
  background-image: url("~/assets/image/averageOutput/employeeRecruitment.png");
  background-size: 100% 100%;
  padding-top: 15%;

  .title {
    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;
  }

  .employee-recruitment-content {
    overflow-y: auto;
    position: relative;
    display: flex;

    .employee-recruitment-title {
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #1ADCFF;
      padding: 5px 0;
    }

    .employee-recruitment-text {
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 18px;
      padding: 5px 0;
      white-space: pre-wrap;
    }

    &::-webkit-scrollbar {
      width: 7px;
      height: 7px;
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px #9b9ba3;
      background: rgba(152, 155, 163, 0.5);
      padding-right: 10%;
    }
  }

  .employee-recruitment-item {
    position: absolute;

    &:nth-child(1) {
      animation: anim1 10s linear infinite;
    }

    &:nth-child(2) {
      animation: anim2 10s linear infinite;
    }
  }

  @keyframes anim1 {
    0% {
      top: 0;
      opacity: 1
    }

    45% {
      top: 0;
      opacity: 1
    }

    50% {
      top: -100%;
      opacity: 0
    }

    51% {
      top: 100%;
      opacity: 0
    }

    95% {
      top: 100%;
      opacity: 1
    }

    96% {
      opacity: 1
    }

    100% {
      top: 0;
      opacity: 1
    }
  }

  @keyframes anim2 {
    0% {
      top: 100%;
      opacity: 0
    }

    45% {
      top: 100%;
      opacity: 0
    }

    50% {
      top: 0;
      opacity: 1
    }

    95% {
      top: 0;
      opacity: 1
    }

    100% {
      top: -100%;
      opacity: 0
    }
  }

}
</style>
