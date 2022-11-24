<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-21 19:56:20
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-24 19:42:41
 * @FilePath: \big-screen\src\components\login\enterInformation.vue
 * @Description:信息录入
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import closeIcon from '~/assets/image/login/closeIcon.png'
import headerBg from '~/assets/image/login/headerBg.png'
import prompt from '~/assets/image/login/prompt.png'

const emit = defineEmits(['openPassLogin'])

/**
 * @description: 弹窗弹出标识
 */
const enterInformationFlag = ref<boolean>(false)

/**
 * @description:所在省份：节点
 */
const provinceRef = ref()

/**
 * @description: 企业名称：节点
 */
const businessNameRef = ref()

/**
 * @description: 注册地址：节点
 */
const registeredAddressRef = ref()

/**
 * @description: 公司办公电话：节点
 */
const officePhoneRef = ref()

/**
 * @description: 企业信用代码：节点
 */
const creditCodeRef = ref()

/**
 * @description: 联系人：节点
 */
const contactRef = ref()

/**
 * @description: 手机号码：节点
 */
const phoneNumberRef = ref()

/**
 * @description: 邮箱：节点
 */
const MailboxRef = ref()

/**
 * @description: 节点列表
 */
const refMap = new Map()

/**
 * @description: 弹窗弹出方法
 * @return {*}
 */
const openPop = () => {
  enterInformationFlag.value = true

  nextTick(() => {
    refMap.set('province', provinceRef.value)
    refMap.set('businessName', businessNameRef.value)
    refMap.set('registeredAddress', registeredAddressRef.value)
    refMap.set('officePhone', officePhoneRef.value)
    refMap.set('creditCode', creditCodeRef.value)
    refMap.set('contact', contactRef.value)
    refMap.set('phoneNumber', phoneNumberRef.value)
    refMap.set('Mailbox', MailboxRef.value)
  })
}

defineExpose({ openPop })

/**
 * @description: 表单对象
 */
const enterInformationForm = ref({
  province: [],
  businessName: '',
  registeredAddress: '',
  officePhone: '',
  creditCode: '',
  contact: '',
  phoneNumber: '',
  Mailbox: '',
  // Username: '',
  // pass: '',
  // rePass: '',
})

/**
 * @description: 省份连级选择器数据获取方法
 * @return {*}
 */
const props = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const { label } = node
    const leafArr = ['city', 'district']
    try {
      const param = {
        key: '79848c3f3fbd1e9321efb5408c3c4a31',
        keywords: label || '湖南',
        subdistrict: 1,
        sig: '',
      }
      param.sig = md5(`key=79848c3f3fbd1e9321efb5408c3c4a31&keywords=${param.keywords}&subdistrict=1cef67f7186b4debe1f9dd24dec1141a4`)
      const res: any = await district(param)
      if (res.status !== '1')
        throw new Error('地区服务器错误请刷新重试')

      const temp = res?.districts?.[0]?.districts
      const nodes = temp.map(e => ({ value: e.adcode, label: e.name, leaf: !leafArr.includes(e.level) }))
      resolve(nodes)
    }
    catch (error) {
      consola.info(error)
      ElMessage({ message: error, type: 'error' })
    }
  },
}

/**
 * @description: 注册成功弹窗标识
 */
const operateDialogRef = ref()

/**
 * @description: 下一步方法
 * @return {*}
 */
const nextFun = () => {
  try {
    let formNullFlag = false
    Object.keys(enterInformationForm.value).forEach((element, index) => {
      if (!enterInformationForm.value[element] || enterInformationForm.value[element] === '') {
        anime({ targets: refMap.get(element), color: '#ff4757', round: 1, easing: 'linear', duration: 300 })
        formNullFlag = true
      }

      else if (element === 'province' && (!enterInformationForm.value.province || enterInformationForm.value.province.length === 0)) {
        anime({ targets: refMap.get('province'), color: '#ff4757', round: 1, easing: 'linear', duration: 300 })
        formNullFlag = true
      }
    })
    if (formNullFlag)
      throw new Error('未填必须项')

    operateDialogRef.value.openDialog()
  }
  catch (error) {
    consola.fatal(error)
  }
}

/**
 * @description: 关闭弹窗回调方法
 * @return {*}
 */
const closeOperateDialogFun = () => {
  emit('openPassLogin')
}

