<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-12 22:57:45
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-14 17:43:57
 * @FilePath: \big-screen\src\components\averageOutput\projectInvestmentTable.vue
 * @Description:项目投资统计
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import gdpBg from '~/assets/image/averageOutput/gdpBg.png'
import parkTaxationBg from '~/assets/image/averageOutput/parkTaxationBg.png'
import keyIndustriesBg from '~/assets/image/averageOutput/keyIndustriesBg.png'
import keyCorporateTaxationBg from '~/assets/image/averageOutput/keyCorporateTaxationBg.png'
import type { InterfaceModel } from '~/model'
const propObj = withDefaults(defineProps<{ projectInvestmentTableProp?: Array<InterfaceModel> }>(), { projectInvestmentTableProp: () => [] })

const list = ref<Array<{ label: string; bg: any; value: string | number; unit: string }>>([
  { label: '园区GDP', bg: gdpBg, value: 0, unit: 'm²/元' },
  { label: '园区税收', bg: parkTaxationBg, value: 0, unit: 'm²/元' },
  { label: '园区重点企业税收', bg: keyIndustriesBg, value: 0, unit: 'm²/元' },
  { label: '重点企业税收', bg: keyCorporateTaxationBg, value: 0, unit: 'm²/元' },
])
watch(() => propObj.projectInvestmentTableProp, () => {
  consola.info(propObj.projectInvestmentTableProp)
  propObj.projectInvestmentTableProp.forEach((element) => {
    const temp = list.value.find(e => e.label === element.数据)
    if (temp)
      temp.value = element.数值1.substring(0, element.数值1.length - 4)
  })
})
</script>

<template>
  <div class="project-investment-table-box" wPE-100 hPE-100 flex fw flex-row-between elastic-longitudinal-axis-start>
    <div v-for="(item, index) in list" :key="index" h-78 flex-basis-PE-48 mtPE-4 po-r flex flex-column-center plPE-17>
      <el-image class="item-bg" :src="item.bg" fit="cover" />
      <span class="value">{{ item.value }} <span class="unit">{{ item.unit }}</span></span>
      <span class="label"> {{ item.label }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-investment-table-box {
  :deep(.item-bg) {

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .value {
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #F8B62D;
    line-height: 22px;
    white-space: nowrap;
  }

  .label {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
    white-space: nowrap;
  }

  .unit {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
    white-space: nowrap;
  }
}
</style>
