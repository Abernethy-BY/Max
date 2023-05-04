<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-02-02 10:37:02
 * @LastEditors: Abernethy-BY by15242952083@outlook.com
 * @LastEditTime: 2023-05-04 20:05:00
 * @FilePath: \big-screen\src\components\login\enterInformation.vue
 * @Description:
 * Copyright (c) 2023 by ${git_name} email: ${git_email}, All Rights Reserved.
-->

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { ElMessage } from 'element-plus'
import closeIcon from '~/assets/image/login/closeIcon.png'
import headerBg from '~/assets/image/login/headerBg.png'
import type { ENTER_INFORMATION_MODEL } from '~/model'
import prompt from '~/assets/image/login/prompt.png'
import type { USER_ROLE_TYPE } from '~/model/login'

let userInfo = $ref<{ userSignTel: string; userSignType: USER_ROLE_TYPE }>({ userSignTel: '', userSignType: '企业' })
/**
 * @description: 弹窗弹出显示标识
 */
const enterInformationFlag = ref<boolean>(false)

/**
 * @description: 弹窗关闭方法
 * @return {void}
 */
const closePop = (): void => {
  enterInformationFlag.value = false
}

/**
 * @description: 弹窗弹出方法
 * @return {void}
 */
const openPop = (param): void => {
  userInfo = param
  enterInformationFlag.value = true
}

/**
 * @description: 地区提示节点
 */
const provinceRemarkRef = $ref<HTMLAttributes>()

/**
 * @description: 企业名称提示节点
 */
const unitNameRemarkRef = $ref<HTMLAttributes>()

/**
 * @description: 企业信用代码提示节点
 */
const creditCodeRemarkRef = $ref<HTMLAttributes>()

/**
 * @description: 联系人提示节点
 */
const contactRemarkRef = $ref<HTMLAttributes>()

/**
 * @description: 联系方式提示节点
 */
const phoneNumberRemarkRef = $ref<HTMLAttributes>()

/**
 * @description: 邮箱提示节点
 */
const MailboxRemarkRef = $ref<HTMLAttributes>()

/**
 * @description: 表单对象
 */
const enterInformationForm = $ref<ENTER_INFORMATION_MODEL>({
  provinceArr: [],
  unitname: '',
  unittax: '',
  linkman: '',
  linkmantel: '',
  email: '',
})

/**
 * @description: 表单校验方法
 * @return {Promise<void> }
 */
const nextFun = async (): Promise<void> => {
  try {
    const errorRef = [provinceRemarkRef, unitNameRemarkRef, creditCodeRemarkRef, contactRemarkRef, phoneNumberRemarkRef, MailboxRemarkRef].filter(e => e)
    if (errorRef.length !== 0) {
      anime({ targets: errorRef, color: '#ff4757', easing: 'linear', round: 10, duration: 300 })
      return
    }

    const provinceTemp = enterInformationForm.provinceArr
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
    const sign = md5(`${submitid}${userInfo.userSignTel}123789`)

    await userinfoinput({ ...enterInformationForm, submitid, sign, province, city, county, tel: userInfo.userSignTel })
    ElMessage({ message: '资料录入成功，请等待审核', type: 'success' })

    closePop()
  }
  catch (error) {
    ElMessage({ message: error, type: 'error' })
  }
}

/**
 * @description: 获取省市区数据方法
 * @return {*}
 */
const props = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const { label } = node
    try {
      const res = await getProvinces(label, userInfo.userSignType)
      resolve(res)
    }
    catch (error) {
      ElMessage({ message: error, type: 'error' })
    }
  },
}

/**
 * @description: 地区选择消息标识
 */
const provinceShowFlag = computed(() => !enterInformationForm.provinceArr || enterInformationForm.provinceArr.length === 0)

const provinceLabelMap: Map<USER_ROLE_TYPE, string> = new Map()
  .set('企业', '请选择省市区')
  .set('园区专员', '请选择省市区')
  .set('园区管理员', '请选择省市区')
  .set('工信局', '请选择省市')
  .set('工信厅', '请选择省')
/**
 * @description: 地区选择器label占位符
 */
const provinceLabel = computed(() => provinceLabelMap.get(userInfo.userSignType))

/**
 * @description: 企业名称消息标识
 */
const unitNameShowFlag = computed(() => !enterInformationForm.unitname || enterInformationForm.unitname === '')

/**
 * @description: 企业名称权限列表
 */
const unitNameLabelMap: Map<USER_ROLE_TYPE, string> = new Map()
  .set('企业', '企业名称')
  .set('园区专员', '园区名称')
  .set('园区管理员', '园区名称')
  .set('工信局', '单位名称')
  .set('工信厅', '单位名称')

/**
 * @description: 企业名称权限显示标识
 */
const unitNameLabel = computed(() => unitNameLabelMap.get(userInfo.userSignType))

/**
 * @description: 企业名称占位符字典
 */
const unitNamePlaceHolderMap: Map<USER_ROLE_TYPE, string> = new Map()
  .set('企业', '请输入工商注册的企业名称')
  .set('园区专员', '请输入园区名称')
  .set('园区管理员', '请输入园区名称')
  .set('工信局', '请输入单位名称')
  .set('工信厅', '请输入单位名称')

/**
 * @description: 名称占位符
 */
const unitNamePlaceHolder = computed(() => unitNamePlaceHolderMap.get(userInfo.userSignType))

