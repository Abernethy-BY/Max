/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-12-08 17:17:08
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-13 14:41:32
 * @FilePath: \big-screen\src\model\index.ts
 * @Description:
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
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

export interface InterfaceModel { '位置': string; '数据': string; '数值1'?: string; '数值2'?: string; '图标': string; '值1'?: string; '值2'?: string }

export interface HTTP_MODEL { data: InterfaceModel[]; message: string; state: number }

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

export interface REAR_DATA_MODEL {
  adCode: string
  areaName: string
}

export interface TABLE_HEADER_MODEL {
  label: string
  prop: string
}

export interface MAP_PARAM_TYPE {
  key: string
  version: string
  plugins: string[]
  Loca: { [key: string]: string }
  AMapUI: { [key: string]: string | string[] }
}

export interface USER_FORM_MODEL {
  userType: string
  tel: string
  pass: string
  rePass?: string
  telCode: string
}

export interface PARAM_MODEL {
  submitid: number
  usercode: string
  sign: string
  address?: string
}
