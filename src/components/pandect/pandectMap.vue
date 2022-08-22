<!--
 * @Author: By
 * @Date: 2022-08-08 21:12:14
 * @LastEditTime: 2022-08-22 22:13:33
 * @LastEditors: By
 * @Description:
 * @FilePath: \big-screen-vue3\src\components\pandect\pandectMap.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script lang="ts" setup>
import 'echarts/lib/chart/map'
import 'echarts/lib/component/geo'
import shrink from '~/assets/image/pandect/shrink.png'
import magnify from '~/assets/image/pandect/magnify.png'

// const option = ref({
//   visualMap: {
//     type: 'continuous',
//     show: false,
//     min: 800,
//     max: 50000,
//     text: ['High', 'Low'],
//     realtime: false,
//     calculable: true,
//     inRange: { color: ['lightskyblue', 'yellow', 'orangered'] },
//   },
//   series: [{
//     name: '湖南省',
//     type: 'map',
//     map: 'map',
//     roam: false,
//     label: {
//       show: true,
//       color: 'white',
//     },
//     itemStyle: {
//       areaColor: '#35356C',
//       borderColor: 'white',
//     },
//     data: [],
//     // 自定义名称映射
//     nameMap: {},
//   }],
// })

// const chartDom = ref()
const mapRef = ref()

// const initMap = async (code) => {
//   const temp: any = await get(`https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${code}_full`, {})
//   const mapArr = temp.features
//   eCharts.registerMap('map', temp)
//   nextTick(() => {
//     chartDom.value = eCharts.init(mapRef.value)
//     chartDom.value.setOption(option.value)
//     chartDom.value.on('click', (params) => {
//       const clickTemp = mapArr.find(e => e.properties.name === params.name)
//       initMap(`${clickTemp.properties.adcode}`)
//     })
//   })
// }

// onMounted(() => {
//   initMap('430000')
// })

const current_position = ref<any>([])
const path = ref<any>([])

const initMap = () => {
  AMapLoader.load({
    key: 'd46cf5068a9a22141e1a3719fbcf65f5', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  }).then((AMap) => {
    const map = new AMap.Map('mapRef', {
      // 设置地图容器id
      viewMode: '3D', // 是否为3D地图模式
      zoom: 10, // 初始化地图级别
      center: [120.374926, 30.310678], // 初始化地图中心点位置
    })
    // 添加插件
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye'], () => {
      // 异步同时加载多个插件
      map.addControl(new AMap.HawkEye()) // 显示缩略图
      map.addControl(new AMap.Scale()) // 显示当前地图中心的比例尺
    })
    // 单击
    map.on('click', (e: any) => {
      // console.log(e);
      current_position.value = [e.lnglat.KL, e.lnglat.kT]
      path.value.push([e.lnglat.KL, e.lnglat.kT])
      addMarker()

      addPolyLine()
      // 地图按照适合展示图层内数据的缩放等级展示
      // map.setFitView();
    })

    // 实例化点标记
    function addMarker() {
      const marker = new AMap.Marker({
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        position: current_position.value,
        offset: new AMap.Pixel(-26, -54),
      })
      marker.setMap(map)
    }

    // 折线
    function addPolyLine() {
      const polyline = new AMap.Polyline({
        path: path.value,
        isOutline: true,
        outlineColor: '#ffeeff',
        borderWeight: 1,
        strokeColor: '#3366FF',
        strokeOpacity: 0.6,
        strokeWeight: 5,
        // 折线样式还支持 'dashed'
        strokeStyle: 'solid',
        // strokeStyle是dashed时有效
        // strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50,
      })
      map.add([polyline])
    }
  })
    .catch((e) => {
      consola.error(e)
    })
}

onMounted(() => {
  // initMap()
})
</script>

<template>
  <div class="map-box">
    <div class="coordinate-box">
      <div class="icon-box">
        <el-image class="operate-icon" :src="magnify" fit="fill" />
        <el-image class="operate-icon" :src="shrink" fit="fill" />
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
