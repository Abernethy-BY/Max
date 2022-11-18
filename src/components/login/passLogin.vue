<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import userNameIcon from '~/assets/image/login/userNameIcon.png'
import passWordIcon from '~/assets/image/login/passWordIcon.png'
const findPass = defineEmits(['openFindPass'])
const userInfo = useUserStore()
/**
 * @description: 表单节点
 */
const ruleFormRef = ref<FormInstance>()

/**
 * @description: 账号登陆表单校验规则
 */
const rules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

/**
 * @description: 账号登录表单
 * @return {*}
 */
const loginForm = ref({ userName: '', passWord: '' })

/**
 * @description: 忘记密码发放方法
 * @return {*}
 */
const openForgotPass = () => {
  findPass('openFindPass')
}

/**
 * @description: 登录方法
 * @param {*} formEl 表单节点
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
      }
    }
  })
}
</script>

<template>
  <div wPE-100 hPE-100 class="login-form-content-box">
    <el-form ref="ruleFormRef" :rules="rules" class="login-form-content" :model="loginForm" ml-53 mr-56>
      <el-form-item mt-48 prop="userName">
        <el-input v-model="loginForm.userName" class="login-input" placeholder="请输入用户名">
          <template #prepend>
            <el-image w-26 h-26 :src="userNameIcon" fit="fill" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item mt-48 prop="passWord">
        <el-input v-model="loginForm.passWord" type="password" placeholder="请输入用户密码" class="login-input">
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
  </div>
</template>

<style lang="scss" scoped>
.login-form-content-box {

  :deep(.login-form-content) {
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
