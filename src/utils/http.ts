/*
 * @Author: By
 * @Date: 2022-08-18 14:52:43
 * @LastEditTime: 2022-08-22 15:17:35
 * @LastEditors: By
 * @Description: 封装axios请求
 * @FilePath: \big-screen-vue3\src\utils\http.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import type { HttpClientConfig, RequestParams } from 'axios-mapper'
import { Method } from 'axios-mapper'

import type { meeting } from '~/model'

const config: HttpClientConfig = {
  baseURL: 'http://47.107.96.124:8034',
  headers: {},
}

const https = new HttpClient(config)
https.httpClient.interceptors.response.use((res) => {
  if (res.data.message === '签名错误') {
    useUserStore().$state = { token: '', userCode: '', userRole: '' }
    return Promise.reject(new Error(res.data.message || 'Error'))
  }
  else { return res }
})

export const post = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<meeting>(url, Method.POST, data).then((response: any) => { resolve(response.data) }, (err: any) => { reject(err) })
  })
}

export const get = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<meeting>(url, Method.GET, data).then((response: any) => { resolve(response) }, (err: any) => { reject(err) })
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
