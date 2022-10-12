<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-06 18:58:43
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-10-12 17:36:53
 * @FilePath: \big-screen\src\components\enterprise\enterpriseMap.vue
 * @Description: 产业图鉴地图
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import 'echarts/lib/chart/map'
import 'echarts/lib/component/geo'
import type { EChartsType } from 'echarts'
import { ElMessage } from 'element-plus'
import shrink from '~/assets/image/pandect/shrink.png'
import magnify from '~/assets/image/pandect/magnify.png'
import fanhui from '~/assets/image/common/navBg/fanhui.png'
import type { InterfaceModel } from '~/model'
const propObj = withDefaults(defineProps<{ coordinateProp?: InterfaceModel }>(), { coordinateProp: () => { return { 位置: '', 数据: '', 数值1: '', 数值2: '', 图标: '' } } })

const emit = defineEmits(['refresh'])

/**
 * @description: 地图操作历史
 */
const mapOperateHistory: any = []

/**
 * @description: 地图配置
 * @return {*}
 */
const option: any = {
  tooltip: { trigger: 'item', formatter: param => param.name },
  series: [],
}

/**
 * @description: 地图节点
 */
let myChart: EChartsType | null = null

/**
 * @description: 根节点
 * @return {*}
 */
const mapRef = ref()

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
 * @description: loading参数
 * @return {*}
 */
const loadingParam = {
  text: '加载中',
  color: '#c23531',
  textColor: 'white',
  fontSize: 30,
  maskColor: 'rgba(30,7,114,.0)',
  zlevel: 0,
}

/**
 * @description: 接口参数处理方法
 * @param {*} val 接口参数
 * @return {*}
 */
const disposeParamFun = val => `${Object.keys(val).map(e => `${e}=${val[e]}`).join('&')}cef67f7186b4debe1f9dd24dec1141a4`

/**
 * @description: 初始化地图方法
 * @return {*}
 */
const initMap = (val = 430000, areaName = '湖南省', flag = 'drillDown') => {
  AMapLoader.load(aMapParam).then(() => {
    AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
      const districtExplorer = new DistrictExplorer()
      districtExplorer.loadAreaNode(val, async (error, areaNode) => {
        if (error) {
          console.error(error)
          ElMessage({ message: '地图服务器错误，请刷新重试', type: 'error' })
          return
        }
        const Json = areaNode.getSubFeatures()

        if (Json.length === 0) {
          const userInfo = useUserStore()
          const submitId = new Date().getTime()
          const param = {
            submitid: submitId,
            usercode: userInfo.userCode,
            sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
            mapurl: `https://geo.datav.aliyun.com/areas_v3/bound/${val}.json`,
          }
          const temp: any = await getMapdata(param)
          const arrTemp: any = []
          disposeGeoJson(temp).features.forEach((element, index) => {
            eCharts.registerMap(`map${index}`, { type: 'FeatureCollection', features: [element] })
            arrTemp.push(seriesOption(`map${index}`, index + 1, myChart, index === 0 ? 1 : 0.1))
          })
          option.series = arrTemp
        }
        else {
          eCharts.registerMap('map', { type: 'FeatureCollection', features: Json })
          option.series = [seriesOption('map', 1, myChart, 1)]
        }

        if (flag === 'drillDown')
          mapOperateHistory.push({ adCode: val, areaName })

        emit('refresh', areaName)
        myChart?.hideLoading()
        myChart?.setOption(option)
      })
    })
  }).catch(() => { ElMessage({ message: '地图服务器错误，请刷新重试', type: 'error' }) })
}

/**
 * @description: 地图点击事件
 * @param {*} params 点击数据
 */
