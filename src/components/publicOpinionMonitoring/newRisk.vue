0<!--
 * @Author: By
 * @Date: 2022-07-29 09:50:40
 * @LastEditTime: 2022-09-16 10:42:44
 * @LastEditors: BY by15242952083@outlook.com
 * @Description: 最新风险
 * @FilePath: \big-screen\src\components\publicOpinionMonitoring\newRisk.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script lang="ts" setup>
import businessesNumber from '~/assets/image/publicOpinionMonitoring/businessesNumber.png'
import businessInformation from '~/assets/image/publicOpinionMonitoring/businessInformation.png'
import judicialProceedings from '~/assets/image/publicOpinionMonitoring/judicialProceedings.png'
import operationalRisks from '~/assets/image/publicOpinionMonitoring/operationalRisks.png'
import newsAndPublic from '~/assets/image/publicOpinionMonitoring/newsAndPublic.png'
import safety from '~/assets/image/publicOpinionMonitoring/safety.png'
import compass from '~/assets/image/publicOpinionMonitoring/compass.png'
import changes from '~/assets/image/publicOpinionMonitoring/changes.png'

const prop = defineProps({
  latestRisksProp: Object,
  riskClassificationProp: Array,
})

const tableData = ref<any>([])

const headerList = ([
  { label: '变动日期', prop: '变更日期' },
  { label: '企业名称', prop: '企业名称' },
  { label: '风险类型', prop: '风险类型' },
  { label: '风险级别', prop: '风险级别' },
])
const subItemizationRiskList = ref([
  { image: businessesNumber, value: '', label: '监控企业数量', unit: '家' },
  { image: businessInformation, value: '', label: '工商信息', unit: '条' },
  { image: judicialProceedings, value: '', label: '司法诉讼', unit: '条' },
  { image: operationalRisks, value: '', label: '经营风险', unit: '条' },
  { image: newsAndPublic, value: '', label: '新闻舆情', unit: '条' },
  { image: safety, value: '', label: '安全生产', unit: '条' },

])

const rowClass = ({ row, rowIndex }) => {
  if (rowIndex % 2 === 0)
    return 'odd'

  else
    return 'even'
}

watch(() => prop.latestRisksProp, (val) => {
  tableData.value = prop.latestRisksProp?.['数值1']
})

watch(() => prop.riskClassificationProp, (val) => {
  prop.riskClassificationProp?.forEach((e: any, i) => {
    const temp = subItemizationRiskList.value.find(childElement => childElement.label === e?.['数据'])
    if (temp)
      temp.value = e?.['值1']
  })
})
</script>

<template>
  <div class="new-risk">
    <div class="new-risk-table">
      <span class="new-risk-table-title">最新风险</span>
      <el-table class="new-risk-table-main" :data="tableData" :row-class-name="rowClass">
        <el-table-column v-for="(item, index) in headerList" :key="index" :prop="item.prop" :label="item.label" />
      </el-table>
    </div>
    <div class="sub-itemization-risk-box">
      <div v-for="(item, index) in subItemizationRiskList" :key="index" class="sub-itemization-risk-item">
        <el-image class="sub-itemization-risk-item-bg" :src="item.image" fit="fill" /><span
          class="sub-itemization-risk-item-value"
        >{{ item.value }}<span class="sub-itemization-risk-item-unit">{{
          item.unit
        }}</span></span><span class="sub-itemization-risk-item-label">{{ item.label }}</span>
      </div>
    </div>
    <el-image class="compass-bg" :src="compass" fit="fill" />
    <el-image class="changes-bg" :src="changes" fit="fill" />
  </div>
</template>

<style lang="scss" scoped>
.new-risk {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  .new-risk-table {
    width: 100%;
    height: 51.5%;
    background-image: url("~/assets/image/publicOpinionMonitoring/newRiskTableBg.png");
    background-size: 100% 100%;

    // ::v-deep .new-risk-table-bg {
    //   width: 100%;
    //   height: 51.5%;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    // }

    .new-risk-table-title {
      display: flex;
      width: 100%;
      height: 44px;

      padding: 15px 0 0 22px;
      background: linear-gradient(to right, #124582, #0C2155);

      font-size: 16px;
      font-family: Kaiti SC;
      font-weight: 900;
      color: #FFFFFF;
    }

    :deep(.new-risk-table-main) {
      width: 100%;

      background-color: rgba(0, 0, 0, 0);

      .el-table__header-wrapper {
        tr {
          background-color: #0A2157;
        }

        .el-table__cell {
          background-color: inherit;
          height: 42.2px;
        }
      }

      .el-table__body {
        .warning-row {
          background-color: #ff4757;
        }

        .success-row {
          background-color: #747d8c;
        }
      }

      .el-table__row {
        height: 42.2px;

        &:hover {
          .el-table__cell {
            background-color: inherit;
          }
        }
      }

      .odd {
        background-color: rgba(113, 205, 249, 0.1) !important;
      }

      .even {
        background-color: #163364 !important;
      }

      .el-table__cell {
        padding: 0;
        border: none;
      }

      .el-table__inner-wrapper {
        &:before {
          display: none;
        }
      }

      .cell {

        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
      }

    }

  }

  .sub-itemization-risk-box {
    width: 100%;
    height: 271px;
    margin-top: 28px;

    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-between;
    align-items: stretch;

    .sub-itemization-risk-item {
      width: 49%;
      height: 30%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 17px 0 17px 18%;

      :deep(.sub-itemization-risk-item-bg) {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

      .sub-itemization-risk-item-value {
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #F8B62D;

        .sub-itemization-risk-item-unit {
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #FFFFFF;
        }
      }

      .sub-itemization-risk-item-label {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
  }

  :deep(.compass-bg) {
    width: 67px;
    height: 67px;
    position: absolute;
    right: 12px;
    bottom: 93px;
    z-index: 0;
    display: none;
  }

  :deep(.changes-bg) {
    position: absolute;
    right: 33px;
    bottom: 10px;
    width: 27px;
    height: 73px;
    z-index: 0;
    display: none;
  }
}
</style>
