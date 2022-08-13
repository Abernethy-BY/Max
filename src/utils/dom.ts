/*
 * @Author: By
 * @Date: 2022-08-13 11:52:04
 * @LastEditTime: 2022-08-13 11:53:01
 * @LastEditors: By
 * @Description: domTS
 * @FilePath: \big-screen-vue3\src\utils\dom.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import _ from 'lodash'

// 以1920px 底图为准开发页面
export const setDomFontSize = (): void => {
  const width = document.documentElement.clientWidth || document.body.clientWidth
  const fontsize = `${(width <= 1200 ? 1200 : width) / 100}px`;
  (document.getElementsByTagName('html')[0].style as any)['font-size'] = fontsize
}

const setDomFontSizeDebounce = _.debounce(setDomFontSize, 400)
window.addEventListener('resize', setDomFontSizeDebounce) // 浏览器加入收缩监听防抖，重新计算rem配置
