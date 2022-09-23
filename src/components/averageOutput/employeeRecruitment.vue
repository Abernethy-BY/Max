<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-12 22:55:35
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-23 17:07:24
 * @FilePath: \big-screen\src\components\averageOutput\employeeRecruitment.vue
 * @Description: 招聘信息
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'
import type { InterfaceModel } from '~/model'

const propObj = withDefaults(defineProps<{ employeeRecruitmentProp?: Array<InterfaceModel> }>(), { employeeRecruitmentProp: () => [] })
</script>

<template>
  <div class="employee-recruitment-box" wPE-100 hPE-100 po-r ptPE-15 flex>
    <span po-a pot-14 pol-19 class="title">员工招聘</span>

    <Vue3SeamlessScroll :list="propObj.employeeRecruitmentProp" class="scroll">
      <div v-for="(item, index) in propObj.employeeRecruitmentProp" :key="index" class="item">
        <span class="employee-recruitment-title ">{{ item['数据'] }}</span>
        <span class="employee-recruitment-text ">{{ item['数值1'] }}</span>
      </div>
    </Vue3SeamlessScroll>
  </div>
</template>

<style lang="scss" scoped>
.employee-recruitment-box {
  background-image: url("~/assets/image/averageOutput/employeeRecruitment.png");
  background-size: 100% 100%;

  .title {
    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;
  }

  .scroll {
    width: 415px;
    height: 200px;
    overflow: hidden;
  }

  .scroll .item {
    display: flex;
    flex-direction: column;
    padding: 3px 0 3px 5%;
  }

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
    line-height: 20px;
    padding: 5px 0;
    white-space: pre-wrap;
  }
}
</style>
