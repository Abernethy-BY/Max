<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-24 19:54:24
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-05 20:08:11
 * @FilePath: \big-screen\src\components\login\scanLogin.vue
 * @Description: 扫一扫登录页面
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<!-- <script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js" type=“module”></script> -->
<!-- <remote-js async src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"> </remote-js> -->

<script lang="ts" setup>
const appId = ref<string>('wxa27b289d15efc9bf')
const scope = ref<string>('snsapi_base')
const redirectUri = ref<string>('https://wx.maxrong.com/bigdata/loginwxback.aspx')
const stateCode = ref<string>('1212121')
</script>

<template>
  <div id="box" w-100 h-100 flex-row-center cross-axis-center>
    <!-- <vue-qrcode :value="rqValue" :options="{ width: 243 }" /> -->
    <wx-login w-100 h-100 :appid="appId" :scope="scope" :redirect_uri="redirectUri" :state="stateCode" href="" />
    <!-- <wxlogin :appid="appid" :scope="scope" :redirect_uri="redirect_uri" /> -->
  </div>
</template>

