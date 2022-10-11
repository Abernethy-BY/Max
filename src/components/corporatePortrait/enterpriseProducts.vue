<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-01 16:29:28
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-10-11 15:28:49
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

const imageList = ref<any>([])
const title = ref<string>('')
const modules = [Autoplay]
watch(() => propObj.enterpriseProductsProp, () => {
  imageList.value = propObj.enterpriseProductsProp.filter(e => e.数据 === '图像')
  title.value = propObj.enterpriseProductsProp.find(e => e.数据 === '公司名称').值1
})
</script>

<template>
  <div class="enterprise-products">
    <span class="enterprise-products-title">{{ title }}</span>

    <Swiper
      class="swiper-content" :slides-per-view="5" :space-between="50" :loop="true" :observer="true"
      :observe-parents="true" :autoplay="{ delay: 2500, disableOnInteraction: false }" :modules="modules"
    >
      <SwiperSlide v-for="(item, index) in imageList" ref="imgRef" :key="index">
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

  .swiper-content {
    width: 100%;
  }
}
</style>
