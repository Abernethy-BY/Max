<!--
 * @Author: By
 * @Date: 2022-08-13 11:07:23
 * @LastEditTime: 2022-08-17 15:15:16
 * @LastEditors: By
 * @Description: layouts
 * @FilePath: \big-screen-vue3\src\layouts\login.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script lang="ts" setup></script>

<template>
  <div class="login-layouts" layouts>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.login-layouts {
  background: no-repeat url("~/assets/image/login/loginBg.png");
  background-size: 100% 100%;
}
</style>
