<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-24 19:54:24
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-06 20:29:52
 * @FilePath: \big-screen\src\components\login\scanLogin.vue
 * @Description: 扫一扫登录页面
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
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
 * @description: 获取扫码结果
 * @return {*}
 */
const getOutcome = async () => {
  try {
    const res = await scanloginchk({ logincode: state.value })
    consola.info(res)
  }
  catch (error) {
    consola.fatal(error)
  }
}

let getOutcomeInterval: NodeJS.Timeout | null = null

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

    rqValue.value = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`

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

