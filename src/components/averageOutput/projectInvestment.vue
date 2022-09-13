<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-12 22:53:31
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-13 17:27:51
 * @FilePath: \big-screen\src\components\averageOutput\projectInvestment.vue
 * @Description:项目投资额统计
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
const propObj = defineProps({
  projectInvestmentProp: Array,
})

const pieData = ref<Array<{ name: string; value: string | number; itemStyle: {} }>>([])
const colorList = ['#FFEE62', '#00A8FF', '#FB2F00', '#DD6391']
watch(() => propObj.projectInvestmentProp, () => {
  const sumWithInitial = propObj.projectInvestmentProp?.reduce((previousValue: any, currentValue: any) => previousValue + currentValue?.['数值1'] === '' ? 0 : Number(currentValue?.['数值1']), 0)

  const temp = propObj.projectInvestmentProp?.map((e, i) => {
    return {
      name: e?.['数据'] as string,
      value: sumWithInitial === 0 ? 0 : Number(new Big(Number(e?.['数值1'])).div(sumWithInitial).times(100).toFixed(0)),
      itemStyle: { color: colorList[i] },
    }
  })

  if (temp && temp.length !== 0)
    pieData.value = temp
})
</script>

<template>
  <div class="project-investment-box" po-r wPE-100 hPE-100>
    <span po-a pot-14 pol-19 class="title">项目投资额统计</span>
    <pie3D :pie-prop="pieData" pie-title="项目数据统计" />
  </div>
</template>

<style lang="scss" scoped>
.project-investment-box {
  background-image: url("~/assets/image/averageOutput/statisticsOnTheAmountOfProjectInvestment.png");
  background-size: 100% 100%;

  .title {
    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;
  }
}
</style>

