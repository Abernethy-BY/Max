/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-09 18:48:16
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-09 18:48:41
 * @FilePath: \big-screen\src\modules\route.ts
 * @Description: 路由模块
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
import type { Router } from 'vue-router'
import type { UserModule } from '~/types'

// eslint-disable-next-line import/no-mutable-exports
let router: Router | null = null

export const install: UserModule = (ctx) => {
  router = ctx.router
}

export { router }
