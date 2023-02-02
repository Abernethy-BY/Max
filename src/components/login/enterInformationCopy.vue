<script lang="ts" setup>
import type { DefineComponent } from 'vue'
import closeIcon from '~/assets/image/login/closeIcon.png'
import headerBg from '~/assets/image/login/headerBg.png'
import type { ENTER_INFORMATION_MODEL, FORM_DATA_MODEL } from '~/model'
import prompt from '~/assets/image/login/prompt.png'
const propObj = withDefaults(defineProps<{ userSignTel: string; userSignType: string }>(), { userSignTel: '', userSignType: '' })

const emit = defineEmits(['openPassLogin'])

/**
 * @description: 弹窗弹出标识
 */
const enterInformationFlag = ref<boolean>(false)

// openId
let openid: string | null = null

/**
 * @description: 弹窗弹出方法
 * @return {void}
 */
const closePop = (): void => {
  enterInformationFlag.value = false
}

/**
 * @description: 节点字典
 */
const refMap: Map<string, DefineComponent> = new Map()
/**
 * @description: 子表单节点
 */
const enterInformationRef = ref<DefineComponent>()
const parkCommissionerEnterInformationRef = ref<DefineComponent>()
const parkAdministratorEnterInformationRef = ref<DefineComponent>()
const BITEnterInformationRef = ref<DefineComponent>()
const DITEnterInformationRef = ref<DefineComponent>()

/**
 * @description: 弹窗弹出方法
 * @param {string} openId 用户openId
 * @return {void}
 */
const openPop = (openId?: string): void => {
  openId && (openid = openId)
  enterInformationFlag.value = true

  nextTick(() => {
    enterInformationRef.value && (refMap.set('企业', enterInformationRef.value))
    parkCommissionerEnterInformationRef.value && (refMap.set('园区专员', parkCommissionerEnterInformationRef.value))
    parkAdministratorEnterInformationRef.value && (refMap.set('园区管理员', parkAdministratorEnterInformationRef.value))
    BITEnterInformationRef.value && (refMap.set('工信局', BITEnterInformationRef.value))
    DITEnterInformationRef.value && (refMap.set('工信厅', DITEnterInformationRef.value))
  })
}
defineExpose({ openPop })

/**
 * @description: 下一步
 * @return {void}
 */
const nextFun = (): void => {
  refMap.get(propObj.userSignType)?.formValidation()
}

/**
 * @description: 打开密码登录页面
 * @return {void}
 */
const closeOperateDialogFun = (): void => {
  enterInformationFlag.value = false
  emit('openPassLogin')
}

const operateDialogRef = ref<DefineComponent>()

/**
 * @description: 表单提交方法
 * @param {FORM_DATA_MODEL} val 表单对象
 * @return {Promise<void>}
 */
const submitInformationFun = async (val: FORM_DATA_MODEL): Promise<void> => {
  try {
    const provinceTemp = val.provinceArr
    let province, city, county
    if (provinceTemp[0]) {
      const param = { key: '79848c3f3fbd1e9321efb5408c3c4a31', keywords: provinceTemp[0], subdistrict: 0, sig: '' }
      param.sig = md5(`key=79848c3f3fbd1e9321efb5408c3c4a31&keywords=${provinceTemp[0]}&subdistrict=0cef67f7186b4debe1f9dd24dec1141a4`)
      const provinceRes: any = await district(param)
      const temp = provinceRes.districts
      province = temp[0].name
    }
    if (provinceTemp[1]) {
      const param = { key: '79848c3f3fbd1e9321efb5408c3c4a31', keywords: provinceTemp[1], subdistrict: 0, sig: '' }
      param.sig = md5(`key=79848c3f3fbd1e9321efb5408c3c4a31&keywords=${provinceTemp[1]}&subdistrict=0cef67f7186b4debe1f9dd24dec1141a4`)
      const provinceRes: any = await district(param)
      const temp = provinceRes.districts
      city = temp[0].name
    }
    if (provinceTemp[2]) {
      const param = { key: '79848c3f3fbd1e9321efb5408c3c4a31', keywords: provinceTemp[2], subdistrict: 0, sig: '' }
      param.sig = md5(`key=79848c3f3fbd1e9321efb5408c3c4a31&keywords=${provinceTemp[2]}&subdistrict=0cef67f7186b4debe1f9dd24dec1141a4`)
      const provinceRes: any = await district(param)
      const temp = provinceRes.districts
      county = temp[0].name
    }
    const submitid = new Date().getTime()
    const sign = md5(`${submitid}${propObj.userSignTel}123789`)

    await userinfoinput({ ...val, submitid, sign, province, city, county, tel: propObj.userSignTel, openid })
    operateDialogRef.value?.openDialog()
  }
  catch (error) {
    consola.fatal(error)
    ElMessage({ message: error, type: 'error' })
  }
}

/**
 * @description: 表单数据
 */
const enterInformationForm = ref<ENTER_INFORMATION_MODEL>({ provinceArr: [], unitname: '', unittax: '', linkman: '', linkmantel: '', email: '' })

/**
 * @description: 提示显示标识
 */
