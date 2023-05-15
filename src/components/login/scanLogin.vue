<script lang="ts" setup>
import type { LOGIN_ERROR_TYPE_LEY, LOGIN_MITT_TYPE, OPERATE_DIALOG_TYPE } from '~/model/login'

const userInfo = useUserStore()
const router = useRouter()
const menu = menuStore()

/**
 * @description: 蒙版标识
 */
let maskFlag = $ref<boolean>()

// 定时器范围
let intervalTimer = 20

/**
 * @description: 二维码透明度
 */
let qrOpacity = $ref<number>()

/**
 * @description: 二维码内容
 */
let rqValue = $ref<string>('')

/**
 * @description: 二维码唯一标识符
 */
let state = $ref<string>()

const errMap: Map<string, OPERATE_DIALOG_TYPE | LOGIN_MITT_TYPE> = new Map()
  .set('未扫描', ' ')
  .set('审核中', OPERATE_DIALOG_FLAG_ENUM.UNDER_REVIEW)
  .set('未录入资料', OPERATE_DIALOG_FLAG_ENUM.NOT_ENTERED)
  .set('审核不通过', OPERATE_DIALOG_FLAG_ENUM.AUDIT_FAILED)
  .set('未注册', LOGIN_MITT_ENUM.notRegistered)

/**
 * @description: 弹窗关闭回调
 * @return {*}
 */
const loginSuccessfulCloseFun = () => {
  if (userInfo.userRole === '工信局' || userInfo.userRole === '工信厅')
    router.push({ path: '/' })

  else if (userInfo.userRole === '企业')

    router.push({ path: '/corporatePortrait' })

  else
    router.push({ path: '/' })

  menu.menuIndex = 0
}
/**
 * @description: 未录入资料弹窗关闭回调方法 --- 弹出资料录入弹窗
 * @return {*}
 */
const notEnteredCloseFun = () => {
  emitter.emit(LOGIN_MITT_ENUM.openEnterInformation)
}

/**
 * @description: 登录失败交互回调字典
 */
const statusCloseCallBackMap: Map<LOGIN_ERROR_TYPE_LEY, Function> = new Map()
  .set('未录入资料', notEnteredCloseFun)

/**
 * @description: 登录成功
 * @param {*} user
 * @return {*}
 */
const scanLogin = (user) => {
  userInfo.token = user.token
  userInfo.userCode = user.usercode
  userInfo.userRole = user.role
  userInfo.city = user.city
  userInfo.compname = user.compname
  userInfo.province = user.province
  emitter.emit(LOGIN_MITT_ENUM.openOperateDialog, { type: OPERATE_DIALOG_FLAG_ENUM.LOGIN, closeCallBack: loginSuccessfulCloseFun })
}
/**
 * @description: 获取扫码结果
 * @return {*}
 */
const getOutcome = async () => {
  try {
    const res: any = await scanloginchk({ logincode: state })
    if (errMap.get(res.message)) {
      if (res.message === '未录入资料')
        emitter.emit(errMap.get(res.message)!, { type: errMap.get(res.message), nextCallBack: statusCloseCallBackMap.get(res.message), openId: res.data[0]?.openid })

      else
        emitter.emit(errMap.get(res.message)!, { type: errMap.get(res.message), closeCallBack: statusCloseCallBackMap.get(res.message), openId: res.data[0]?.openid })
    }
    else { scanLogin(res.data[0]) }
  }
  catch (error) {
    consola.fatal(error)
  }
}

/**
 * @description:获取扫描结果定时器
 */
let getOutcomeInterval: NodeJS.Timeout | null = null
/**
 * @description: 获取二维码内容
 * @return {Promise<void>}
 */
const getQrCoded = async (): Promise<void> => {
  try {
    const appId = 'wxa27b289d15efc9bf'
    const redirectUri = 'https://wx.maxrong.com/bigdata/loginwxback.aspx'
    const responseType = 'code'
    const scope = 'snsapi_base'
    state = Math.random().toFixed(6).slice(-6)

    rqValue = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`

    getOutcome()

    // 轮询获取接口结果

    getOutcomeInterval = setInterval(() => {
      if (--intervalTimer === 0) {
        maskFlag = true
        getOutcomeInterval && clearInterval(getOutcomeInterval)
        qrOpacity = 0.1
      }
      getOutcome()
    }, 1000 * 5)
  }
  catch (error) {
    consola.fatal(error)
    ElMessage({ message: error, type: 'error' })
  }
}

getQrCoded()

/**
 * @description: 二维码刷新方法
 * @return {void}
 */
const flushedQR = (): void => {
  intervalTimer = 20
  maskFlag = false
  qrOpacity = 1
  getQrCoded()
}

onUnmounted(() => {
  getOutcomeInterval && clearInterval(getOutcomeInterval)
})
</script>

<template>
  <div id="box" class="scan-login-box" w-100 h-100 flex-row-center po-r cross-axis-center>
    <div
      v-if="maskFlag" class="masks-box" bg="#2f3542" opacity-50 z-10 w-70 h-70 po-a flex-row-center cross-axis-center
      cursor-p @click="flushedQR"
    >
      <span fs-18 lh-42 color="#ffffff" class="mask">二维码已失效，点击刷新</span>
    </div>
    <vue-qrcode :style="{ opacity: qrOpacity }" :value="rqValue" :options="{ width: '100%' }" />
  </div>
</template>
