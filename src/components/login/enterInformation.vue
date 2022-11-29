<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-21 19:56:20
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-29 17:36:45
 * @FilePath: \big-screen\src\components\login\enterInformation.vue
 * @Description:信息录入
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import closeIcon from '~/assets/image/login/closeIcon.png'
import headerBg from '~/assets/image/login/headerBg.png'
import prompt from '~/assets/image/login/prompt.png'

const propObj = withDefaults(defineProps<{ userSignTel: string; userSignType: string }>(), { userSignTel: '', userSignType: '' })
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
    refMap.set('unitname', businessNameRef.value)
    refMap.set('unitaddr', registeredAddressRef.value)
    refMap.set('unittel', officePhoneRef.value)
    refMap.set('unittax', creditCodeRef.value)
    refMap.set('linkman', contactRef.value)
    refMap.set('linkmantel', phoneNumberRef.value)
    refMap.set('email', MailboxRef.value)
  })
}

defineExpose({ openPop })

/**
 * @description: 表单对象
 */
const enterInformationForm = ref({
  provinceArr: [],
  unitname: '',
  unitaddr: '',
  unittel: '',
  unittax: '',
  linkman: '',
  linkmantel: '',
  email: '',
  province: '',
  city: '',
  county: '',
})

/**
 * @description: 权限字典
 */
const permissionsMap = new Map()
permissionsMap.set('工信厅', [])
permissionsMap.set('工信局', ['province'])
permissionsMap.set('园区管委会', ['province', 'city'])
permissionsMap.set('园区专员', ['province', 'city'])
permissionsMap.set('企业', ['province', 'city'])

/**
 * @description: 省份连级选择器数据获取方法
 * @return {*}
 */
