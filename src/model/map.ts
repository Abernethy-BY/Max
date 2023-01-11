/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-10 18:08:52
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-11 10:06:02
 * @FilePath: \big-screen\src\model\map.ts
 * @Description: 地图类型
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
import type { EChartsType } from 'echarts'

export type MODULE_TYPE_MODEL = 'enterprise' | 'overviewOfPark'

export type MAP_OPERATE_MODEL = 'DRILL_DOWN' | 'GO_BACK'

export type MAP_OPERATE_ICON_POSITION_MODEL = 'right' | 'left'

export interface SERIES_OPTION_MODEL {
  mapName: string
  zlevel: number
  chart: EChartsType
  zoom: number
  labelPosition: MAP_OPERATE_ICON_POSITION_MODEL
  labelMargins: number
}
