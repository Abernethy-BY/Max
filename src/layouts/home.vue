<script lang="ts" setup>
import indexBg from '~/assets/image/Abernethy/indexBg.png'
</script>

<template>
  <div class="home-box" wPE-100 hPE-100 po-r flex-column-start>
    <the-header />

    <div hPE-90 wPE-100 po-r>
      <el-image class="index-bg" :src="indexBg" fit="contain" />
      <the-bar />
      <main hPE-80 wPE-100 mt-20 flex-1 pl-34 pr-34>
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
