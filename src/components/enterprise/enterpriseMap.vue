<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-06 18:58:43
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-15 23:07:43
 * @FilePath: \big-screen\src\components\enterprise\enterpriseMap.vue
 * @Description: 产业图鉴地图
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import 'echarts/lib/chart/map'
import 'echarts/lib/component/geo'
import type { EChartsType } from 'echarts'
import shrink from '~/assets/image/pandect/shrink.png'
import magnify from '~/assets/image/pandect/magnify.png'
import fanhui from '~/assets/image/common/navBg/fanhui.png'
import type { InterfaceModel } from '~/model'
const propObj = withDefaults(defineProps<{ coordinateProp?: InterfaceModel }>(), { coordinateProp: () => { return { 位置: '', 数据: '', 数值1: '', 数值2: '', 图标: '' } } })

const emit = defineEmits(['refresh'])

watch(() => propObj.coordinateProp, () => { consola.info(propObj.coordinateProp) })

const option = {
  geo: {
    map: 'map',
    aspectScale: 0.75, // 长宽比
    zoom: 1.2,
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

const last: any = []
const lastName: any = []
const getMap = async (code) => {
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
    mapArr = temp.features
    option.geo.label.show = false
    eCharts.registerMap('map', temp)
    chartDom?.setOption(option)
  }
  else {
    mapArr = temp.features
    option.geo.label.show = true
    eCharts.registerMap('map', temp)
    chartDom?.setOption(option)
  }
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
  if (last.length <= 1) { getMap('100000'); emit('refresh') }
  else {
    last.pop()
    lastName.pop()
    getMap(last[last.length - 1])
    emit('refresh', lastName[lastName.length - 1])
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

      getMap(clickTemp.properties.adcode)
      last.push(clickTemp.properties.adcode)
      lastName.push(clickTemp.properties.name)
      emit('refresh', clickTemp.properties.name)
    }
    debounce(drillDownFun, 1000, true)
  })
  getMap('430000')
})
</script>

<template>
  <div v-loading="loading" class="enterprise-map" element-loading-background="rgba(0, 0, 0, 0)" wPE-100 hPE-100 po-r>
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
