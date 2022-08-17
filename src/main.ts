/*
 * @Author: By
 * @Date: 2022-06-16 10:00:26
 * @LastEditTime: 2022-08-17 16:44:12
 * @LastEditors: By
 * @Description:
 * @FilePath: \big-screen-vue3\src\main.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
// import { setDomFontSize } from '~/utils/dom'
import generatedRoutes from '~pages'
import 'normalize.css/normalize.css'
import '@unocss/reset/tailwind.css'
// import './styles/main.css'
import 'uno.css'

// setDomFontSize()
const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).forEach((i: any) => i.install?.(ctx))
  },
)
