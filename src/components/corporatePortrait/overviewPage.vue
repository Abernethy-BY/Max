<script lang="ts" setup>
import left from '~/assets/image/corporatePortrait/overview/left.png'
import right from '~/assets/image/corporatePortrait/overview/right.png'
import importAndExportCreditImage from '~/assets/image/corporatePortrait/overview/importAndExportCreditImage.png'
import financingNeeds from '~/assets/image/corporatePortrait/overview/financingNeeds.png'
import holdingCompany from '~/assets/image/corporatePortrait/overview/holdingCompany.png'
import administrativeLicensing from '~/assets/image/corporatePortrait/overview/administrativeLicensing.png'
import legalProceedings from '~/assets/image/corporatePortrait/overview/legalProceedings.png'
import plotPublicity from '~/assets/image/corporatePortrait/overview/plotPublicity.png'
import landPurchaseInformation from '~/assets/image/corporatePortrait/overview/landPurchaseInformation.png'
import newsAndPublicOpinion from '~/assets/image/corporatePortrait/overview/newsAndPublicOpinion.png'
import corporateAnnualReport from '~/assets/image/corporatePortrait/overview/corporateAnnualReport.png'
import powerConsumption from '~/assets/image/corporatePortrait/overview/powerConsumption.png'
import energyConsumption from '~/assets/image/corporatePortrait/overview/energyConsumption.png'
import governmentSubsidies from '~/assets/image/corporatePortrait/overview/governmentSubsidies.png'
import spotChecks from '~/assets/image/corporatePortrait/overview/spotChecks.png'
import qiyefengxianBg from '~/assets/image/corporatePortrait/overview/qiyefengxianBg.png'
import rongyaoBg from '~/assets/image/corporatePortrait/overview/rongyaoBg.png'

const propObj = defineProps({ overviewProp: Array, highTechEnterpriseListProp: Array, newEnterprisesListProp: Array })

const cardShow = ref()

const span = ref()

const HighTechEnterpriseList = ref<any>([])
const newEnterprisesList = ref<any>([])

const handoffFun = (flag) => {
  if (flag === 'left')
    cardShow.value.next()
  else cardShow.value.prev()
}

const subItemizationList = ref([
  { label: '进出口信用', value: '', image: importAndExportCreditImage },
  { label: '融资需求', value: '', image: financingNeeds },
  { label: '控股企业', value: '', image: holdingCompany },
  { label: '行政许可', value: '', image: administrativeLicensing },
  { label: '法律诉讼', value: '', image: legalProceedings },

  { label: '地块公示', value: '', image: plotPublicity },
  { label: '购地信息', value: '', image: landPurchaseInformation },
  { label: '抽查检查', value: '', image: spotChecks },
  { label: '新闻舆情', value: '', image: newsAndPublicOpinion },
  { label: '企业年报', value: '', image: corporateAnnualReport },

  { label: '电耗', value: '', image: powerConsumption },
  { label: '能耗', value: '', image: energyConsumption },
  { label: '政府补贴', value: '', image: governmentSubsidies },
  { label: '企业风险', value: '', image: qiyefengxianBg },
  { label: '企业荣誉', value: '', image: rongyaoBg },
])

watch(() => propObj.highTechEnterpriseListProp, () => {
  HighTechEnterpriseList.value = propObj.highTechEnterpriseListProp?.map((e: any) => e['值1'])
})

watch(() => propObj.newEnterprisesListProp, () => {
  newEnterprisesList.value = propObj.newEnterprisesListProp?.map((e: any) => e['值1'])
})

watch(() => propObj.overviewProp, () => {
  subItemizationList.value.forEach((element, index) => {
    const temp = propObj.overviewProp?.find((e: any) => element.label === e['数据'])
    anime({
      targets: span.value[index],
      innerHTML: [0, temp?.['值1']],
      easing: 'linear',
      round: 10,
      duration: 6000,
    })
  })
})
</script>

<template>
  <div class="overview" wPE-100 hPE-100 flex flex-column-between>
    <el-carousel ref="cardShow" class="overview-top" :autoplay="true" height="100%" arrow="never">
      <el-carousel-item v-for="item in 4" :key="item">
        <div class="overview-content">
          <div class="overview-content-item">
            <span class="overview-content-item-title">高新技术企业</span>
            <el-image
              v-for="(imgItem, imgIndex) in HighTechEnterpriseList" :key="imgIndex"
              class="overview-content-item-main" :src="imgItem" fit="contain"
            />
          </div>
          <div class="overview-content-item">
            <span class="overview-content-item-title">专精特新企业</span>
            <el-image
              v-for="(imgItem, imgIndex) in newEnterprisesList" :key="imgIndex"
              class="overview-content-item-main" :src="imgItem" fit="contain"
            />
          </div>
        </div>
      </el-carousel-item>
      <el-image class="left" :src="left" fit="fill" @click="handoffFun('left')" />
      <el-image class="right" :src="right" fit="fill" @click="handoffFun('right')" />
    </el-carousel>

    <div wPE-100 hPE-55 flex fw flex-row-between elastic-longitudinal-axis-between>
      <div
        v-for="(item, index) in subItemizationList" :key="index" wPE-19 hPE-30 flex flex-row-between
        cross-axis-center
      >
        <el-image class="sub-itemization-image" :src="item.image" fit="fill" />
        <div class="sub-itemization-main">
          <span ref="span" class="sub-itemization-value">{{
            item.value
          }}</span>
          <span class="sub-itemization-label">{{
            item.label
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overview {
  :deep(.overview-top) {
    width: 100%;
    height: 42%;
    position: relative;

    .left {
      width: 32px;
      height: 64px;
      position: absolute;
      left: 0;
      z-index: 99;
      cursor: pointer;
    }

    .right {
      width: 32px;
      height: 64px;
      position: absolute;
      right: 0;
      z-index: 99;
      cursor: pointer;
    }

    .overview-content-item {
      width: 396px;
      height: 232px;
      background-image: url("~/assets/image/corporatePortrait/overview/moduleBg.png");
      background-size: 100% 100%;
      position: relative;
      padding: 66px 28px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .overview-content-item-title {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #92fcff;
        position: absolute;
        top: 31px;
        left: 18px;
      }

      .overview-content-item-main {
        width: 30%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;

        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
      }
    }

    .el-carousel__container {
      width: 100%;
      display: flex;
      align-items: center;
    }

    .el-carousel__item {
      width: 100%;
      height: 100%;
    }

    .overview-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 79px;
    }

    .el-carousel__indicators {
      display: none;
    }
  }

  .sub-itemization-image {
    width: 74px;
    height: 71px;
  }

  .sub-itemization-main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    .sub-itemization-value {
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      text-shadow: 0px 0px 8px rgba(0, 32, 109, 0.57);

      background: linear-gradient(0deg,
          #08fbb6 0.146484375%,
          #bafeff 99.31640625%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .sub-itemization-label {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
    }
  }

}
</style>
