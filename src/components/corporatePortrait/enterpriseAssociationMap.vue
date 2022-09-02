<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-01 16:29:28
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-02 10:07:40
 * @FilePath: \big-screen\src\components\corporatePortrait\enterpriseAssociationMap.vue
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
const propObj = defineProps({
  enterpriseAssociationMapProp: Object,
})
const enterpriseAssociationRef = ref()

const option: any = {
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series:
  {
    type: 'graph',
    layout: 'circular',
    symbolSize: 50,
    roam: false,
    label: { show: true },
    left: 'center',
    top: '10%',
    width: '100%',
    height: '100%',
    edgeSymbolSize: [4, 10],
    edgeLabel: { fontSize: 20 },
    lineStyle: { width: 5, curveness: 0.2 },
    data: [],
    zoom: 0.6,
    links: [],
  },

}

watch(() => propObj.enterpriseAssociationMapProp, () => {
  const centerArr = [{ name: propObj.enterpriseAssociationMapProp?.['数据'] }]
  const perimeterArr = propObj.enterpriseAssociationMapProp?.['值1'].split(',').map((e) => { return { name: e } })
  option.series.data = centerArr.concat(perimeterArr)
  option.series.links = perimeterArr.map((e, i) => {
    return {
      id: i + 1,
      source: centerArr[0].name,
      target: e.name,
    }
  })
  const enterpriseAssociationChart = eCharts.init(enterpriseAssociationRef.value)
  enterpriseAssociationChart?.setOption(option)

  window.addEventListener('resize', () => {
    enterpriseAssociationChart.resize()
  })
})
</script>

<template>
  <div class="enterprise-association-map flex cross-axis-end">
    <span class="enterprise-association-map-title">企业关联图谱 </span>
    <div ref="enterpriseAssociationRef" wPE-100 hPE-100 />
  </div>
</template>

<style lang="scss" scoped>
.enterprise-association-map {
  width: 100%;
  height: 100%;
  background-image: url("~/assets/image/corporatePortrait/riskIndex/riskIndex.png");
  background-size: 100% 100%;
  position: relative;

  .enterprise-association-map-title {
    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;
    position: absolute;
    top: 13px;
    left: 16px;
    box-sizing: border-box;

  }
}
</style>
