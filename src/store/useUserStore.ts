/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-08 11:57:45
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-25 18:57:54
 * @FilePath: \big-screen\src\store\useUserStore.ts
 * @Description: userInfo
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */

import { acceptHMRUpdate, defineStore } from 'pinia'
// import { setupLayouts } from 'virtual:generated-layouts'
// import generatedRoutes from '~pages'
// import App from '~/App.vue'
// import router from '@/router'

// import { createRouter, createWebHistory } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const userCode = ref<string>('')
  const userRole = ref<string>('')
  const city = ref<string>('')
  const compname = ref<string>('')
  const province = ref<string>('')

  const hasToken = computed(() => !(!token.value || token.value === ''))
  const getToken = computed(() => token.value)
  const getUserCode = computed(() => userCode.value)
  const getUserRole = computed(() => userRole.value)

  const changeToken = (param) => {
    token.value = param
  }

  const changeUserCode = (param) => {
    userCode.value = param
  }

  const changeRole = (param) => {
    userRole.value = param
  }

  // const getRouter = () => {
  //   consola.info(generatedRoutes)
  //   const routes = setupLayouts(generatedRoutes)
  //   consola.info(App)
  //   consola.info(route)
  //   consola.info(router)
  // }

  return { token, userCode, userRole, changeToken, changeUserCode, changeRole, city, compname, province, hasToken, getToken, getUserCode, getUserRole }
}, {
  persist: {
    enabled: true,
    strategies: [{ key: 'user', storage: sessionStorage }],
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
