<!--
 * @Author: By
 * @Date: 2022-07-25 14:32:45
 * @LastEditTime: 2022-08-19 19:09:16
 * @LastEditors: By
 * @Description: 双碳检测
 * @FilePath: \big-screen-vue3\src\pages\doubleCarbon.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script lang="ts" setup>
const userInfo = useUserStore()
const businessRankingsData = ref([])
const electricityUsedProportionData = ref([])
const electricityUsageData = ref([])

const getStjc = async () => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: userInfo.userCode,
    sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
  }
  const res: any = await stjc(param)
  businessRankingsData.value = res?.filter(e => e?.['位置'] === '当前用电量TOP前10')
  electricityUsedProportionData.value = res?.filter(e => e?.['位置'] === '园区各产业单月用电量及占比')
  electricityUsageData.value = res?.filter(e => e?.['位置'] === '园区工业用电情况')
}
getStjc()
</script>

<template>
  <div class="double-carbon-box">
    <div class="left-box">
      <!-- 公司排名 -->
      <businessRankings :business-rankings-prop="businessRankingsData" />
    </div>
    <div class="right-box">
      <div class="electricity-usage-box">
        <electricityUsage :electricity-usage-prop="electricityUsageData" />
      </div>

      <div class="electricity-used-proportion-box">
        <electricityUsedProportion :electricity-used-proportion-prop="electricityUsedProportionData" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.double-carbon-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .left-box {
    width: 537px;
    height: 75%;
  }

  .right-box {
    height: 100%;
    width: 1271px;
    display: flex;
    flex-direction: column;

    .electricity-usage-box {
      width: 100%;
      height: 57%;
    }

    .electricity-used-proportion-box {
      width: 100%;
      height: 36%;
    }

  }
}
</style>
