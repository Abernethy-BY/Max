<!--
 * @Author: By
 * @Date: 2022-07-28 17:20:30
 * @LastEditTime: 2022-08-23 17:59:53
 * @LastEditors: By
 * @Description: 舆情监控
 * @FilePath: \big-screen-vue3\src\pages\publicOpinionMonitoring.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script lang="ts" setup>
const userInfo = useUserStore()
const clickFlag = ref('enterpriseRisk')

const enterpriseRiskComData = ref([])
const riskLevelData = ref([])
const riskClassificationData = ref([])

const latestRisksData = ref([])
const risk = (flag) => {
  if (flag === clickFlag.value)
    return
  clickFlag.value = flag
}

const getYqjk = async () => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: userInfo.userCode,
    sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
  }
  const res: any = await yqjk(param)
  consola.info(res)
  enterpriseRiskComData.value = res?.filter(e => e['位置'] === '企业风险分布')
  riskLevelData.value = res?.filter(e => e['位置'] === '风险级别分布')

  latestRisksData.value = res?.find(e => e['位置'] === '最新风险')

  riskClassificationData.value = res?.filter(e => e['位置'] === '右下')
}

getYqjk()
</script>

<template>
  <div class="public-opinion-monitoring-box">
    <div class="company-box">
      <div class="button-box">
        <div
          class="risk-button" :class="clickFlag === 'enterpriseRisk' ? 'click-button' : ''"
          @click="risk('enterpriseRisk')"
        >
          企业风险
        </div>
        <!-- <div
          class="risk-button" :class="clickFlag === 'corporatePublicOpinion' ? 'click-button' : ''"
          @click="risk('corporatePublicOpinion')"
        >
          企业舆情
        </div> -->
      </div>

      <div class="enterprise-risk-box">
        <enterpriseRiskCom :enterprise-risk-com-prop="enterpriseRiskComData" :risk-level-prop="riskLevelData" />
      </div>
    </div>

    <!-- 最新风险 -->
    <div class="new-risk-box">
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
// src\assets\image\publicOpinionMonitoring\publicOpinionMonitoringBg.png
  background-image: url("~/assets/image/publicOpinionMonitoring/publicOpinionMonitoringBg.png");
  background-size: cover;

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
