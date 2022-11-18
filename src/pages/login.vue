<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-18 21:31:13
 * @FilePath: \big-screen\src\pages\login.vue
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import handoffIcon from '~/assets/image/login/handoffIcon.png'
import returnIcon from '~/assets/image/login/returnIcon.png'

/**
 * @description: 页面标识
 */
const loginFag = ref<string>('PASS_LOGIN')

/**
 * @description: 页面登录文字
 */
const loginSpan = new Map()
  .set('PASS_LOGIN', { mainTitle: '账号密码登录', subTitle: '短信快捷登录' })
  .set('FORGOT_PASS', { mainTitle: '返回登录', subTitle: '' })

/**
 * @description: 打开找回密码
 * @return {*}
 */
const openFindPass = () => {
  loginFag.value = 'FORGOT_PASS'
}

/**
 * @description:关闭忘记密码
 * @return {*}
 */
const closeForgotPass = () => {
  loginFag.value = 'PASS_LOGIN'
}
</script>

<template>
  <div
    class="login-form" bg="#023CA7" flex flex-column-around cross-axis-stretch w-552 po-a po-t-17.5 por-344 potPE-17
    h-579 pt-47 pb-17
  >
    <header v-if="loginFag === 'PASS_LOGIN'" flex cross-axis-center flex-row-between ml-53 mr-56>
      <span fs-24 fw-400 color="#05FFFF" opacity-50>{{ loginSpan.get(loginFag).mainTitle }}</span>
      <!-- <div class="handoff-login-type" cursor-p @click="handoffLoginType('manual')"> -->
      <div cursor-p flex cross-axis-center>
        <span fs-18 lh-42 color="#05FFFF">{{ loginSpan.get(loginFag).subTitle }}</span>
        <el-image class="handoff-icon" :src="handoffIcon" fit="fill" />
      </div>
    </header>
    <header v-if="loginFag === 'FORGOT_PASS'" po-r flex cross-axis-center flex-row-between ml-53 mr-56>
      <span fs-24 fw-400 color="#05FFFF" opacity-50>{{ loginSpan.get(loginFag).mainTitle }}</span>
      <el-image class="return-icon" :src="returnIcon" fit="fill" @click="closeForgotPass" />
    </header>
    <main flex-1>
      <!-- 密码登陆 -->
      <div v-if="loginFag === 'PASS_LOGIN'" wPE-100 hPE-100>
        <pass-login @open-find-pass="openFindPass" />
      </div>
      <div v-else-if="loginFag === 'FORGOT_PASS'" wPE-100 hPE-100>
        <forgot-pass />
      </div>
    </main>
    <footer v-if="loginFag === 'PASS_LOGIN'" ml-53 mr-56 flex flex-row-between cross-axis-center>
      <span cursor-p color="#05FFFF" fs-18>扫一扫登录</span>
      <span cursor-p color="#05FFFF" fs-18> 立即注册</span>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.login-form {
  background: no-repeat url("~/assets/image/login/loginFormBg.png");
  background-size: 100% 100%;

  :deep(.return-icon) {
    width: 24px;
    height: 19px;
    cursor: 'pointer'
  }

  :deep(.handoff-icon) {
    width: 9px;
    height: 14px;
    margin-left: 9px;
  }

}
</style>

<route lang="yaml">
meta:
  layout: login
</route>

