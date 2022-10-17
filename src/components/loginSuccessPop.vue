<!--
 * @Author: By
 * @Date: 2022-08-18 14:41:40
 * @LastEditTime: 2022-10-17 10:24:02
 * @LastEditors: BY by15242952083@outlook.com
 * @Description: 登录成功弹窗
 * @FilePath: \big-screen\src\components\loginSuccessPop.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script lang="ts" setup>
import closeIcon from '~/assets/image/common/closeIcon.png'
const propObj = defineProps({
  showFlag: Boolean,
})
const router = useRouter()
const jumpToIndex = () => {
  router.push({ path: '/' })
}
</script>

<template>
  <div v-if="propObj.showFlag" position-fixed pot-0 pol-0 box-until flex flex-column-center cross-axis-center>
    <div w-480 h-244 position-relative flex flex-column-between cross-axis-center pt-92 pb-22 class="pop-content">
      <el-image class="close-icon" :src="closeIcon" fit="fill" @click="jumpToIndex" />
      <span color="#05FFFF" fs-24>恭喜您，登录成功</span>
      <el-button br-4 color="#1ADCFF" class="confirm-button" @click="jumpToIndex">
        确定
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pop-content {
  background: no-repeat url("~/assets/image/pop/loginSuccessBg.png");
  background-size: 100% 100%;
}

:deep(.confirm-button) {
  width: 317px;
  height: 53px;
  border: none;

  span {
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #0A3D75;
    line-height: 33px;
  }
}

:deep(.close-icon){
  width: 48px;
  height: 48px;
  position: absolute;
  top: 26px;
  right: 19px;
  z-index: 10;
}
</style>
