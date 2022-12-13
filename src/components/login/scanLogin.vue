<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-24 19:54:24
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-13 20:35:05
 * @FilePath: \big-screen\src\components\login\scanLogin.vue
 * @Description: 扫一扫登录页面
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
const emit = defineEmits(['scanGoRegistered', 'scanGoInput', 'scanGoUnderReview', 'scanGoAuditFailed'])
const userInfo = useUserStore()

/**
 * @description: 二维码透明度
 */
const qrOpacity = ref<number>(1)

/**
 * @description: 二维码唯一标识符
 */
const state = ref<string>()

/**
 * @description: 二维码内容
 */
const rqValue = ref<string>('')

/**
 * @description: 蒙版显示标识
 */
const maskFlag = ref<boolean>(false)

// 未扫描方法
const notScannedFun = () => {
  consola.fatal('未扫描')
}

/**
 * @description: 未注册方法
 * @return {*}
 */
const notRegisteredFun = (openId) => {
  ElMessage({ message: '您的账号未注册,即将为您打开注册页面', type: 'error' })
  emit('scanGoRegistered', openId)
}

// 未录入方法
const notEnteredFun = (openId) => {
  ElMessage({ message: '您的账号未录入,即将为您打开录入页面', type: 'error' })
  emit('scanGoInput', openId)
}

// 审核中方法
const underReviewFun = () => {
  emit('scanGoUnderReview')
}

// 审核不通过方法
const auditFailedFun = (openId) => {
  emit('scanGoAuditFailed', openId)
}

/**
 * @description: 错误字典
 */
const errMap: Map<string, Function> = new Map()
errMap.set('未扫描', notScannedFun)
errMap.set('未注册', notRegisteredFun)
errMap.set('未录入资料', notEnteredFun)
errMap.set('审核中', underReviewFun)
errMap.set('审核不通过', auditFailedFun)

// 扫码登陆接口
const scanLogin = (user) => {
  userInfo.token = user.token
  userInfo.userCode = user.usercode
  userInfo.userRole = user.role
  userInfo.city = user.city
  userInfo.compname = user.compname
  userInfo.province = user.province
}

/**
 * @description:获取扫描结果定时器
 */
let getOutcomeInterval: NodeJS.Timeout | null = null

/**
 * @description: 获取扫码结果
 * @return {*}
 */
const getOutcome = async () => {
  try {
    const res: any = await scanloginchk({ logincode: state.value })
    if (errMap.get(res.message))
      errMap.get(res.message)?.call(this, res.data[0] ? res.data[0].openid : '')
    else
      scanLogin(res.data[0])
  }
  catch (error) {
    consola.fatal(error)
  }
}

/**
 * @description: 获取二维码
 * @return {*}
 */
const getQrCoded = async () => {
  try {
    const appId = 'wxa27b289d15efc9bf'
    const redirectUri = 'https://wx.maxrong.com/bigdata/loginwxback.aspx'
    const responseType = 'code'
    const scope = 'snsapi_base'
    state.value = Math.random().toFixed(6).slice(-6)

    rqValue.value = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state.value}`

    getOutcome()

    // 轮询获取接口结果
    let intervalTimer = 20
    getOutcomeInterval = setInterval(() => {
      if (--intervalTimer === 0) {
        getOutcomeInterval && clearInterval(getOutcomeInterval)
        qrOpacity.value = 0.1
      }
      getOutcome()
    }, 1000 * 5)
  }
  catch (error) {
    consola.fatal(error)
    ElMessage({ message: error, type: 'error' })
  }
}

getQrCoded()

onUnmounted(() => {
  getOutcomeInterval && clearInterval(getOutcomeInterval)
})
</script>

<template>
  <div id="box" w-100 h-100 flex-row-center po-r cross-axis-center>
    <div v-if="maskFlag" class="masks-box" bg="#2f3542" opacity-50 w-100 h-100 po-a po-l-0 po-t-0>
      <span>二维码已失效，点击刷新</span>
    </div>
    <vue-qrcode :style="{ opacity: qrOpacity }" :value="rqValue" :options="{ width: '100%' }" />
  </div>
</template>

