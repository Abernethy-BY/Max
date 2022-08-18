/*
 * @Author: By
 * @Date: 2022-08-18 15:07:25
 * @LastEditTime: 2022-08-18 19:54:35
 * @LastEditors: By
 * @Description:
 * @FilePath: \big-screen-vue3\src\store\useUserStore.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ token: '111', userCode: '', userRole: '' }),
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
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
