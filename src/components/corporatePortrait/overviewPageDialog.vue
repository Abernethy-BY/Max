<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-12-08 20:12:03
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-12 22:03:39
 * @FilePath: \big-screen\src\components\corporatePortrait\overviewPageDialog.vue
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
// const propObj = withDefaults(defineProps<{ dialogTitle: string }>(), { dialogTitle: '' })

import type { TABLE_HEADER_MODEL } from '~/model'

// 弹窗标题
const dialogTitle = ref<string>('')

// 弹窗弹出标识
const dialogVisible = ref<boolean>(false)

// 表头数据
const headerList = ref<Array<TABLE_HEADER_MODEL>>([])
// 表格类型
// const tableType = ref<string>('')

// 表格数据
const tableData = ref<any[]>([])

// 进出口信用表头数据
const importAndExportCreditHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '评价年度', prop: '评价年度' },
  { label: '纳税人识别号', prop: '纳税人识别号' },
  { label: '纳税信用等级', prop: '纳税信用等级' },
  { label: '评价单位', prop: '评价单位' },
  { label: '是否正常纳税', prop: '是否正常纳税' },
  { label: '是否欠税', prop: '是否欠税' },
]

// 融资需求表头数据
const financingNeedsHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '年份', prop: '年份' },
  { label: '融资需求', prop: '融资需求' },
  { label: '融资类型', prop: '融资类型' },
  { label: '融资阶段', prop: '融资阶段' },
  { label: '获得融资金额', prop: '获得融资金额' },
]

// 控股企业表头数据
const holdingEnterprisesHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '控股企业名称', prop: '控股企业名称' },
  { label: '投资比例', prop: '投资比例' },
  { label: '投资额', prop: '投资额' },
]

// 行政许可表头数据
const administrativeLicensingHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '许可类型', prop: '许可类型' },
  { label: '证书编号', prop: '证书编号' },
  { label: '获得时间', prop: '获得时间' },
  { label: '发证机关', prop: '发证机关' },
  { label: '有效期', prop: '有效期' },
]

// 法律诉讼表头数据
const legalProceedingsHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '诉讼事件类型', prop: '诉讼事件类型' },
  { label: '发生时间', prop: '发生时间' },
  { label: '是否解决', prop: '是否解决' },
]

// 地块公示表头数据
const publicityOfLandPlotsHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '地块名称', prop: '地块名称' },
  { label: '四至范围', prop: '四至范围' },
  { label: '出让人', prop: '出让人' },
  { label: '出让方式', prop: '出让方式' },
  { label: '所属区县', prop: '所属区县' },
  { label: '土地用途', prop: '土地用途' },
  { label: '出让面积(平方米)', prop: '出让面积(平方米)' },
  { label: '出让年限', prop: '出让年限' },
  { label: '当前交易状态', prop: '当前交易状态' },
]

// 购地信息表头数据
const landPurchaseInformationHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '土地的地理位置', prop: '土地的地理位置' },
  { label: '面积(平方米)', prop: '面积(平方米)' },
  { label: '容积率', prop: '容积率' },
  { label: '使用年限', prop: '使用年限' },
]

// 抽查检查表头数据
const spotCheckChecksHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '年度报告公示信息的抽查（年度）', prop: '年度报告公示信息的抽查（年度）' },
  { label: '即时公示信息的检查', prop: '即时公示信息的检查' },
  { label: '营业执照规范使用的抽查', prop: '营业执照规范使用的抽查' },
  { label: '经营期限的抽查', prop: '经营期限的抽查' },
  { label: '注册资本实缴的抽查', prop: '注册资本实缴的抽查' },
]

// 新闻舆情表头数据
const newsPublicOpinionHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '舆情内容', prop: '舆情内容' },
  { label: '严重程度', prop: '严重程度' },
  { label: '是否进行处理', prop: '是否进行处理' },
]

// 企业年报
const corporateAnnualReportHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '公司基本情况简介', prop: '公司基本情况简介' },
  { label: '主要财务数据和指标', prop: '主要财务数据和指标' },
  { label: '股本变动及股东情况', prop: '股本变动及股东情况' },
  { label: '董事、监事和高级管理人员', prop: '董事、监事和高级管理人员' },
  { label: '公司治理结构', prop: '公司治理结构' },
  { label: '财务会计报告', prop: '财务会计报告' },
]

// 电耗
const powerConsumptionHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '年份', prop: '年份' },
  { label: '月份', prop: '月份' },
  { label: '用电量（万度）', prop: '用电量（万度）' },
]

// 能耗
const energyConsumptionHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '年份', prop: '年份' },
  { label: '月份', prop: '月份' },
  { label: '用电量（万吨）', prop: '用电量（万吨）' },
]

// 政府补贴
const governmentSubsidiesHeaderHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '年份', prop: '年份' },
  { label: '月份', prop: '月份' },
  { label: '补贴额度（万元）', prop: '补贴额度（万元）' },
]

// 企业风险
const enterpriseRiskHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '风险类型', prop: '风险类型' },
  { label: '风险等级', prop: '风险等级' },
  { label: '是否解决', prop: '是否解决' },
]

// 企业荣誉
const corporateHonorHeader: Array<TABLE_HEADER_MODEL> = [
  { label: '序号', prop: '序号' },
  { label: '荣誉名称', prop: '荣誉名称' },
  { label: '获得日期', prop: '获得日期' },
  { label: '荣誉颁布单位', prop: '荣誉颁布单位' },

]

// 表头字典
const heaederListMap = new Map()
heaederListMap.set('进出口信用', importAndExportCreditHeader)
heaederListMap.set('融资需求', financingNeedsHeader)
heaederListMap.set('控股企业', holdingEnterprisesHeader)
heaederListMap.set('行政许可', administrativeLicensingHeader)
heaederListMap.set('法律诉讼', legalProceedingsHeader)
heaederListMap.set('地块公示', publicityOfLandPlotsHeader)
heaederListMap.set('购地信息', landPurchaseInformationHeader)
heaederListMap.set('抽查检查', spotCheckChecksHeader)
heaederListMap.set('新闻舆情', newsPublicOpinionHeader)
heaederListMap.set('企业年报', corporateAnnualReportHeader)
heaederListMap.set('电耗', powerConsumptionHeader)
heaederListMap.set('能耗', energyConsumptionHeader)
heaederListMap.set('政府补贴', governmentSubsidiesHeaderHeader)
heaederListMap.set('企业风险', enterpriseRiskHeader)
heaederListMap.set('企业荣誉', corporateHonorHeader)

// 弹出弹窗方法
const openDialog = (title) => {
  dialogTitle.value = title
  consola.info(heaederListMap.get(title))
  headerList.value = heaederListMap.get(title)
  dialogVisible.value = true
}

defineExpose({ openDialog })
</script>

<template>
  <div class="overview-page-dialog-box">
    <el-dialog v-model="dialogVisible" :show-close="false" width="60%" align-center>
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">
            {{ dialogTitle }}
          </h4>
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left">
              <CircleCloseFilled />
            </el-icon>
            Close
          </el-button>
        </div>
      </template>

      <el-table :data="tableData">
        <el-table-column
          v-for="(item, index) in heaederListMap.get(dialogTitle)" :key="index" :label="item.label"
          :prop="item.prop"
        />
      </el-table>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.overview-page-dialog-box {

  // #00196B
  .my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
