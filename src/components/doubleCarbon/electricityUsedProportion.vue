<script  lang="ts" setup>
import electricityUsedProportionBg from '~/assets/image/doubleCarbon/electricityUsedProportion.png'
import electronicInformationIndustryBg from '~/assets/image/doubleCarbon/electronicInformationIndustryBg.png'
import pharmacyBg from '~/assets/image/doubleCarbon/pharmacyBg.png'
import equipmentBg from '~/assets/image/doubleCarbon/equipmentBg.png'
import newEnergyBg from '~/assets/image/doubleCarbon/newEnergyBg.png'
import constructionMachineryBg from '~/assets/image/doubleCarbon/constructionMachineryBg.png'
import otherBg from '~/assets/image/doubleCarbon/otherBg.png'

const propObj = defineProps({ electricityUsedProportionProp: Array })

const span = ref()

const electricityUsedProportionList = ref([
  { label: '电子信息', icon: electronicInformationIndustryBg, value: '', proportion: '' },
  { label: '生物医药大药房', icon: pharmacyBg, value: '', proportion: '' },
  { label: '先进设备制造', icon: equipmentBg, value: '', proportion: '' },
  { label: '新能源新材料', icon: newEnergyBg, value: '', proportion: '' },
  { label: '工程机械', icon: constructionMachineryBg, value: '', proportion: '' },
  { label: '其他', icon: otherBg, value: '', proportion: '' },
])

watch(() => propObj.electricityUsedProportionProp, () => {
  electricityUsedProportionList.value.forEach((element, index) => {
    const temp = propObj.electricityUsedProportionProp?.find(e => element.label === e?.['数据'])
    let timeTemp = 5000
    if (index <= 2)
      timeTemp = 5000

    else
      timeTemp = 6000

    if (temp) {
      anime({
        targets: span.value[index],
        innerHTML: [0, temp['数值1']],
        easing: 'linear',
        round: 10,
        duration: timeTemp,
      })
      // element.value = element['数值1']
      element.proportion = temp['数值2']
    }
  })
})
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
        <span class="electricity-used-proportion-content-item-span">
          {{ item.label }}
        </span>
        <span class="electricity-used-proportion-content-item-span">
          <span ref="span" /> <span>万度</span>
        </span>
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
    top: 1%;
    left: 30px;
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
    justify-content: space-around;
    flex: 0 0 160px;

    :deep(.electricity-used-proportion-content-item-icon) {
      width: 70%;
      height: auto;
    }

    .electricity-used-proportion-content-item-span {

      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #9FDBFD;
    }
  }
}
</style>
