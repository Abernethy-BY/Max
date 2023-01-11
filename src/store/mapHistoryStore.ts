/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-10 18:02:22
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-11 14:50:21
 * @FilePath: \big-screen\src\store\mapHistoryStore.ts
 * @Description: 地图历史堆栈
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { REAR_DATA_MODEL } from '~/model'
export const mapHistoryStore = defineStore('map', () => {
  /**
   * @description: 地图历史堆栈
   */
  const mapHistory = ref<REAR_DATA_MODEL[]>([])

  /**
   * @description: 添加地图记录
   * @param {REAR_DATA_MODEL} areaDate 区域数据
   * @return {REAR_DATA_MODEL} 操作后最后一位数据
   */
  const addMapData = (areaDate: REAR_DATA_MODEL): REAR_DATA_MODEL => {
    const indexTemp = mapHistory.value.findIndex(e => e.adCode === areaDate.adCode)
    if (indexTemp === -1)
      mapHistory.value.push(areaDate)

    return areaDate
  }

  /**
   * @description: 删除地图记录
   * @return {REAR_DATA_MODEL} 操作后最后一位数据
   */
  const popMapData = (): REAR_DATA_MODEL => {
    const lengthTemp = mapHistory.value.length
    if (lengthTemp === 1) {
      return mapHistory.value[0]
    }
    else {
      mapHistory.value.pop()
      return mapHistory.value[mapHistory.value.length - 1]
    }
  }

  return { mapHistory, addMapData, popMapData }
}, {
  persist: {
    enabled: true,
    strategies: [{ key: 'map', storage: sessionStorage }],
  },
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(mapHistoryStore, import.meta.hot))
