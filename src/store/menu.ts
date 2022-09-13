/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-13 19:22:33
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-13 19:29:19
 * @FilePath: \big-screen\src\store\menu.ts
 * @Description: 菜单下标
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
export const menuStore = defineStore('menuIndexKey', {
  state: () => ({ menuIndex: 0 }),
  persist: {
    enabled: true,
    strategies: [{ key: 'menuIndex', storage: sessionStorage }],
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
