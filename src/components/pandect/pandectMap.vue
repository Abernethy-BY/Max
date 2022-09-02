<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-01 16:29:28
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-02 17:59:07
 * @FilePath: \big-screen\src\components\pandect\pandectMap.vue
 * @Description: http配置
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import 'echarts/lib/chart/map'
import 'echarts/lib/component/geo'
import type { EChartsType } from 'echarts'
import shrink from '~/assets/image/pandect/shrink.png'
import magnify from '~/assets/image/pandect/magnify.png'

const option = {
  geo: {
    map: 'map',
    aspectScale: 0.75, // 长宽比
    zoom: 1,
    roam: false,
    label: {
      show: true,
      color: 'white',
    },
    itemStyle: {
      areaColor: '#35356C',
      borderColor: 'white',
      shadowColor: 'rgba(53,53,108,.5)',
      shadowOffsetX: 10,
      shadowOffsetY: 11,
    },
    emphasis: {
      itemStyle: { areaColor: '#3A50AB' },
      borderWidth: 0,
      label: { show: true, color: '#2ACFF6' },
    },
  },
  series: [],
}

let chartDom: EChartsType | null = null
const mapRef = ref()
const userInfo = useUserStore()

let mapArr: any = []

const initChart = (geojson) => {
  eCharts.registerMap('map', geojson)
  chartDom = eCharts.init(mapRef.value)
  chartDom?.setOption(option)
  // consola.info(geojson.features)
  chartDom?.on('click', (params) => {
    const clickTemp = mapArr?.find((e) => {
      return e.properties.name === params.name
    })
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getMap(clickTemp.properties.adcode)
  })

  window.addEventListener('resize', () => {
    chartDom?.resize()
  })
}

const getMap = async (code) => {
  try {
    const submitId = new Date().getTime()
    const param = {
      submitid: submitId,
      usercode: userInfo.userCode,
      sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
      mapurl: `https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`,
    }
    const temp: any = await getMapdata(param)
    mapArr = temp.features
    initChart(temp)
  }
  catch (error) {
    const submitId = new Date().getTime()
    const param = {
      submitid: submitId,
      usercode: userInfo.userCode,
      sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
      mapurl: `https://geo.datav.aliyun.com/areas_v3/bound/${code}.json`,
    }
    const temp: any = await getMapdata(param)
    mapArr = temp.features
    initChart(temp)
  }
}

/**
 * @description: 地图放大方法
 * @return {*}
 */
const magnifyMap = () => {
  option.geo.zoom += 0.1
  chartDom?.setOption(option)
}

/**
 * @description: 地图缩小方法
 * @return {*}
 */
const shrinkMap = () => {
  option.geo.zoom -= 0.1
  chartDom?.setOption(option)
}

let timeOutEvent: NodeJS.Timeout | number = 0

const goMagnifyMapStart = () => {
  clearInterval(timeOutEvent)
  timeOutEvent = setInterval(() => { magnifyMap() }, 600)
}

const goMagnifyMapTouchEnd = () => {
  clearInterval(timeOutEvent)
  if (timeOutEvent !== 0)
    magnifyMap()
}

let shrinkTimeOut: NodeJS.Timeout | number = 0
const goShrinkMapStart = () => {
  clearInterval(shrinkTimeOut)
  shrinkTimeOut = setInterval(() => { shrinkMap() }, 600)
}

const goShrinkMapEnd = () => {
  clearInterval(shrinkTimeOut)
  if (shrinkTimeOut !== 0)
    shrinkMap()
}

onMounted(() => {
  // initMap('430000')
  // initMap('430405')
  // initMap('430000')
  getMap('430000')
})
</script>

<template>
  <div class="map-box">
    <div class="coordinate-box" po-r z-10>
      <div class="icon-box">
        <el-image
          class="operate-icon" :src="magnify" fit="fill" @mousedown.prevent="goMagnifyMapStart"
          @mouseup.prevent="goMagnifyMapTouchEnd"
        />
        <el-image
          class="operate-icon" :src="shrink" fit="fill" @mousedown.prevent="goShrinkMapStart"
          @mouseup.prevent="goShrinkMapEnd"
        />
      </div>
      <div class="coordinate-span">
        <span>N</span>
        <span>E</span>
      </div>
    </div>
    <div id="mapRef" ref="mapRef" class="pandect-map" />
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

    &:last-child {
      margin-left: 43px;
    }
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
}
</style>
