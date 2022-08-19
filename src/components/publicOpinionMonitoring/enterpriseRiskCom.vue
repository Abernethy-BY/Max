<!--
 * @Author: By
 * @Date: 2022-07-28 19:29:22
 * @LastEditTime: 2022-08-19 20:36:26
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
})
const riskDistribution = ref()
const input = ref('')

const riskDistributionOption = ref({})
const initRiskDistributionChart = () => {
  const riskDistributionChart = eCharts.init(riskDistribution.value)
  riskDistributionChart.setOption(riskDistributionOption.value)
}

watch(() => prop.enterpriseRiskComProp, (val) => {
  consola.log(prop.enterpriseRiskComProp)
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
      <div ref="riskDistribution" class="risk-distribution" />
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
    // background-color: red;
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
