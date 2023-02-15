/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: Abernethy-BY by15242952083@outlook.com
 * @LastEditTime: 2023-02-15 14:37:21
 * @FilePath: \big-screen\src\utils\amap.ts
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */

/**
 * @description: 根据权限获取不同地区
 * @param {string} parentArea 父级地区
 * @param {string} role 用户角色
 * @return {*}
 */
export const getProvinces = async (parentArea: string, role: string) => {
  try {
    const permissionsMap = new Map()
    permissionsMap.set('工信厅', [])
    permissionsMap.set('工信局', ['province'])
    permissionsMap.set('园区管理员', ['province', 'city'])
    permissionsMap.set('园区专员', ['province', 'city'])
    permissionsMap.set('企业', ['province', 'city'])

    const param = {
      key: '79848c3f3fbd1e9321efb5408c3c4a31',
      keywords: parentArea || '中国',
      subdistrict: 1,
      sig: '',
    }
    param.sig = md5(`key=79848c3f3fbd1e9321efb5408c3c4a31&keywords=${param.keywords}&subdistrict=1cef67f7186b4debe1f9dd24dec1141a4`)
    const res: any = await district(param)
    if (res.status !== '1')
      throw new Error('地区服务器错误请刷新重试')

    const temp = res?.districts?.[0]?.districts
    const nodes = temp.map(e => ({ value: e.adcode, label: e.name, leaf: !permissionsMap.get(role).includes(e.level) }))
    return nodes
  }
  catch (error) {
    consola.fatal(error)
    ElMessage({ message: error, type: 'error' })
  }
}

/**
 * @description: 获取地图区域AdCode
 * @param {string} area
 * @return {*}
 */
export const getMapAdCode = async (area: string) => {
  try {
    const param = {
      key: '79848c3f3fbd1e9321efb5408c3c4a31',
      keywords: area || '中国',
      subdistrict: 0,
      sig: '',
    }
    param.sig = md5(`key=79848c3f3fbd1e9321efb5408c3c4a31&keywords=${param.keywords}&subdistrict=0cef67f7186b4debe1f9dd24dec1141a4`)

    const res: any = await district(param)

    if (res.status !== '1')
      throw new Error('地区服务器错误请刷新重试')

    const { districts } = res
    const temp = districts[0].adcode
    return temp
  }
  catch (error) {
    // consola.fatal(error)
    ElMessage({ message: error, type: 'error' })
  }
}
