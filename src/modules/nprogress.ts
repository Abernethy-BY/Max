/*
 * @Author: By
 * @Date: 2022-08-18 16:06:27
 * @LastEditTime: 2022-11-29 13:38:01
 * @LastEditors: BY by15242952083@outlook.com
 * @Description:
 * @FilePath: \big-screen\src\modules\nprogress.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
// import NProgress from 'nprogress'
import { type UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to, from) => {
      if (to.path !== from.path)
        nprogress.start()
    })
    router.afterEach(() => {
      nprogress.done()
    })
  }
}
