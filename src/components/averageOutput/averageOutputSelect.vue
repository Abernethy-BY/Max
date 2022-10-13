<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-13 19:44:07
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-10-13 18:30:01
 * @FilePath: \big-screen\src\components\averageOutput\averageOutputSelect.vue
 * @Description: 亩均产值选择器
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import triangleImage from '~/assets/image/averageOutput/triangle.png'
import type { InterfaceModel } from '~/model'

const propObj = withDefaults(defineProps<{ industrialProjectsProp?: Array<InterfaceModel>; averagePerAcreIndustryProp?: Array<InterfaceModel> }>(), {
  industrialProjectsProp: () => [], averagePerAcreIndustryProp: () => [],
})

const selectBoxIndex = ref(0)

const clickSelectFun = (val) => {
  selectBoxIndex.value = val
}
</script>

<template>
  <div wPE-100 hPE-100 class="average-output-select-box" flex>
    <div class="select-box" :class="selectBoxIndex === 0 ? 'selectBox' : 'notSelectBox'" w-159 h-52 po-r>
      <span wPE-100 hPE-100 class="select-title" @click="clickSelectFun(0)">工业项目</span>
      <el-image class="triangle" :src="triangleImage" fit="cover" />
      <div v-if="selectBoxIndex === 0" style="background:rgba(30,84,242,0.4);" mt-5 wPE-100 br-7>
        <div
          v-for="(item, index) in propObj.industrialProjectsProp" :key="index" flex flex-row-center cross-axis-center
          wPE-100 h-60 class="select-option-item" po-r
        >
          {{ item['数据'] }}
        </div>
      </div>
    </div>
    <div class="select-box" :class="selectBoxIndex === 1 ? 'selectBox' : 'notSelectBox'" w-159 h-52 po-r mlPE-5>
      <span wPE-100 hPE-100 class="select-title" @click="clickSelectFun(1)">产业项目</span>
      <el-image class="triangle" :src="triangleImage" fit="cover" />
      <div v-if="selectBoxIndex !== 0" style="background:rgba(30,84,242,0.4);" mt-5 wPE-100 br-7>
        <div
          v-for="(item, index) in propObj.averagePerAcreIndustryProp" :key="index" flex flex-row-center
          cross-axis-center wPE-100 h-60 class="select-option-item" po-r
        >
          {{ item['数据'] }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.average-output-select-box {
  .select-box {

    &.selectBox {
      background: no-repeat url("~/assets/image/averageOutput/checkBg.png");
      background-size: 100% 100%;

    }

    &.notSelectBox {
      background: no-repeat url("~/assets/image/averageOutput/notSelectBox.png");
      background-size: 100% 100%;

    }

    .select-title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #92FCFF;
    }

    :deep(.triangle) {
      position: absolute;
      width: 7px;
      height: 7px;
      right: 8%;
      bottom: 21%;
    }

    .select-option-item {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 12px;

      &:after {
        content: "";
        height: 1px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #00225B;
      }
    }

  }
}
</style>
