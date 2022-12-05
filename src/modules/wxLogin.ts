import wxlogin from 'vue-next-wxlogin'
import { type UserModule } from '~/types'
export const install: UserModule = ({ app }) => {
  app.component('WxLogin', wxlogin)
}
