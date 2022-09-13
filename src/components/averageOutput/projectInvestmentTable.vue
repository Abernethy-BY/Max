<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-12 22:57:45
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-13 19:41:19
 * @FilePath: \big-screen\src\components\averageOutput\projectInvestmentTable.vue
 * @Description:项目投资统计
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { TableModel } from '~/model'
const propObj = withDefaults(defineProps<{ projectInvestmentTableProp?: Array<TableModel> }>(), { projectInvestmentTableProp: () => [] })

const headerCellStyleFun = () => { return { background: '#081740' } }
const rowStyleFun = (...val) => { return { background: [...val][0].rowIndex % 2 === 0 ? '#102753' : '#081740' } }
</script>

<template>
  <div class="project-investment-table-box" wPE-100 hPE-100 po-r>
    <span po-a pot-14 pol-19 class="title">项目投资统计</span>
    <el-table
      class="project-investment-table" :data="propObj.projectInvestmentTableProp"
      :header-cell-style="headerCellStyleFun" :row-style="rowStyleFun"
    >
      <el-table-column min-width="50%" prop="name" label="名称" />
      <el-table-column min-width="50%" prop="investment" label="投资额（万元）" />
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.project-investment-table-box {
  overflow: hidden;
  background-image: url("~/assets/image/averageOutput/projectInvestmentStatistics.png");
  background-size: 100% 100%;

  .title {
    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;
  }

  :deep(.project-investment-table) {

    .el-scrollbar__wrap{
      background-color: #081740;
    }

    position: absolute;
    bottom: 0;
    height: 83%;

    td,
    th {
      border: none;
      background-color: inherit !important;
    }

    .el-table__inner-wrapper {
      &:before {
        display: none;
      }
    }

    tr {
      background-color: #081740;
    }

    .cell {
      color: white;
    }

    .el-table__header-wrapper {
      .cell {
        color: #39C7EC
      }
    }

    .el-scrollbar__view {
      border: none;
      background-color: #102753;
    }

    .el-table--fit {
      height: 100%;
    }

    .el-table__cell {
      border: none;
    }

  }
}
</style>