const provinceShowFlag = computed(() => !enterInformationForm.value.provinceArr || enterInformationForm.value.provinceArr.length === 0)
const unitNameShowFlag = computed(() => !enterInformationForm.value.unitname || enterInformationForm.value.unitname === '')
const creditCodeShowFlag = computed(() => !enterInformationForm.value.unittax || enterInformationForm.value.unittax === '')
const contactShowFlag = computed(() => !enterInformationForm.value.linkman || enterInformationForm.value.linkman === '')
const phoneNumberShowFlag = computed(() => !enterInformationForm.value.linkmantel || enterInformationForm.value.linkmantel === '')
const MailboxShowFlag = computed(() => !enterInformationForm.value.email || enterInformationForm.value.email === '')

/**
 * @description: 省份连级选择器数据获取方法
 */
const props = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const { label } = node
    try {
      const res = await getProvinces(label, propObj.userSignType)
      resolve(res)
    }
    catch (error) {
      consola.fatal(error)
      ElMessage({ message: error, type: 'error' })
    }
  },
}
</script>

<template>
  <div v-if="enterInformationFlag" class="enter-information-box" flex flex-column-start wPE-52 hPE-88 po-r z-10>
    <el-image class="close-icon" :src="closeIcon" fit="cover" @click="closePop" />
    <header mt-17 po-r flex flex-row-center cross-axis-center wPE-100>
      <el-image class="header-bg" :src="headerBg" fit="cover" />
      <span>录入企业、园区信息</span>
    </header>
    <main mt-26 flex-1>
      <!-- <div v-if="propObj.userSignType === '企业'" w-100 h-100>
        <enterprise-enter-information ref="enterInformationRef" :user-role="propObj.userSignType" @submit-information="submitInformationFun" />
      </div>
      <div v-else-if="propObj.userSignType === '园区专员'" w-100 h-100>
        <park-commissioner-enter-information ref="parkCommissionerEnterInformationRef" :user-role="propObj.userSignType" @submit-information="submitInformationFun" />
      </div>
      <div v-else-if="propObj.userSignType === '园区管理员'" w-100 h-100>
        <park-administrator-enter-information ref="parkAdministratorEnterInformationRef" :user-role="propObj.userSignType" @submit-information="submitInformationFun" />
      </div>
      <div v-else-if="propObj.userSignType === '工信局'" w-100 h-100>
        <BIT-enter-information ref="BITEnterInformationRef" :user-role="propObj.userSignType" @submit-information="submitInformationFun" />
      </div>
      <div v-else-if="propObj.userSignType === '工信厅'" w-100 h-100>
        <DIT-enter-information ref="DITEnterInformationRef" :user-role="propObj.userSignType" @submit-information="submitInformationFun" />
      </div> -->

      <el-form class="enter-information-form" :model="enterInformationForm" label-width="220px" label-position="left">
        <el-form-item label="所在省份：">
          <el-cascader
            v-model.trim="enterInformationForm.provinceArr" popper-class="enter-information-pop"
            :props="props" placeholder="请选择"
          />
          <div v-show="provinceShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="provinceRef" class="form-remark">请选择区域</span>
          </div>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input v-model.trim="enterInformationForm.unitname" placeholder="请输入工商注册的企业名称" />
          <div v-show="unitNameShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="businessNameRef" class="form-remark">请输入企业名称</span>
          </div>
        </el-form-item>
        <el-form-item label="企业信用代码：">
          <el-input v-model.trim="enterInformationForm.unittax" placeholder="请输入企业信用代码" />
          <div v-show="creditCodeShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="creditCodeRef" class="form-remark">请输入你的企业信用代码</span>
          </div>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model.trim="enterInformationForm.linkman" placeholder="请输入联系人" />
          <div v-show="contactShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="contactRef" class="form-remark">请输入联系人</span>
          </div>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model.trim="enterInformationForm.linkmantel" placeholder="必须是13或15打头" />
          <div v-show="phoneNumberShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="phoneNumberRef" class="form-remark">请输入你的手机号</span>
          </div>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model.trim="enterInformationForm.email" type="email" placeholder="XX@X.X(用于找回密码)" />
          <div v-show="MailboxShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="MailboxRef" class="form-remark">请输入你的邮箱</span>
          </div>
        </el-form-item>
      </el-form>
    </main>
    <footer wPE-100 h-32 mt-34 flex flex-row-center mb-31>
      <el-button class="next-button" type="primary" @click="nextFun">
        下一步
      </el-button>
    </footer>
    <operate-dialog ref="operateDialogRef" type="SIGN_UP" :close="closeOperateDialogFun" />
  </div>
</template>

<style lang="scss" scoped>
.enter-information-box {
  background: rgba(2, 56, 152, 0.9);
  border: 1px solid #1A8BFF;
  border-radius: 7px;

  :deep(.close-icon) {
    width: 39px;
    height: 39px;
    position: absolute;
    top: 14px;
    right: 13px;
    z-index: 10;
    cursor: pointer;
  }

  header {
    :deep(.header-bg) {
      position: absolute;
      height: 10px;
      width: 60%;
      z-index: 1;
    }

    span {
      font-size: 21px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #1ADCFF;
      display: flex;
      line-height: 21px;
    }
  }
}
</style>
