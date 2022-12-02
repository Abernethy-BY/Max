<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-18 20:59:34
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-01 15:35:18
 * @FilePath: \big-screen\src\components\login\forgotPass.vue
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['openPassLogin'])

const forgotPassDom = ref<FormInstance>()
/**
 * @description: 表单验证
 */
const forgotRules = ref<FormRules>({
  tel: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
    {
      pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      message: '请输入正确的手机号码',
    },
  ],
  pass: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
  rePass: [{ required: true, message: '请确认登录密码', trigger: 'blur' }],
  telCode: [{ required: true, message: '请输入手机验证码', trigger: 'blur' }],
})

/**
 * @description: 表单对象
 */
const forgotPassForm = ref({
  userType: '',
  tel: '',
  pass: '',
  rePass: '',
  telCode: '',
})

/**
 * @description:类型选择器数据
 */
const userTypeOptions = ref<Array<{ value: string; label: string }>>([])

/**
   * @description: 电话校验方法
   * @param {*} e 输入字符
   * @return {*}
   */
const telInputFun = (e) => {
  const temp = e[e.length - 1]
  if (temp.charCodeAt() < 48 || temp.charCodeAt() > 57)
    forgotPassForm.value.tel = forgotPassForm.value.tel.substring(0, forgotPassForm.value.tel.length - 1)
}

/**
 * @description: 验证码按钮文本
 */
const captchaButtonSpan = ref<string | number>('发送验证码')

/**
 * @description: 获取验证码按钮禁用标识
 */
const captchaButtonDisabledFlag = ref<boolean>(false)

/**
 * @description: 获取验证码
 * @return {*}
 */
const getForgetPassCode = async () => {
  try {
    if (!forgotPassForm.value.tel || forgotPassForm.value.tel === '') {
      ElMessage({ message: '请输入手机号', type: 'error' })
      return
    }

    const submitId = new Date().getTime()
    const param = {
      submitid: submitId,
      usercode: '',
      sign: md5(`${submitId}123789`),
      tel: forgotPassForm.value.tel,
    }
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
  catch (error) {
    consola.fatal(error)
    ElMessage({ message: '已发送短信，如要重发短信，请稍等', type: 'error' })
  }
}
/**
 * @description: 找回密码方法
 * @param {*} formEl 表单节点
 * @return {*}
 */
const forgotPass = async (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const submitId = new Date().getTime()
      const param = {
        submitid: submitId,
        sign: md5(`${submitId}123789`),
        tel: forgotPassForm.value.tel,
        pass1: forgotPassForm.value.pass,
        pass2: forgotPassForm.value.rePass,
        checkcode: forgotPassForm.value.telCode,
      }
      await zhmm(param)
      ElMessage({ message: '操作成功', type: 'success' })
      emit('openPassLogin')
    }
  })
}
</script>

<template>
  <div class="forgot-password-content-box" po-r flex flex-column-start>
    <el-form
      ref="forgotPassDom" :rules="forgotRules" class="forgot-password-content" :model="forgotPassForm" ml-53
      mr-56 label-width="120px"
    >
      <el-form-item v-show="false" class="user-type-item" mt-34 prop="userType" label="用户类型">
        <el-select v-model="forgotPassForm.userType" placeholder="请选择用户类型">
          <el-option v-for="item in userTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item mt-34 prop="tel" label="手机号码">
        <el-input v-model="forgotPassForm.tel" class="login-input" placeholder="请输入手机号码" @input="telInputFun" />
      </el-form-item>
      <el-form-item mt-34 prop="pass" label="登录密码">
        <el-input v-model="forgotPassForm.pass" class="login-input" placeholder="请输入登录密码" />
      </el-form-item>
      <el-form-item mt-34 prop="rePass" label="确认登录密码">
        <el-input v-model="forgotPassForm.rePass" class="login-input" placeholder="请确认登录密码" />
      </el-form-item>
      <div flex-row-between cross-axis-center>
        <el-form-item mt-34 prop="telCode" label="手机验证码" class="phone-verification-code-item">
          <el-input v-model="forgotPassForm.telCode" class="login-input" placeholder="请输入手机验证码" />
        </el-form-item>
        <el-button :disabled="captchaButtonDisabledFlag" class="send-verification" @click="getForgetPassCode">
          {{ captchaButtonSpan }}
        </el-button>
      </div>

      <footer mt-36 h-64 flex cross-axis-center flex-row-center fx-0 position-relative>
        <el-button class="footer-button" @click="forgotPass(forgotPassDom)">
          确认
        </el-button>
      </footer>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.forgot-password-content-box {

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
      align-items: center;
      margin-top: 18px;

      .el-form-item__content {
        display: flex;

        .el-input {
          flex: 1;
          margin-right: 13px;
        }
      }
    }

    .send-verification {
      // height: 40px;
      flex: 1;
      height: 40px;
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
</style>
