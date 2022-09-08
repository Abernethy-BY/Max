<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-03 01:56:14
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-08 11:31:01
 * @FilePath: \big-screen\src\pages\login.vue
 * @Description: 登录
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import handoffIcon from '~/assets/image/login/handoffIcon.png'
import userNameIcon from '~/assets/image/login/userNameIcon.png'
import passWordIcon from '~/assets/image/login/passWordIcon.png'
import phoneInputIcon from '~/assets/image/login/phoneInputIcon.png'

const userInfo = useUserStore()
const succeedFlag = ref(false)

// 标题字典
const loginTypeMap = new Map()
loginTypeMap.set('account', { mainTitle: '账号密码登录', subTitle: '短信快捷登录', footerTitle: '扫一扫登录' })
loginTypeMap.set('verification', { mainTitle: '短信快捷登录', subTitle: '账号密码登录', footerTitle: '扫一扫登录' })
loginTypeMap.set('scan', { mainTitle: '微信扫码登录', subTitle: '', footerTitle: '账号密码登录' })

// 登录方式标识
const accountFlag = ref('account')

// 标题集合
const titleObj = ref({ mainTitle: '', subTitle: '', footerTitle: '' })
titleObj.value = loginTypeMap.get('account')

// 账号登陆表单节点
const ruleFormRef = ref<FormInstance>()
// 账号登陆表单校验规则
const rules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
// 账号登录表单
const loginForm = ref({ userName: '', passWord: '' })

// 手机登录表单节点
const phoneFormRef = ref<FormInstance>()
// 手机登录校验规则
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

// const verificationLoginRule = ref(verificationCodeRule)
// 手机登录表单
const phoneLoginForm = ref({ phoneNum: '', verificationCode: '' })

/**
 * @description: 登录方式切换方法
 * @return {*}
 */
const handoffLoginType = (flag: string) => {
  if (flag === 'sweep') {
    if (accountFlag.value !== 'scan') {
      accountFlag.value = 'scan'
      titleObj.value = loginTypeMap.get(accountFlag.value)
    }
    else {
      accountFlag.value = 'account'
      titleObj.value = loginTypeMap.get(accountFlag.value)
    }
  }
  else {
    if (accountFlag.value === 'scan' || accountFlag.value === 'verification') {
      accountFlag.value = 'account'
      titleObj.value = loginTypeMap.get(accountFlag.value)
    }
    else {
      accountFlag.value = 'verification'
      titleObj.value = loginTypeMap.get(accountFlag.value)
    }
  }
}