/**
 * @description: 省份提示显示标识
 */
const provinceShowFlag = computed(() => enterInformationForm.value.province.length === 0)

/**
 * @description: 公司名称显示标识
 */
const businessNameShowFlag = computed(() => !enterInformationForm.value.businessName || enterInformationForm.value.businessName === '')

/**
 * @description: 注册地址：提示显示标识
 */
const registeredAddressShowFlag = computed(() => !enterInformationForm.value.registeredAddress || enterInformationForm.value.registeredAddress === '')

/**
 * @description: 公司办公电话：提示显示标识
 */
const officePhoneShowFlag = computed(() => !enterInformationForm.value.officePhone || enterInformationForm.value.officePhone === '')

/**
 * @description: 企业信用代码：提示显示标识
 */
const creditCodeShowFlag = computed(() => !enterInformationForm.value.creditCode || enterInformationForm.value.creditCode === '')

/**
 * @description: 联系人：提示显示标识
 */
const contactShowFlag = computed(() => !enterInformationForm.value.contact || enterInformationForm.value.contact === '')

/**
 * @description: 手机号码：提示显示标识
 */
const phoneNumberShowFlag = computed(() => !enterInformationForm.value.phoneNumber || enterInformationForm.value.phoneNumber === '')

/**
 * @description:邮箱：提示显示标识
 */
const MailboxShowFlag = computed(() => !enterInformationForm.value.Mailbox || enterInformationForm.value.Mailbox === '')

/**
 * @description: 弹窗关闭方法
 * @return {*}
 */
const closePop = () => {
  enterInformationFlag.value = false
}
</script>

<template>
  <div v-if="enterInformationFlag" flex flex-column-start wPE-52 hPE-88 po-r z-10 class="enter-information-box">
    <el-image class="close-icon" :src="closeIcon" fit="cover" @click="closePop" />
    <header mt-17 po-r flex flex-row-center cross-axis-center wPE-100>
      <el-image class="header-bg" :src="headerBg" fit="cover" />
      <span>录入企业、园区信息</span>
    </header>
    <main mt-26 flex-1>
      <el-form class="enter-information-form" :model="enterInformationForm" label-width="220px" label-position="left">
        <el-form-item label="所在省份：">
          <el-cascader
            v-model="enterInformationForm.province" popper-class="enter-information-pop" :props="props"
            placeholder="请选择"
          />
          <div v-show="provinceShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="provinceRef" class="form-remark">请选择区域</span>
          </div>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input v-model="enterInformationForm.businessName" placeholder="请输入工商注册的企业名称" />
          <div v-show="businessNameShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="businessNameRef" class="form-remark">请输入企业名称</span>
          </div>
        </el-form-item>
        <el-form-item label="注册地址：">
          <el-input v-model="enterInformationForm.registeredAddress" placeholder="请输入企业工商注册地址" />
          <div v-show="registeredAddressShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="registeredAddressRef" class="form-remark">请输入注册地址</span>
          </div>
        </el-form-item>
        <el-form-item label="公司办公电话：">
          <el-input v-model="enterInformationForm.officePhone" placeholder="请输入公司电话" />
          <div v-show="officePhoneShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="officePhoneRef" class="form-remark">请输入你的联系电话</span>
          </div>
        </el-form-item>
        <el-form-item label="企业信用代码：">
          <el-input v-model="enterInformationForm.creditCode" placeholder="请输入企业信用代码" />
          <div v-show="creditCodeShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="creditCodeRef" class="form-remark">请输入你的企业信用代码</span>
          </div>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="enterInformationForm.contact" placeholder="请输入联系人" />
          <div v-show="contactShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="contactRef" class="form-remark">请输入联系人</span>
          </div>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="enterInformationForm.phoneNumber" placeholder="必须是13或15打头" />
          <div v-show="phoneNumberShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="phoneNumberRef" class="form-remark">请输入你的手机号</span>
          </div>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="enterInformationForm.Mailbox" placeholder="XX@X.X(用于找回密码)" />
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

  main {}

  footer {
    :deep(.next-button) {
      width: 120px;
      height: 48px;
      background: #1ADCFF;
      border-radius: 4px;

      span {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #02389B;
        line-height: 25px;
      }
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: login
</route>

