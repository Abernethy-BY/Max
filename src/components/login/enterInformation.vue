<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-02-02 10:37:02
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-02-02 15:17:30
 * @FilePath: \big-screen\src\components\login\enterInformation.vue
 * @Description:
 * Copyright (c) 2023 by ${git_name} email: ${git_email}, All Rights Reserved.
-->

<script lang="ts" setup>
import closeIcon from '~/assets/image/login/closeIcon.png'
import headerBg from '~/assets/image/login/headerBg.png'
import type { ENTER_INFORMATION_MODEL } from '~/model'
import prompt from '~/assets/image/login/prompt.png'

/**
 * @description: userSignTel 手机号、userSignType 用户类型
 */
const propObj = withDefaults(defineProps<{ userSignTel: string; userSignType: string; openId?: string }>(), { userSignTel: '', userSignType: '', openId: '' })

// const

/**
 * @description: 角色权限字典
 */
const userRoleDictionary: Map<string, string[]> = new Map()
userRoleDictionary.set('企业', ['region', 'companyName', 'companyCreditCode', 'contact', 'mobileNumber', 'mailBox'])
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
const openPop = (): void => {
  enterInformationFlag.value = true
}

/**
 * @description: 下一步方法 --- 表单校验
 * @return {void}
 */
const nextFun = (): void => {
  consola.info('下一步')
}

/**
 * @description: 表单数据
 */
const enterInformationForm = ref<ENTER_INFORMATION_MODEL>({ provinceArr: [], unitname: '', unittax: '', linkman: '', linkmantel: '', email: '' })

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

/**
 * @description: 区域提示信息显示标识
 */
const provinceShowFlag = ref<boolean>(false)

/**
 * @description: 企业名称提示信息显示标识
 */
const unitNameShowFlag = ref<boolean>(false)

/**
 * @description: 企业信用代码提示显示标识
 */
const creditCodeShowFlag = ref<boolean>(false)

/**
 * @description: 联系人提示显示标识
 */
const contactShowFlag = ref<boolean>(false)

/**
 * @description: 手机号码提示显示标识
 */
const phoneNumberShowFlag = ref<boolean>(false)

/**
 * @description: 邮箱提示显示标识
 */
const mailboxShowFlag = ref<boolean>(false)

/**
 * @description: 控制标签显示方法
 * @param {string} labelFlag 标签标识
 * @return {boolean}
 */
const controlsDisplay = (labelFlag: string): boolean => (userRoleDictionary.get(propObj.userSignTel) || []).includes(labelFlag)

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
          <!-- 地区 region -->
          <el-form-item v-if="controlsDisplay('region')" label="所在省份：">
            <el-cascader
              v-model.trim="enterInformationForm.provinceArr" popper-class="enter-information-pop" :props="props"
              placeholder="请选择"
            />
            <div v-show="provinceShowFlag" class="remark-box">
              <el-image class="remark-icon" :src="prompt" fit="cover" />
              <span ref="provinceRef" class="form-remark">请选择区域</span>
            </div>
          </el-form-item>
          <!-- 公司名称 companyName -->
          <el-form-item v-if="controlsDisplay('companyName')" label="企业名称：">
            <el-input v-model.trim="enterInformationForm.unitname" placeholder="请输入工商注册的企业名称" />
            <div v-show="unitNameShowFlag" class="remark-box">
              <el-image class="remark-icon" :src="prompt" fit="cover" />
              <span ref="businessNameRef" class="form-remark">请输入企业名称</span>
            </div>
          </el-form-item>
          <!-- 企业信用代码 companyCreditCode -->
          <el-form-item v-if="controlsDisplay('companyCreditCode')" label="企业信用代码：">
            <el-input v-model.trim="enterInformationForm.unittax" placeholder="请输入企业信用代码" />
            <div v-show="creditCodeShowFlag" class="remark-box">
              <el-image class="remark-icon" :src="prompt" fit="cover" />
              <span ref="creditCodeRef" class="form-remark">请输入你的企业信用代码</span>
            </div>
          </el-form-item>
          <!-- 联系人 contact -->
          <el-form-item v-if="controlsDisplay('contact')" label="联系人：">
            <el-input v-model.trim="enterInformationForm.linkman" placeholder="请输入联系人" />
            <div v-show="contactShowFlag" class="remark-box">
              <el-image class="remark-icon" :src="prompt" fit="cover" />
              <span ref="contactRef" class="form-remark">请输入联系人</span>
            </div>
          </el-form-item>
          <!-- 手机号码 mobileNumber -->
          <el-form-item v-if="controlsDisplay('contact')" label="手机号码：">
            <el-input v-model.trim="enterInformationForm.linkmantel" placeholder="必须是13或15打头" />
            <div v-show="phoneNumberShowFlag" class="remark-box">
              <el-image class="remark-icon" :src="prompt" fit="cover" />
              <span ref="phoneNumberRef" class="form-remark">请输入你的手机号</span>
            </div>
          </el-form-item>
          <!-- 邮箱  mailBox -->
          <el-form-item v-if="controlsDisplay('mailBox')" label="邮箱：">
            <el-input v-model.trim="enterInformationForm.email" type="email" placeholder="XX@X.X(用于找回密码)" />
            <div v-show="mailboxShowFlag" class="remark-box">
              <el-image class="remark-icon" :src="prompt" fit="cover" />
              <span ref="MailboxRef" class="form-remark">请输入你的邮箱</span>
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
