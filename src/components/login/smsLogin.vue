<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-22 21:08:12
 * @LastEditors: Abernethy-BY by15242952083@outlook.com
 * @LastEditTime: 2023-03-25 15:37:03
 * @FilePath: \big-screen\src\components\login\smsLogin.vue
 * @Description: 验证码登录方法
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import phoneInputIcon from '~/assets/image/login/phoneInputIcon.png'
const userInfo = useUserStore()
const menu = menuStore()
const router = useRouter()

/**
 * @description:验证码登录表单验证规则
 */
const phoneLoginRules = ref<FormRules>({
  phoneNum: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
    {
      pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      message: '请输入正确的手机号码',
    },
  ],
  verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})

/**
 * @description: 验证码表单对象
 */
const phoneLoginForm = ref({ phoneNum: '', verificationCode: '' })

/**
 * @description: 手机号输入校验方法
 * @param {string} e 输入字符
 * @return {void}
 */
const phoneInputFun = (e: string): void => {
  const temp = e[e.length - 1]
  if (temp.charCodeAt(0) < 48 || temp.charCodeAt(0) > 57)
    phoneLoginForm.value.phoneNum = phoneLoginForm.value.phoneNum.substring(0, phoneLoginForm.value.phoneNum.length - 1)
}

/**
 * @description: 获取验证码按钮文字
 */
let captchaButtonSpan = $ref<string>('发送验证码')

/**
 * @description: 验证码按钮禁用标识
 */
let captchaButtonDisabledFlag = $ref<boolean>(false)

/**
 * @description: 获取短信验证码
 * @return {Promise<void>}
 */
const getVerificationCode = async (): Promise<void> => {
  try {
    if (!phoneLoginForm.value.phoneNum || phoneLoginForm.value.phoneNum === '') {
      ElMessage({ message: '请输入手机号', type: 'error' })
      return
    }

    const submitId = new Date().getTime()
    const param = {
      submitid: submitId,
      usercode: '',
      sign: md5(`${submitId}123789`),
      tel: phoneLoginForm.value.phoneNum,
    }

    const yzdxFun = async () => {
      await yzdx(param)
      ElMessage({ message: '验证码已发送', type: 'success' })

      let timeTemp = 120

      const captchaButtonDisabledTime = setInterval(() => {
        captchaButtonSpan = `请稍后重试(${timeTemp--})`
        captchaButtonDisabledFlag = true

        if (timeTemp === 0) {
          captchaButtonDisabledFlag = false
          captchaButtonSpan = '发送验证码'
          clearInterval(captchaButtonDisabledTime)
        }
      }, 1000)
    }

    await debounce(yzdxFun, 500, false, [])
  }
  catch (error) {
    consola.fatal(error)
  }
}

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

const phoneFormRef = ref<FormInstance>()
/**
 * @description: 手机号登录
 * @param {FormInstance | undefined} formEl 表单节点
 * @return {Promise<void>}
 */
const phoneLogin = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl)
    return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const submitId = new Date().getTime()
      const param = {
        submitid: '',
        usercode: '',
        sign: md5(`${submitId}123789`),
        pass: phoneLoginForm.value.verificationCode,
        tel: phoneLoginForm.value.phoneNum,
        type: 2,
      }
      const res: any = await xtdl(param)

      const temp = res.data[0]
      temp && (userInfo.token = temp.token)
      temp && (userInfo.userCode = temp.usercode)
      temp && (userInfo.userRole = temp.role)
      emitter.emit(LOGIN_MITT_ENUM.openOperateDialog, { type: OPERATE_DIALOG_FLAG_ENUM.LOGIN, nextCallBack: loginSuccessfulCloseFun })
    }
  })
}
</script>

<template>
  <div class="sms-login-box">
    <el-form
      ref="phoneFormRef" :rules="phoneLoginRules" class="phone-login-form-content" :model="phoneLoginForm" ml-53
      mr-56
    >
      <el-form-item mt-34 prop="userName">
        <el-input v-model="phoneLoginForm.phoneNum" class="login-input" placeholder="请输入手机号" @input="phoneInputFun">
          <template #prepend>
            <el-image w-26px h-26px :src="phoneInputIcon" fit="fill" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item mt-48 prop="verificationCode" class="verification-code-form-item">
        <el-input v-model.trim="phoneLoginForm.verificationCode" class="login-input" placeholder="验证码" />
        <el-button :disabled="captchaButtonDisabledFlag" class="send-verification " @click="getVerificationCode">
          {{ captchaButtonSpan }}
        </el-button>
      </el-form-item>
      <el-form-item mt-48>
        <el-button class="login-button" type="primary" @click="phoneLogin(phoneFormRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.sms-login-box {

  :deep(.verification-code-form-item) {
    .el-form-item__content {
      display: flex;
      justify-content: space-between;

      .el-input {
        width: 60%;
      }

      .el-button {
        width: 36%;
        height: 56px;
        border: 1px solid #1489CC;
        border-radius: 4px;
        background: inherit;

        span {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #1ADCFF;
          line-height: 42px;
        }
      }
    }
  }

  :deep(.login-button) {
    width: 100%;
    height: 52px;
    background: #1ADCFF;
    border-radius: 4px;

    span {
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #02389B;
      line-height: 38px;
    }
  }

}
</style>