/**
 * @description: 企业信用代码提示消息
 */
const businessCreditCodeReg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/

/**
 * @description: 统一社会代码文本
 */
const creditCodeRemake = computed(() => {
  if (!enterInformationForm.unittax || enterInformationForm.unittax === '')
    return '请输入你的企业信用代码'
  else if (!businessCreditCodeReg.test(enterInformationForm.unittax))
    return '请输入正确的企业信用代码'
  else
    return ''
})

/**
 * @description: 社会信用代码提示标识
 */
const creditCodeShowFlag = computed(() => !enterInformationForm.unittax || !businessCreditCodeReg.test(enterInformationForm.unittax))

/**
 * @description: 联系人提示标识
 */
const contactShowFlag = computed(() => !enterInformationForm.linkman || enterInformationForm.linkman === '')

const telReg = /^[1][3,4,5,7,8][0-9]{9}$/
/**
 * @description: 手机号码提示标识
 */
const phoneNumberShowFlag = computed(() => !enterInformationForm.linkmantel || !telReg.test(enterInformationForm.linkmantel))

/**
 * @description: 手机号码提示文本
 */
const phoneNumberRemark = computed(() => {
  if (!enterInformationForm.linkmantel || enterInformationForm.linkmantel === '')
    return '请输入手机号码'
  else if (!businessCreditCodeReg.test(enterInformationForm.linkmantel))
    return '请输入正确的手机号码'
  else
    return ''
})

/**
 * @description: 邮箱校验正则
 */
const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/

/**
 * @description: 邮箱提示标识
 */
const MailboxShowFlag = computed(() => !enterInformationForm.email || !emailReg.test(enterInformationForm.email))

/**
 * @description: 邮箱提示文本
 */
const MailboxRemark = computed(() => {
  if (!enterInformationForm.email || enterInformationForm.email === '')
    return ' 请输入你的邮箱'
  else if (!emailReg.test(enterInformationForm.email))
    return ' 请输入正确的邮箱'
  else
    return ''
})
defineExpose({ openPop })
</script>

<template>
  <div
    v-if="enterInformationFlag" class="enter-information-box" z-10 wPE-100 hPE-100 po-f pot-0 pol-0 flex-row-center
    cross-axis-center
  >
    <div class="enter-information" flex flex-column-start wPE-52 hPE-88 po-r>
      <el-image class="close-icon" :src="closeIcon" fit="cover" @click="closePop" />
      <header mt-17 po-r flex flex-row-center cross-axis-center wPE-100>
        <el-image class="header-bg" :src="headerBg" fit="cover" />
        <span>录入企业、园区信息</span>
      </header>
      <main mt-26 flex-1>
        <el-form class="enter-information-form" :model="enterInformationForm" label-width="220px" label-position="left">
          <el-form-item :label="provinceLabel">
            <el-cascader
              v-model.trim="enterInformationForm.provinceArr" popper-class="enter-information-pop"
              :props="props" placeholder="请选择"
            />
            <div v-if="provinceShowFlag" class="remark-box">
              <el-image class="remark-icon" :src="prompt" fit="cover" />
              <span ref="provinceRemarkRef" class="form-remark">请选择区域</span>
            </div>
          </el-form-item>
          <el-form-item :label="unitNameLabel">
            <el-input v-model.trim="enterInformationForm.unitname" :placeholder="unitNamePlaceHolder" />
            <div v-if="unitNameShowFlag" class="remark-box">
              <el-image class="remark-icon" :src="prompt" fit="cover" />
              <span ref="unitNameRemarkRef" class="form-remark">请输入{{ unitNameLabel }}</span>
            </div>
          </el-form-item>
          <el-form-item v-if="userInfo.userSignType === '企业'" label="企业信用代码：">
            <el-input v-model.trim="enterInformationForm.unittax" placeholder="请输入企业信用代码" />
            <div v-if="creditCodeShowFlag" class="remark-box">
              <el-image class="remark-icon" :src="prompt" fit="cover" />
              <span ref="creditCodeRemarkRef" class="form-remark" v-text="creditCodeRemake" />
            </div>
          </el-form-item>
          <el-form-item label="联系人：">
            <el-input v-model.trim="enterInformationForm.linkman" placeholder="请输入联系人" />
            <div v-if="contactShowFlag" class="remark-box">
              <el-image class="remark-icon" :src="prompt" fit="cover" />
              <span ref="contactRemarkRef" class="form-remark">请输入联系人</span>
            </div>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model.trim="enterInformationForm.linkmantel" placeholder="必须是13或15打头" />
            <div v-if="phoneNumberShowFlag" class="remark-box">
              <el-image class="remark-icon" :src="prompt" fit="cover" />
              <span ref="phoneNumberRemarkRef" class="form-remark" v-text="phoneNumberRemark" />
            </div>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model.trim="enterInformationForm.email" type="email" placeholder="XX@X.X(用于找回密码)" />
            <div v-if="MailboxShowFlag" class="remark-box">
              <el-image class="remark-icon" :src="prompt" fit="cover" />
              <span ref="MailboxRemarkRef" class="form-remark" v-text="MailboxRemark" />
            </div>
          </el-form-item>
        </el-form>
      </main>
      <footer wPE-100 h-32px mt-34 flex flex-row-center mb-31>
        <el-button class="next-button" type="primary" @click="nextFun">
          下一步
        </el-button>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.enter-information-box {
  .enter-information {
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
}
</style>
