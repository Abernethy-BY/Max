/*
 * @Author: By
 * @Date: 2022-08-18 16:20:19
 * @LastEditTime: 2022-11-30 14:45:33
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

export interface meeting { any: any }

export interface InterfaceModel { '位置': string; '数据': string; '数值1'?: string; '数值2'?: string; '图标': string; '值1'?: string; '值2'?: string }

export interface TableModel { [key: string]: string | number }

export interface MESSAGE_MODEL {
  onCancel: Function
  onConfirm: Function
}

export interface SELECT_OPTION_MODEL {
  value: string | number
  label: string | number
}

export interface ENTER_INFORMATION_MODEL {
  provinceArr: Array<string>
  unitname: string
  unittax?: string
  linkman: string
  linkmantel: string
  email: string
}

export interface FORM_DATA_MODEL {
  [key: string]: string | Array<string>
}
