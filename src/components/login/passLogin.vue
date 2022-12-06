<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import userNameIcon from '~/assets/image/login/userNameIcon.png'
import passWordIcon from '~/assets/image/login/passWordIcon.png'
const findPass = defineEmits(['openFindPass'])
const userInfo = useUserStore()
// const routerInfo = routerStore()

const router = useRouter()

// const popShowFlag = ref<boolean>(false)
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
 * @description: 弹窗节点
 */
const operateDialogRef = ref()

/**
 * @description: 弹窗类型标识
 */
const dialogType = ref<string>('')

/**
 * @description: 状态字典
 */
const statusMap = new Map().set('审核中', 'UNDER_REVIEW').set('未录入资料', 'NOT_ENTERED').set('审核不通过', 'AUDIT_FAILED')

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
      try {
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

        const stateList = ['审核中', '审核不通过', '未录入资料']

        const temp = res?.data[0]
        if (stateList.includes(temp.state))
          throw new Error(temp.state)

        userInfo.token = temp.token
        userInfo.userCode = temp.usercode
        userInfo.userRole = temp.role
        userInfo.city = temp.city
        userInfo.compname = temp.compname
        userInfo.province = temp.province

        dialogType.value = 'LOGIN'
        operateDialogRef.value.openDialog()
      }
      catch (error: any) {
        const errorTemp = error.message
        if (errorTemp.includes('审核不通过'))
          ElMessage({ message: error, type: 'error' })

        dialogType.value = statusMap.get(errorTemp) ? statusMap.get(errorTemp) : statusMap.get('审核不通过')
        operateDialogRef.value.openDialog()
        consola.fatal(error)
      }
    }
  })
}

/**
 * @description: 弹窗关闭回调
 * @return {*}
 */
const loginSuccessfulCloseFun = () => {
  userInfo.userRole = '企业'
  if (userInfo.userRole === '工信局' || userInfo.userRole === '工信厅')
    router.push({ path: '/enterprise' })

  else if (userInfo.userRole === '企业')

    router.push({ path: '/corporatePortrait' })

  else
    router.push({ path: '/' })
}

/**
 * @description: 录入信息弹窗节点
 */
const enterInformationRef = ref()

/**
 * @description: 用户录入信息依赖
 */
const userSignTel = ref<string>('')
const userSignType = ref<string>('')

/**
 * @description: 未录入信息弹窗关闭回调
 * @return {*}
 */
const openEnterInformationFun = () => {
  enterInformationRef.value.openDialog()
}

/**
 * @description: 弹窗关闭回调字典
 */
const closeFunMap = new Map().set('LOGIN', loginSuccessfulCloseFun).set('NOT_ENTERED', openEnterInformationFun).set('AUDIT_FAILED', openEnterInformationFun)

/**
 * @description: 弹窗关闭回调
 */
const dialogCloseFun = computed(() => closeFunMap.get(dialogType.value))
</script>

<template>
  <div wPE-100 hPE-100 class="login-form-content-box">
    <el-form ref="ruleFormRef" :rules="rules" class="login-form-content" :model="loginForm" ml-53 mr-56>
      <el-form-item mt-48 prop="userName">
        <el-input v-model.trim="loginForm.userName" class="login-input" placeholder="请输入用户名">
          <template #prepend>
            <el-image w-26px h-26px :src="userNameIcon" fit="fill" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item mt-48 prop="passWord">
        <el-input v-model.trim="loginForm.passWord" type="password" placeholder="请输入用户密码" class="login-input">
          <template #prepend>
            <el-image w-26px h-26px :src="passWordIcon" fit="fill" />
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

    <operate-dialog ref="operateDialogRef" :type="dialogType" :close="dialogCloseFun" />
    <enter-information ref="enterInformationRef" :user-sign-tel="userSignTel" :user-sign-type="userSignType" />
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