const mapClickFun = (params) => {
  // 地图下钻方法
  const drillDownFun = async () => {
    const param = { address: params.name, key: '79848c3f3fbd1e9321efb5408c3c4a31' }
    const sig = md5(disposeParamFun(param))
    const res: any = await getAdCode({ ...param, sig })
    myChart?.dispose()
    myChart = eCharts.init(mapRef.value)
    myChart?.on('click', mapClickFun)
    myChart?.showLoading(loadingParam)
    initMap(res[0].adcode, params.name)
  }

  // 防抖
  debounce(drillDownFun, 1000, true)
}

/**
 * @description: 地图放大方法
 * @return {*}
 */
const magnifyMap = () => {
  option.series[0].zoom += 0.1
  myChart?.setOption(option)
}

/**
 * @description: 地图缩小方法
 * @return {*}
 */
const shrinkMap = () => {
  if (option.series[0].zoom < 0.4) { option.series[0].zoom = 0.4; return }
  else { option.series[0].zoom -= 0.1 }

  myChart?.setOption(option)
}

/**
 * @description: 地图放大倍数定时器
 */
let timeOutEvent: NodeJS.Timeout | number = 0

/**
 * @description: 鼠标按下地图放大按钮
 * @return {*}
 */
const goMagnifyMapStart = () => {
  clearInterval(timeOutEvent)
  timeOutEvent = setInterval(() => { magnifyMap() }, 600)
}

/**
 * @description: 鼠标抬起地图放大按钮
 * @return {*}
 */
const goMagnifyMapTouchEnd = () => {
  clearInterval(timeOutEvent)
  if (timeOutEvent !== 0)
    magnifyMap()
}

/**
 * @description: 地图缩小定时器
 */
let shrinkTimeOut: NodeJS.Timeout | number = 0
/**
 * @description: 鼠标按下地图缩小按钮
 * @return {*}
 */
const goShrinkMapStart = () => {
  clearInterval(shrinkTimeOut)
  shrinkTimeOut = setInterval(() => { shrinkMap() }, 600)
}
/**
 * @description:鼠标抬起地图缩小按钮
 * @return {*}
 */
const goShrinkMapEnd = () => {
  clearInterval(shrinkTimeOut)
  if (shrinkTimeOut !== 0)
    shrinkMap()
}

/**
 * @description: 地图回退方法
 * @return {*}
 */
const goLast = () => {
  if (mapOperateHistory.length > 1)
    mapOperateHistory.pop()
  const temp = mapOperateHistory[mapOperateHistory.length - 1]
  myChart?.dispose()
  myChart = eCharts.init(mapRef.value)
  myChart?.on('click', mapClickFun)
  myChart?.showLoading(loadingParam)
  initMap(temp.adCode, temp.areaName, 'goBack')
}

onMounted(() => {
  myChart = eCharts.init(mapRef.value)
  window.addEventListener('resize', () => { myChart?.resize() })
  myChart.showLoading(loadingParam)
  myChart?.on('click', mapClickFun)
  initMap()
})
</script>

<template>
  <div class="enterprise-map" wPE-100 hPE-100 po-r>
    <div ref="mapRef" wPE-100 hPE-100 />
    <div po-a potPE-0 polPE-0 class="coordinate-data">
      <span>{{ propObj.coordinateProp.值1 }}</span><span>{{ propObj.coordinateProp.值2 }}</span>
    </div>
    <div po-a por-0 pobPE-10 flex flex-column-between>
      <el-image
        class="operate-icon" :src="magnify" fit="fill" @mousedown.prevent="goMagnifyMapStart"
        @mouseup.prevent="goMagnifyMapTouchEnd"
      />
      <el-image
        class="operate-icon" :src="shrink" fit="fill" mt-22 @mousedown.prevent="goShrinkMapStart"
        @mouseup.prevent="goShrinkMapEnd"
      />
      <el-image class="operate-icon" mt-22 :src="fanhui" fit="fill" @click="goLast" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.enterprise-map {
  .coordinate-data {
    span {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #FFFFFF;
      margin-right: 25px;
    }
  }
}
</style>
