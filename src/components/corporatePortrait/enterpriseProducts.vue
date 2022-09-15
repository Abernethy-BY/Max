<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-01 16:29:28
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-15 23:25:02
 * @FilePath: \big-screen\src\components\corporatePortrait\enterpriseProducts.vue
 * @Description:企业产品
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
const propObj = defineProps({
  enterpriseProductsProp: Array,
})
// const imageList = ref([])
// watch(() => propObj.enterpriseProductsProp, () => {
//   consola.info(propObj.enterpriseProductsProp)
//   imageList.value = propObj.enterpriseProductsProp?.['值1']
// })
</script>

<template>
  <div class="enterprise-products">
    <span class="enterprise-products-title">企业产品</span>
    <div class="enterprise-products-content">
      <!-- <div v-for="(item, index) in imageList" :key="index" class="image">
        <el-image style="width: 100%; height: 100%" :src="item" fit="contain" />
      </div> -->
      <div v-for="(item, index) in propObj.enterpriseProductsProp" :key="index" class="image">
        <el-image style="width: 100%; height: 100%" :src="item.值1" fit="contain" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.enterprise-products {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url("~/assets/image/corporatePortrait/enterpriseProducts/enterpriseProductsBg.png");
  // background-size: cover;
  background-size: 100% 100%;
  padding: 74px 24px 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .enterprise-products-title {
    position: absolute;
    top: 14px;
    left: 16px;

    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;
  }

  .enterprise-products-content {
    width: 100%;
    height: 80%;
    display: flex;
    // justify-content: space-between;
    align-items: center;

    .image {
      width: 120px;
      height: 120px;
      background: #0645B9;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #5352ed;
      margin-left: 5%;

      font-size: 18px;
      font-family: Kaiti SC;
      font-weight: 900;
      color: #FFFFFF;
      line-height: 45px;
    }
  }

  .enterprise-products-remark {
    margin-top: 20px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #92FCFF;
    // line-height: 70px;
  }
}
</style>
