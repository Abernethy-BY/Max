<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-02-01 16:43:55
 * @LastEditors: Abernethy-BY by15242952083@outlook.com
 * @LastEditTime: 2023-02-15 16:40:26
 * @FilePath: \big-screen\src\pages\login.vue
 * @Description:
 * Copyright (c) 2023 by ${git_name} email: ${git_email}, All Rights Reserved.
-->
<script lang="ts" setup>
import { all } from 'axios'
import type { DefineComponent, VNodeRef } from 'vue'
import handoffIcon from '~/assets/image/login/handoffIcon.png'
import returnIcon from '~/assets/image/login/returnIcon.png'
import type { LOGIN_FLAG_DICTIONARY, LOGIN_FOOTER_SPAN_DICTIONARY, LOGIN_KEY, OPERATE_DIALOG_MITT_MODEL, OPERATE_DIALOG_TYPE_KEY, USER_ROLE_TYPE } from '~/model/login'

/**
 * @description: 登录方式标识
 * @return {*}
 */
let loginFlag = $ref<LOGIN_KEY>(LOGIN_TYPE_ENUM.PASS_LOGIN)

/**
 * @description: 登录方式Header字典
 */
const loginHeaderSpanDictionary: Map<LOGIN_KEY, LOGIN_FLAG_DICTIONARY> = new Map()
  .set(LOGIN_TYPE_ENUM.PASS_LOGIN, { mainTitle: '账号密码登录', subTitle: '短信快捷登录', jumpIcon: true, routerDirection: LOGIN_TYPE_ENUM.SMS_LOGIN, marking: null, returnIcon: false })
  .set(LOGIN_TYPE_ENUM.FORGOT_PASS, { mainTitle: '找回密码', subTitle: null, jumpIcon: false, routerDirection: null, marking: null, returnIcon: true })
  .set(LOGIN_TYPE_ENUM.SIGN_UP, { mainTitle: '注册', subTitle: null, jumpIcon: false, routerDirection: null, marking: null, returnIcon: true })
  .set(LOGIN_TYPE_ENUM.SMS_LOGIN, { mainTitle: '短信快捷登录', subTitle: '账号密码登录', jumpIcon: true, routerDirection: LOGIN_TYPE_ENUM.PASS_LOGIN, marking: '验证即登录，未注册将自动创建账号', returnIcon: false })
  .set(LOGIN_TYPE_ENUM.SCAN_TO_LOG_IN, { mainTitle: '微信扫码登录', subTitle: null, jumpIcon: false, routerDirection: null, marking: null, returnIcon: true })

/**
 * @description: 登录方式footer字典
 */
const loginFooterSpanDictionary: Map<LOGIN_KEY, LOGIN_FOOTER_SPAN_DICTIONARY> = new Map()
  .set(LOGIN_TYPE_ENUM.PASS_LOGIN, { buttonList: ['扫一扫登录', '立即注册'], buttonType: 'JUMP', routerDirection: [LOGIN_TYPE_ENUM.SCAN_TO_LOG_IN, LOGIN_TYPE_ENUM.SIGN_UP], showFooter: true })
  .set(LOGIN_TYPE_ENUM.SMS_LOGIN, { buttonList: ['扫一扫登录', '立即注册'], buttonType: 'JUMP', routerDirection: [LOGIN_TYPE_ENUM.SCAN_TO_LOG_IN, LOGIN_TYPE_ENUM.SIGN_UP], showFooter: true })
  .set(LOGIN_TYPE_ENUM.SCAN_TO_LOG_IN, { buttonList: ['账号密码登录', '手机号登录'], buttonType: 'JUMP', routerDirection: [LOGIN_TYPE_ENUM.PASS_LOGIN, LOGIN_TYPE_ENUM.SMS_LOGIN], showFooter: true })
  .set(LOGIN_TYPE_ENUM.SIGN_UP, { buttonList: [], buttonType: 'CONFIRM', routerDirection: [], showFooter: true })
  .set(LOGIN_TYPE_ENUM.FORGOT_PASS, { buttonList: [], buttonType: 'JUMP', routerDirection: [], showFooter: false })

/**
 * @description: 登录方式主标题
 */
