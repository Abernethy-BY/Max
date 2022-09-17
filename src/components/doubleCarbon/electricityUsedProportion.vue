<!--
 * @Author: By
 * @Date: 2022-07-27 14:35:26
 * @LastEditTime: 2022-09-17 17:04:59
 * @LastEditors: BY by15242952083@outlook.com
 * @Description: 园区各产业单月用电量及占比（单位：万度） 模块
 * @FilePath: \big-screen\src\components\doubleCarbon\electricityUsedProportion.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script>
import electricityUsedProportionBg from '~/assets/image/doubleCarbon/electricityUsedProportion.png'
import electronicInformationIndustryBg from '~/assets/image/doubleCarbon/electronicInformationIndustryBg.png'
import pharmacyBg from '~/assets/image/doubleCarbon/pharmacyBg.png'
import equipmentBg from '~/assets/image/doubleCarbon/equipmentBg.png'
import newEnergyBg from '~/assets/image/doubleCarbon/newEnergyBg.png'
import constructionMachineryBg from '~/assets/image/doubleCarbon/constructionMachineryBg.png'
import otherBg from '~/assets/image/doubleCarbon/otherBg.png'
// import gongchengjixieBg from '~/assets/image/doubleCarbon/gongchengjixieBg.png'
// newEnergy
// constructionMachineryBg
export default {
  props: ['electricityUsedProportionProp'],
  data() {
    return {
      electricityUsedProportionBg,
      electricityUsedProportionList: [
        { label: '电子信息', icon: electronicInformationIndustryBg, value: '', proportion: '' },
        { label: '生物医药大药房', icon: pharmacyBg, value: '', proportion: '' },
        { label: '先进设备制造', icon: equipmentBg, value: '', proportion: '' },
        { label: '新能源材料', icon: newEnergyBg, value: '', proportion: '' },
        { label: '工程机械', icon: constructionMachineryBg, value: '', proportion: '' },
        { label: '其他', icon: otherBg, value: '', proportion: '' },
      ],
    }
  },
  watch: { electricityUsedProportionProp() { this.initElectricityUsedProportion() } },
  methods: {
    initElectricityUsedProportion() {
      this.electricityUsedProportionList.forEach((element) => {
        this.electricityUsedProportionProp.forEach((propElement) => {
          if (element.label === propElement['数据']) {
            element.value = propElement['数值1']
            element.proportion = propElement['数值2']
          }
        })
      })
    },
  },
  // electronicInformationIndustryBg
}
</script>

<template>
  <div class="electricity-used-proportion">
    <el-image class="electricity-usage-bg" :src="electricityUsedProportionBg" fit="fill" />
    <span class="electricity-used-proportion-title">
      园区各产业单月用电量及占比（单位：万度）
    </span>
    <div class="electricity-used-proportion-content">
      <div
        v-for="(item, index) in electricityUsedProportionList" :key="index"
        class="electricity-used-proportion-content-item"
      >
        <el-image class="electricity-used-proportion-content-item-icon" :src="item.icon" fit="cover" />
        <span class="electricity-used-proportion-content-item-span">{{ item.label }}</span>
        <span class="electricity-used-proportion-content-item-span">{{ item.value }}万度</span>
        <span class="electricity-used-proportion-content-item-span">{{ item.proportion }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.electricity-used-proportion {
  margin-top: 33px;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 3%;

  :deep(.electricity-usage-bg) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .electricity-used-proportion-title {
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #92FCFF;
    position: absolute;
    top: 12px;
    left: 30px;
    // line-height: 107px;
  }

  .electricity-used-proportion-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .electricity-used-proportion-content-item {
    width: 18%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 0 0 160px;

    :deep(.electricity-used-proportion-content-item-icon) {
      width: 100%;
      height: auto;
    }

    .electricity-used-proportion-content-item-span {

      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #9FDBFD;
      // line-height: 24px;
    }
  }
}
</style>
