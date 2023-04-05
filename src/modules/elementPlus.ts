import { ID_INJECTION_KEY } from 'element-plus'
import { type UserModule } from '~/types'

export const install: UserModule = async ({ app }) => {
  app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 })
}
