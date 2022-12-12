<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-12-05 13:34:00
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-12 21:15:19
 * @FilePath: \big-screen\src\components\pandect\pandectMap.vue
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { EChartsType } from 'echarts'
import magnify from '~/assets/image/pandect/magnify.png'
import shrink from '~/assets/image/pandect/shrink.png'
import fanhui from '~/assets/image/common/navBg/fanhui.png'

import type { REAR_DATA_MODEL } from '~/model'
const propObj = withDefaults(defineProps<{ areaData: REAR_DATA_MODEL }>(), { areaData: () => ({ adCode: '10000', areaName: '中国' }) })

// 用户信息对象
const userInfo = useUserStore()

// 地图历史栈
const historyList: Array<REAR_DATA_MODEL> = []

/**
 * @description: 地图chart对象
 */
let mapChart: EChartsType | null = null

/**
 * @description: 地图节点
 */
const pandectMapRef = ref<HTMLElement>()

/**
 * @description: 高德参数
 */
const aMapParam = {
  key: 'a9618a7db350f35205fe226cd22b6868',
  version: '2.0',
  plugins: ['geo/DistrictExplorer'],
  Loca: { version: '2.0.0' },
  AMapUI: { plugins: ['geo/DistrictExplorer'] },
}

/**
 * @description: 地图配置
 */
const option: any = {
  tooltip: { trigger: 'item', formatter: param => param.name },
  series: [],
}

/**
 * @description: 获取县级一下地图区域
 * @return {*}
 */
const getParkJson = async (adCode: string) => {
  try {
    const submitId = new Date().getTime()
    const param = {
      submitid: submitId,
      usercode: userInfo.userCode,
      sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
      mapurl: `https://geo.datav.aliyun.com/areas_v3/bound/${adCode}.json`,
    }
    const temp: any = await getMapdata(param)

    const arrTemp: any = []
    disposeGeoJson(temp).features.forEach((element, index) => {
      eCharts.registerMap(`map${index}`, { type: 'FeatureCollection', features: [element] })
      arrTemp.push(seriesOption(`map${index}`, index + 1, mapChart, index === 0 ? 1 : 0.1))
    })
    option.series = arrTemp
    mapChart?.setOption(option)
  }
  catch (error) {
    consola.fatal(error)
  }
}

/**
 * @description: 地图绘制方法
 * @return {*}
 */
const initMap = () => {
  if (mapChart)
    mapChart?.dispose()

  nextTick(() => {
    pandectMapRef.value && (mapChart = eCharts.init(pandectMapRef.value))
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    mapChart?.on('click', mapClickFun)
  })
}

/**
 * @description: 地图生成方法
 * @param {*} adCode 地区adCode
 * @return {*}
 */
const generateMap = (areaData: REAR_DATA_MODEL, operate: string) => {
  AMapLoader.load(aMapParam).then(() => {
    AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
      // 创建ui对象
      const districtExplorer = new DistrictExplorer()

      // ui方法 --- 获取json
      districtExplorer.loadAreaNode(areaData.adCode, async (error, areaNode) => {
        if (error) {
          ElMessage({ message: '地图服务器错误，请刷新重试', type: 'error' })
          throw new Error('地图服务器错误，请刷新重试')
        }

        if (operate === 'drillDown')
          historyList.push(areaData)

        await initMap()
        // 获取json对象
        const Json = areaNode.getSubFeatures()

        if (Json.length === 0) {
          await getParkJson(areaData.adCode)
        }

        else {
          eCharts.registerMap('map', { type: 'FeatureCollection', features: Json })
          option.series = [seriesOption('map', 1, mapChart, 1)]
          mapChart?.setOption(option)
        }
      })
    })
  }).catch(() => { ElMessage({ message: '地图服务器错误，请刷新重试', type: 'error' }) })
}

/**
 * @description: 地图下钻方法
 * @return {*}
 */
const mapClickFun = (params) => {
  try {
    const drillDownFun = async () => {
      const { name } = params
      const adCode = await getMapAdCode(name)
      generateMap({ adCode, areaName: name }, 'drillDown')
    }
    // 防抖
    debounce(drillDownFun, 1000, true)
  }
  catch (error) {
    consola.fatal(error)
    ElMessage({ message: error, type: 'error' })
  }
}

// 地图上浮方法
const goLast = () => {
  try {
    // if (historyList.length === 1) {
    //   throw new Error('The last one')
    // }
    // else {
    //   historyList.pop()
    //   generateMap(historyList[historyList.length - 1])
    // }

    // generateMap(historyList.pop())

    // consola.info(historyList.map(e => toRaw(e)))

    if (historyList.length > 1)
      historyList.pop()

    generateMap(historyList[historyList.length - 1], 'goBack')
  }
  catch (error) {
    consola.fatal(error)
  }
}

watch(propObj.areaData, () => {
  generateMap(propObj.areaData, 'drillDown')
})
</script>

<template>
  <div class="pandect-map-box" w-100 h-100 po-r>
    <!-- <span>{{ propObj.areaData }}</span> -->
    <!-- <span>{{ propObj.areaName }}</span> -->
    <div class="icon-box" po-l-5 po-a pob-50 z-50 flex-column-start>
      <el-image
        class="operate-icon" :src="magnify" fit="fill" @mousedown.prevent="goMagnifyMapStart(mapChart, option)"
        @mouseup.prevent="goMagnifyMapTouchEnd(mapChart, option)"
      />
      <el-image
        class="operate-icon" :src="shrink" fit="fill" @mousedown.prevent="goShrinkMapStart(mapChart, option)"
        @mouseup.prevent="goShrinkMapEnd(mapChart, option)"
      />
      <el-image class="operate-icon" :src="fanhui" fit="fill" @click="goLast" />
    </div>
    <div ref="pandectMapRef" w-100 h-100 />
  </div>
</template>

<style lang="scss" scoped>
.pandect-map-box {
  :deep(.operate-icon) {
    margin: 10px 0;
    cursor: pointer;
  }
}
</style>
