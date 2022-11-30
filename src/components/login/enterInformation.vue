<script lang="ts" setup>
import closeIcon from '~/assets/image/login/closeIcon.png'
import headerBg from '~/assets/image/login/headerBg.png'
import type { FORM_DATA_MODEL } from '~/model'
const propObj = withDefaults(defineProps<{ userSignTel: string; userSignType: string }>(), { userSignTel: '', userSignType: '' })

const emit = defineEmits(['openPassLogin'])

/**
 * @description: 弹窗弹出标识
 */
const enterInformationFlag = ref<boolean>(false)

/**
 * @description: 弹窗弹出方法
 */
const closePop = () => {
  enterInformationFlag.value = false
}

/**
 * @description: 节点字典
 */
const refMap = new Map()
/**
 * @description: 子表单节点
 */
const enterInformationRef = ref()
const parkCommissionerEnterInformationRef = ref()
const parkAdministratorEnterInformationRef = ref()
const BITEnterInformationRef = ref()
const DITEnterInformationRef = ref()

/**
 * @description: 弹窗弹出方法
 * @return {*}
 */
const openPop = () => {
  enterInformationFlag.value = true

  nextTick(() => {
    refMap.set('企业', enterInformationRef.value)
    refMap.set('园区专员', parkCommissionerEnterInformationRef.value)
    refMap.set('园区管理员', parkAdministratorEnterInformationRef.value)
    refMap.set('工信局', BITEnterInformationRef.value)
    refMap.set('工信厅', DITEnterInformationRef.value)
  })
}
defineExpose({ openPop })

/**
 * @description: 下一步
 * @return {*}
 */
const nextFun = () => {
  refMap.get(propObj.userSignType).formValidation()
}

/**
 * @description: 打开密码登录页面
 * @return {*}
 */
const closeOperateDialogFun = () => {
  emit('openPassLogin')
}

const operateDialogRef = ref()

/**
 * @description: 表单提交方法
 * @param {FORM_DATA_MODEL} val 表单对象
 * @return {*}
 */
const submitInformationFun = async (val: FORM_DATA_MODEL) => {
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
    consola.info([submitid, sign, propObj.userSignTel])

    await userinfoinput({ ...val, submitid, sign, province, city, county })
    operateDialogRef.value.openDialog()
  }
  catch (error) {
    consola.fatal(error)
    ElMessage({ message: error, type: 'error' })
  }
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
      <div v-if="propObj.userSignType === '企业'" w-100 h-100>
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
      </div>
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
