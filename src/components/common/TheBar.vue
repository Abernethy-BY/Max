<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-09 18:54:03
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-11 15:51:34
 * @FilePath: \big-screen\src\components\common\TheBar.vue
 * @Description: 菜单组件
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
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
/**
 * @description: 菜单对象
 */
const menuInfo = menuStore()

/**
 * @description: 路由对象
 */
const router = useRouter()

/**
 * @description: 用户对象
 */
const userInfo = useUserStore()

/**
 * @description: 菜单列表
 */
const tabList = ref()

if (userInfo.userRole === '企业') {
  tabList.value = [{ name: '企业画像', path: '/corporatePortrait', bg: qiye, selectedBg: qiyeSelect }]
}
else {
  tabList.value = [
    { name: '首页', path: '/', bg: yuanqu, selectedBg: yuanquSelect },
    { name: '园区总览', path: '/overviewOfPark', bg: yuanqu, selectedBg: yuanquSelect },
    { name: '产业图鉴', path: '/enterprise', bg: chanye, selectedBg: chanyeSelect },
    { name: '企业画像', path: '/corporatePortrait', bg: qiye, selectedBg: qiyeSelect },
    { name: '亩均产值', path: '/averageOutput', bg: mujun, selectedBg: mujunSelect },
    { name: '双碳监测', path: '/doubleCarbon', bg: jiance, selectedBg: jianceSelect },
    { name: '舆情监控', path: '/publicOpinionMonitoring', bg: jiankong, selectedBg: jiankongSelect },
  ]
}
/**
 * @description: 页面跳转方法
 * @param {number} index 页面下标
 * @return {void}
 */
const jump = (index) => {
  if (index === menuInfo.menuIndex)
    return

  menuInfo.menuIndex = index
  router.push({ path: tabList.value[index].path })
}
</script>

<template>
  <!-- w-100 h-100  -->
  <div class="the-bar-box" flex-row-center cross-axis-center mt-19 wPE-100 hPE-6>
    <div
      v-for="(item, index) in tabList" :key="index" po-r cursor-p w-210px hPE-100 mr-18 ml-18 flex cross-axis-center
      :class="menuInfo.menuIndex === index ? 'click' : ''" @click="jump(index)"
    >
      <el-image v-if="menuInfo.menuIndex === index" class="theme-icon" :src="item.selectedBg" fit="fill" />
      <el-image v-else class="theme-icon" :src="item.bg" fit="fill" />

      <span po-a fs-20 fw-400 color="#2E9EFF" polPE-40 potPE-36>{{ item.name }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.the-bar-box {
  :deep(.theme-icon) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .click {
    span {
      color: white;
    }
  }
}
</style>
