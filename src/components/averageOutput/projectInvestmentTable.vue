<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-12 22:57:45
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-02 16:43:24
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

const span = ref()
const list = ref<Array<{ label: string; bg: any; value: string | number; unit: string }>>([
  { label: '园区GDP', bg: gdpBg, value: 0, unit: '亿元/km²' },
  { label: '园区税收', bg: parkTaxationBg, value: 0, unit: '亿元/km²' },
  { label: '园区重点企业税收', bg: keyIndustriesBg, value: 0, unit: '亿元/km²' },
  { label: '重点企业税收', bg: keyCorporateTaxationBg, value: 0, unit: '亿元/km²' },
])
watch(() => propObj.projectInvestmentTableProp, () => {
  list.value.forEach((element, index) => {
    const temp = propObj.projectInvestmentTableProp.find(e => element.label === e.数据)
    if (temp) {
      const maxTemp = temp?.数值1?.substring(0, temp?.数值1.length - 4)
      anime({
        targets: span.value[index],
        innerHTML: [0, maxTemp],
        easing: 'linear',
        round: 10,
        duration: 5000,
      })
    }
  })
})
</script>

<template>
  <div class="project-investment-table-box" wPE-100 hPE-100 flex fw flex-row-between elastic-longitudinal-axis-start>
    <div v-for="(item, index) in list" :key="index" h-78px flex-basis-PE-48 mtPE-4 po-r flex flex-column-center plPE-17>
      <el-image class="item-bg" :src="item.bg" fit="cover" />
      <span class="value">
        <span ref="span" />
        <span class="unit">{{ item.unit }}</span>
      </span>
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
    font-size: 21px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #F8B62D;
    line-height: 22px;
    white-space: nowrap;
  }

  .label {
    font-size: 14px;
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
