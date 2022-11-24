<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-24 14:32:45
 * @FilePath: \big-screen\src\components\pandect\pandectMap.vue
 * @Description:
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

const emit = defineEmits(['refresh'])
const userInfo = useUserStore()

/**
 * @description: 园区图片节点
 */
const parkImageRef = ref()
/**
 * @description: 园区标识
 */
const parkFlag = ref<boolean>()

/**
 * @description: 地图节点
 */
let myChart: EChartsType | null = null

/**
 * @description: 地图操作历史
 */
const mapOperateHistory: any = []

/**
 * @description: 地图配置
 */
const option: any = {
  tooltip: { trigger: 'item', formatter: param => param.name },
  series: [],
}

/**
 * @description: 地图节点
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
 * @description: 园区图片
 */
const parkImage = ref('')
/**
 * @description: 地图点击事件
 * @param {*} params 点击数据
 */
const mapClickFun = (params) => {
  try {
    const temp = params.name?.includes('园')
    // 地图下钻方法
    const drillDownFun = async () => {
      if (temp) {
        myChart?.dispose()
        const submitId = new Date().getTime()
        const getimgParam = {
          submitid: submitId,
          usercode: userInfo.userCode,
          sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
          address: params.name,
        }
        const getimgRes: any = await getimg(getimgParam)
        parkImage.value = getimgRes[0] ? getimgRes[0].imgurl : ''
      }
      else {
        myChart?.dispose()
        myChart = eCharts.init(mapRef.value)
        myChart?.on('click', mapClickFun)
        myChart?.showLoading(loadingParam)
        const param = { address: params.name, key: '79848c3f3fbd1e9321efb5408c3c4a31' }
        const sig = md5(disposeParamFun(param))
        const res: any = await getAdCode({ ...param, sig })
        initMap(res?.geocodes?.[0].adcode, params.name)
      }
      parkFlag.value = temp
    }
    // 防抖
    debounce(drillDownFun, 1000, true)
  }
  catch (error) {
    consola.fatal(error)
    ElMessage({ message: error, type: 'error' })
  }
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
  if (option.series[0].zoom < 0.4) {
    option.series[0].zoom = 0.4
    return
  }
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
  timeOutEvent = setInterval(() => {
    magnifyMap()
  }, 600)
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
  shrinkTimeOut = setInterval(() => {
    shrinkMap()
  }, 600)
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
  parkFlag.value = false
  myChart?.dispose()
  nextTick(() => {
    myChart = eCharts.init(mapRef.value)
    myChart?.on('click', mapClickFun)
    myChart?.showLoading(loadingParam)
    initMap(temp.adCode, temp.areaName, 'goBack')
  })
}

onMounted(() => {
  myChart = eCharts.init(mapRef.value)
  window.addEventListener('resize', () => {
    myChart?.resize()
  })
  myChart.showLoading(loadingParam)
  myChart?.on('click', mapClickFun)
  initMap()
})

watch(() => parkFlag.value, () => {
  consola.info(['地图类型更改', parkFlag.value])
})

/**
 * @description: 图片加载失败方法
 * @param {*} e 触发事件
 * @return {*}
 */
const errorFun = (e) => {
  parkImageRef.value.$el.style.display = 'none'
}

/**
 * @description: 图品加载成功方法
 * @param {*} e 触发事件
 * @return {*}
 */
const loadFun = (e) => {
  parkImageRef.value.$el.style.display = 'inline-block'
}
</script>

<template>
  <div wPE-100 hPE-100 class="map-box" po-r>
    <div class="coordinate-box" po-r z-10>
      <div class="icon-box" po-a pob-50>
        <el-image
          class="operate-icon" :src="magnify" fit="fill" @mousedown.prevent="goMagnifyMapStart"
          @mouseup.prevent="goMagnifyMapTouchEnd"
        />
        <el-image
          class="operate-icon" :src="shrink" fit="fill" @mousedown.prevent="goShrinkMapStart"
          @mouseup.prevent="goShrinkMapEnd"
        />
        <el-image class="operate-icon" :src="fanhui" fit="fill" @click="goLast" />
      </div>
      <div class="coordinate-span">
        <!-- <span>N</span>
        <span>E</span> -->
      </div>
    </div>
    <div v-if="!parkFlag" id="map" ref="mapRef" wPE-100 hPE-100 />
    <el-image
      v-else ref="parkImageRef" :src="parkImage" class="park-image" fit="cover" @error="(err) => errorFun(err)"
      @load="(err) => loadFun(err)"
    />
  </div>
</template>

<style lang="scss" scoped>
.map-box {
  width: 100%;
  height: 100%;
  position: relative;

  .coordinate-box {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
  }

  :deep(.operate-icon) {
    width: 48px;
    height: 48px;

    margin-left: 20px;

  }

  .coordinate-span {
    width: 100%;
    display: flex;
    justify-content: space-around;
    ;

    span {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 16px;
      text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.58);

    }
  }

  .pandect-map {
    width: 100%;
    height: 100%;
  }

  :deep(.park-image) {
    width: 100%;
    height: 97%;
  }
}
</style>
