/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-06 20:47:19
 * @FilePath: \big-screen\src\main.ts
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */

import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import generatedRoutes from '~pages'

import 'normalize.css/normalize.css'
import '@unocss/reset/tailwind.css'
import 'nprogress/nprogress.css'
import 'uno.css'

import 'swiper/css'
import 'swiper/css/autoplay'
import './assets/css/main.css'

setDomFontSize()

const routes = setupLayouts(generatedRoutes)
consola.info(routes)
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    Object.values(import.meta.globEager('./modules/*.ts')).forEach((i: any) => i.install?.(ctx))

    const userInfo = useUserStore()

    ctx.router.beforeEach(async (to) => {
      if (!useUserStore().hasToken && to.path !== '/login')
        return { path: '/login' }

      if (userInfo.userRole === '企业' && to.path !== '/corporatePortrait')
        return { path: '/corporatePortrait' }
    })
  },
)
