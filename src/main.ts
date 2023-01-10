/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-10 20:32:56
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
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    Object.values(import.meta.globEager('./modules/*.ts')).forEach((i: any) => i.install?.(ctx))

    const userInfo = useUserStore()

    ctx.router.beforeEach(async (to, from) => {
      if (!useUserStore().hasToken && to.path !== '/login')
        return { path: '/login' }

      if (useUserStore().hasToken && to.path === '/login')
        return { path: from.path }

      if (userInfo.userRole === '企业' && to.path !== '/corporatePortrait')
        return { path: '/corporatePortrait' }
    })
  },
)
