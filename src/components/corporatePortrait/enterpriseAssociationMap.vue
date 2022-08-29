<!--
 * @Author: By
 * @Date: 2022-07-28 10:36:05
 * @LastEditTime: 2022-08-29 20:18:56
 * @LastEditors: By
 * @Description: 企业关联图谱
 * @FilePath: \big-screen-vue3\src\components\corporatePortrait\enterpriseAssociationMap.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script lang="ts" setup>
const enterpriseAssociationChart = ref()

const option = ref({
  title: {
    text: 'Basic Graph',
  },
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'none',
      symbolSize: 50,
      roam: true,
      label: { show: true },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      edgeLabel: { fontSize: 20 },
      data: [
        { name: 'Node 1', x: 300, y: 300 },
        { name: 'Node 2', x: 800, y: 300 },
        { name: 'Node 3', x: 550, y: 100 },
        { name: 'Node 4', x: 550, y: 500 },
      ],
      // links: [],
      links: [
        {
          source: 0,
          target: 1,
          symbolSize: [5, 20],
          label: { show: true },
          lineStyle: { width: 5, curveness: 0.2 },
        },
        {
          source: 'Node 2',
          target: 'Node 1',
          label: { show: true },
          lineStyle: { curveness: 0.2 },
        },
        { source: 'Node 1', target: 'Node 3' },
        { source: 'Node 2', target: 'Node 3' },
        { source: 'Node 2', target: 'Node 4' },
        { source: 'Node 1', target: 'Node 4' },
      ],
      lineStyle: { opacity: 0.9, width: 2, curveness: 0 },
    },
  ],
})
</script>

<template>
  <div class="enterprise-association-map">
    <span class="enterprise-association-map-title">企业关联图谱 </span>
    <div ref="enterpriseAssociationChart" />
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
