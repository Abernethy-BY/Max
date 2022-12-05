<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-22 21:08:12
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-05 19:34:05
 * @FilePath: \big-screen\src\components\login\smsLogin.vue
 * @Description: 验证码登录方法
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import phoneInputIcon from '~/assets/image/login/phoneInputIcon.png'
const userInfo = useUserStore()

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
 * @param {*} e 输入字符
 * @return {*}
 */
const phoneInputFun = (e) => {
  const temp = e[e.length - 1]
  if (temp.charCodeAt() < 48 || temp.charCodeAt() > 57)
    phoneLoginForm.value.phoneNum = phoneLoginForm.value.phoneNum.substring(0, phoneLoginForm.value.phoneNum.length - 1)
}

/**
 * @description: 获取短信验证码
 * @return {*}
 */
const getVerificationCode = async () => {
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
    }

    debounce(yzdxFun, 500, false, [])
  }
  catch (error) {
    consola.fatal(error)
    // ElMessage({ message: '已发送短信，如要重发短信，请稍等', type: 'error' })
  }
}

const phoneFormRef = ref<FormInstance>()
/**
 * @description: 手机号登录
 * @param {*} formEl 表单节点
 * @return {*}
 */
const phoneLogin = async (formEl: FormInstance | undefined) => {
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

      const temp = res?.[0]
      if (res[0]) {
        userInfo.token = temp.token
        userInfo.userCode = temp.usercode
        userInfo.userRole = temp.role
      }
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
      <el-form-item mt-21>
        <span fs-16 color="#05FFFF" opacity-50>验证即登录，未注册将自动创建账号</span>
      </el-form-item>
      <el-form-item mt-34 prop="userName">
        <el-input v-model="phoneLoginForm.phoneNum" class="login-input" placeholder="请输入手机号" @input="phoneInputFun">
          <template #prepend>
            <el-image w-26px h-26px :src="phoneInputIcon" fit="fill" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item mt-48 prop="verificationCode" class="verification-code-form-item">
        <el-input v-model="phoneLoginForm.verificationCode" class="login-input" placeholder="验证码" />
        <el-button class="send-verification " @click="getVerificationCode">
          发送验证码
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
