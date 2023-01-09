/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-13 19:22:33
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-09 19:38:37
 * @FilePath: \big-screen\src\store\menu.ts
 * @Description: 菜单下标
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
export const menuStore = defineStore('menuIndexKey', () => {
/**
 * @description:菜单下标
 * @return {*}
 */
  const menuIndex = ref<number>()
  return { menuIndex }
}, {
  persist: {
    enabled: true,
    strategies: [{ key: 'menu', storage: sessionStorage }],
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(menuStore, import.meta.hot))
