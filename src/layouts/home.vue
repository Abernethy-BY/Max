<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-09 18:53:36
 * @LastEditors: Abernethy-BY by15242952083@outlook.com
 * @LastEditTime: 2023-02-13 11:26:07
 * @FilePath: \big-screen\src\layouts\home.vue
 * @Description:
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
// import indexBg from '~/assets/image/Abernethy/indexBg.png'

import FlvJs from 'flv.js'

const videoElementRef = $ref<HTMLMediaElement>()

let flvPlayer: FlvJs.Player | null = null
onMounted(() => {
  consola.info(111)
  if (FlvJs.isSupported()) {
    flvPlayer = FlvJs.createPlayer({
      type: 'flv',
      url: 'http://www.maxrongbigdata.com:8700/video.aspx',
    })
    videoElementRef && (flvPlayer.attachMediaElement(videoElementRef))
    flvPlayer.load()
    flvPlayer.play()
  }
})

onUnmounted(() => {
  flvPlayer?.destroy()
})
</script>

<template>
  <div po-r class="home-box" wPE-100 hPE-100 flex-column-start>
    <the-header />
    <video ref="videoElementRef" class="index-bg" muted wPE-100 hPE-100 />
    <the-bar />
    <main h-74 po-a potPE-16 z-10 wPE-100 potPE-21 flex-1 pl-34 pr-34>
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
