<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-03 01:56:14
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-09 19:33:51
 * @FilePath: \big-screen\src\layouts\screen.vue
 * @Description: 页面layout
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
/**
 * @description: 菜单对象
 */
const menuInfo = menuStore()

/**
 * @description: 自定义菜单类名字典
 */
const menuMap = new Map().set(4, 'averageOutput').set(6, 'publicOpinionMonitoring')
</script>

<template>
  <div class="layout-box" :class="menuMap.get(menuInfo.menuIndex)" layouts box-center>
    <the-header />

    <the-bar />

    <main hPE-80 wPE-100 mt-20 flex-1 pl-34 pr-34>
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout-box {

  &.averageOutput {

    background: no-repeat url("~/assets/image/averageOutput/averageOutputBg.png");
    background-size: 100% 100%;
  }

  &.publicOpinionMonitoring {
    background-image: url("~/assets/image/publicOpinionMonitoring/publicOpinionMonitoringBg.png");
    background-size: 100% 100%;
  }

  ul,
  li {
    list-style: none
  }

  background: no-repeat url("~/assets/image/common/background.jpg");
  background-size: 100% 100%;

}
</style>
