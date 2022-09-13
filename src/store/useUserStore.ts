/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-08 11:57:45
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-13 19:23:49
 * @FilePath: \big-screen\src\store\useUserStore.ts
 * @Description: userInfo
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */

import { acceptHMRUpdate, defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({ token: '', userCode: '', userRole: '' }),
  getters: {
    hasToken: (state): boolean => !(!state.token || state.token === ''),
    getToken: (state): string => state.token,
    getUserCode: state => state.userCode,
    getUserRole: state => state.userRole,
  },
  actions: {
    // changeToken: (param: string, state) => {
    //   state.token = param
    // },
    // changeUserCode: (param: string) => { this.userCode = param },
    // changeRole: (param: string) => { this.userRole = param },
  },
  persist: {
    enabled: true,
    strategies: [{ key: 'user', storage: sessionStorage }],
  },

})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
