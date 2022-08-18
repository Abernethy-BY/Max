/*
 * @Author: By
 * @Date: 2022-08-18 14:52:43
 * @LastEditTime: 2022-08-18 19:35:33
 * @LastEditors: By
 * @Description: 封装axios请求
 * @FilePath: \big-screen-vue3\src\utils\http.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import type { HttpClientConfig, RequestParams } from 'axios-mapper'
import { ContentType, Method } from 'axios-mapper'

import type { meeting } from '~/model'
consola.success(ContentType)

const config: HttpClientConfig = {
  baseURL: 'http://47.107.96.124:8034',
  headers: { },
}
const https = new HttpClient(config)

export const post = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<meeting>(url, Method.POST, data).then((response: any) => { resolve(response.data) }, (err: any) => { reject(err) })
  })
}

export const get = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<meeting>(url, Method.GET, data).then((response: any) => { resolve(response.data) }, (err: any) => { reject(err) })
  })
}
export const put = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<meeting>(url, Method.PUT, data).then((response: any) => { resolve(response.data) }, (err: any) => { reject(err) })
  })
}
export const del = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<meeting>(url, Method.DELETE, data).then((response: any) => { resolve(response.data) }, (err: any) => { reject(err) })
  })
}
