<!--
 * @Author: By
 * @Date: 2022-07-29 09:50:40
 * @LastEditTime: 2022-08-19 19:53:26
 * @LastEditors: By
 * @Description: 最新风险
 * @FilePath: \big-screen-vue3\src\components\publicOpinionMonitoring\newRisk.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script>
import newRiskTableBg from '~/assets/image/publicOpinionMonitoring/newRiskTableBg.png'

export default {
  data() {
    return {
      newRiskTableBg,
      tableData: [
        { changeData: '2021-12-08', businessName: '有限公司', riskType: '开庭公告', riskLevel: '警示信息 ' },
        { changeData: '2021-12-08', businessName: '有限公司', riskType: '开庭公告', riskLevel: '警示信息 ' },
        { changeData: '2021-12-08', businessName: '有限公司', riskType: '开庭公告', riskLevel: '警示信息 ' },
        { changeData: '2021-12-08', businessName: '有限公司', riskType: '开庭公告', riskLevel: '警示信息 ' },
        { changeData: '2021-12-08', businessName: '有限公司', riskType: '开庭公告', riskLevel: '警示信息 ' },
        { changeData: '2021-12-08', businessName: '有限公司', riskType: '开庭公告', riskLevel: '警示信息 ' },
        { changeData: '2021-12-08', businessName: '有限公司', riskType: '开庭公告', riskLevel: '警示信息 ' },
        { changeData: '2021-12-08', businessName: '有限公司', riskType: '开庭公告', riskLevel: '警示信息 ' },
      ],
      headerList: [
        { label: '变动日期', prop: 'changeData' },
        { label: '企业名称', prop: 'businessName' },
        { label: '风险类型', prop: 'riskType' },
        { label: '风险级别', prop: 'riskLevel' },
      ],
      subItemizationRiskList: [
        { image: require('@/views/publicOpinionMonitoring/assets/businessesNumber.png'), value: '341', label: '监控企业数量', unit: '家' },
        { image: require('@/views/publicOpinionMonitoring/assets/businessInformation.png'), value: '480', label: '工商信息', unit: '条' },
        { image: require('@/views/publicOpinionMonitoring/assets/judicialProceedings.png'), value: '1642', label: '司法诉讼 ', unit: '条' },
        { image: require('@/views/publicOpinionMonitoring/assets/operationalRisks.png'), value: '156', label: '经营风险', unit: '条' },
        { image: require('@/views/publicOpinionMonitoring/assets/newsAndPublic.png'), value: '682', label: '新闻舆情', unit: '条' },
      ],
      compassBg: require('@/views/publicOpinionMonitoring/assets/compass.png'),
      changes: require('@/views/publicOpinionMonitoring/assets/changes.png'),
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // console.log(`--------------------------------------`);
      // console.log(row);
      // console.log(rowIndex);
      // console.log(`======================================`);
      return ''
    },
  },
}
</script>

<template>
  <div class="new-risk">
    <div class="new-risk-table">
      <span class="new-risk-table-title">最新风险</span>
      <el-table
        class="new-risk-table-main" :data="tableData" :row-class-name="tableRowClassName"
        height="calc(100% - 44px)"
      >
        <el-table-column v-for="(item, index) in headerList" :key="index" :prop="item.prop" :label="item.label" />
      </el-table>
    </div>
    <div class="sub-itemization-risk-box">
      <div v-for="(item, index) in subItemizationRiskList" :key="index" class="sub-itemization-risk-item">
        <el-image class="sub-itemization-risk-item-bg" :src="item.image" fit="fill" />
        <span class="sub-itemization-risk-item-value">
          {{ item.value }}
          <span class="sub-itemization-risk-item-unit">{{ item.unit }}</span>
        </span>
        <span class="sub-itemization-risk-item-label">{{ item.label }}</span>
      </div>
    </div>

    <el-image class="compass-bg" :src="compassBg" fit="fill" />
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

      background-image: url("~@/views/publicOpinionMonitoring/assets/newRiskTableBg.png");
      background-size: cover;

      tr,
      td,
      th {
        background-color: rgba(0, 0, 0, 0) !important;
      }

      .el-table__body {
        .warning-row {
          background-color: #ff4757;
        }

        .success-row {
          background-color: #747d8c;
        }
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
  }

  :-deep(.changes-bg) {
    position: absolute;
    right: 33px;
    bottom: 10px;
    width: 27px;
    height: 73px;
  }
}
</style>
