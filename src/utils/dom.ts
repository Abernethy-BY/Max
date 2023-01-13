/*
 * @Author: By
 * @Date: 2022-08-13 11:52:04
 * @LastEditTime: 2023-01-13 15:42:14
 * @LastEditors: BY by15242952083@outlook.com
 * @Description: domTS
 * @FilePath: \big-screen\src\utils\dom.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import _ from 'lodash'

/**
 * @description: rem转换方法
 * @return {void}
 */
export const setDomFontSize = (): void => {
  const width = document.documentElement.clientWidth || document.body.clientWidth
  const scale = 37.5 * Math.min((width <= 1200 ? 1200 : width) / 1920, 2)
  const fontsize = `${scale}px`;
  (document.getElementsByTagName('html')[0].style as any)['font-size'] = fontsize
}

const setDomFontSizeDebounce = _.debounce(setDomFontSize, 400)
window.addEventListener('resize', setDomFontSizeDebounce) // 浏览器加入收缩监听防抖，重新计算rem配置

/**
 * @description: 操作时间标识
 */
let timeOutEvent: NodeJS.Timeout | number | null = null
/**
 * @description: 地图放大方法
 * @param {EChartsType} eChart 节点
 * @param {EChartsOption} option 图标配置
 * @return {void}
 */
const mapMagnify = (chart, option) => {
  option.series[0].zoom += 0.1
  chart?.setOption(option)
}

const mapShrink = (chart, option) => {
  option.series[0].zoom -= 0.1
  chart?.setOption(option)
}

// 地图放大方法
export const goMagnifyMapStart = (chart, option) => {
  timeOutEvent && clearInterval(timeOutEvent)
  timeOutEvent = setInterval(() => {
    mapMagnify(chart, option)
  }, 600)
}

// 地图结束放大方法
export const goMagnifyMapTouchEnd = (chart, option) => {
  timeOutEvent && clearInterval(timeOutEvent)
  if (timeOutEvent !== 0)
    mapMagnify(chart, option)
}

// 地图缩小方法
export const goShrinkMapStart = (chart, option) => {
  timeOutEvent && clearInterval(timeOutEvent)
  timeOutEvent = setInterval(() => {
    mapShrink(chart, option)
  }, 600)
}

// 地图结束缩小方法
export const goShrinkMapEnd = (chart, option) => {
  timeOutEvent && clearInterval(timeOutEvent)
  if (timeOutEvent !== 0)
    mapShrink(chart, option)
}
