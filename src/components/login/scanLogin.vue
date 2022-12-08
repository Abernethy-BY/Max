<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-24 19:54:24
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-08 20:00:38
 * @FilePath: \big-screen\src\components\login\scanLogin.vue
 * @Description: 扫一扫登录页面
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
const emit = defineEmits(['scanGoRegistered'])

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
const notScannedFun = () => { }

/**
 * @description: 未注册方法
 * @return {*}
 */
const notRegisteredFun = () => {
  emit('scanGoRegistered')
}

// 未录入方法
const notEnteredFun = () => {}

// 审核中方法
const underReviewFun = () => {}

// 深恶黑不通过方法
const auditFailedFun = () => {}

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
const scanLogin = () => {}

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
    const res = await scanloginchk({ logincode: state.value })
    consola.success(['扫码成功', res])
    scanLogin()
  }
  catch (error) {
    errMap.get(error.message)?.call(this)
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
    }, 1000 * 30)
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

