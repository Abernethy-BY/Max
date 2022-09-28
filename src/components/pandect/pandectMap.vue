<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-28 22:11:34
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

import { shallowRef } from '@vue/reactivity'
import { ElMessage } from 'element-plus'

let myChart: EChartsType | null = null

const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}<br/>{c} (p / km2)',
  },
  // visualMap: {
  //   min: 800,
  //   max: 50000,
  //   text: ['High', 'Low'],
  //   realtime: false,
  //   calculable: true,
  //   inRange: {
  //     color: ['lightskyblue', 'yellow', 'orangered'],
  //   },
  // },
  // geo: {
  //   map: 'map',
  //   aspectScale: 0.75, // 长宽比
  //   zoom: 1.2,
  //   roam: false,
  //   label: {
  //     show: true,
  //     color: 'white',
  //     fontSize: '0.3rem',
  //     // position: 'insideTop',
  //     // padding: [4, 4],
  //     // distanca: 30,
  //     distance: 5,
  //   },
  //   itemStyle: {
  //     areaColor: '#35356C',
  //     borderColor: 'white',
  //     shadowColor: 'rgba(53,53,108,.5)',
  //     shadowOffsetX: 10,
  //     shadowOffsetY: 11,
  //   },
  //   emphasis: {
  //     itemStyle: { areaColor: 'rgba(58,80,171,0.5)' },
  //     borderWidth: 0,
  //     label: { show: true, color: '#2ACFF6' },
  //   },
  //   select: {
  //     itemStyle: { shadowColor: 'rgba(53,53,108,1)' },
  //   },
  // },
  series: [
    {
      type: 'map',
      map: 'map',
      label: { show: true },
      // labelLayout: {
      //   moveOverlap: 'shiftX',
      //   align: 'left',
      //   verticalAlign: 'top',
      // },
      labelLine: {
        show: true,
        length2: 5,
        lineStyle: {
          color: '#bbb',
        },
      },
      labelLayout() {
        return {
          x: (myChart?.getWidth() || 100) - 100,
          moveOverlap: 'shiftY',
        }
      },
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

const loading = ref<boolean>(false)

/**
 * @description: 地图节点
 */
const mapRef = ref()

const map = shallowRef(null)

//

const aMapParam = {
  key: 'a9618a7db350f35205fe226cd22b6868',
  version: '2.0',
  plugins: ['geo/DistrictExplorer'],
  Loca: { version: '2.0.0' },
  AMapUI: { plugins: ['geo/DistrictExplorer'] },
}
const initMap = () => {
  AMapLoader.load(aMapParam).then(() => {
    AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
      const districtExplorer = new DistrictExplorer()
      districtExplorer.loadAreaNode(100000, (error, areaNode) => {
        if (error) { console.error(error); return }
        const Json = areaNode.getSubFeatures()
        consola.info(Json)

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
  myChart.showLoading()
  initMap()
})
</script>

<template>
  <div v-loading="loading" wPE-100 hPE-100 element-loading-background="rgba(0, 0, 0, 0)" class="map-box">
    <div id="mapRef" ref="mapRef" wPE-100 hPE-100 />
  </div>
</template>

<style>

</style>
