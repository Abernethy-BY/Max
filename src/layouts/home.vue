<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-09 18:53:36
 * @LastEditors: Abernethy-BY by15242952083@outlook.com
 * @LastEditTime: 2023-06-07 10:21:00
 * @FilePath: \Max\src\layouts\home.vue
 * @Description:
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
const videoRef = $ref<HTMLVideoElement>()
onMounted(() => {
  const promise = videoRef?.play()
  if (promise !== undefined) {
    promise.catch((_error) => { })
      .then(() => { })
  }
})
</script>

<template>
  <div po-r class="home-box" wPE-100 hPE-100 flex-column-start>
    <the-header />
    <video ref="videoRef" autoplay po-a z-0 wPE-100 hPE-100 controls>
      <source :src="`http://www.maxrongbigdata.com:8700/video.aspx?usercode=${useUserStore().userCode}`" type="video/mp4">
      <p>您的浏览器不支持 HTML5 视频 </p>
    </video>
    <the-bar />
    <main style="pointer-events: none;" h-74 po-a potPE-16 z-10 wPE-100 potPE-21 flex-1 pl-34 pr-34>
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home-box {
  .index-bg {
    height: 92%;
    position: absolute;
    top: 8%;
    left: 0;
    width: 100%;
  }

  :deep(.bar-box) {
    margin-top: 30px;
  }
}
</style>
