<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-10-09 17:25:16
 * @FilePath: \big-screen\src\components\pandect\constructionProgress.vue
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import planArea from '~/assets/image/pandect/planArea.png'
import mujunzhishu from '~/assets/image/pandect/mujunzhishu.png'
import gaoxinjishuqiye from '~/assets/image/pandect/gaoxinjishuqiye.png'
import zhunjingtexinqiye from '~/assets/image/pandect/zhunjingtexinqiye.png'
import gongyezongchanzhi from '~/assets/image/pandect/gongyezongchanzhi.png'
import zhengfubutie from '~/assets/image/pandect/zhengfubutie.png'
import yingyeshouru from '~/assets/image/pandect/yingyeshouru.png'
import liyunzonge from '~/assets/image/pandect/liyunzonge.png'
import suishouzonge from '~/assets/image/pandect/suishouzonge.png'
import industrialGrowth from '~/assets/image/pandect/industrialGrowth.png'
import congyerenshu from '~/assets/image/pandect/congyerenshu.png'
import dianhao from '~/assets/image/pandect/dianhao.png'
import nenghao from '~/assets/image/pandect/nenghao.png'
import guishangqiye from '~/assets/image/pandect/guishangqiye.png'

const propObj = defineProps({ progressProp: Object, constructionProgressProp: Array })

/**
 * @description: 进度条属性
 */
const progressValue = ref('')

const span = ref()

/**
 * @description: 数据总览集合
 */
const dataOverViewList = ref([
  { label: '规划面积', bg: planArea, value: 0, unit: '亩' },
  { label: '亩均指数', bg: mujunzhishu, value: '0%', unit: '' },
  { label: '高新技术企业', bg: gaoxinjishuqiye, value: 0, unit: '家' },
  { label: '工业总产值', bg: gongyezongchanzhi, value: 0, unit: '亿元' },
  { label: '专精特新企业', bg: zhunjingtexinqiye, value: 0, unit: '家' },
  { label: '工业增长值', bg: industrialGrowth, value: 0, unit: '亿元' },
  { label: '规上企业', bg: guishangqiye, value: 0, unit: '家' },
  { label: '税收总额', bg: suishouzonge, value: 0, unit: '亿元' },
  { label: '规上企业从业人数', bg: congyerenshu, value: 0, unit: '人' },
  { label: '利润总额', bg: liyunzonge, value: 0, unit: '亿元' },
  { label: '电耗', bg: dianhao, value: 0, unit: '万度' },
  { label: '营业收入', bg: yingyeshouru, value: 0, unit: '亿元' },
  { label: '能耗', bg: nenghao, value: 0, unit: '万度' },
  { label: '政府补贴', bg: zhengfubutie, value: 0, unit: '亿元' },
])

watch(() => propObj.progressProp, () => {
  progressValue.value = propObj?.progressProp?.['值1']
})

watch(() => propObj.constructionProgressProp, () => {
  dataOverViewList.value.forEach((element, index) => {
    propObj?.constructionProgressProp?.forEach((propElement: any) => {
      if (element.label === propElement['数据']) {
        let timeTemp = 0
        if (index <= 5)
          timeTemp = 3000

        else if (index > 5 && index <= 9)
          timeTemp = 5000

        else
          timeTemp = 6000

        anime({
          targets: span.value[index],
          innerHTML: [0, propElement['值1']],
          easing: 'linear',
          round: 10,
          duration: timeTemp,
        })
      }
    })
  })
})
</script>

<template>
  <div class="construction-progress-box" wPE-100 hPE-100 flex flex-column-start po-r>
    <div wPE-100 hPE-5 po-r flex cross-axis-center>
      <div class="progress-main" h-25 bg="#00b5fd" po-r>
        <div hPE-100 po-a pot-0 pol-0 class="progress" :style="`width:${progressValue}`" />
      </div>
      <span w-55 hPE-100 po-a por-0 pot-0 flex flex-row-center cross-axis-center flex-1 class="progress-value">{{
        progressValue }}</span>
    </div>
    <div mt-47 wPE-100 hPE-90 flex-1 flex fw po-r>
      <div
        v-for="(item, index) in dataOverViewList" :key="index" hPE-11 wPE-40 mt-11 mb-11 mr-19 ml-19 po-r
        class="data-overview-item"
      >
        <el-image class="data-overview-bg" :src="item.bg" fit="fill" />
        <div ml-84 hPE-100 flex flex-column-center>
          <span ref="span" class="data">
            <!-- {{ item.value }} -->
            <span class="data-unit">{{ item.unit }}</span>
          </span>
          <span class="data-title">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.construction-progress-box {
  .progress-main {
    width: calc(100% - 55px);
    border-radius: 15px;
  }

  .progress {
    width: 0%;
    border-radius: 15px;
    background-image: repeating-linear-gradient(-45deg,
        #009dfc,
        #009dfc 5px,
        #00f3fe 0,
        #00f3fe 7px);
    transition: width 2s;
  }

  .progress-value {
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #00b5fd;
  }

  .data-overview-item {
    .data-overview-item {
      width: 235px;
      margin: 11px 19px;
      position: relative;

      &:nth-child(odd) {
        margin-left: 0;
      }

      &:nth-child(even) {
        margin-right: 0;
      }

      &:nth-last-of-type(-n + 2) {
        margin-bottom: 0;
      }

      &:nth-child(-n + 2) {
        margin-top: 0;
      }

    }
  }

  :deep(.data-overview-bg) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .data {
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #f8b62d;
  }

  .data-unit {
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
  }

  .data-title {
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
