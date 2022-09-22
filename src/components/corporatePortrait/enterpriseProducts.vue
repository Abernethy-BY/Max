<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-01 16:29:28
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-22 20:05:34
 * @FilePath: \big-screen\src\components\corporatePortrait\enterpriseProducts.vue
 * @Description:企业产品
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
// import { Carousel3d, Slide } from 'vue-carousel-3d'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper'

const propObj = defineProps(['enterpriseProductsProp'])
const imgRef = ref()

const errorFun = (index, e) => { imgRef.value[index].style.display = 'none' }
const modules = [Autoplay]
</script>

<template>
  <div class="enterprise-products">
    <!--  -->
    <span class="enterprise-products-title">企业产品</span>

    <Swiper
      class="swiper-content" :slides-per-view="5" :space-between="50" :loop="true" :observer="true"
      :observe-parents="true" :autoplay="{ delay: 2500, disableOnInteraction: false }" :modules="modules"
    >
      <SwiperSlide v-for="(item, index) in propObj.enterpriseProductsProp" ref="imgRef" :key="index">
        <el-image
          style="width: 100%; height: 100%" :src="item.值1" fit="contain"
          @error="(err) => errorFun(index, err)"
        />
      </SwiperSlide>
    </Swiper>
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

  // :deep(.carousel) {
  //   width: 100%;

  //   .el-carousel__item {
  //     min-width: 155px;
  //     background: rgba(255, 255, 255, 0);
  //   }

  //   .el-carousel__container {
  //     height: 120px;
  //   }

  //   .el-carousel__mask {
  //     background: rgba(255, 255, 255, 0);

  //   }

  // }
  .swiper-content {
    width: 100%;
  }
}
</style>
