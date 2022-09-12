<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-03 01:56:14
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-12 22:27:28
 * @FilePath: \big-screen\src\layouts\screen.vue
 * @Description: 页面layout
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import areaIcon from '~/assets/image/common/areaIcon.png'
import timeIcon from '~/assets/image/common/timeIcon.png'
import chanye from '~/assets/image/common/navBg/chanye.png'
import chanyeSelect from '~/assets/image/common/navBg/chanyeSelect.png'
import yuanqu from '~/assets/image/common/navBg/yuanqu.png'
import yuanquSelect from '~/assets/image/common/navBg/yuanquSelect.png'
import qiye from '~/assets/image/common/navBg/qiye.png'
import qiyeSelect from '~/assets/image/common/navBg/qiyeSelect.png'
import mujun from '~/assets/image/common/navBg/mujun.png'
import mujunSelect from '~/assets/image/common/navBg/mujunSelect.png'
import jiance from '~/assets/image/common/navBg/jiance.png'
import jianceSelect from '~/assets/image/common/navBg/jianceSelect.png'
import jiankong from '~/assets/image/common/navBg/jiankong.png'
import jiankongSelect from '~/assets/image/common/navBg/jiankongSelect.png'

// jiankong
const pageIndex = ref(0)
const router = useRouter()

const realTime = ref(formatDate(getNowDate(), 'yyyy-MM-dd-cn'))

const tabList = ref([
  { name: '园区总览', path: '/', bg: yuanqu, selectedBg: yuanquSelect },
  { name: '产业图鉴', path: '/enterprise', bg: chanye, selectedBg: chanyeSelect },
  { name: '企业画像', path: '/corporatePortrait', bg: qiye, selectedBg: qiyeSelect },
  { name: '亩均产值', path: '/averageOutput', bg: mujun, selectedBg: mujunSelect },
  { name: '双碳监测', path: '/doubleCarbon', bg: jiance, selectedBg: jianceSelect },
  { name: '舆情监控', path: '/publicOpinionMonitoring', bg: jiankong, selectedBg: jiankongSelect },
])

const jump = (index) => {
  if (index === pageIndex.value)
    return
  pageIndex.value = index
  router.push({ path: tabList.value[index].path })
}

const jumpToLogin = () => {
  const backlen = history.length - 2
  const userInfo = useUserStore()
  userInfo.userCode = ''
  userInfo.token = ''
  userInfo.userRole = ''
  router.go(backlen - (backlen * 2))
}
</script>

<template>
  <div class="layout-box" layouts box-center>
    <header hPE-10 flex flex-row-center po-r cross-axis-center pl-21 pr-27 pb-23>
      <div class="area-select-box" po-a pol-21 h-41 flex cross-axis-center>
        <el-image cursor-p class="area-icon" :src="areaIcon" fit="fill" @click="jumpToLogin" />
        <span fs-20 color="#FFFFFF" ml-9>工业大数据平台</span>
      </div>
      <span fx-40 fw-800 color="#FFFFFF">麦可思工业大数据中心</span>
      <div class="time-box" po-a por-27 h-41 flex cross-axis-center>
        <div class="time-content" flex flex-column-center cross-axis-end>
          <span fs-30 color="#FFFFFF">星期三</span>
          <span fs-16 color="#9FDBFD">{{ realTime }}</span>
        </div>
        <el-image class="time-icon" :src="timeIcon" fit="fill" />
      </div>
    </header>
    <div class="tab-Wrap" wPE-100 hPE-6 flex flex-row-center cross-axis-center mt-19>
      <div
        v-for="(item, index) in tabList" :key="index" po-r cursor-p w-210 hPE-100 mr-18 ml-18 flex cross-axis-center
        :class="pageIndex === index ? 'click' : ''" @click="jump(index)"
      >
        <el-image v-if="pageIndex === index" class="time-icon" :src="item.selectedBg" fit="fill" />
        <el-image v-else class="time-icon" :src="item.bg" fit="fill" />

        <span po-a fs-20 fw-400 color="#2E9EFF" polPE-40 potPE-36>{{ item.name }}</span>
      </div>
    </div>
    <main hPE-80 wPE-100 mt-31 flex-1 pl-34 pr-34>
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout-box {

  ul,
  li {
    list-style: none
  }

  background: no-repeat url("~/assets/image/common/background.jpg");
  background-size: 100% 100%;

  header {
    background: no-repeat url("~/assets/image/common/headerBg.png");
    background-size: 100% 100%;
  }

  :deep(.area-icon) {
    width: 43px;
    height: 41px;
  }

  :deep(.time-icon) {
    width: 62px;
    height: 62px;
  }

  .tab-Wrap {
    // transform: translateX(-50%);

    :deep(.time-icon) {
      position: absolute;
      top: 0;
      left: 0;
      width: 210px;
      height: 59px;
    }

    .click {
      span {
        color: white;
      }
    }
  }

}
</style>
