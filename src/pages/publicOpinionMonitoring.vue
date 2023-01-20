<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-09 23:30:28
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-19 11:33:50
 * @FilePath: \big-screen\src\pages\publicOpinionMonitoring.vue
 * @Description:舆情监控
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
const userInfo = useUserStore()

const riskClassificationData = ref([])

const latestRisksData = ref([])

const enterpriseRiskLineData = ref([])
const enterpriseRiskPieData = ref([])

const CorporatePublicOpinionLineData = ref([])
const corporatePublicOpinionPieData = ref([])

const getYqjk = async (flag?) => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: userInfo.userCode,
    sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
    type: flag,
  }
  const res: any = await yqjk(param)

  latestRisksData.value = res?.find(e => e['位置'] === '最新风险')
  enterpriseRiskLineData.value = res?.filter(e => e['位置'] === '企业风险分布')
  enterpriseRiskPieData.value = res?.filter(e => e['位置'] === '风险级别分布')
  CorporatePublicOpinionLineData.value = res?.filter(e => e['位置'] === '企业舆情分布')
  corporatePublicOpinionPieData.value = res?.filter(e => e['位置'] === '舆情级别分布')
  riskClassificationData.value = res?.filter(e => e['位置'] === '右下')
}

getYqjk()
</script>

<template>
  <div wPE-100 hPE-100 flex flex-row-between pbPE-3>
    <div flex-shrink-0 flex-basis-0 flex-basis-PE-31>
      <enterpriseRiskCom
        title="企业风险" :enterprise-risk-com-line-prop="enterpriseRiskLineData"
        :pie-prop="enterpriseRiskPieData" @edit-confirm="getYqjk"
      />
    </div>
    <div flex-shrink-0 flex-basis-0 flex-basis-PE-31>
      <enterpriseRiskCom
        title="企业舆情" :enterprise-risk-com-line-prop="CorporatePublicOpinionLineData"
        :pie-prop="corporatePublicOpinionPieData" @edit-confirm="getYqjk"
      />
    </div>
    <div flex-shrink-0 flex-basis-0 flex-basis-PE-31>
      <newRisk :latest-risks-prop="latestRisksData" :risk-classification-prop="riskClassificationData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.public-opinion-monitoring-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 47px;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  .company-box {
    width: 440px;
    height: 100%;

    .button-box {
      width: 100%;
      height: 52px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 26px;

      .risk-button {
        width: 159px;
        height: 52px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #92fcff;

        background-image: url("~/assets/image/publicOpinionMonitoring/buttonBg.png");
        background-size: cover;

        &.click-button {
          background-image: url("~/assets/image/publicOpinionMonitoring/clickButtonBg.png");
          background-size: cover;
        }
      }
    }

    .enterprise-risk-box {
      margin-top: 16px;
      width: 100%;
      height: calc(100% - 68px);
    }
  }

  .new-risk-box {
    width: 472px;
    height: 100%;
  }
}
</style>
