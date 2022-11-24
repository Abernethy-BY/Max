<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-24 19:54:24
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-24 20:52:40
 * @FilePath: \big-screen\src\components\login\scanLogin.vue
 * @Description: 扫一扫登录页面
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
const rqValue = ref<string>('00000000000000000000000000')
const getLoginwxback = async () => {
  try {
    const submitId = new Date().getTime()

    const loginwxbackParam = {
      // usertype: signUpForm.value.userType,
      state: submitId,
      // sign: md5(`${submitId}123789`),
      // tel: signUpForm.value.tel,
      // pass: signUpForm.value.pass,
      // checkcode: signUpForm.value.telCode,
    }
    const loginWxBackRes = await loginWxBack(loginwxbackParam)
    consola.info(loginWxBackRes)
  }
  catch (error) {

  }
}

getLoginwxback()
</script>

<template>
  <div w-100 h-100 flex-row-center cross-axis-center>
    <vue-qrcode :value="rqValue" :options="{ width: 243 }" />
  </div>
</template>

