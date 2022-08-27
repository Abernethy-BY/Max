/*
 * @Author: By
 * @Date: 2022-08-18 16:24:55
 * @LastEditTime: 2022-08-27 11:29:43
 * @LastEditors: By
 * @Description:
 * @FilePath: \big-screen-vue3\src\api\api.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
// import https from '~/utils/http'
// import type { RootObject } from './model'

// https.request<RootObject>('/json').then((res) => {
//   console.log(res?.slideshow)
// })
// import { post } from '@/router/axios.js'

/** *****
 * @description: 登录
 * @param {*} param 参数
 */
export const xtdl = (param: any) => post('/xtdl.aspx', param)

/** *****
 * @description: 企业画像
 * @param {*} param 参数
 */
export const qyhx = (param: any) => post('/qyhx.aspx', param)

// 2、园区总揽
export const yqzl = (param: any) => post('/yqzl.aspx', param)

// 3、产业图鉴
export const cytj = (param: any) => post('/cytj.aspx', param)

// 4、双碳监测
export const stjc = (param: any) => post('/stjc.aspx', param)

// 4、双碳监测
export const yqjk = (param: any) => post('/yqjk.aspx', param)

// 验证登录
export const yzdx = (param: any) => post('/yzdx.aspx', param)

// 获取地区adcode
export const getAdCode = (param: any) => get('https://restapi.amap.com/v3/config/district', param)

// 获取地图数据
export const getmapdata = (param: any) => post('/getmapdata.aspx', param)
