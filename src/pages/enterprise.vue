<!--
 * @Author: By
 * @Date: 2022-08-19 15:50:58
 * @LastEditTime: 2022-09-09 16:26:54
 * @LastEditors: BY by15242952083@outlook.com
 * @Description:
 * @FilePath: \big-screen\src\pages\enterprise.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script lang="ts" setup>
const userInfo = useUserStore()

const subItemizationData = ref([])
const enterpriseProgressData = ref([])
const EValue = ref('')
const NValue = ref('')

const getData = async (val?) => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: userInfo.userCode,
    sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
    address: val,
  }
  const res: any = await cytj(param)
  subItemizationData.value = res?.filter(e => e?.['位置'] === '下面')
  enterpriseProgressData.value = res?.filter(e => e?.['位置'] === '右上')
  const coordinateTemp = res?.find(e => e?.['位置'] === '左上')
  NValue.value = coordinateTemp?.['值1']
  EValue.value = coordinateTemp?.['值2']
}
getData()
</script>

<template>
  <div hPE-100 wPE-100>
    <div class="occ">
      <span>{{ EValue }}</span><span>{{ NValue }}</span>
    </div>
    <div class="occ-map" hPE-51>
      <div class="map">
        <enterpriseMap @refresh="getData" />
      </div>
      <div class="chart-right">
        <enterpriseProgress :enterprise-progress-prop="enterpriseProgressData" />
      </div>
    </div>
    <div class="sub-itemization-box">
      <subItemization :sub-itemization-prop="subItemizationData" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.occ {
  width: 100%;
  box-sizing: border-box;
  padding-left: 111px;

  span {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #FFFFFF;
    margin-right: 25px;
  }
}

.occ-map {
  width: 100%;
  box-sizing: border-box;
  padding-left: 40px;
  display: flex;

  .map {
    width: 1091px;
    height: 420px;
    position: relative;

    img:first-child {
      width: 100%;
      height: 100%;
    }

    img:nth-child(2) {
      position: absolute;
      width: 48px;
      height: 48px;
      right: 14px;
      bottom: 55px;
    }

    img:last-child {
      position: absolute;
      width: 48px;
      height: 48px;
      right: 14px;
      bottom: -26px;
    }
  }

  .chart-right {
    width: 626px;
    height: 441px;
    margin-left: 46px;
  }

}

.sub-itemization-box {
  margin-top: 96px;
  width: 100%;
  height: 184px;
}
</style>