const loginHeaderMainTitle = computed(() => loginHeaderSpanDictionary.get(loginFlag)?.mainTitle)

/**
 * @description: 登陆方式副标题
 */
const loginHeaderSubTitle = computed(() => loginHeaderSpanDictionary.get(loginFlag)?.subTitle)

/**
 * @description: 登录跳转图标
 */
const loginHeaderJumpIcon = computed(() => loginHeaderSpanDictionary.get(loginFlag)?.jumpIcon)

/**
 * @description: header标注
 */
const loginHeaderMarking = computed(() => loginHeaderSpanDictionary.get(loginFlag)?.marking)

/**
 * @description: footer按钮列表
 */
const loginFooterButtonList = computed(() => loginFooterSpanDictionary.get(loginFlag)?.buttonList)

/**
 * @description: header返回按钮
 */
const loginHeaderReturnIcon = computed(() => loginHeaderSpanDictionary.get(loginFlag)?.returnIcon)

/**
 * @description: footer类型
 */
const loginFooterType = computed(() => loginFooterSpanDictionary.get(loginFlag)?.buttonType === 'JUMP')

/**
 * @description: footer显示标识
 */
const loginFooterFlag = computed(() => loginFooterSpanDictionary.get(loginFlag)?.showFooter)

/**
 * @description: 登录方式切换方法 --- header触发
 * @return {void}
 */
const headerJumpFun = (): void => {
  loginFlag = loginHeaderSpanDictionary.get(loginFlag)?.routerDirection || 'PASS_LOGIN'
}

/**
 * @description: 返回密码登录
 */
const returnPassLogin = (): void => {
  loginFlag = 'PASS_LOGIN'
}

/**
 * @description: 登录方式切换方法 --- footer触发
 * @param {number} index 按钮下标
 * @return {void}
 */
const footerJumpFun = (index: number): void => {
  loginFlag = loginFooterSpanDictionary.get(loginFlag)?.routerDirection[index] || 'PASS_LOGIN'
}

/**
 * @description: 用户协议同意标识
 */
const agreementFlag = ref<boolean>(false)

/**
 * @description: 用户协议文字节点
 */
const agreementSpanRef = $ref<VNodeRef>()

/**
 * @description: 用户协议文字节点
 */
const userAgreementRef = $ref<VNodeRef>()

/**
 * @description: 用户协议文字节点
 */
const privacyPolicyRef = $ref<VNodeRef>()

/**
 * @description: 用户协议选中更改标识
 * @param {boolean} e 选中状态
 * @return {void}
 */
const checkboxChangeFun = (e: boolean): void => {
  if (e) {
    anime({ targets: agreementSpanRef, color: '#0D96CC', round: 1, easing: 'linear', duration: 500 })
    anime({ targets: [userAgreementRef, privacyPolicyRef], color: '#1ADCFF', round: 1, easing: 'linear', duration: 500 })
  }
}

/**
 * @description: 弹出用户条款
 * @return {void}
 */
const openUserAgreement = (): void => {

}

/**
 * @description: 相应弹窗类型
 */
let operateDialogFlag = $ref<OPERATE_DIALOG_TYPE_KEY>('LOGIN')

/**
 * @description: 交互弹窗确认回调函数
 */
let userAgreementNext = $ref<Function>()

/**
 * @description: 交互弹窗关闭回调函数
 */
let userAgreementClose = $ref<Function>()

/**
 * @description: 订阅跳转忘记密码事件
 */
emitter.on(LOGIN_MITT_ENUM.openForgetPass, () => loginFlag = LOGIN_TYPE_ENUM.FORGOT_PASS)

/**
 * @description: 交互弹窗对象
 */
const operateDialogRef = $ref<DefineComponent>()
/**
 * @description: 订阅弹窗操作弹窗事件
 */
emitter.on(LOGIN_MITT_ENUM.openOperateDialog, ({ type, nextCallBack, closeCallBack }: OPERATE_DIALOG_MITT_MODEL<{ userType: USER_ROLE_TYPE; tel: number }>) => {
  type && (operateDialogFlag = type)
  nextCallBack && (userAgreementNext = nextCallBack)
  closeCallBack && (userAgreementClose = closeCallBack)
  operateDialogRef?.openDialog()
})

