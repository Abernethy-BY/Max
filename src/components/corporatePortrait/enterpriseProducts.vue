<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-01 16:29:28
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-17 17:04:02
 * @FilePath: \big-screen\src\components\corporatePortrait\enterpriseProducts.vue
 * @Description:企业产品
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
// import { Carousel3d, Slide } from 'vue-carousel-3d'
const propObj = defineProps(['enterpriseProductsProp'])
const imgRef = ref()

const errorFun = (index, e) => { imgRef.value[index].style.display = 'none' }
</script>

<template>
  <div class="enterprise-products">
    <!--  -->
    <span class="enterprise-products-title">企业产品</span>
    <!-- <el-carousel class="carousel" :interval="4000" type="card" height="100%" arrow="never" indicator-position="none">
      <el-carousel-item v-for="(item, index) in propObj.enterpriseProductsProp" ref="imgRef" :key="index">
        <el-image :src="item.值1" fit="contain" @error="(err) => errorFun(index, err)" />
      </el-carousel-item>
    </el-carousel> -->
    <!-- <Carousel3d>
      <Slide :index="0">
        Slide 1 Content
      </Slide>
      <Slide :index="1">
        Slide 2 Content
      </Slide>
    </Carousel3d> -->
    <!-- <div class="enterprise-products-content">
      <div v-for="(item, index) in propObj.enterpriseProductsProp" ref="imgRef" :key="index" class="image">
        <el-image
          style="width: 100%; height: 100%" :src="item.值1" fit="contain"
          @error="(err) => errorFun(index, err)"
        />
      </div>
    </div> -->
    <el-carousel class="carousel" type="card" indicator-position="none" arrow="never" height="150px" :autoplay="true">
      <el-carousel-item v-for="(item, index) in propObj.enterpriseProductsProp" ref="imgRef" :key="index">
        <!-- <h3 class="small justify-center" text="2xl">
          {{ item }}
        </h3> -->
        <el-image
          style="width: 100%; height: 100%" :src="item.值1" fit="contain"
          @error="(err) => errorFun(index, err)"
        />
      </el-carousel-item>
    </el-carousel>
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

  :deep(.carousel) {
    width: 100%;

    .el-carousel__item {
      min-width: 155px;
      background: rgba(255, 255, 255, 0);
    }

    .el-carousel__mask {
      background: rgba(255, 255, 255, 0);

    }

  }
}
</style>
