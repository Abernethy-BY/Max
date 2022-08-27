<!--
 * @Author: By
 * @Date: 2022-08-13 11:07:23
 * @LastEditTime: 2022-08-27 15:21:43
 * @LastEditors: By
 * @Description: layouts
 * @FilePath: \big-screen-vue3\src\layouts\screen.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script lang="ts" setup>
import areaIcon from '~/assets/image/common/areaIcon.png'
import timeIcon from '~/assets/image/common/timeIcon.png'
import overviewIcon from '~/assets/image/common/overviewIcon.png'
import corporatePortraitIcon from '~/assets/image/common/corporatePortraitIcon.png'
import projectInvestmentIcon from '~/assets/image/common/projectInvestmentIcon.png'
import doubleCarbonIcon from '~/assets/image/common/doubleCarbonIcon.png'
import publicOpinionIcon from '~/assets/image/common/publicOpinionIcon.png'
import industryAtlasIcon from '~/assets/image/common/industryAtlasIcon.png'

const pageIndex = ref(0)
const router = useRouter()

const realTime = ref(formatDate(getNowDate(), 'yyyy-MM-dd-cn'))

const tabList = ref([
  { name: '园区总览', path: '/', bg: overviewIcon },
  { name: '产业图鉴', path: '/enterprise', bg: industryAtlasIcon },
  { name: '企业画像', path: '/corporatePortrait', bg: corporatePortraitIcon },
  { name: '项目投资', path: '', bg: projectInvestmentIcon },
  { name: '双碳监测', path: '/doubleCarbon', bg: doubleCarbonIcon },
  { name: '舆情监控', path: '/publicOpinionMonitoring', bg: publicOpinionIcon },
])

const jump = (index) => {
  if (index === pageIndex.value)
    return
  pageIndex.value = index
  router.push({ path: tabList.value[index].path })
}
</script>

<template>
  <div class="layout-box" layouts box-center>
    <header hPE-10 flex flex-row-center po-r cross-axis-center pl-21 pr-27 pb-23>
      <div class="area-select-box" po-a pol-21 h-41 flex cross-axis-center>
        <el-image class="area-icon" :src="areaIcon" fit="fill" />
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
        v-for="(item, index) in tabList" :key="index" po-r cursor-p w-210 hPE-100 mr-18 ml-18 flex flex-row-end
        cross-axis-end :class="pageIndex === index ? 'click' : ''" @click="jump(index)"
      >
        <el-image class="time-icon" :src="item.bg" fit="fill" />
        <span po-a fs-20 fw-400 color="#2E9EFF" mr-39 mb-10>{{ item.name }}</span>
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

  background: no-repeat url("~/assets/image/common/background.png");
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
  }

}
</style>