/**
 * @description: 账号登录
 * @return {*}
 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // const res: any = await xtdl({ submitid: '1213', usercode: '', sign: '97d595e6d6997525cf98aa66e670511f', pass: '123', tel: '13111112222', type: 1, token: '' })
      const param = {
        submitid: '1213',
        usercode: '',
        sign: '97d595e6d6997525cf98aa66e670511f',
        pass: loginForm.value.passWord,
        tel: loginForm.value.userName,
        type: 1,
        token: '',
      }
      const res: any = await xtdl(param)

      const temp = res?.[0]
      if (res[0]) {
        userInfo.token = temp.token
        userInfo.userCode = temp.usercode
        userInfo.userRole = temp.role
        succeedFlag.value = true
      }
    }
  })
}

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
        succeedFlag.value = true
      }
    }
  })
}

const phoneInputFun = (e) => {
  const temp = e[e.length - 1]
  if (temp.charCodeAt() < 48 || temp.charCodeAt() > 57)
    phoneLoginForm.value.phoneNum = phoneLoginForm.value.phoneNum.substring(0, phoneLoginForm.value.phoneNum.length - 1)
}

const getVerificationCode = async () => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: '',
    sign: md5(`${submitId}123789`),
    tel: phoneLoginForm.value.phoneNum,
  }
  await yzdx(param)
  ElMessage({ message: '验证码已发送', type: 'success' })
}
const jumpToEnroll = () => { }
const forgotPassDom = ref()
const forgotRules = ref<FormRules>({
  tel: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
    {
      pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      message: '请输入正确的手机号码',
    },
  ],
  pass: [
    { required: true, message: '请输入登录密码', trigger: 'blur' },
  ],
  rePass: [
    { required: true, message: '请确认登录密码', trigger: 'blur' },
  ],
  telCode: [
    { required: true, message: '请输入手机验证码', trigger: 'blur' },
  ],
})

const forgotPassForm = ref({
  userType: '',
  tel: '',
  pass: '',
  rePass: '',
  telCode: '',
})

const userTypeOptions = ref<Array<{ value: string; label: string }>>([])

const openForgotPass = () => {
  accountFlag.value = 'forgotPassword'
}

const getForgetPassCode = async () => {
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
}

const forgotPass = async (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const submitId = new Date().getTime()
      const param = {
        submitid: submitId,
        // usercode: '',
        sign: md5(`${submitId}123789`),
        // pass: phoneLoginForm.value.verificationCode,
        // tel: phoneLoginForm.value.phoneNum,
        // type: 2,
        // usertype: '',
        tel: forgotPassForm.value.tel,
        pass1: forgotPassForm.value.pass,
        pass2: forgotPassForm.value.rePass,
        checkcode: forgotPassForm.value.telCode,
      }
      await zhmm(param)
      ElMessage({ message: '操作成功', type: 'success' })
      // const temp = res?.[0]
      // if (res[0]) {
      //   userInfo.token = temp.token
      //   userInfo.userCode = temp.usercode
      //   userInfo.userRole = temp.role
      //   succeedFlag.value = true
      // }
      accountFlag.value = 'account'
    }
  })
}

const telInputFun = (e) => {
  const temp = e[e.length - 1]
  if (temp.charCodeAt() < 48 || temp.charCodeAt() > 57)
    forgotPassForm.value.tel = forgotPassForm.value.tel.substring(0, forgotPassForm.value.tel.length - 1)
}
</script>

<template>
  <div
    class="login-form" bg="#023CA7" flex flex-column-between cross-axis-stretch pt-47 w-552 position-absolute pot-255
    por-344 h-579
  >
    <!-- 二维码登录头 -->
    <header v-if="accountFlag === 'scan'" flex cross-axis-center flex-row-center ml-53 mr-56>
      <span fs-24 fw-400 color="#05FFFF">{{ titleObj.mainTitle }}</span>
    </header>
    <!-- 账号|手机验证登录头 -->
    <header
      v-else-if="accountFlag === 'verification' || accountFlag === 'account'" flex cross-axis-center
      flex-row-between ml-53 mr-56
    >
      <span fs-24 fw-400 color="#05FFFF" opacity-50>{{ titleObj.mainTitle }}</span>
      <div class="handoff-login-type" cursor-p @click="handoffLoginType('manual')">
        <span fs-18 lh-42 color="#05FFFF">{{ titleObj.subTitle }}</span>
        <el-image class="handoff-icon" :src="handoffIcon" fit="fill" />
      </div>
    </header>
    <!-- 账号登陆 -->
    <el-form
      v-if="accountFlag === 'account'" ref="ruleFormRef" :rules="rules" class="login-form-content"
      :model="loginForm" ml-53 mr-56
    >
      <el-form-item mt-48 prop="userName">
        <el-input v-model="loginForm.userName" class="login-input" placeholder="请输入用户名">
          <template #prepend>
            <el-image w-26 h-26 :src="userNameIcon" fit="fill" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item mt-48 prop="passWord">
        <el-input v-model="loginForm.passWord" placeholder="请输入用户密码" class="login-input">
          <template #prepend>
            <el-image w-26 h-26 :src="passWordIcon" fit="fill" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item mt-25>
        <span
          wPE-100 fs-16 fw-400 flex cross-axis-center flex-row-end color="#1AD1FF" lh-42 cursor-p
          @click="openForgotPass"
        >忘记密码？</span>
      </el-form-item>
      <el-form-item mt-48>
        <el-button class="login-button" type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 验证登录 -->
    <el-form
      v-else-if="accountFlag === 'verification'" ref="phoneFormRef" :rules="phoneLoginRules"
      class="phone-login-form-content" :model="phoneLoginForm" ml-53 mr-56
    >
      <el-form-item mt-21>
        <span fs-16 color="#05FFFF" opacity-50>验证即登录，未注册将自动创建账号</span>
      </el-form-item>
      <el-form-item mt-34 prop="userName">
        <el-input v-model="phoneLoginForm.phoneNum" class="login-input" placeholder="请输入手机号" @input="phoneInputFun">
          <template #prepend>
            <el-image w-26 h-26 :src="phoneInputIcon" fit="fill" />
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

    <el-form
      v-else-if="accountFlag === 'forgotPassword'" ref="forgotPassDom" :rules="forgotRules"
      class="forgot-password-content" :model="forgotPassForm" ml-53 mr-56 label-width="120px"
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
      <el-form-item mt-34 prop="telCode" label="手机验证码" class="phone-verification-code-item">
        <el-input v-model="forgotPassForm.telCode" class="login-input" placeholder="请输入手机验证码" />
        <el-button class="send-verification" @click="getForgetPassCode">
          发送验证码
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 二维码登录 -->
    <!-- <div v-else-if="accountFlag === 'scan'" flex flex-column-center cross-axis-center>
      <div w-243 h-243 bg="#70a1ff">
      </div>
    </div> -->
    <footer
      v-if="accountFlag !== 'forgotPassword'" mt-36 h-64 flex cross-axis-center flex-row-between fx-0
      position-relative
    >
      <span ml-53 cursor-p color="#05FFFF" fs-18 @click="handoffLoginType('sweep')">{{ titleObj.footerTitle }}</span>
      <span mr-56 cursor-p color="#05FFFF" fs-18 @click="jumpToEnroll">立即注册</span>
    </footer>
    <footer v-else mt-36 h-64 flex cross-axis-center flex-row-center fx-0 position-relative>
      <el-button class="footer-button" @click="forgotPass(forgotPassDom)">
        确认
      </el-button>
    </footer>

    <loginSuccessPop :show-flag="succeedFlag" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: login
</route>

<style lang="scss" scoped>
.login-form {
  // border-color: #1A8BFF;
  background: no-repeat url("~/assets/image/login/loginFormBg.png");
  background-size: 100% 100%;
}

:deep(.handoff-icon) {
  width: 9px;
  height: 14px;
  margin-left: 9px;
}

:deep(.login-form-content) {
  .el-form-item {
    margin-bottom: 0;
  }
}

:deep(.login-input) {
  height: 56px;
  border: 1px solid #1489CC;
  border-radius: 4px;
  --el-border-color: none;

  .el-input__wrapper {
    background: inherit;
    box-shadow: none !important;

    .el-input__inner {
      color: white;

      &::-webkit-input-placeholder {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #17A1E6;
      }
    }
  }

  .el-input-group__prepend {
    background: inherit;
    position: relative;
    display: flex;
    align-items: center;

    &:after {
      content: "";
      width: 2px;
      height: 20.4px;
      position: absolute;
      right: 0;
      background-color: #0071D4;
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

footer {
  :deep(.footer-button) {
    width: 296px;
    height: 35px;
    background: #1ADCFF;
    border-radius: 3px;
    border: none;

    span {

      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #02389B;
      line-height: 25px;
    }
  }
}
</style>

<style lang="scss">
.el-select__popper.el-popper {

  background: #1489CC;
  border: none;

}

.el-select-dropdown__empty {
  color: white;
}
</style>