/**
 * @description: 信息录入弹窗节点
 */
const enterInformationRef = $ref<DefineComponent>()

/**
 * @description: 订阅弹出信息录入弹窗
 */
emitter.on(LOGIN_MITT_ENUM.openEnterInformation, param => enterInformationRef?.openPop(param))

/**
 * @description: 用户协议同意警告
 */
emitter.on(LOGIN_MITT_ENUM.userAgreementError, () => anime({ targets: [agreementSpanRef, userAgreementRef, privacyPolicyRef], color: '#ff4757', round: 1, easing: 'linear', duration: 300 }))

/**
 * @description: 扫码登录未注册事件
 */
emitter.on(LOGIN_MITT_ENUM.notRegistered, () => loginFlag = LOGIN_TYPE_ENUM.SIGN_UP)

onMounted(() => {
  emitter.all.clear()
})
</script>

<template>
  <div class="login-box" bg="#023CA7" flex flex-column-around cross-axis-stretch w-552px po-a por-344 potPE-17 h-579px>
    <header hPE-20 flex cross-axis-start ml-53 mr-56 flex-column-center>
      <div class="title-box" wPE-100 flex flex-row-between cross-axis-center>
        <span fs-24 fw-400 color="#05FFFF" opacity-50 v-text="loginHeaderMainTitle" />
        <div v-if="loginHeaderJumpIcon" cursor-p flex cross-axis-center @click="headerJumpFun">
          <span fs-18 mr-10 lh-42 color="#05FFFF" v-text="loginHeaderSubTitle" />
          <el-image class="handoff-icon" :src="handoffIcon" fit="fill" />
        </div>
        <el-image
          v-if="loginHeaderReturnIcon" class="return-icon" :src="returnIcon" fit="fill"
          @click="returnPassLogin"
        />
      </div>
      <span
        v-if="loginHeaderMarking" mtPE-10 :style="{ color: 'rgba(5, 255, 255, 0.5)' }" po-a fs-16
        v-text="loginHeaderMarking"
      />
    </header>

    <main flex-1>
      <pass-login v-if="loginFlag === 'PASS_LOGIN'" />

      <forgot-pass v-else-if="loginFlag === 'FORGOT_PASS'" />

      <sign-up v-else-if="loginFlag === 'SIGN_UP'" :agreement-flag="agreementFlag" />

      <sms-login v-else-if="loginFlag === 'SMS_LOGIN'" />

      <scan-login v-if="loginFlag === 'SCAN_TO_LOG_IN'" />
    </main>

    <footer v-if="loginFooterFlag" hPE-12 ml-53 mr-56 flex flex-row-center cross-axis-center>
      <div v-if="loginFooterType" wPE="100" hPE-100 flex flex-row-between cross-axis-center>
        <span
          v-for="(item, index) in loginFooterButtonList" :key="index" cursor-p color="#05FFFF" fs-18
          @click="footerJumpFun(index)" v-text="item"
        />
      </div>
      <div v-else flex-row-center cross-axis-center>
        <el-checkbox v-model="agreementFlag" class="agreement" size="large" @change="checkboxChangeFun" />
        <span ref="agreementSpanRef" class="agreement-span"> 同意并接受
          <span ref="userAgreementRef" class="jump-span" @click="openUserAgreement">《用户协议》</span>
          及
          <span ref="privacyPolicyRef" class="jump-span" @click="openUserAgreement"> 《隐私权保护说明》</span>
        </span>
      </div>
    </footer>

    <!-- 信息录入弹窗       @open-pass-login="openPassLogin" -->
    <enter-information ref="enterInformationRef" />

    <operate-dialog ref="operateDialogRef" :type="operateDialogFlag" :confirm="userAgreementNext" :close="userAgreementClose" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: login
</route>

<style lang="scss" scoped>
.login-box {
  background: no-repeat url("~/assets/image/login/loginFormBg.png");
  background-size: 100% 100%;

  :deep(.return-icon) {
    width: 24px;
    height: 19px;
    cursor: pointer;
  }

  footer {
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

}
</style>
