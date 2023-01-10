<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-09 18:53:36
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-10 16:18:56
 * @FilePath: \big-screen\src\layouts\home.vue
 * @Description:
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import indexBg from '~/assets/image/Abernethy/indexBg.png'
</script>

<template>
  <div po-r class="home-box" wPE-100 hPE-100 flex-column-start>
    <the-header />

    <div hPE-92 wPE-100 po-a potPE-8>
      <el-image class="index-bg" :src="indexBg" fit="cover" />
      <the-bar />
      <main hPE-89 wPE-100 mt-20 flex-1 pl-34 pr-34>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-box {
  :deep(.index-bg) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
