<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-14 20:18:06
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
const loginFlag = ref<string>('PASS_LOGIN')
/**
 * @description: 页面登录文字
 */
const loginSpan = new Map()
  .set('PASS_LOGIN', { mainTitle: '账号密码登录', subTitle: '短信快捷登录' })
  .set('FORGOT_PASS', { mainTitle: '找回密码', subTitle: '' })
  .set('SIGN_UP', { mainTitle: '注册', subTitle: '' })
  .set('SMS_LOGIN', { mainTitle: '短信快捷登录', subTitle: '账号密码登录' })
  .set('SCAN_TO_LOG_IN', { mainTitle: '微信扫码登录', subTitle: '' })

/**
 * @description: 打开找回密码
 * @return {*}
 */
const openFindPass = () => {
  loginFlag.value = 'FORGOT_PASS'
}

/**
 * @description:关闭忘记密码
 * @return {*}
 */
const closeForgotPass = () => {
  loginFlag.value = 'PASS_LOGIN'
}

/**
 * @description: 弹出立即注册
 * @return {*}
 */
const openSignUp = () => {
  loginFlag.value = 'SIGN_UP'
}

/**
 * @description: 弹出密码登录页面
 * @return {*}
 */
const openPassLogin = () => {
  loginFlag.value = 'PASS_LOGIN'
}

/**
 * @description: 弹出扫一扫登录页面
 * @return {*}
 */
const scanLogIn = () => {
  loginFlag.value = 'SCAN_TO_LOG_IN'
}

/**
 * @description: 弹出短信登录弹窗
 * @return {*}
 */
const jumpFun = () => {
  if (loginFlag.value === 'SMS_LOGIN')
    loginFlag.value = 'PASS_LOGIN'

  else if (loginFlag.value === 'PASS_LOGIN' || loginFlag.value === 'SCAN_TO_LOG_IN')
    loginFlag.value = 'SMS_LOGIN'
}
/**
 * @description: 用户协议选项
 */
const agreementFlag = ref<boolean>(false)

/**
 * @description: 录入信息表单节点
 */
const enterInformationRef = ref()

/**
 * @description: 用户注册电话
 */
const userSignTel = ref<string>('')

/**
 * @description: 用户注册类型
 */
const userSignType = ref<string>('')

/**
 * @description: 弹出信息录入弹窗
 * @param {*} tel 用户注册手机号
 * @param {*} type 用户注册角色类型
 * @return {*}
 */
const openEnterInformation = (tel, type) => {
  userSignTel.value = tel
  userSignType.value = type
  enterInformationRef.value.openPop()
}

/**
 * @description: 用户协议节点
 */
const agreementSpanRef = ref<HTMLElement>()
const userAgreementRef = ref<HTMLElement>()
const privacyPolicyRef = ref<HTMLElement>()

/**
 * @description: 用户协议告警方法
 * @return {*}
 */
const errorAgreementFun = () => {
  anime({ targets: [agreementSpanRef.value, userAgreementRef.value, privacyPolicyRef.value], color: '#ff4757', round: 1, easing: 'linear', duration: 300 })
}

/**
 * @description: 用户协议选中更改方法
 * @param {*} val 选中标识
 * @return {*}
 */
const checkboxChangeFun = (val) => {
  if (val) {
    anime({ targets: [agreementSpanRef.value], color: '#0D96CC', round: 1, easing: 'linear', duration: 300 })
    anime({ targets: [userAgreementRef.value, privacyPolicyRef.value], color: '#1ADCFF', round: 1, easing: 'linear', duration: 300 })
  }
}

/**
 * @description: 用户协议弹窗节点
 */
const operateDialogRef = ref()

// 操作弹窗类型
const operateDialogFlag = ref<string>('')

/**
 * @description: 弹出用户协议弹窗
 * @return {*}
 */
const openUserAgreement = () => {
  operateDialogFlag.value = 'USER_AGREEMENT'
  operateDialogRef.value.openDialog()
}

/**
 * @description: 用户协议弹窗下一步方法
 * @return {*}
 */
const userAgreementNext = () => {
  agreementFlag.value = true
}

/**
 * @description:扫码后未注册
 * @return {*}
 */
const scanGoRegistered = () => {
  loginFlag.value = 'SIGN_UP'
}

// 扫码后未录入
const scanGoInput = (openId) => {
  enterInformationRef.value.openPop(openId)
}

// 扫码后审核中
const scanGoUnderReview = () => {
  loginFlag.value = 'PASS_LOGIN'
  operateDialogFlag.value = 'UNDER_REVIEW'
  enterInformationRef.value.openPop()
}

// 扫码后审核不通过
const scanGoAuditFailed = (openId) => {
  operateDialogFlag.value = 'AUDIT_FAILED'
  enterInformationRef.value.openPop(openId)
}
</script>