const props = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const { label } = node
    try {
      const param = {
        key: '79848c3f3fbd1e9321efb5408c3c4a31',
        keywords: label || '中国',
        subdistrict: 1,
        sig: '',
      }
      param.sig = md5(`key=79848c3f3fbd1e9321efb5408c3c4a31&keywords=${param.keywords}&subdistrict=1cef67f7186b4debe1f9dd24dec1141a4`)
      const res: any = await district(param)
      if (res.status !== '1')
        throw new Error('地区服务器错误请刷新重试')

      const temp = res?.districts?.[0]?.districts
      const nodes = temp.map(e => ({ value: e.adcode, label: e.name, leaf: !permissionsMap.get(propObj.userSignType)?.includes(e.level) }))
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
const nextFun = async () => {
  try {
    let formNullFlag = false

    let userinfoinputParam = {}
    if (propObj.userSignType === '工信厅') {
      const { city, county, ...param } = enterInformationForm.value
      userinfoinputParam = param
    }
    else if (propObj.userSignType === '工信局') {
      const { county, ...param } = enterInformationForm.value
      userinfoinputParam = param
    }
    else {
      userinfoinputParam = enterInformationForm.value
    }

    consola.info(userinfoinputParam)
    Object.keys(userinfoinputParam).forEach((element, index) => {
      if (!userinfoinputParam[element] || userinfoinputParam[element] === '') {
        anime({ targets: refMap.get(element), color: '#ff4757', round: 1, easing: 'linear', duration: 300 })
        formNullFlag = true
      }

      if (element === 'provinceArr' && (!userinfoinputParam[element] || userinfoinputParam[element].length === 0)) {
        anime({ targets: refMap.get('province'), color: '#ff4757', round: 1, easing: 'linear', duration: 300 })
        formNullFlag = true
      }
    })
    if (formNullFlag)
      throw new Error('未填必须项')

    const submitid = new Date().getTime()
    const sign = md5(`${submitid}${propObj.userSignTel}123789`)

    await userinfoinput({ ...enterInformationForm.value, submitid, sign })
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
const provinceShowFlag = computed(() => enterInformationForm.value.provinceArr.length === 0)

/**
 * @description: 公司名称显示标识
 */
const unitNameShowFlag = computed(() => !enterInformationForm.value.unitname || enterInformationForm.value.unitname === '')

/**
 * @description: 注册地址：提示显示标识
 */
const registeredAddressShowFlag = computed(() => !enterInformationForm.value.unitaddr || enterInformationForm.value.unitaddr === '')

/**
 * @description: 公司办公电话：提示显示标识
 */
const officePhoneShowFlag = computed(() => !enterInformationForm.value.unittel || enterInformationForm.value.unittel === '')

/**
 * @description: 企业信用代码：提示显示标识
 */
const creditCodeShowFlag = computed(() => !enterInformationForm.value.unittax || enterInformationForm.value.unittax === '')

/**
 * @description: 联系人：提示显示标识
 */
const contactShowFlag = computed(() => !enterInformationForm.value.linkman || enterInformationForm.value.linkman === '')

/**
 * @description: 手机号码：提示显示标识
 */
const phoneNumberShowFlag = computed(() => !enterInformationForm.value.linkmantel || enterInformationForm.value.linkmantel === '')

/**
 * @description:邮箱：提示显示标识
 */
const MailboxShowFlag = computed(() => !enterInformationForm.value.email || enterInformationForm.value.email === '')

/**
 * @description: 弹窗关闭方法
 * @return {*}
 */
const closePop = () => {
  enterInformationFlag.value = false
}

const provinceChange = async (e) => {
  try {
    if (e[0]) {
      const param = { key: '79848c3f3fbd1e9321efb5408c3c4a31', keywords: e[0], subdistrict: 0, sig: '' }
      param.sig = md5(`key=79848c3f3fbd1e9321efb5408c3c4a31&keywords=${e[0]}&subdistrict=0cef67f7186b4debe1f9dd24dec1141a4`)
      const provinceRes: any = await district(param)
      const temp = provinceRes.districts
      enterInformationForm.value.province = temp[0].name
    }

    if (e[1]) {
      const param = { key: '79848c3f3fbd1e9321efb5408c3c4a31', keywords: e[1], subdistrict: 0, sig: '' }
      param.sig = md5(`key=79848c3f3fbd1e9321efb5408c3c4a31&keywords=${e[1]}&subdistrict=0cef67f7186b4debe1f9dd24dec1141a4`)
      const cityRes: any = await district(param)
      const temp = cityRes.districts
      enterInformationForm.value.province = temp[0].name
    }

    if (e[2]) {
      const param = { key: '79848c3f3fbd1e9321efb5408c3c4a31', keywords: e[2], subdistrict: 0, sig: '' }
      param.sig = md5(`key=79848c3f3fbd1e9321efb5408c3c4a31&keywords=${e[2]}&subdistrict=0cef67f7186b4debe1f9dd24dec1141a4`)
      const countyRes: any = await district(param)
      const temp = countyRes.districts
      enterInformationForm.value.province = temp[0].name
    }
  }
  catch (error) {
    consola.fatal(error)
    throw new Error('地区服务器错误请刷新重试')
  }
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
      <!-- 企业 -->
      <el-form
        v-if="propObj.userSignType === '企业'" class="enter-information-form" :model="enterInformationForm"
        label-width="220px" label-position="left"
      >
        <el-form-item label="所在省份：">
          <el-cascader
            v-model="enterInformationForm.provinceArr" popper-class="enter-information-pop" :props="props"
            placeholder="请选择" @change="provinceChange"
          />
          <div v-show="provinceShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="provinceRef" class="form-remark">请选择区域</span>
          </div>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input v-model="enterInformationForm.unitname" placeholder="请输入工商注册的企业名称" />
          <div v-show="unitNameShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="businessNameRef" class="form-remark">请输入企业名称</span>
          </div>
        </el-form-item>
        <el-form-item label="企业信用代码：">
          <el-input v-model="enterInformationForm.unittax" placeholder="请输入企业信用代码" />
          <div v-show="creditCodeShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="creditCodeRef" class="form-remark">请输入你的企业信用代码</span>
          </div>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="enterInformationForm.linkman" placeholder="请输入联系人" />
          <div v-show="contactShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="contactRef" class="form-remark">请输入联系人</span>
          </div>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="enterInformationForm.linkmantel" placeholder="必须是13或15打头" />
          <div v-show="phoneNumberShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="phoneNumberRef" class="form-remark">请输入你的手机号</span>
          </div>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="enterInformationForm.email" placeholder="XX@X.X(用于找回密码)" />
          <div v-show="MailboxShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="MailboxRef" class="form-remark">请输入你的邮箱</span>
          </div>
        </el-form-item>
      </el-form>
      <!-- 园区专员 -->
      <el-form
        v-else-if="propObj.userSignType === '园区专员'" class="enter-information-form" :model="enterInformationForm"
        label-width="220px" label-position="left"
      >
        <el-form-item label="所在省份：">
          <el-cascader
            v-model="enterInformationForm.provinceArr" popper-class="enter-information-pop" :props="props"
            placeholder="请选择" @change="provinceChange"
          />
          <div v-show="provinceShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="provinceRef" class="form-remark">请选择区域</span>
          </div>
        </el-form-item>
        <el-form-item label="园区名称：">
          <el-input v-model="enterInformationForm.unitname" placeholder="请输入园区名称" />
          <div v-show="unitNameShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="businessNameRef" class="form-remark">请输入园区名称</span>
          </div>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="enterInformationForm.linkman" placeholder="请输入联系人" />
          <div v-show="contactShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="contactRef" class="form-remark">请输入联系人</span>
          </div>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="enterInformationForm.linkmantel" placeholder="必须是13或15打头" />
          <div v-show="phoneNumberShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="phoneNumberRef" class="form-remark">请输入你的手机号</span>
          </div>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="enterInformationForm.email" placeholder="XX@X.X(用于找回密码)" />
          <div v-show="MailboxShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="MailboxRef" class="form-remark">请输入你的邮箱</span>
          </div>
        </el-form-item>
      </el-form>
      <!-- 园区管理员 -->
      <el-form
        v-else-if="propObj.userSignType === '园区管理员'" class="enter-information-form" :model="enterInformationForm"
        label-width="220px" label-position="left"
      >
        <el-form-item label="所在省份：">
          <el-cascader
            v-model="enterInformationForm.provinceArr" popper-class="enter-information-pop" :props="props"
            placeholder="请选择" @change="provinceChange"
          />
          <div v-show="provinceShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="provinceRef" class="form-remark">请选择区域</span>
          </div>
        </el-form-item>
        <el-form-item label="园区名称：">
          <el-input v-model="enterInformationForm.unitname" placeholder="请输入园区名称" />
          <div v-show="unitNameShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="businessNameRef" class="form-remark">请输入园区名称</span>
          </div>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="enterInformationForm.linkman" placeholder="请输入联系人" />
          <div v-show="contactShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="contactRef" class="form-remark">请输入联系人</span>
          </div>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="enterInformationForm.linkmantel" placeholder="必须是13或15打头" />
          <div v-show="phoneNumberShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="phoneNumberRef" class="form-remark">请输入你的手机号</span>
          </div>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="enterInformationForm.email" placeholder="XX@X.X(用于找回密码)" />
          <div v-show="MailboxShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="MailboxRef" class="form-remark">请输入你的邮箱</span>
          </div>
        </el-form-item>
      </el-form>
      <!-- 工信局 -->
      <el-form
        v-else-if="propObj.userSignType === '工信局'" class="enter-information-form" :model="enterInformationForm"
        label-width="220px" label-position="left"
      >
        <el-form-item label="所在省份：">
          <el-cascader
            v-model="enterInformationForm.provinceArr" popper-class="enter-information-pop" :props="props"
            placeholder="请选择" @change="provinceChange"
          />
          <div v-show="provinceShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="provinceRef" class="form-remark">请选择区域</span>
          </div>
        </el-form-item>
        <el-form-item label="单位名称：">
          <el-input v-model="enterInformationForm.unitName" placeholder="请输入单位名称" />
          <div v-show="unitNameShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="businessNameRef" class="form-remark">请输入单位名称</span>
          </div>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="enterInformationForm.linkman" placeholder="请输入联系人" />
          <div v-show="contactShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="contactRef" class="form-remark">请输入联系人</span>
          </div>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="enterInformationForm.linkmantel" placeholder="必须是13或15打头" />
          <div v-show="phoneNumberShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="phoneNumberRef" class="form-remark">请输入你的手机号</span>
          </div>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="enterInformationForm.email" placeholder="XX@X.X(用于找回密码)" />
          <div v-show="MailboxShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="MailboxRef" class="form-remark">请输入你的邮箱</span>
          </div>
        </el-form-item>
      </el-form>
      <!-- 工信厅 -->
      <el-form
        v-else-if="propObj.userSignType === '工信厅'" class="enter-information-form" :model="enterInformationForm"
        label-width="220px" label-position="left"
      >
        <el-form-item label="所在省份：">
          <el-cascader
            v-model="enterInformationForm.provinceArr" popper-class="enter-information-pop" :props="props"
            placeholder="请选择" @change="provinceChange"
          />
          <div v-show="provinceShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="provinceRef" class="form-remark">请选择区域</span>
          </div>
        </el-form-item>
        <el-form-item label="单位名称：">
          <el-input v-model="enterInformationForm.unitName" placeholder="请输入单位名称" />
          <div v-show="unitNameShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="businessNameRef" class="form-remark">请输入园区名称</span>
          </div>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="enterInformationForm.linkman" placeholder="请输入联系人" />
          <div v-show="contactShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="contactRef" class="form-remark">请输入联系人</span>
          </div>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="enterInformationForm.linkmantel" placeholder="必须是13或15打头" />
          <div v-show="phoneNumberShowFlag" class="remark-box">
            <el-image class="remark-icon" :src="prompt" fit="cover" />
            <span ref="phoneNumberRef" class="form-remark">请输入你的手机号</span>
          </div>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="enterInformationForm.email" placeholder="XX@X.X(用于找回密码)" />
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

