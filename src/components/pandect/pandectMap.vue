<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-29 18:03:10
 * @FilePath: \big-screen\src\components\pandect\pandectMap.vue
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import 'echarts/lib/chart/map'
import 'echarts/lib/component/geo'
import type { EChartsType } from 'echarts'
/**
 * @description: amap
 * @return {*}
 */

import { ElMessage } from 'element-plus'

let myChart: EChartsType | null = null

const option = {
  tooltip: {
    trigger: 'item',
    formatter: param => param.name,
  },
  series: [
    {
      type: 'map',
      map: 'map',
      label: {
        show: true,
        color: '#fff',
        padding: [10, 0, 10, 0],
        height: 20,
        formatter: '{b}\n',
      },
      labelLine: {
        show: true,
        length2: 5,
        smooth: true,
        lineStyle: { color: '#bbb' },
      },
      labelLayout() {
        return {
          x: (myChart?.getWidth() || 100) - 100,
          moveOverlap: 'shiftY',
          fontSize: '0.29rem',
        }
      },
      itemStyle: {
        areaColor: '#35356C',
        borderColor: 'white',
        shadowColor: 'rgba(53,53,108,0)',
        shadowOffsetX: 10,
        shadowOffsetY: 11,
      },
      emphasis: { label: { color: '#eccc68' } },
      select: { label: { color: '#eccc68' } },
    },
  ],
  regions: [
    {
      name: '海南省',
      itemStyle: { normal: { opacity: 0 } },
      label: { show: false },
    },
  ],

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
  maskColor: 'rgba(30,7,114,.5)',
  zlevel: 0,
}

const disposeParamFun = val => `${Object.keys(val).map(e => `${e}=${val[e]}`).join('&')}cef67f7186b4debe1f9dd24dec1141a4`

/**
 * @description: 地图点击事件
 * @param {*} params 点击数据
 */
const mapClickFun = async (params) => {
  // consola.info(params)
  const param = {
    key: '79848c3f3fbd1e9321efb5408c3c4a31',
    // address: encodeURI(params.name),
    // address: encodeURI(params.name),
    // address: JSON.stringify(params.name),
    address: params.name,
  }
  const sig = md5(disposeParamFun(param))

  // encodeURIComponent()

  consola.info(param)
  // param.address = encodeURI(param.address)
  consola.info(param)
  consola.info(disposeParamFun(param))
  const res = await getAdCode({ ...param, sig })

  consola.info(res)
  // const drillDownFun = () => {
  //   const clickTemp = mapArr?.find((e) => {
  //     return e.properties.name === params.name
  //   })

  //   getMap(clickTemp.properties.adcode, clickTemp.properties.name, 'next')
  // }
  // debounce(drillDownFun, 1000, true)
}

/**
 * @description: 初始化地图方法
 * @return {*}
 */
const initMap = () => {
  AMapLoader.load(aMapParam).then(() => {
    AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
      const districtExplorer = new DistrictExplorer()
      districtExplorer.loadAreaNode(430000, (error, areaNode) => {
        if (error) { console.error(error); return }
        const Json = areaNode.getSubFeatures()

        myChart?.hideLoading()
        eCharts.registerMap('map', { type: 'FeatureCollection', features: Json })

        myChart?.setOption(option)
      })
    })
  }).catch((e) => {
    consola.error(e)
    ElMessage({ message: `高德地图错误:${e}`, type: 'error' })
  })
}

onMounted(() => {
  myChart = eCharts.init(mapRef.value)
  myChart.showLoading(loadingParam)
  myChart?.on('click', mapClickFun)
  initMap()
})
</script>

<template>
  <div wPE-100 hPE-100 class="map-box">
    <div id="mapRef" ref="mapRef" wPE-100 hPE-100 />
  </div>
</template>

<style>

</style>
