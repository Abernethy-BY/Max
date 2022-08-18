/*
 * @Author: By
 * @Date: 2022-08-18 16:20:19
 * @LastEditTime: 2022-08-18 16:42:22
 * @LastEditors: By
 * @Description: 类型集合
 * @FilePath: \big-screen-vue3\src\model\index.ts
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
