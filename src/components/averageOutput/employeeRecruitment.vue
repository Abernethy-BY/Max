<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-12 22:55:35
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-16 23:59:04
 * @FilePath: \big-screen\src\components\averageOutput\employeeRecruitment.vue
 * @Description: 招聘信息
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
// import { Swiper, SwiperSlide } from 'swiper/vue'
import { Swiper } from 'swiper'
import type { InterfaceModel } from '~/model'

const propObj = withDefaults(defineProps<{ employeeRecruitmentProp?: Array<InterfaceModel> }>(), { employeeRecruitmentProp: () => [] })

onMounted(() => {
  new Swiper('.swiper', {
    direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
  })
})

// const swiperObj = {
//   // direction: 'vertical', // 垂直切换选项
//   loop: true, // 循环模式选项

//   // 如果需要分页器
//   // pagination: {
//   //   el: '.swiper-pagination',
//   // },

//   // 如果需要前进后退按钮
//   // navigation: {
//   //   nextEl: '.swiper-button-next',
//   //   prevEl: '.swiper-button-prev',
//   // },

//   // 如果需要滚动条
//   // scrollbar: {
//   //   el: '.swiper-scrollbar',
//   // },
// }

// onMounted(() => new Swiper('.swiper', swiperObj))
// const onSwiper = (swiper) => {
//   consola.log(swiper)
// }
// const onSlideChange = () => {
//   consola.log('slide change')
// }
</script>

<template>
  <div class="employee-recruitment-box" wPE-100 hPE-100 po-r ptPE-15>
    <span po-a pot-14 pol-19 class="title">员工招聘</span>
    <!-- <div class="employee-recruitment-content" po-a pob-0 polPE-5 prPE-5 wPE-100 hPE-80 flex flex-column-start>
      <div
        v-for="(item, index) in propObj.employeeRecruitmentProp" :key="index" class="employee-recruitment-item" flex
        flex-column-start
      >
        <span class="employee-recruitment-title noticeImg ">{{ item['数据'] }}</span>
        <span class="employee-recruitment-text noticeImg ">{{ item['数值1'] }}</span>
      </div>
    </div> -->
    <!-- <Swiper
      :slides-per-view="3" direction="vertical" :space-between="50" :modules="[Virtual]"
      @swiper="onSwiper" @slideChange="onSlideChange"
    >
      <SwiperSlide w-100 h-100>
        Slide 1
      </SwiperSlide>
      <SwiperSlide w-100 h-100>
        Slide 2
      </SwiperSlide>
      <SwiperSlide w-100 h-100>
        Slide 3
      </SwiperSlide>
    </Swiper> -->

    <!-- <div class="employee-recruitment-content swiper-wrapper" prPE-5 wPE-100 hPE-80>
      <div
        v-for="(item, index) in propObj.employeeRecruitmentProp" :key="index"
        class="employee-recruitment-item swiper-slide" flex flex-column-start
      >
        <span class="employee-recruitment-title  ">{{ item['数据'] }}</span>
        <span class="employee-recruitment-text  ">{{ item['数值1'] }}</span>
      </div>
    </div> -->
    <el-carousel class="carousel" direction="vertical">
      <el-carousel-item v-for="(item, index) in propObj.employeeRecruitmentProp" :key="index">
        <span class="employee-recruitment-title ">{{ item['数据'] }}</span>
        <span class="employee-recruitment-text ">{{ item['数值1'] }}</span>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="scss" scoped>
.employee-recruitment-box {
  background-image: url("~/assets/image/averageOutput/employeeRecruitment.png");
  background-size: 100% 100%;

  .title {
    font-size: 18px;
    font-family: Kaiti SC;
    font-weight: 900;
    color: #FFFFFF;
  }

  :deep(.carousel) {
    width: 100%;
    height: 100%;
    .el-carousel__item {
      display: flex;
      flex-direction: column;
      padding-left: 10%;
      .employee-recruitment-title {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #1ADCFF;
        padding: 5px 0;
      }

      .employee-recruitment-text {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 18px;
        padding: 5px 0;
        white-space: pre-wrap;
      }

    }
  }

}
</style>
