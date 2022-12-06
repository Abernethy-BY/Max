import VueQrcode from '@chenfengyuan/vue-qrcode'
import type { UserModule } from '~/types'
export const install: UserModule = ({ app }) => {
  app.component('VueQrcode', VueQrcode)
}