<template>
  <div
    class="login-form" bg="#023CA7" flex flex-column-around cross-axis-stretch w-552px po-a po-t-17.5 por-344
    potPE-17 h-579px pt-47 pb-17
  >
    <!-- 密码登录标头 -->
    <header
      v-if="loginFlag === 'PASS_LOGIN' || loginFlag === 'SMS_LOGIN'" flex cross-axis-center flex-row-between ml-53
      mr-56
    >
      <span fs-24 fw-400 color="#05FFFF" opacity-50>{{ loginSpan.get(loginFlag).mainTitle }}</span>
      <div cursor-p flex cross-axis-center @click="jumpFun">
        <span fs-18 lh-42 color="#05FFFF">{{ loginSpan.get(loginFlag).subTitle }}</span>
        <el-image class="handoff-icon" :src="handoffIcon" fit="fill" />
      </div>
    </header>
    <!-- 忘记密码标头 注册标头 -->
    <header
      v-if="loginFlag === 'FORGOT_PASS' || loginFlag === 'SIGN_UP'" po-r flex cross-axis-center flex-row-between
      ml-53 mr-56
    >
      <span fs-24 fw-400 color="#05FFFF" opacity-50>{{ loginSpan.get(loginFlag).mainTitle }}</span>
      <el-image class="return-icon" :src="returnIcon" fit="fill" @click="closeForgotPass" />
    </header>

    <!-- 扫一扫登录标头 -->
    <header v-if="loginFlag === 'SCAN_TO_LOG_IN'" flex cross-axis-center flex-row-center ml-53 mr-56>
      <span fs-24 fw-400 color="#05FFFF" opacity-100>{{ loginSpan.get(loginFlag).mainTitle }}</span>
    </header>
    <main flex-1>
      <!-- 密码登陆 -->
      <div v-if="loginFlag === 'PASS_LOGIN'" wPE-100 hPE-100>
        <pass-login @open-find-pass="openFindPass" />
      </div>
      <!-- 忘记密码 -->
      <div v-else-if="loginFlag === 'FORGOT_PASS'" wPE-100 hPE-100>
        <forgot-pass @open-pass-login="openPassLogin" />
      </div>
      <!-- 立即注册 -->
      <div v-else-if="loginFlag === 'SIGN_UP'" wPE-100 hPE-100>
        <sign-up
          :agreement-flag="agreementFlag" @open-enter-information="openEnterInformation"
          @error-agreement="errorAgreementFun"
        />
      </div>
      <!-- 短信登录 -->
      <div v-else-if="loginFlag === 'SMS_LOGIN'" wPE-100 hPE-100>
        <sms-login />
      </div>

      <!-- 扫一扫登录 -->
      <div v-if="loginFlag === 'SCAN_TO_LOG_IN'" w-100 h-100>
        <scan-login
          @scan-go-registered="scanGoRegistered" @scan-go-input="scanGoInput"
          @scan-go-under-review="scanGoUnderReview" @scan-go-audit-gailed="scanGoAuditFailed"
        />
      </div>
    </main>
    <!-- 密码登录||手机号登录页脚 -->
    <footer
      v-if="loginFlag === 'PASS_LOGIN' || loginFlag === 'SMS_LOGIN'" ml-53 mr-56 flex flex-row-between
      cross-axis-center
    >
      <span cursor-p color="#05FFFF" fs-18 @click="scanLogIn">扫一扫登录</span>
      <span cursor-p color="#05FFFF" fs-18 @click="openSignUp"> 立即注册</span>
    </footer>
    <!-- 注册也页脚 -->
    <footer v-if="loginFlag === 'SIGN_UP'" ml-53 mr-56 flex flex-row-center cross-axis-center>
      <el-checkbox v-model="agreementFlag" class="agreement" size="large" @change="checkboxChangeFun" />
      <span ref="agreementSpanRef" class="agreement-span"> 同意并接受
        <span ref="userAgreementRef" class="jump-span" @click="openUserAgreement">《用户协议》</span>
        及
        <span ref="privacyPolicyRef" class="jump-span" @click="openUserAgreement"> 《隐私权保护说明》</span>
      </span>
    </footer>
    <!-- 扫一扫登录页脚 -->
    <footer v-if="loginFlag === 'SCAN_TO_LOG_IN'" ml-53 mr-56 flex flex-row-between cross-axis-center>
      <span cursor-p color="#05FFFF" fs-18 @click="openPassLogin">账号密码登录</span>
      <span cursor-p color="#05FFFF" fs-18 @click="jumpFun"> 手机号登录</span>
    </footer>
  </div>
  <!-- 信息录入弹窗 -->
  <enter-information
    ref="enterInformationRef" :user-sign-tel="userSignTel" :user-sign-type="userSignType"
    @open-pass-login="openPassLogin"
  />
  <!-- 用户协议弹窗 -->
  <operate-dialog ref="operateDialogRef" :type="operateDialogFlag" :confirm="userAgreementNext" />
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

