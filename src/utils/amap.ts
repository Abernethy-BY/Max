/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-30 14:46:25
 * @FilePath: \big-screen\src\utils\amap.ts
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
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
