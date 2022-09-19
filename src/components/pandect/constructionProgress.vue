<!--
 * @Author: By
 * @Date: 2022-08-08 20:16:31
 * @LastEditTime: 2022-09-19 17:05:25
 * @LastEditors: BY by15242952083@outlook.com
 * @Description: 五好园区建设进度
 * @FilePath: \big-screen\src\components\pandect\constructionProgress.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script>
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

export default {
  props: ['constructionProgressProp', 'progressProp'],
  data() {
    return {
      dataOverViewList: [
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
      ],
      progressValue: '0%',
    }
  },
  watch: {
    constructionProgressProp() { this.initDataOverView() },
    progressProp() { this.initProgress() },
  },
  methods: {
    initDataOverView() {
      this.dataOverViewList.forEach((element) => {
        this.constructionProgressProp.forEach((propElement) => {
          if (element.label === propElement['数据'])
            element.value = propElement['值1']
        })
      })
    },
    initProgress() {
      this.progressValue = this.progressProp['值1']
      return `width: ${this.progressProp['值1']};`
    },
  },
}
</script>

<template>
  <div class="construction-progress">
    <div class="progress-bar-box" hPE-5>
      <div class="progress-main">
        <div class="progress" :style="initProgress()" />
      </div>
      <span class="progress-value">{{ progressValue }}</span>
    </div>
    <span class="pandect-title">五好园区建设进度</span>
    <div class="data-overview-box" hPE-90>
      <div v-for="(item, index) in dataOverViewList" :key="index" hPE-11 class="data-overview-item">
        <el-image class="data-overview-bg" :src="item.bg" fit="cover" />
        <div class="data-box">
          <span class="data">
            {{ item.value }}
            <span class="data-unit">{{ item.unit }}</span>
          </span>
          <span class="data-title">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.construction-progress {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  position: relative;

  .progress-bar-box {
    width: 100%;
    // height: 25px;
    position: relative;
    display: flex;
    align-items: center;

    .progress-main {
      width: calc(100% - 55px);
      height: 25px;
      background-color: #00b5fd;
      border-radius: 15px;
      position: relative;
      overflow: hidden;

      .progress {
        width: 0%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 15px;
        background-image: repeating-linear-gradient(-45deg,
            #009dfc,
            #009dfc 5px,
            #00f3fe 0,
            #00f3fe 7px);
        transition: width 2s;
      }
    }

    .progress-value {
      width: 55px;
      height: 25px;
      position: absolute;
      right: 0;
      top: 0;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #00b5fd;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }
  }

  .pandect-title {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 15px;

    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #00b5fd;
  }

  .data-overview-box {
    margin-top: 47px;
    width: 100%;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    position: relative;

    .data-overview-item {
      width: 235px;
      // height: 83px;
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

      :deep(.data-overview-bg) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .data-box {
        margin-left: 84px;
        height: 100%;
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;

        .data {
          font-size: 20px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #f8b62d;
          // line-height: 24px;
        }

        .data-unit {
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
        }

        .data-title {
          // margin-top: 8px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
