/*
 * @Author: By
 * @Date: 2022-08-13 11:12:28
 * @LastEditTime: 2022-08-13 16:25:39
 * @LastEditors: By
 * @Description:
 * @FilePath: \big-screen-vue3\src\types.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { type ViteSSGContext } from 'vite-ssg'
//
export type UserModule = (ctx: ViteSSGContext) => void
