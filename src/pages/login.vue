<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-21 20:22:22
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
  .set('FORGOT_PASS', { mainTitle: '找回密码', subTitle: '' })
  .set('SIGN_UP', { mainTitle: '注册', subTitle: '' })

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

/**
 * @description: 弹出立即注册
 * @return {*}
 */
const openSignUp = () => {
  loginFag.value = 'SIGN_UP'
}

/**
 * @description: 用户协议选项
 */
const agreementFlag = ref<boolean>(false)

/**
 * @description: 录入信息表单节点
 */
const enterInformationRef = ref()

onMounted(() => {
  enterInformationRef.value.openPop()
})

/**
 * @description: 弹出信息录入弹窗
 * @return {*}
 */
const openEnterInformation = () => {
  enterInformationRef.value.openPop()
}
</script>

<template>
  <div
    class="login-form" bg="#023CA7" flex flex-column-around cross-axis-stretch w-552 po-a po-t-17.5 por-344 potPE-17
    h-579 pt-47 pb-17
  >
    <!-- 密码登录标头 -->
    <header v-if="loginFag === 'PASS_LOGIN'" flex cross-axis-center flex-row-between ml-53 mr-56>
      <span fs-24 fw-400 color="#05FFFF" opacity-50>{{ loginSpan.get(loginFag).mainTitle }}</span>
      <div cursor-p flex cross-axis-center>
        <span fs-18 lh-42 color="#05FFFF">{{ loginSpan.get(loginFag).subTitle }}</span>
        <el-image class="handoff-icon" :src="handoffIcon" fit="fill" />
      </div>
    </header>
    <!-- 忘记密码标头 注册标头 -->
    <header
      v-if="loginFag === 'FORGOT_PASS' || loginFag === 'SIGN_UP'" po-r flex cross-axis-center flex-row-between
      ml-53 mr-56
    >
      <span fs-24 fw-400 color="#05FFFF" opacity-50>{{ loginSpan.get(loginFag).mainTitle }}</span>
      <el-image class="return-icon" :src="returnIcon" fit="fill" @click="closeForgotPass" />
    </header>
    <main flex-1>
      <!-- 密码登陆 -->
      <div v-if="loginFag === 'PASS_LOGIN'" wPE-100 hPE-100>
        <pass-login @open-find-pass="openFindPass" />
      </div>
      <!-- 忘记密码 -->
      <div v-else-if="loginFag === 'FORGOT_PASS'" wPE-100 hPE-100>
        <forgot-pass />
      </div>
      <!-- 立即注册 -->
      <div v-else-if="loginFag === 'SIGN_UP'" wPE-100 hPE-100 @openEnterInformation="openEnterInformation">
        <sign-up />
      </div>
    </main>
    <footer v-if="loginFag === 'PASS_LOGIN'" ml-53 mr-56 flex flex-row-between cross-axis-center>
      <span cursor-p color="#05FFFF" fs-18>扫一扫登录</span>
      <span cursor-p color="#05FFFF" fs-18 @click="openSignUp"> 立即注册</span>
    </footer>
    <footer v-if="loginFag === 'SIGN_UP'" ml-53 mr-56 flex flex-row-center cross-axis-center>
      <el-checkbox v-model="agreementFlag" class="agreement" size="large" />
      <span class="agreement-span"> 同意并接受
        <span class="jump-span">《用户协议》</span>
        及
        <span class="jump-span"> 《隐私权保护说明》</span>
      </span>
    </footer>
  </div>
  <enter-information ref="enterInformationRef" />
</template>

<style lang="scss" scoped>
.login-form {
  background: no-repeat url("~/assets/image/login/loginFormBg.png");
  background-size: 100% 100%;

  :deep(.return-icon) {
    width: 24px;
    height: 19px;
    cursor: pointer;
  }

  :deep(.handoff-icon) {
    width: 9px;
    height: 14px;
    margin-left: 9px;
  }

  .agreement-span {
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #0D96CC;
    line-height: 22px;
    margin-left: 9px;

    .jump-span {
      position: relative;
      color: #1ADCFF;
      cursor: pointer;
    }
  }

}
</style>

<route lang="yaml">
meta:
  layout: login
</route>

