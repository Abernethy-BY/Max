<!--
 * @Author: By
 * @Date: 2022-08-08 21:12:14
 * @LastEditTime: 2022-08-30 20:14:43
 * @LastEditors: By
 * @Description:
 * @FilePath: \big-screen-vue3\src\components\pandect\pandectMap.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script lang="ts" setup>
import 'echarts/lib/chart/map'
import 'echarts/lib/component/geo'
import type { EChartsType } from 'echarts'
// import { parseGeoJson } from 'echarts'
import shrink from '~/assets/image/pandect/shrink.png'
import magnify from '~/assets/image/pandect/magnify.png'

const option = ref({
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
  series: [
    // {
    //   name: '湖南省',
    //   type: 'map',
    //   // map: 'map',
    //   roam: false,

    //   itemStyle: {
    //     areaColor: '#35356C',
    //     borderColor: 'white',
    //   },
    //   data: [],
    //   // 自定义名称映射
    //   nameMap: {},
    // },
  ],
})

let chartDom: EChartsType | null = null
const mapRef = ref()
const userInfo = useUserStore()
const initMap = async (code) => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: userInfo.userCode,
    sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
    // mapurl: `https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`,
    mapurl: `https://geo.datav.aliyun.com/areas_v3/bound/${code}.json`,
  }
  const temp: any = await getMapdata(param)
  const mapArr = temp.features
  eCharts.registerMap('map', temp)
  nextTick(() => {
    chartDom = eCharts.init(mapRef.value)
    chartDom?.setOption(option.value)
    chartDom?.on('click', (params) => {
      const clickTemp = mapArr.find(e => e.properties.name === params.name)
      initMap(`${clickTemp.properties.adcode}`)
    })

    window.addEventListener('resize', () => {
      chartDom?.resize()
    })
  })
}

const magnifyMap = () => {
  option.value.geo.zoom += 0.1
  chartDom?.setOption(option.value)
}

const shrinkMap = () => {
  option.value.geo.zoom -= 0.1
  chartDom?.setOption(option.value)
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
  initMap('430405')
})
</script>

<template>
  <div class="map-box">
    <div class="coordinate-box" po-r z-10>
      <div class="icon-box">
        <el-image class="operate-icon" :src="magnify" fit="fill" @mousedown.prevent="goMagnifyMapStart" @mouseup.prevent="goMagnifyMapTouchEnd" />
        <el-image class="operate-icon" :src="shrink" fit="fill" @mousedown.prevent="goShrinkMapStart" @mouseup.prevent="goShrinkMapEnd" />
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
