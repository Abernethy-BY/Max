/*
 * @Author: By
 * @Date: 2022-08-13 11:12:28
 * @LastEditTime: 2022-08-13 16:48:25
 * @LastEditors: By
 * @Description: 
 * @FilePath: \big-screen-vue3\src\shims.d.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
declare interface Window {
  // extend the window
}

// with vite-plugin-md, markdown files can be treated as Vue components
declare module '*.md' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'postcss-pxtorem' {
  const content:any
  export default content
}