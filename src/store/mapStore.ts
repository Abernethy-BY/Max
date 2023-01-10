/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-10 18:02:22
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-10 18:30:06
 * @FilePath: \big-screen\src\store\mapStore.ts
 * @Description: 地图历史堆栈
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { REAR_DATA_MODEL } from '~/model'
import type { MODULE_TYPE_MODEL } from '~/model/map'
export const mapStore = defineStore('map', () => {
  /**
   * @description: 园区总览地图历史
   */
  const overviewOfParkMapHistory = ref<REAR_DATA_MODEL[]>()

  /**
   * @description: 产业图鉴地图历史
   */
  const enterpriseMapHistory = ref<REAR_DATA_MODEL[]>()

  /**
   * @description: 添加地图记录
   * @param {MODULE_TYPE_MODEL} moduleType 模块类型
   * @param {REAR_DATA_MODEL} areaDate 区域数据
   * @return {REAR_DATA_MODEL} 操作后最后一位数据
   */
  const addMapData = (moduleType: MODULE_TYPE_MODEL, areaDate: REAR_DATA_MODEL): REAR_DATA_MODEL 
  
  
  => {
    if (moduleType === 'enterprise')
      enterpriseMapHistory.value?.push(areaDate)
    else
      overviewOfParkMapHistory.value?.push(areaDate)
    consola.info([moduleType, areaDate])
    // return moduleType === 'enterprise' ? enterpriseMapHistory.value?.[enterpriseMapHistory.value?.length - 1] : overviewOfParkMapHistory.value?.[overviewOfParkMapHistory.value?.length - 1]
    return { adCode: '', areaName: '' }
  }

  return { overviewOfParkMapHistory, enterpriseMapHistory, addMapData }
}, {
  persist: {
    enabled: true,
    strategies: [{ key: 'user', storage: sessionStorage }],
  },
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(mapStore, import.meta.hot))
