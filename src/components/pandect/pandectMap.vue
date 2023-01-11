<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-12-05 13:34:00
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-11 14:49:20
 * @FilePath: \big-screen\src\components\pandect\pandectMap.vue
 * @Description: 地图组件
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { EChartsOption, EChartsType } from 'echarts'

import type { MAP_PARAM_TYPE, REAR_DATA_MODEL } from '~/model'
import type { MAP_OPERATE_ICON_POSITION_MODEL, MAP_OPERATE_MODEL, SERIES_OPTION_MODEL } from '~/model/map'
const propObj = withDefaults(defineProps<{ areaData: REAR_DATA_MODEL; iconPosition: MAP_OPERATE_ICON_POSITION_MODEL }>(), { areaData: () => ({ adCode: '10000', areaName: '中国' }), iconPosition: 'left' })
const emit = defineEmits(['getPageData', 'showParkImage'])

/**
 * @description: 用户信息
 */
const userInfo = useUserStore()

/**
 * @description: 地图历史对象
 */
const mapHistory = mapHistoryStore()

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
const aMapParam: MAP_PARAM_TYPE = {
  key: 'a9618a7db350f35205fe226cd22b6868',
  version: '2.0',
  plugins: ['geo/DistrictExplorer'],
  Loca: { version: '2.0.0' },
  AMapUI: { plugins: ['geo/DistrictExplorer'] },
}

/**
 * @description: 地图配置
 */
const option: EChartsOption = {
  tooltip: { trigger: 'item', formatter: param => param.name },
  series: [],
}

/**
 * @description: 获取县级一下地图区域
 * @param {string} adCode 区域编码
 * @return {Promise<void>}
 */
const getParkJson = async (adCode: string): Promise<void> => {
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
      if (mapChart) {
        const zoom = index === 0 ? 1 : 0.1
        const labelMargins = propObj.iconPosition === 'right' ? 100 : 500
        const optionParam: SERIES_OPTION_MODEL = { mapName: `map${index}`, zlevel: index + 1, chart: mapChart, zoom, labelPosition: propObj.iconPosition, labelMargins }
        arrTemp.push(seriesOption(optionParam))
      }
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
 * @return {void}
 */
const initMap = (): void => {
  mapChart?.dispose()
  pandectMapRef.value && (mapChart = eCharts.init(pandectMapRef.value))
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  mapChart?.on('click', mapClickFun)
}

const eChartLoadingOpt: Object = {
  text: '加载中',
  color: '#c23531',
  textColor: '#ffffff',
  maskColor: 'rgba(255, 255, 255, 0)',
  zlevel: 10,
  fontSize: 25,
}

/**
 * @description: 地图生成方法
 * @param {REAR_DATA_MODEL} areaData 区域信息
 * @param {MAP_OPERATE_MODEL} operate 地图动作
 * @return {void}
 */
const generateMap = (areaData: REAR_DATA_MODEL, operate: MAP_OPERATE_MODEL): void => {
  consola.info([areaData, operate])
  mapChart?.showLoading(eChartLoadingOpt)
  AMapLoader.load(aMapParam).then(() => {
    AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
      // 创建ui对象
      const districtExplorer = new DistrictExplorer()

      // ui方法 --- 获取json
      districtExplorer.loadAreaNode(areaData.adCode, async (error, areaNode) => {
        if (error)
          throw new Error('地图服务器错误，请刷新重试')

        if (operate === 'DRILL_DOWN')
          mapHistory.addMapData(areaData)
        mapChart?.hideLoading()
        await initMap()
        // 获取json对象
        const Json = areaNode.getSubFeatures()

        if (Json.length === 0) {
          await getParkJson(areaData.adCode)
        }
        else {
          eCharts.registerMap('map', { type: 'FeatureCollection', features: Json })
          if (mapChart) {
            const labelMargins = propObj.iconPosition === 'right' ? 200 : 100
            const optionParam: SERIES_OPTION_MODEL = { mapName: 'map', zlevel: 1, chart: mapChart, zoom: 1, labelPosition: propObj.iconPosition, labelMargins }
            option.series = [seriesOption(optionParam)]
            mapChart?.setOption(option)
          }
        }

        emit('getPageData', areaData.areaName)
      })
    })
  }).catch(() => { ElMessage({ message: '地图服务器错误，请刷新重试', type: 'error' }) })
}

/**
 * @description: 地图下钻方法
 * @param {string} name 点击区域名曾
 * @param {number} componentIndex 点击区域层级
 * @return {void}
 */
const mapClickFun = ({ name, componentIndex }: { name: string; componentIndex: number }): void => {
  try {
    if (componentIndex === 0) {
      const drillDownFun = async (val) => {
        const adCode = await getMapAdCode(val)
        generateMap({ adCode, areaName: val }, 'DRILL_DOWN')
      }
      debounce(drillDownFun, 1000, true, [name])
    }
    else {
      mapChart?.dispose()
      emit('showParkImage', name)
    }
  }
  catch (error) {
    consola.fatal(error)
    ElMessage({ message: error, type: 'error' })
  }
}

/**
 * @description: 地图上浮方法
 * @return {void}
 */
const goLast = (): void => {
  try {
    generateMap(mapHistory.popMapData(), 'GO_BACK')
  }
  catch (error) {
    consola.fatal(error)
  }
}

watch(propObj.areaData, () => {
  generateMap(propObj.areaData, 'DRILL_DOWN')
})

/**
 * @description: 上层绘制地图
 * @return {void}
 */
const protractMap = () => {
  const historyTemp = toRaw(mapHistory.mapHistory)
  generateMap(historyTemp[historyTemp.length - 1], 'GO_BACK')
}

defineExpose({ protractMap })

/**
 * @description: 地图放大方法
 * @return {void}
 */
const magnifyMap = () => {
  (option.series && option.series[0]) && (option.series[0].zoom += 0.1)
  mapChart?.setOption(option)
}

/**
 * @description: 地图缩小方法
 * @return {void}
 */
const shrinkMap = () => {
  (option.series && option.series[0]) && (option.series[0].zoom -= 0.1)
  mapChart?.setOption(option)
}
</script>

<template>
  <div class="pandect-map-box" w-100 h-100 po-r>
    <map-operate
      :icon-position="propObj.iconPosition" content-type="map" @go-last="goLast" @magnify-map="magnifyMap"
      @shrink-map="shrinkMap"
    />
    <div ref="pandectMapRef" w-100 h-100 />
  </div>
</template>
