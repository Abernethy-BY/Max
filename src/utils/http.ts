/*
 * @Author: By
 * @Date: 2022-08-18 14:52:43
 * @LastEditTime: 2022-11-22 13:50:37
 * @LastEditors: BY by15242952083@outlook.com
 * @Description: 封装axios请求
 * @FilePath: \big-screen\src\utils\http.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import type { HttpClientConfig, RequestParams } from 'axios-mapper'
import { Method } from 'axios-mapper'
import { ElMessage } from 'element-plus'

import type { meeting } from '~/model'

const config: HttpClientConfig = {
  baseURL: 'http://47.107.96.124:8034',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept': 'application/json;charset=UTF-8',
  },

  // headers: {},
}

const https = new HttpClient(config)
https.httpClient.interceptors.response.use((res) => {
  const userInfo = useUserStore()
  if (res.config.method === 'get')
    return res

  if (Number(res.data.state) !== 0 && Number(res.data.state) !== 5) {
    ElMessage({ message: res.data.message, type: 'error' })
  }
  else if (Number(res.data.state) === 3) {
    userInfo.token = ''
    userInfo.userCode = ''
    userInfo.userRole = ''
    ElMessage({ message: res.data.message, type: 'error' })
  }
  else { return res }
})

export const post = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<meeting>(url, Method.POST, data).then((response: any) => {
      resolve(response.data)
    }, (err: any) => { reject(err) })
  })
}

export const get = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<meeting>(url, Method.GET, data).then((response: any) => {
      resolve(response.data)
    }, (err: any) => { reject(err) })
  })
}
export const put = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<meeting>(url, Method.PUT, data).then((response: any) => {
      resolve(response.data)
    }, (err: any) => { reject(err) })
  })
}
export const del = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<meeting>(url, Method.DELETE, data).then((response: any) => {
      resolve(response.data)
    }, (err: any) => { reject(err) })
  })
}

export const gaoDeWebApi = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<meeting>(url, Method.GET, data).then((response: any) => {
      resolve(response)
    }, (err: any) => { reject(err) })
  })
}
