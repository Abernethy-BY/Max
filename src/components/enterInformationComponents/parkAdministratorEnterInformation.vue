<script lang="ts" setup>
import type { ENTER_INFORMATION_MODEL } from '~/model'
import prompt from '~/assets/image/login/prompt.png'
const propObj = withDefaults(defineProps<{ userRole: string }>(), { userRole: '' })
const emit = defineEmits(['submitInformation'])

/**
 * @description: 表单对象
 * @return {*}
 */
const enterInformationForm = ref<ENTER_INFORMATION_MODEL>({
  provinceArr: [],
  unitname: '',
  linkman: '',
  linkmantel: '',
  email: '',
})

/**
 * @description: 提示显示标识
 * @return {*}
 */
const provinceShowFlag = computed(() => !enterInformationForm.value.provinceArr || enterInformationForm.value.provinceArr.length === 0)
const unitNameShowFlag = computed(() => !enterInformationForm.value.unitname || enterInformationForm.value.unitname === '')
const contactShowFlag = computed(() => !enterInformationForm.value.linkman || enterInformationForm.value.linkman === '')
const phoneNumberShowFlag = computed(() => !enterInformationForm.value.linkmantel || enterInformationForm.value.linkmantel === '')
const MailboxShowFlag = computed(() => !enterInformationForm.value.email || enterInformationForm.value.email === '')

/**
 * @description: 省份连级选择器数据获取方法
 * @return {*}
 */
const props = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const { label } = node
    try {
      const res = await getProvinces(label, propObj.userRole)
      resolve(res)
    }
    catch (error) {
      consola.info(error)
      ElMessage({ message: error, type: 'error' })
    }
  },
}

/**
 * @description: 选择地区提示文字节点
 */
const provinceRef = ref<HTMLElement>()
/**
 * @description: 园区名称提示文字节点
 */
const businessNameRef = ref<HTMLElement>()
/**
 * @description: 联系人提示文字节点
 */
const contactRef = ref<HTMLElement>()
/**
 * @description: 手机号码提示文字节点
 */
const phoneNumberRef = ref<HTMLElement>()
/**
 * @description: 邮箱提示显示文字节点
 */
const MailboxRef = ref<HTMLElement>()

/**
 * @description: 表单校验方法
 * @return {*}
 */
const formValidation = () => {
  const refMap = new Map()
  refMap.set('provinceArr', provinceRef.value)
  refMap.set('unitname', businessNameRef.value)
  refMap.set('linkman', contactRef.value)
  refMap.set('linkmantel', phoneNumberRef.value)
  refMap.set('email', MailboxRef.value)
  if (formVerify(toRaw(enterInformationForm.value), refMap))
    return
  emit('submitInformation', toRaw(enterInformationForm.value))
}

defineExpose({ formValidation })
</script>

<template>
  <div class="park-administrator-enter-information-box" w-100 h-100>
    <el-form class="enter-information-form" :model="enterInformationForm" label-width="220px" label-position="left">
      <el-form-item label="所在省份：">
        <el-cascader
          v-model="enterInformationForm.provinceArr" popper-class="enter-information-pop" :props="props"
          placeholder="请选择"
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
        <el-input v-model="enterInformationForm.email" type="email" placeholder="XX@X.X(用于找回密码)" />
        <div v-show="MailboxShowFlag" class="remark-box">
          <el-image class="remark-icon" :src="prompt" fit="cover" />
          <span ref="MailboxRef" class="form-remark">请输入你的邮箱</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
