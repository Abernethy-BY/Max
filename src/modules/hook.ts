/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-13 15:26:29
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-13 15:28:09
 * @FilePath: \big-screen\src\modules\hook.ts
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.config.unwrapInjectedRef = true
}
