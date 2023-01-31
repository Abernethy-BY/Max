/*
 * @Author: By
 * @Date: 2022-08-13 11:12:28
 * @LastEditTime: 2023-01-31 15:12:20
 * @LastEditors: BY by15242952083@outlook.com
 * @Description:
 * @FilePath: \big-screen\src\types.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { type ViteSSGContext } from 'vite-ssg'
//
export type UserModule = (ctx: ViteSSGContext) => void
