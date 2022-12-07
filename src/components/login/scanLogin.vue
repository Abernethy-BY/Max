<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-24 19:54:24
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-07 20:53:58
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

/**
 * @description: 错误列表
 */
const errList = ['未扫秒', '未注册']

/**
 * @description:获取扫描结果定时器
 */
let getOutcomeInterval: NodeJS.Timeout | null = null

/**
 * @description: 未注册方法
 * @return {*}
 */
const notRegisteredFun = () => {
  emit('scanGoRegistered')
}

/**
 * @description: 获取扫码结果
 * @return {*}
 */
const getOutcome = async () => {
  try {
    const res = await scanloginchk({ logincode: state.value })
    consola.success(['扫码成功', res])
  }
  catch (error) {
    const errType = errList.findIndex(e => e === error.message)
    // if (errType === -1) {
    //   ElMessage({ message: '服务器错误', type: 'error' })
    // getOutcomeInterval && clearInterval(getOutcomeInterval)

    // }

    // else if (errType === 1) {
    notRegisteredFun()
    // }
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

