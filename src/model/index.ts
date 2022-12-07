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

export interface REAR_DATA_MODEL {
  adCode: string
  areaName: string
}
