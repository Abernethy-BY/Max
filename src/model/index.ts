/*
 * @Author: By
 * @Date: 2022-08-18 16:20:19
 * @LastEditTime: 2022-09-13 17:57:28
 * @LastEditors: BY by15242952083@outlook.com
 * @Description: 类型集合
 * @FilePath: \big-screen\src\model\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
export interface Slide {
  title: string
  type: string
}

export interface Slideshow {
  author: string
  date: string
  slides: Slide[]
  title: string
}

export interface RootObject {
  slideshow: Slideshow
}

export interface meeting {any: any}

export interface InterfaceModel { '位置': string; '数据': string; '数值1': string; '数值2': string; '图标': string }

export interface TableModel { [key: string]: string | number }
