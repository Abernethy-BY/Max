<!--
 * @Author: By
 * @Date: 2022-08-13 11:07:23
 * @LastEditTime: 2022-11-21 20:52:20
 * @LastEditors: BY by15242952083@outlook.com
 * @Description: layouts
 * @FilePath: \big-screen\src\layouts\login.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script lang="ts" setup></script>

<template>
  <div class="login-layouts" po-r layouts flex flex-row-center cross-axis-center>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.login-layouts {
  background: no-repeat url("~/assets/image/login/loginBg.jpg");
  background-size: 100% 100%;
}
</style>
