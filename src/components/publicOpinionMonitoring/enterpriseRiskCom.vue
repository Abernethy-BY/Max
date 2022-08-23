<!--
 * @Author: By
 * @Date: 2022-07-28 19:29:22
 * @LastEditTime: 2022-08-23 17:55:22
 * @LastEditors: By
 * @Description: 企业风险
 * @FilePath: \big-screen-vue3\src\components\publicOpinionMonitoring\enterpriseRiskCom.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script lang="ts" setup>
import enterpriseRiskBg from '~/assets/image/publicOpinionMonitoring/enterpriseRiskBg.png'
import riskLevelBg from '~/assets/image/publicOpinionMonitoring/riskLevelBg.png'
const prop = defineProps({
  enterpriseRiskComProp: Array,
  riskLevelProp: Array,
})
const riskDistribution = ref()
const input = ref('')

// const data = [220, 182, 191, 234, 290, 330, 310]
// const sideData = data.map(item => item + 4.5)

const riskDistributionOption = ref<any>({

  // backgroundColor: '#041730',
  tooltip: {
    trigger: 'axis',
    formatter: '{b} : {c}',
    axisPointer: { type: 'shadow' },
  },
  grid: {
    left: '5%',
    top: '5%',
    right: '5%',
    bottom: '20%',
  },
  xAxis: {
    data: [],
    // 坐标轴
    axisLine: { lineStyle: { color: '#3eb2e8' } },
    // 坐标值标注
    axisLabel: { show: true, color: '#fff', hideOverlap: false, rotate: 50, margin: 15 },
  },
  yAxis: { show: false },
  series: [{
    name: 'a',
    tooltip: { show: false },
    type: 'bar',
    barWidth: 24.5,
    itemStyle: {

      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: '#0B4EC3' },
          { offset: 0.6, color: '#138CEB' },
          { offset: 1, color: '#17AAFE' },
        ],
        global: false,
      },

    },
    data: [],
    barGap: 0,
  }, {
    type: 'bar',
    barWidth: 8,
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: '#09337C' },
          { offset: 0.6, color: '#0761C0' },
          { offset: 1, color: '#0761C0' },
        ],
        global: false,
      },

    },
    barGap: 0,
    data: [],
  }, {
    name: 'b',
    tooltip: { show: false },
    type: 'pictorialBar',
    itemStyle: {
      borderWidth: 1,
      borderColor: '#0571D5',
      color: '#1779E0',
    },
    symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
    symbolSize: ['30', '12'],
    symbolOffset: ['0', '-11'],
    symbolPosition: 'end',
    data: [],
    z: 3,
  }],
})
const initRiskDistributionChart = () => {
  const riskDistributionChart = eCharts.init(riskDistribution.value)
  riskDistributionOption.value.xAxis.data = prop.enterpriseRiskComProp?.map((e: any) => e?.['数据'])
  riskDistributionOption.value.series[0].data = prop.enterpriseRiskComProp?.map((e: any) => e?.['值1'])

  riskDistributionOption.value.series[1].data = prop.enterpriseRiskComProp?.map((e: any) => e?.['值1'])
  riskDistributionOption.value.series[2].data = prop.enterpriseRiskComProp?.map((e: any) => e?.['值1'])
  riskDistributionChart.setOption(riskDistributionOption.value)
}

watch(() => prop.enterpriseRiskComProp, (val) => {
  initRiskDistributionChart()
})
</script>

<template>
  <div class="enterprise-risk">
    <el-image class="enterprise-risk-bg" :src="enterpriseRiskBg" fit="fill" />
    <el-input v-model="input" class="enterprise-risk-input" placeholder="全部企业">
      <template #suffix>
        <el-icon class="search-icon">
          <i-ep-search />
        </el-icon>
      </template>
    </el-input>

    <div class="risk-distribution-box">
      <span class="risk-distribution-title">企业风险分布</span>
      <div ref="riskDistribution" wPE-100 hPE-100 class="risk-distribution" />
    </div>

    <div class="Risk-level-box">
      <el-image class="Risk-level-bg" :src="riskLevelBg" fit="fill" />
      <span class="Risk-level-title">风险级别分布</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.enterprise-risk {
  width: 100%;
  height: 100%;
  padding: 16px 9px 34px 15px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  align-content: center;

  :deep(.enterprise-risk-bg) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  :deep(.enterprise-risk-input) {
    .el-input__wrapper {
      width: 100%;
      background: rgba(255, 255, 255, 0);

      box-shadow: none !important;
      background-image: url("~/assets/image/publicOpinionMonitoring/inputBg.png");
      background-size: 100% 100%;
      border: none;
    }

    .el-input__inner {
      width: 100%;
      height: 54px;

      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FFFFFF;

      -webkit-padding-start: 30px;

      &::-webkit-input-placeholder{
        color: white;
      }
    }

    .el-input__suffix {
      .el-input__icon {
        font-size: 22px;
        color: #93B1C8;
        margin-right: 22px;
        display: flex;
        align-items: center;
      }
    }

    .search-icon {
      font-size: 22px;
      color: white;
      margin-right: 22px;
    }
  }

  .risk-distribution-box {
    width: 402px;
    height: 53%;
    position: relative;

    :deep(.risk-distribution-bg) {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .risk-distribution-title {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FFFFFF;

      position: absolute;
      left: 17px;
      top: 17px;
      z-index: 10;
    }
  }

  .Risk-level-box {
    width: 402px;
    height: 38%;
    position: relative;

    :deep(.Risk-level-bg) {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

    }

    .Risk-level-title {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FFFFFF;

      position: absolute;
      left: 17px;
      top: 17px;
    }
  }
}
</style>
