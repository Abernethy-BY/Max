<!--
 * @Author: By
 * @Date: 2022-08-13 09:51:05
 * @LastEditTime: 2022-08-29 14:01:22
 * @LastEditors: By
 * @Description: app入口
 * @FilePath: \big-screen-vue3\src\App.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script lang="ts" setup>

</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style>
* {
  user-select: none;
  -webkit-user-drag: none;
  /* touch-action: none; */
}

.app {
  /* min-height: 100%; */
  /* width: 100vw;
height: 100vh; */
  /* background: no-repeat url(/src/assets/image/common/background.png);
    background-size: 100% 100%; */

  @font-face {

    /* font-properties */

    font-family: Kaiti SC;

    src: url('~/assets/font/FangZhengKaiTiJianTi-1.ttf'),

      url('~/assets/font/FangZhengKaiTiJianTi-1.ttf'),

      url('~/assets/font/FangZhengKaiTiJianTi-1.ttf');
    /* IE9 */

  }
}
</style>

