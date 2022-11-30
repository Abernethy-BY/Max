/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-26 18:09:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-30 14:22:59
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
    ctx.router.beforeEach(async (to) => {
      if (!useUserStore().hasToken && to.path !== '/login')
        return { path: '/login' }
    })
    Object.values(import.meta.globEager('./modules/*.ts')).forEach((i: any) => i.install?.(ctx))
  },
)
