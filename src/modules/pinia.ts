/*
 * @Author: By
 * @Date: 2022-08-18 16:14:30
 * @LastEditTime: 2022-08-19 11:16:03
 * @LastEditors: By
 * @Description: pinia
 * @FilePath: \big-screen-vue3\src\modules\pinia.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import { type UserModule } from '~/types'

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ isClient, initialState, app }) => {
  const pinia = createPinia().use(piniaPluginPersist)
  app.use(pinia)
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient)
    pinia.state.value = (initialState.pinia) || {}
  else
    initialState.pinia = pinia.state.value
}
