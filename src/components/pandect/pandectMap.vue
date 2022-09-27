<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-01 16:29:28
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-27 18:53:51
 * @FilePath: \big-screen\src\components\pandect\pandectMap.vue
 * @Description: 首页地图
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import 'echarts/lib/chart/map'
import 'echarts/lib/component/geo'
import type { EChartsType } from 'echarts'
import shrink from '~/assets/image/pandect/shrink.png'
import magnify from '~/assets/image/pandect/magnify.png'

import fanhui from '~/assets/image/common/navBg/fanhui.png'

const emit = defineEmits(['refresh'])
const option = {
  geo: {
    map: 'map',
    aspectScale: 0.75, // 长宽比
    zoom: 1.2,
    roam: false,
    label: {
      show: true,
      color: 'white',
      fontSize: '0.3rem',
      // position: 'insideTop',
      // padding: [4, 4],
      // distanca: 30,
      distance: 5,
    },
    itemStyle: {
      areaColor: '#35356C',
      borderColor: 'white',
      shadowColor: 'rgba(53,53,108,.5)',
      shadowOffsetX: 10,
      shadowOffsetY: 11,
    },
    emphasis: {
      itemStyle: { areaColor: 'rgba(58,80,171,0.5)' },
      borderWidth: 0,
      label: { show: true, color: '#2ACFF6' },
    },
    select: {
      itemStyle: { shadowColor: 'rgba(53,53,108,1)' },
    },
  },
  series: {
    geoIndex: 0,
    labelLayout: () => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        x: (chartDom?.getWidth() || 0) - 100,
        moveOverlap: 'shiftY',
      }
    },
    data: [],
    nameProperty: 'map',
    nameMap: 'map',
  },
}

let chartDom: EChartsType | null = null
const mapRef = ref()
const userInfo = useUserStore()

let mapArr: any = []

const last: any = ref([])
const lastName: any = ref([])
const getMap = async (code, name = '湖南省', flag) => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  loading.value = true
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
    consola.info(temp)
    temp.features.forEach((element) => {
      // if (element.properties.name === '嘉德工业园')
      //   element.properties.cp = [112.549248, 37.857014]
    })

    mapArr = temp.features
    // option.geo.label.show = false
    option.geo.zoom = 1.2
    eCharts.registerMap('map', temp)
    chartDom?.setOption(option)
  }
  else {
    mapArr = temp.features
    // option.geo.label.show = true
    eCharts.registerMap('map', temp)
    option.geo.zoom = 1.2
    chartDom?.setOption(option)
  }

  if (flag === 'next') {
    last.value.push(code)
    lastName.value.push(name)
  }
  emit('refresh', name)
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  loading.value = false
}

const loading = ref(false)

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

const goLast = () => {
  if (last.value.length <= 1) {
    getMap('430000', undefined, 'goBack')
    // emit('refresh')
    last.value = []
    lastName.value = []
  }
  else {
    last.value.pop()
    lastName.value.pop()
    getMap(last.value[last.value.length - 1], lastName.value[lastName.value.length - 1], 'goBack')
    // emit('refresh', lastName.value[lastName.value.length - 1])
  }
}

onMounted(() => {
  chartDom = eCharts.init(mapRef.value)
  window.addEventListener('resize', () => {
    chartDom?.resize()
  })
  chartDom?.on('click', (params) => {
    const drillDownFun = () => {
      const clickTemp = mapArr?.find((e) => {
        return e.properties.name === params.name
      })

      getMap(clickTemp.properties.adcode, clickTemp.properties.name, 'next')
    }
    debounce(drillDownFun, 1000, true)
  })
  getMap('430000', undefined, 'next')
})
</script>

<template>
  <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)" class="map-box">
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
}
</style>
