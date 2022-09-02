<!--
 * @Author: Forrest-Rice by15242952083@outlook.com
 * @Date: 2022-09-01 16:29:28
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-02 09:52:04
 * @FilePath: \big-screen\src\pages\corporatePortrait.vue
 * @Description:
 * Copyright (c) 2022 by Forrest-Rice email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
const userInfo = useUserStore()
const subItemizationData = ref([])
const economicalOperationData = ref([])
const overviewData = ref([])
const businessElectricityConsumptionData = ref([])
const riskIndexData = ref([])
const corporateIntellectualPropertyData = ref([])
const highTechEnterpriseListData = ref([])
const newEnterprisesListData = ref([])
const enterpriseAssociationMapData = ref({})
const enterpriseProductsData = ref({})

const getQyhx = async () => {
  const submitid = new Date().getTime()
  const param = {
    submitid,
    usercode: userInfo.userCode,
    sign: hexMD5(submitid + userInfo.userCode + userInfo.token),
  }
  const res: any = await qyhx(param)
  // 亩均效益总览数据
  subItemizationData.value = res?.filter(e => e?.['位置'] === '亩均效益总览')
  // 经济运行总览数据
  economicalOperationData.value = res?.filter(e => e?.['位置'] === '经济运行总览')
  overviewData.value = res?.filter(e => e?.['位置'] === '中间')
  businessElectricityConsumptionData.value = res?.filter(e => e?.['位置'] === '企业工业用电')
  riskIndexData.value = res?.filter(e => e?.['位置'] === '风险指数')
  corporateIntellectualPropertyData.value = res?.filter(e => e?.['位置'] === '企业知识产权')
  highTechEnterpriseListData.value = res?.filter(e => e?.['位置'] === '是否高新技术企业')
  newEnterprisesListData.value = res?.filter(e => e?.['位置'] === '是否专精特新企业')

  enterpriseAssociationMapData.value = toRaw(res?.find(e => e?.['位置'] === '企业关联图谱'))
  enterpriseProductsData.value = res?.find(e => e?.['位置'] === '企业产品')
}
getQyhx()
</script>

<template>
  <div class="corporate-portrait-box">
    <div class="left-box">
      <div class="left-top">
        <!-- 分项 -->
        <div class="sub-itemization-box">
          <!-- 亩均效益总览 -->
          <div class="average-benefit-box">
            <enterpriseSubItemization :sub-itemization-prop="subItemizationData" />
          </div>
          <!-- 经济运行总览 -->
          <div class="economical-operation-box">
            <economicalOperation :economical-operation-prop="economicalOperationData" />
          </div>
        </div>
        <!-- 总览 -->
        <div class="overview-box">
          <overviewPage
            :overview-prop="overviewData" :high-tech-enterprise-list-prop="highTechEnterpriseListData"
            :new-enterprises-list-prop="newEnterprisesListData"
          />
        </div>
      </div>
      <div class="left-bottom">
        <!-- 企业工业用电量（单位：万度） -->
        <div class="business-electricity-consumption-box">
          <businessElectricityConsumption :business-electricity-consumption-prop="businessElectricityConsumptionData" />
        </div>
        <!-- 企业产品 -->
        <div class="enterprise-products-box">
          <enterpriseProducts :enterprise-products-prop="enterpriseProductsData" />
        </div>
      </div>
    </div>
    <div class="right-box">
      <!-- 风险指数 -->
      <div class="risk-index-box">
        <riskIndex :risk-index-prop="riskIndexData" />
      </div>
      <!-- 企业关联图谱 -->
      <div class="enterprise-association-map-box">
        <enterpriseAssociationMap :enterprise-association-map-prop="enterpriseAssociationMapData" />
      </div>
      <!-- 企业知识产权 (智能制造 、R&D研发经费) -->
      <div class="corporate-intellectual-property-box">
        <corporateIntellectualProperty :corporate-intellectual-property-prop="corporateIntellectualPropertyData" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.corporate-portrait-box {

  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding-bottom: 23px;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  .left-box {
    display: flex;
    flex-direction: column;
    width: 76%;
    height: 100%;
    justify-content: space-between;

    .left-top {
      display: flex;
      height: 70%;
      width: 100%;
      justify-content: space-between;

      .sub-itemization-box {
        height: 100%;
        width: 28%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .average-benefit-box {
          width: 100%;
          height: 36%;
        }

        .economical-operation-box {
          width: 100%;
          height: 63%;
          margin-top: 15px;
        }

      }

      .overview-box {
        width: calc(72% - 42px);
        height: 100%;
      }

    }

    .left-bottom {
      display: flex;
      height: calc(30% - 15px);
      width: 100%;

      .business-electricity-consumption-box {
        width: 38%;
        height: 100%;
      }

      .enterprise-products-box {
        width: 60.5%;
        height: 100%;
        margin-left: 22px;
      }
    }
  }

  .right-box {
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .risk-index-box {
      width: 400px;
      height: 31%;
    }

    .enterprise-association-map-box {
      width: 400px;
      height: 31%;
    }

    .corporate-intellectual-property-box {
      width: 400px;
      height: 31%;

      div {
        box-sizing: border-box;
      }
    }
  }
}
</style>
