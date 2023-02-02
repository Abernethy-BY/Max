<script lang="ts" setup>
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

const propObj = defineProps({ subItemizationProp: Array })
const span = ref()

const subItemizationList = ref([
  { image: RDInvestment, label: '产业总研发投入', value: '', unit: '亿元' },
  { image: investmentTargetsBg, label: '产业招商目标', value: '', unit: '亿元' },
  { image: achievementRateBg, label: '产业目标达成率', value: '', unit: '%' },
  { image: outputBg, label: '产业总产值', value: '', unit: '亿元' },
  { image: foreignTradeBg, label: '产业内贸与外贸占比', value: '', unit: '%' },
  { image: keyAreasBg, label: '产业全国重点区域', value: '', unit: '亿元' },
  { image: governmentSubsidiesBg, label: '产业政府补贴', value: '', unit: '亿元' },

  { image: totalProfitBg, label: '利润总额', value: '', unit: '亿元' },
  { image: taxAmountBg, label: '税收额', value: '', unit: '亿元' },
  { image: energyConsumptionBg, label: '水耗', value: '', unit: '万度' },
  { image: powerConsumptionBg, label: '电耗', value: '', unit: '亿度' },
  { image: businessIncomeBg, label: '重点企业主营业务收入', value: '', unit: '亿元' },
  { image: statisticalEnterprisesBg, label: '纳入统计企业', value: '', unit: '家' },
  { image: averageIndexPerAcreBg, label: '亩均指数', value: '', unit: '%' },
])

watch(() => propObj.subItemizationProp, () => {
  subItemizationList.value.forEach((element, index) => {
    propObj?.subItemizationProp?.forEach((propElement: any) => {
      if (element.label === propElement['数据']) {
        let temp = 3000
        if (index <= 2)
          temp = 3000

        else if (index > 2 && index <= 6)
          temp = 5000

        else if (index > 6 && index <= 9)
          temp = 6000
        else
          temp = 7000

        anime({
          targets: span.value[index],
          innerHTML: [0, propElement['值1']],
          easing: 'linear',
          round: 10,
          duration: temp,
        })
      }
    })
  })
})
</script>

<template>
  <div class="subItemization" wPE-100 hPE-100 po-r flex fw elastic-longitudinal-axis-between flex-row-between>
    <div v-for="(item, index) in subItemizationList" :key="index" class="content-item" po-r wPE-13 hPE-48>
      <el-image class="sub-itemization-image" :src="item.image" fit="contain" />
      <div hPE-100 flex flex-column-between mlPE-40 style="padding: 15px 0 18px;">
        <span ref="span" class="sub-itemization-value">
          <!-- {{ item.value }} -->
          <span class="sub-itemization-unit">{{ item.unit }}</span>
        </span>
        <span class="sub-itemization-label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.subItemization {
  :deep(.sub-itemization-image) {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

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
</style>
