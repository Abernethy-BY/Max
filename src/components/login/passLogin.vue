<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import userNameIcon from '~/assets/image/login/userNameIcon.png'
import passWordIcon from '~/assets/image/login/passWordIcon.png'
import type { LOGIN_ERROR_TYPE_LEY, USER_ROLE_TYPE } from '~/model/login'
import { OPERATE_DIALOG_FLAG_ENUM } from '~/model/login'
// const findPass = defineEmits(['openFindPass'])
const userInfo = useUserStore()
const menu = menuStore()
const router = useRouter()
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
  emitter.emit(LOGIN_MITT_ENUM.openForgetPass)
}

/**
 * @description: 用户权限
 */
let userRole = $ref<USER_ROLE_TYPE>('企业')

/**
 * @description: 状态字典
 */
const statusMap = new Map()
  .set('审核中', OPERATE_DIALOG_FLAG_ENUM.UNDER_REVIEW)
  .set('未录入资料', OPERATE_DIALOG_FLAG_ENUM.NOT_ENTERED)
  .set('审核不通过', OPERATE_DIALOG_FLAG_ENUM.AUDIT_FAILED)
  .set('账号或密码不正确', OPERATE_DIALOG_FLAG_ENUM.PASS_MISTAKE)

/**
 * @description: 未录入资料弹窗关闭回调方法 --- 弹出资料录入弹窗
 * @return {*}
 */
const notEnteredCloseFun = () => {
  emitter.emit(LOGIN_MITT_ENUM.openEnterInformation, { userSignType: userRole, userSignTel: loginForm.value.userName })
}

/**
 * @description: 登录失败交互回调字典
 */
const statusCloseCallBackMap: Map<LOGIN_ERROR_TYPE_LEY, Function> = new Map()
  .set(LOGIN_ERROR_ENUM.NOT_ENTERED, notEnteredCloseFun)

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
        consola.info(temp)
        if (temp && stateList.includes(temp.state)) {
          userRole = temp.role === '' ? '企业' : temp.role
          throw new Error(temp.state)
        }
        else if (!temp) {
          throw new Error('PASS_MISTAKE')
        }

        userInfo.token = temp.token
        userInfo.userCode = temp.usercode
        userInfo.userRole = temp.role
        userInfo.city = temp.city
        userInfo.compname = temp.compname
        userInfo.province = temp.province

        emitter.emit(LOGIN_MITT_ENUM.openOperateDialog, { type: OPERATE_DIALOG_FLAG_ENUM.LOGIN, closeCallBack: loginSuccessfulCloseFun })
      }
      catch (error: any) {
        let errorTemp
        consola.start([error, error.message, errorTemp])

        if (error === '账号或密码不正确')
          errorTemp = error
        else if (error.message)
          errorTemp = error.message
        else
          errorTemp = ''

        if (errorTemp.includes('审核不通过'))
          ElMessage({ message: error, type: 'error' })
        emitter.emit(LOGIN_MITT_ENUM.openOperateDialog, { type: statusMap.get(errorTemp), closeCallBack: statusCloseCallBackMap.get(errorTemp) })

        // dialogType.value = statusMap.get(errorTemp) ? statusMap.get(errorTemp) : statusMap.get('审核不通过')
        // operateDialogRef.value.openDialog()
        consola.fatal(error)
      }
    }
  })
}

/**
 * @description: 录入信息弹窗节点
 */
// const enterInformationRef = ref()

/**
 * @description: 用户录入信息依赖
 */
// const userSignTel = ref<string>('')
// const userSignType = ref<string>('')

// /**
//  * @description: 未录入信息弹窗关闭回调
//  * @return {*}
//  */
// const openEnterInformationFun = () => {
//   enterInformationRef.value.openPop()
// }

/**
 * @description: 弹窗关闭回调字典
 */
// const closeFunMap = new Map().set('LOGIN', loginSuccessfulCloseFun).set('NOT_ENTERED', openEnterInformationFun).set('AUDIT_FAILED', openEnterInformationFun)

// /**
//  * @description: 弹窗关闭回调
//  */
// const dialogCloseFun = computed(() => closeFunMap.get(dialogType.value))

// onMounted(() => {
//   enterInformationRef.value.openPop()
// })
</script>

<template>
  <div wPE-100 hPE-100 class="login-form-content-box">
    <el-form ref="ruleFormRef" :rules="rules" class="login-form-content" :model="loginForm" ml-53 mr-56>
      <el-form-item mt-48 prop="userName">
        <el-input
          v-model.trim="loginForm.userName" class="login-input" placeholder="请输入用户名"
          @keyup.enter.exact="submitForm(ruleFormRef)"
        >
          <template #prepend>
            <el-image w-26px h-26px :src="userNameIcon" fit="fill" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item mt-48 prop="passWord">
        <el-input
          v-model.trim="loginForm.passWord" type="password" placeholder="请输入用户密码" class="login-input"
          @keyup.enter.exact="submitForm(ruleFormRef)"
        >
          <template #prepend>
            <el-image w-26px h-26px :src="passWordIcon" fit="fill" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item mt-25 class="forget-pass-box">
        <span
          fs-16 fw-400 flex cross-axis-center flex-row-end color="#1AD1FF" lh-42 cursor-p
          @click="openForgotPass"
        >忘记密码？</span>
      </el-form-item>
      <el-form-item mt-48>
        <el-button class="login-button" type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>

    <!-- <operate-dialog ref="operateDialogRef" :type="dialogType" :close="dialogCloseFun" /> -->
    <!-- <div class="enter-information" wPE-100 hPE-100 po-f pot-0 pol-0 flex-row-center cross-axis-center>
            <enter-information ref="enterInformationRef" :user-sign-tel="userSignTel" :user-sign-type="userSignType" />
          </div> -->

    <!-- <enter-information ref="enterInformationRef" :user-sign-tel="userSignTel" :user-sign-type="userSignType" /> -->
  </div>
</template>

<style lang="scss" scoped>
.login-form-content-box {

  :deep(.login-form-content) {
    .el-form-item {
      margin-bottom: 0;
    }

    .forget-pass-box {
      .el-form-item__content {
        display: flex;
        justify-content: flex-end;
      }

    }
  }

  .enter-information {
    pointer-events: none;
  }
}
</style>
