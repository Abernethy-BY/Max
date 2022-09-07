<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-06 18:58:43
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-06 20:27:03
 * @FilePath: \big-screen\src\components\enterprise\enterpriseMap.vue
 * @Description: 产业图鉴地图
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { EChartsType } from 'echarts'
import shrink from '~/assets/image/pandect/shrink.png'
import magnify from '~/assets/image/pandect/magnify.png'

import 'echarts/lib/chart/map'
import 'echarts/lib/component/geo'

const option = {
  geo: {
    map: 'map',
    aspectScale: 0.75, // 长宽比
    zoom: 1,
    roam: true,
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
    const drillDownFun = () => {
      const clickTemp = mapArr?.find((e) => {
        return e.properties.name === params.name
      })
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getMap(clickTemp.properties.adcode)
    }
    debounce(drillDownFun, 1000, true)
  })

  window.addEventListener('resize', () => {
    chartDom?.resize()
  })
}

const getMap = async (code) => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: userInfo.userCode,
    sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
    mapurl: `https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`,
  }
  const temp: any = await getMapdata(param)

  if (temp.length === 0) {
    const submitId = new Date().getTime()
    const param = {
      submitid: submitId,
      usercode: userInfo.userCode,
      sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
      mapurl: `https://geo.datav.aliyun.com/areas_v3/bound/${code}.json`,
    }
    const temp: any = await getMapdata(param)
    mapArr = temp.features
    option.geo.label.show = false
    initChart(temp)
  }
  else {
    mapArr = temp.features
    option.geo.label.show = true
    initChart(temp)
  }

  // catch (error) {
  //   const submitId = new Date().getTime()
  //   const param = {
  //     submitid: submitId,
  //     usercode: userInfo.userCode,
  //     sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
  //     mapurl: `https://geo.datav.aliyun.com/areas_v3/bound/${code}.json`,
  //   }
  //   const temp: any = await getMapdata(param)
  //   mapArr = temp.features
  //   option.geo.label.show = false
  //   initChart(temp)
  // }
}

const magnifyMap = () => {
  option.geo.zoom += 0.1
  chartDom?.setOption(option)
}

const shrinkMap = () => {
  if (option.geo.zoom < 0.4) {
    option.geo.zoom = 0.4
    return
  }
  else {
    option.geo.zoom -= 0.1
  }

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
  <div wPE-100 hPE-100 po-r>
    <div ref="mapRef" wPE-100 hPE-100 />
    <div po-a por-0 pob-0 flex flex-column-between>
      <el-image
        class="operate-icon" :src="magnify" fit="fill" @mousedown.prevent="goMagnifyMapStart"
        @mouseup.prevent="goMagnifyMapTouchEnd"
      />
      <el-image
        class="operate-icon" :src="shrink" fit="fill" mt-22
        @mousedown.prevent="goShrinkMapStart" @mouseup.prevent="goShrinkMapEnd"
      />
    </div>
  </div>
</template>

