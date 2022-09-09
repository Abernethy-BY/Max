<!--
 * @Author: By
 * @Date: 2022-07-27 17:20:47
 * @LastEditTime: 2022-09-09 16:49:24
 * @LastEditors: BY by15242952083@outlook.com
 * @Description:
 * @FilePath: \big-screen\src\components\corporatePortrait\economicalOperation.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script>
import revenue from '~/assets/image/corporatePortrait/economicalOperation/revenue.png'
import domesticAndForeignTrade from '~/assets/image/corporatePortrait/economicalOperation/domesticAndForeignTrade.png'
import profit from '~/assets/image/corporatePortrait/economicalOperation/profit.png'
import taxation from '~/assets/image/corporatePortrait/economicalOperation/taxation.png'
import DInvestment from '~/assets/image/corporatePortrait/economicalOperation/R&DInvestment.png'
import industrialSales from '~/assets/image/corporatePortrait/economicalOperation/industrialSales.png'
import totalAssets from '~/assets/image/corporatePortrait/economicalOperation/totalAssets.png'

export default {
  props: ['economicalOperationProp'],
  data() {
    return {
      economicalOperationList: [
        { bg: revenue, value: '', label: '主营业务收入', remark: '' },
        { bg: domesticAndForeignTrade, value: '', label: '内贸与外贸占比', remark: '' },
        { bg: profit, value: '', label: '利润', remark: '' },
        { bg: taxation, value: '', label: '税收', remark: '' },
        { bg: DInvestment, value: '', label: '研发投入', remark: '' },
        { bg: industrialSales, value: '', label: '工业销售总产值', remark: '' },
        { bg: totalAssets, value: '', label: '资产总计', remark: '' },
      ],
    }
  },
  watch: {
    economicalOperationProp: {
      handler() {
        this.getData()
      },
      deep: true,
    },
  },
  methods: {
    getData() {
      this.economicalOperationProp.forEach((propElement) => {
        this.economicalOperationList.find(listElement => listElement.label === propElement?.['数据']).value = propElement['值1']
        this.economicalOperationList.find(listElement => listElement.label === propElement?.['数据']).remark = propElement['值2']
      })
    },
  },
}
</script>

<template>
  <div class="corporatePortrait">
    <span class="economical-operation-title">经济运行总览 </span>
    <div v-for="(item, index) in economicalOperationList" :key="index" class="economical-operation-item">
      <el-image class="economical-operation-bg" :src="item.bg" fit="fill" />
      <div class="economical-operation-content">
        <span class="economical-operation-value">{{ item.value }}
          <span class="economical-operation-unit" fs-12 color="#ffffff" fw-400>万元</span>
        </span>
        <span class="economical-operation-label">{{ item.label }}</span>
      </div>
      <span class="economical-operation-remark">{{ item.remark }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.corporatePortrait {
  width: 100%;
  height: 100%;
  background-image: url("~/assets/image/corporatePortrait/economicalOperation/economicalOperationBg.png");

  // background-size: cover;
  background-size: 100% 100%;
  position: relative;
  padding: 65px 15px 21px 15px;

  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
  justify-content: flex-start;

  .economical-operation-title {
    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;

    position: absolute;
    top: 14px;
    left: 16px;
  }

  .economical-operation-item {
    width: calc(50% - 4.5px);
    height: 62px;
    position: relative;
    display: flex;
    align-items: center;
    margin: 4.5px 4.5px;
    overflow: hidden;

    &:nth-child(even) {
      margin-left: 0;
    }

    &:nth-child(odd) {
      margin-right: 0;
    }

    :deep(.economical-operation-bg) {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }

    .economical-operation-content {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      margin-left: 32%;

      .economical-operation-label {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
      }

      .economical-operation-value {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #F8B62D;
      }
    }

    .economical-operation-remark {
      width: 162px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotate(45deg);
      position: absolute;
      top: 17%;
      right: -34%;
      background-color: #0075EA;

      font-size: 10px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #FFFFFF;
    }
  }

}
</style>
