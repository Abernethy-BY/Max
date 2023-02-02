export interface LOGIN_FLAG_DICTIONARY {
  mainTitle: string
  subTitle: string | null
  jumpIcon: boolean
  routerDirection: `${LOGIN_TYPE_ENUM}` | null
  marking: string | null
  returnIcon: boolean
}

export interface LOGIN_FOOTER_SPAN_DICTIONARY {
  buttonList: LOGIN_TYPE[]
  buttonType: 'JUMP' | 'CONFIRM'
  routerDirection: LOGIN_TYPE[]
  showFooter: boolean
}

export enum LOGIN_TYPE_ENUM {
  PASS_LOGIN = 'PASS_LOGIN',
  FORGOT_PASS = 'FORGOT_PASS',
  SIGN_UP = 'SIGN_UP',
  SMS_LOGIN = 'SMS_LOGIN',
  SCAN_TO_LOG_IN = 'SCAN_TO_LOG_IN',
}

export type LOGIN_TYPE = `${LOGIN_TYPE_ENUM}`

export type LOGIN_KEY = keyof typeof LOGIN_TYPE_ENUM
