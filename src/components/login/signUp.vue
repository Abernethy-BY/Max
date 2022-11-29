<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-21 19:12:35
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-29 17:32:43
 * @FilePath: \big-screen\src\components\login\signUp.vue
 * @Description: 注册
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { SELECT_OPTION_MODEL } from '~/model'

const propObj = withDefaults(defineProps<{ agreementFlag: boolean }>(), { agreementFlag: false })
const emit = defineEmits(['openEnterInformation', 'errorAgreement', 'parameterPassing'])
/**
 * @description: 注册表单检验规则
 * @return {*}
 */
const signUpRules = ref<FormRules>({
  tel: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
    {
      pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      message: '请输入正确的手机号码',
    },
  ],
  pass: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
  telCode: [{ required: true, message: '请输入手机验证码', trigger: 'blur' }],
  userType: [{ required: true, message: '请选择角色', trigger: 'blur' }],
})

/**
 * @description:注册表单
 */
const signUpForm = ref({
  userType: '',
  tel: '',
  pass: '',
  telCode: '',
})

/**
 * @description: 用户选择器配置项
 */
const userTypeOptions = ref<Array<SELECT_OPTION_MODEL>>([
  { label: '工信厅', value: '工信厅' },
  { label: '工信局', value: '工信局' },
  { label: '园区管委会', value: '园区管委会' },
  { label: '园区专员', value: '园区专员' },
  { label: '企业', value: '企业' },
])

/**
 * @description: 注册表单节点
 * @return {*}
 */
const signUpPassRef = ref<FormInstance>()

/**
 * @description: 注册方法
 * @param {*} formEl 表单节点
 * @return {*}
 */
const signUp = async (formEl: FormInstance | undefined) => {
  if (!formEl)
    return

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        if (!propObj.agreementFlag) {
          emit('errorAgreement')
          return
        }
        const submitId = new Date().getTime()
        const param = {
          usertype: signUpForm.value.userType,
          submitid: submitId,
          sign: md5(`${submitId}123789`),
          tel: signUpForm.value.tel,
          pass: signUpForm.value.pass,
          checkcode: signUpForm.value.telCode,
        }

        const zcyhFun = async () => {
          // await zcyh(param)
          emit('openEnterInformation', signUpForm.value.tel, signUpForm.value.userType)
        }
        debounce(zcyhFun, 500, false, [])
      }
      catch (error) {
        consola.fatal(error)
        ElMessage({ message: error, type: 'error' })
      }
    }
  })
}

/**
 * @description: 手机号校验方法
 * @param {*} val
 * @return {*}
 */
const telInputFun = (e) => {
  const temp = e[e.length - 1]
  if (temp.charCodeAt() < 48 || temp.charCodeAt() > 57)
    signUpForm.value.tel = signUpForm.value.tel.substring(0, signUpForm.value.tel.length - 1)
}

/**
 * @description: 获取验证码按钮文本
 */
const captchaButtonSpan = ref<string>('发送验证码')

/**
 * @description: 获取验证码按钮禁用标识
 */
const captchaButtonDisabledFlag = ref<boolean>(false)

/**
 * @description: 获取验证码
 * @return {*}
 */
const signUpCode = async () => {
  try {
    if (!signUpForm.value.tel || signUpForm.value.tel === '') {
      ElMessage({ message: '请输入手机号', type: 'error' })
      return
    }

    const submitId = new Date().getTime()
    const param = {
      submitid: submitId,
      usercode: '',
      sign: md5(`${submitId}123789`),
      tel: signUpForm.value.tel,
    }

    const yzdxFun = async () => {
      await yzdx(param)
      ElMessage({ message: '验证码已发送', type: 'success' })
      let timeTemp = 120
      const captchaButtonDisabledTime = setInterval(() => {
        captchaButtonSpan.value = `请稍后重试(${timeTemp--})`
        captchaButtonDisabledFlag.value = true

        if (timeTemp === 0) {
          captchaButtonDisabledFlag.value = false
          captchaButtonSpan.value = '发送验证码'
          clearInterval(captchaButtonDisabledTime)
        }
      }, 1000)
    }
    debounce(yzdxFun, 500, false, [])
  }
  catch (error) {
    consola.fatal(error)
    ElMessage({ message: error, type: 'error' })
  }
}
</script>

<template>
  <div class="sign-up-box">
    <el-form
      ref="signUpPassRef" :rules="signUpRules" class="forgot-password-content" :model="signUpForm" ml-53 mr-56
      label-width="120px"
    >
      <el-form-item class="user-type-item" mt-34 prop="userType" label="用户类型">
        <el-select v-model="signUpForm.userType" class="login-input" popper-class="role-popper" placeholder="请选择用户类型">
          <el-option v-for="item in userTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item mt-34 prop="tel" label="手机号码">
        <el-input v-model="signUpForm.tel" class="login-input" placeholder="请输入手机号码" @input="telInputFun" />
      </el-form-item>
      <el-form-item mt-34 prop="pass" label="登录密码">
        <el-input v-model="signUpForm.pass" type="password" class="login-input" placeholder="请输入登录密码" />
      </el-form-item>
      <el-form-item mt-34 prop="telCode" label="手机验证码" class="phone-verification-code-item">
        <el-input v-model="signUpForm.telCode" class="login-input" placeholder="请输入手机验证码" />
        <el-button :disabled="captchaButtonDisabledFlag" class="send-verification" @click="signUpCode">
          {{ captchaButtonSpan }}
        </el-button>
      </el-form-item>
      <footer mt-36 h-64 flex cross-axis-center flex-row-center fx-0 position-relative>
        <el-button class="footer-button" @click="signUp(signUpPassRef)">
          注册
        </el-button>
      </footer>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.sign-up-box {

  :deep(.forgot-password-content) {
    .el-form-item {
      align-items: center;

      .el-form-item__label {
        justify-content: flex-start;

        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #1ADCFF;
        line-height: 35px;

        &:before {
          color: #1ADCFF
        }
      }

      .el-form-item__content {
        flex: 1;

        .el-select,
        .select-trigger,
        .el-input,
        .el-input,
        .el-input__inner {
          height: 40px;
          width: 100%;
        }
      }

      .el-select {
        .el-input__wrapper {
          border: none;
        }
      }
    }

    .user-type-item {

      .el-input__wrapper {
        border: 1px solid #1489CC;
        box-shadow: none;
        background-color: inherit;
      }

      .el-input__inner {

        &::-webkit-input-placeholder {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #17A1E6;
        }
      }
    }

    .phone-verification-code-item {
      .el-form-item__content {
        display: flex;
        align-items: center;

        .el-input {
          flex: 1;
          margin-right: 13px;
        }

        .el-button {
          height: 40px;
          flex: 0 0 80px;

          background: #1ADCFF;
          border: none;

          span {

            font-size: 11px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #02389B;
            line-height: 25px;
          }
        }
      }
    }

  }
}
</style>
