<!--
 * @Author: By
 * @Date: 2022-07-28 16:28:05
 * @LastEditTime: 2022-08-19 16:46:17
 * @LastEditors: By
 * @Description:
 * @FilePath: \big-screen-vue3\src\components\enterprise\subItemization.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script>
import RDInvestment from '~/assets/image/enterprise/R&DInvestment.png'
import investmentTargetsBg from '~/assets/image/enterprise/investmentTargetsBg.png'
import outputBg from '~/assets/image/enterprise/outputBg.png'
import achievementRateBg from '~/assets/image/enterprise/achievementRateBg.png'
import foreignTradeBg from '~/assets/image/enterprise/foreignTradeBg.png'
import totalProfitBg from '~/assets/image/enterprise/totalProfitBg.png'
import keyAreasBg from '~/assets/image/enterprise/keyAreasBg.png'
import taxAmountBg from '~/assets/image/enterprise/taxAmountBg.png'
import governmentSubsidiesBg from '~/assets/image/enterprise/governmentSubsidiesBg.png'
import energyConsumptionBg from '~/assets/image/enterprise/energyConsumptionBg.png'
import businessIncomeBg from '~/assets/image/enterprise/businessIncomeBg.png'
import powerConsumptionBg from '~/assets/image/enterprise/powerConsumptionBg.png'
import statisticalEnterprisesBg from '~/assets/image/enterprise/statisticalEnterprisesBg.png'
import averageIndexPerAcreBg from '~/assets/image/enterprise/averageIndexPerAcreBg.png'

export default {
  props: ['subItemizationProp'],
  data() {
    return {
      subItemizationList: [[
        { image: RDInvestment, label: '产业总研发投入', value: '', unit: '亿元' },
        { image: investmentTargetsBg, label: '产业招商目标', value: '', unit: '亿元' },
        { image: outputBg, label: '产业总产值', value: '', unit: '亿元' },
        { image: achievementRateBg, label: '产业目标达成率', value: '', unit: '亿元' },
        { image: foreignTradeBg, label: '产业内贸与外贸占比', value: '', unit: '亿元' },
        { image: totalProfitBg, label: '利润总额', value: '', unit: '亿元' },
        { image: keyAreasBg, label: '产业全国重点区域', value: '', unit: '亿元' },
      ], [
        { image: taxAmountBg, label: '税收额', value: '', unit: '亿元' },
        { image: governmentSubsidiesBg, label: '产业政府补贴', value: '', unit: '亿元' },
        { image: energyConsumptionBg, label: '能耗', value: '', unit: '亿元' },
        { image: businessIncomeBg, label: '重点企业主营业务收入', value: '', unit: '亿元' },
        { image: powerConsumptionBg, label: '电耗', value: '', unit: '亿元' },
        { image: statisticalEnterprisesBg, label: '纳入统计企业', value: '', unit: '亿元' },
        { image: averageIndexPerAcreBg, label: '亩均指数', value: '', unit: '亿元' },
      ]],
    }
  },
  watch: {
    subItemizationProp() { this.initSubItemization() },
  },
  methods: {
    initSubItemization() {
      this.subItemizationList[0].forEach((element) => {
        this.subItemizationProp.forEach((propElement) => {
          if (element.label === propElement['数据'])
            element.value = propElement['值1']
        })
      })
      this.subItemizationList[1].forEach((element) => {
        this.subItemizationProp.forEach((propElement) => {
          if (element.label === propElement['数据'])
            element.value = propElement['值1']
        })
      })
    },
  },
}
</script>

<template>
  <div class="subItemization">
    <div v-for="(item, index) in subItemizationList" :key="index" class="sub-itemization-row">
      <div v-for="(colItem, colIndex) in item" :key="colIndex" class="sub-itemization-col">
        <el-image class="sub-itemization-image" :src="colItem.image" fit="fill" />
        <div class="sub-itemization-main">
          <span class="sub-itemization-value">
            {{ colItem.value }}
            <span class="sub-itemization-unit">{{ colItem.unit }}</span></span>
          <span class="sub-itemization-label">{{ colItem.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.subItemization {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  * {
    box-sizing: border-box;
  }

  .sub-itemization-row {
    display: flex;
    justify-content: space-between;

    &:last-child {
      margin-top: 18px;
    }

    .sub-itemization-col {
      width: 235px;
      height: 83px;
      position: relative;
      display: flex;

      :deep(.sub-itemization-image) {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }

      .sub-itemization-main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px 0 18px;
        margin-left: 40%;

        .sub-itemization-value {
          font-size: 26px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #F8B62D;
          display: flex;
          align-items: center;
        }

        .sub-itemization-unit {
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #FFFFFF;
          margin-left: 11px;
        }

        .sub-itemization-label {
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #FFFFFF;
        }
      }

    }
  }
}
</style>
