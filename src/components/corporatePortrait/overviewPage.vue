<!--
 * @Author: By
 * @Date: 2022-07-28 14:16:30
 * @LastEditTime: 2022-09-15 23:41:17
 * @LastEditors: BY by15242952083@outlook.com
 * @Description:
 * @FilePath: \big-screen\src\components\corporatePortrait\overviewPage.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script>
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

// rongyaoBg
export default {
  props: ['overviewProp', 'highTechEnterpriseListProp', 'newEnterprisesListProp'],
  data() {
    return {
      // ~/assets/image/corporatePortrait/subItemization/subItemizationBg.png
      left,
      right,
      subItemizationList: [[
        { label: '进出口信用', value: '', image: importAndExportCreditImage },
        { label: '融资需求', value: '', image: financingNeeds },
        { label: '控股企业', value: '', image: holdingCompany },
        { label: '行政许可', value: '', image: administrativeLicensing },
        { label: '法律诉讼', value: '', image: legalProceedings },
      ], [
        { label: '地块公示', value: '', image: plotPublicity },
        { label: '购地信息', value: '', image: landPurchaseInformation },
        { label: '抽查检查', value: '', image: spotChecks },
        { label: '新闻舆情', value: '', image: newsAndPublicOpinion },
        { label: '企业年报', value: '', image: corporateAnnualReport },
      ], [
        { label: '电耗', value: '', image: powerConsumption },
        { label: '能耗', value: '', image: energyConsumption },
        { label: '政府补贴', value: '', image: governmentSubsidies },
        { label: '企业风险', value: '', image: qiyefengxianBg },
        { label: '企业荣誉', value: '', image: rongyaoBg },
      ]],

      HighTechEnterpriseList: [],
      newEnterprisesList: [],
    }
  },
  watch: {
    overviewProp: { handler() { this.getList() }, deep: true },

    highTechEnterpriseListProp: {
      handler() { this.initBanner() }, deep: true,
    },
  },
  mounted() { },
  methods: {
    handoffFun(flag) {
      if (flag === 'left')
        this.$refs.cardShow.next()
      else this.$refs.cardShow.prev()
    },

    getList() {
      this.overviewProp.forEach((propElement) => {
        this.subItemizationList.forEach((childElement) => {
          const temp = childElement.find(e => e.label === propElement['数据'])
          if (temp)
            temp.value = propElement['值1']
        })
      })
    },
    initBanner() {
      this.HighTechEnterpriseList = this.highTechEnterpriseListProp.map(e => e['值1'])
      this.newEnterprisesList = this.newEnterprisesListProp.map(e => e['值1'])
    },
  },
}
</script>

<template>
  <div class="overview">
    <el-carousel ref="cardShow" class="overview-top" :autoplay="true" height="100%" arrow="never">
      <el-carousel-item v-for="item in 4" :key="item">
        <div class="overview-content">
          <div class="overview-content-item">
            <span class="overview-content-item-title">高新技术企业</span>
            <!-- <div class="overview-content-item-main" v-for="(item, index) in HighTechEnterpriseList" :key="index">
              暂无图片
            </div> -->
            <el-image
              v-for="(imgItem, imgIndex) in HighTechEnterpriseList" :key="imgIndex"
              class="overview-content-item-main" :src="imgItem" fit="contain"
            />
          </div>
          <div class="overview-content-item">
            <span class="overview-content-item-title">专精特新企业</span>
            <!-- <div class="overview-content-item-main" v-for="(item, index) in 3" :key="index">
              暂无图片
            </div> -->
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
    <div class="overview-bottom">
      <div v-for="(item, index) in subItemizationList" :key="index" class="sub-itemization-row">
        <div
          v-for="(subItemizationItem, subItemizationIndex) in item" :key="subItemizationIndex"
          class="sub-itemization-col" :span="4"
        >
          <el-image class="sub-itemization-image" :src="subItemizationItem.image" fit="fill" />
          <div class="sub-itemization-main">
            <span class="sub-itemization-value">{{
              subItemizationItem.value
            }}</span>
            <span class="sub-itemization-label">{{
              subItemizationItem.label
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overview {
  * {
    box-sizing: border-box;
  }

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

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
      // padding: 66px 28px 40px;
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
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: #0645b9;
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

  .overview-bottom {
    width: 100%;
    height: calc(53% - 30px);
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .sub-itemization-row {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .sub-itemization-col {
      width: 155px;
      height: 67px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 53px;

      &:first-child {
        margin-left: 0;
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
}
</style>
