<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-10-11 10:50:27
 * @FilePath: \big-screen\src\components\corporatePortrait\economicalOperation.vue
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import revenue from '~/assets/image/corporatePortrait/economicalOperation/revenue.png'
import domesticAndForeignTrade from '~/assets/image/corporatePortrait/economicalOperation/domesticAndForeignTrade.png'
import profit from '~/assets/image/corporatePortrait/economicalOperation/profit.png'
import taxation from '~/assets/image/corporatePortrait/economicalOperation/taxation.png'
import DInvestment from '~/assets/image/corporatePortrait/economicalOperation/R&DInvestment.png'
import industrialSales from '~/assets/image/corporatePortrait/economicalOperation/industrialSales.png'
import totalAssets from '~/assets/image/corporatePortrait/economicalOperation/totalAssets.png'
import zichanzongjiBg from '~/assets/image/corporatePortrait/economicalOperation/zichanzongjiBg.png'
const propObj = defineProps({ economicalOperationProp: Array })
const span = ref()
const economicalOperationList = ref([
  { bg: revenue, value: '', label: '主营业务收入', remark: '', unit: '万元' },
  { bg: domesticAndForeignTrade, value: '', label: '内贸与外贸占比', remark: '', unit: '%' },
  { bg: profit, value: '', label: '利润', remark: '', unit: '万元' },
  { bg: taxation, value: '', label: '税收', remark: '', unit: '万元' },
  { bg: DInvestment, value: '', label: '研发投入', remark: '', unit: '万元' },
  { bg: industrialSales, value: '', label: '工业销售总产值', remark: '', unit: '万元' },
  { bg: totalAssets, value: '', label: '资产总计', remark: '', unit: '万元' },
  { bg: zichanzongjiBg, value: '', label: '企业目标总额', remark: '', unit: '万元' },
])

watch(() => propObj.economicalOperationProp, () => {
  economicalOperationList.value.forEach((element, index) => {
    const temp = propObj.economicalOperationProp?.find(e => e?.['数据'] === element.label)
    anime({
      targets: span.value[index],
      innerHTML: [0, temp?.['值1']],
      easing: 'linear',
      round: 10,
      duration: 5000,
    })
    element.remark = propObj.economicalOperationProp?.find(e => e?.['数据'] === element.label)?.['值2']
  })
})
</script>

<template>
  <div class="corporatePortrait">
    <span class="economical-operation-title">经济运行总览 </span>
    <div v-for="(item, index) in economicalOperationList" :key="index" class="economical-operation-item">
      <el-image class="economical-operation-bg" :src="item.bg" fit="fill" />
      <div class="economical-operation-content">
        <span ref="span" class="economical-operation-value">{{ item.value }}
          <span class="economical-operation-unit" fs-12 color="#ffffff" fw-400>{{ item.unit }}</span>
        </span>
        <span class="economical-operation-label">{{ item.label }}</span>
      </div>
      <span ref="remark" class="economical-operation-remark">{{ item.remark }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.corporatePortrait {
  width: 100%;
  height: 100%;
  background-image: url("~/assets/image/corporatePortrait/economicalOperation/economicalOperationBg.png");

  background-size: 100% 100%;
  position: relative;
  padding: 65px 15px 21px 15px;

  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
  justify-content: flex-start;

  .economical-operation-title {
    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;

    position: absolute;
    top: 14px;
    left: 16px;
  }

  .economical-operation-item {
    width: calc(50% - 4.5px);
    height: 62px;
    position: relative;
    display: flex;
    align-items: center;
    margin: 4.5px 4.5px;
    overflow: hidden;

    &:nth-child(even) {
      margin-left: 0;
    }

    &:nth-child(odd) {
      margin-right: 0;
    }

    :deep(.economical-operation-bg) {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }

    .economical-operation-content {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      margin-left: 32%;

      .economical-operation-label {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
      }

      .economical-operation-value {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #F8B62D;
      }
    }

    .economical-operation-remark {
      width: 162px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotate(45deg);
      position: absolute;
      top: 17%;
      right: -34%;
      background-color: #0075EA;

      font-size: 10px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #FFFFFF;
    }
  }

}
</style>
