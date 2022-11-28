<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-24 16:09:53
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-28 16:05:27
 * @FilePath: \big-screen\src\components\dialog\operateDialog.vue
 * @Description: 注册成功弹窗
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import closeIcon from '~/assets/image/common/closeIcon.png'

const propObj = withDefaults(defineProps<{ type: string; close?: Function; confirm?: Function }>(), { type: '', close: () => { }, confirm: () => { } })

/**
 * @description: 弹窗标识
 */
const dialogFlag = ref<boolean>(false)

/**
 * @description: 弹窗弹出方法
 * @return {*}
 */
const openDialog = () => {
  dialogFlag.value = true
}

/**
 * @description: 弹窗关闭方法
 * @return {*}
 */
const closeIconFun = () => {
  dialogFlag.value = false
  propObj.close()
}

/**
 * @description: 确认方法
 * @return {*}
 */
const confirmFun = () => {
  dialogFlag.value = false
  propObj.confirm()
  propObj.close()
}

defineExpose({ openDialog })

/**
 * @description: 用户协议标识
 */
const agreementFlag = ref<boolean>(false)

/**
 * @description:同意协议文字节点
 */
const userAgreementRef = ref()

/**
 * @description: 用户协议选中切换方法
 * @param {*} val 切换标识
 * @return {*}
 */
const checkboxChangeFun = (val) => {
  if (agreementFlag.value)
    anime({ targets: userAgreementRef.value, color: '#0D96CC', round: 1, easing: 'linear', duration: 300 })
}

/**
 * @description: 用户协议下一步方法
 * @return {*}
 */
const userAgreementNext = () => {
  if (!agreementFlag.value) {
    anime({ targets: userAgreementRef.value, color: '#ff4757', round: 1, easing: 'linear', duration: 300 })
    return
  }
  dialogFlag.value = false
  propObj.confirm()
  propObj.close()
}

/**
 * @description: 审核失败返回修改方法
 * @return {*}
 */
const closeAuditFailed = () => {
  dialogFlag.value = false
  propObj.confirm()
  propObj.close()
}
</script>

<template>
  <!-- 登录成功 -->
  <div
    v-if="dialogFlag" class="registration-successful-box" w-100 h-100 flex-row-center cross-axis-center po-f pot-0
    pol-0
  >
    <div
      v-if="propObj.type === 'LOGIN'" flex flex-column-start cross-axis-center w-480px h-244px
      class="registration-successful" pt-30 pb-22 po-r
    >
      <el-image class="close-icon" :src="closeIcon" fit="fill" @click="closeIconFun" />
      <span class="pop-span" color="#05FFFF" fs-24>恭喜您，登录成功</span>
      <el-button br-4 color="#1ADCFF" class="confirm-button" @click="confirmFun">
        确定
      </el-button>
    </div>

    <!-- 注册成功 -->
    <div
      v-else-if="propObj.type === 'SIGN_UP'" flex flex-column-start cross-axis-center w-480px h-244px
      class="registration-successful" pt-30 pb-22 po-r
    >
      <el-image class="close-icon" :src="closeIcon" fit="fill" @click="closeIconFun" />
      <span class="pop-span" color="#05FFFF" fs-24>恭喜您，注册成功</span>
      <el-button br-4 color="#1ADCFF" class="confirm-button" @click="confirmFun">
        现在登录
      </el-button>
    </div>

    <!-- 用户协议 -->
    <div
      v-else-if="propObj.type === 'USER_AGREEMENT'" class="user-agreement" po-r w-1201px h-751px flex-column-start
      padding-0-58px
    >
      <el-image class="user-agreement-close-icon" :src="closeIcon" fit="fill" @click="closeIconFun" />
      <span class="user-agreement-title">
        企业备案须知
      </span>
      <span class="user-agreement-content">
        <span>为配合甘肃省水利厅加强对全省水利工程建设市场的规范管理，共同维护全省水利工程建设市场秩序，现就有关网上备案事宜要求如下:</span>

        <span>1、企业在自愿申请市场告知性备案中提供的所有资料均是真实有效的，无虚假和制假资料。</span>

        <span>2、企业所委派人员均为本企业正式聘任的工作人员或执业人员，其经营和执业中所发生的一切行为，均由本企业负责。</span>

        <span>3、企业在甘从事水利工程建设项目时不得涂改、倒卖、出租、出借或者以其他形式非法转让建筑业企业资质、资格证书;不得以分支机构、
          办事处名义对外经营，不允许他人挂靠以本企业的名义等方式从事执业活动。</span>

        <span>4、保证严格履行投标或承包经营承诺，确保执业人员持证上岗，人证相符，到岗履职。</span>

        <span>5、近三年来本企业未发生过住建部令第159号第二十-条所列的12种行为和第二+九条所列的4种情形。</span>

        <span>6、自愿接受和遵守相关水利行业协会的章程和行业自律公约。</span>

        <span> 以上内容不因企业法定代表人、主要技术负责人及其他有关事项的变更而改变，并自愿接受有关部门]及社会各界的监督，如有违反，自愿
          接受有关部]的依法处理，并承担相应后果。</span>
      </span>
      <div w-100 h-139px flex-row-center cross-axis-center po-r>
        <div class="user-agreement-checkbox">
          <el-checkbox v-model="agreementFlag" class="agreement" size="large" @change="checkboxChangeFun" />
          <span ref="userAgreementRef" class="pop-span">同意以上协议</span>
        </div>
        <el-button class="user-agreement-next-button" @click="userAgreementNext">
          下一步
        </el-button>
      </div>
    </div>

    <!-- 审核成功  Review successful -->
    <div v-else-if="propObj.type === 'REVIEW_SUCCESSFUL'" class="review-successful-box" w-500px h-364px>
      111
    </div>

    <div
      v-else-if="propObj.type === 'AUDIT_FAILED'" class="audit-failed-box" w-500px h-364px po-r flex-column-end
      cross-axis-center padding-0-0-32px-0
    >
      <el-image class="audit-failed-close-icon" :src="closeIcon" fit="fill" @click="closeIconFun" />
      <span class="pop-span">抱歉！审核不通过</span>

      <el-button class="audit-failed-button" @click="closeAuditFailed">
        返回修改
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.general-close-icon {
  width: 48px;
  height: 48px;
  position: absolute;
  top: 26px;
  right: 19px;
  z-index: 10;
  cursor: pointer;
}

.registration-successful-box {

  .registration-successful {
    background: no-repeat url("~/assets/image/pop/popBg.png");
    background-size: 100% 100%;

    :deep(.close-icon) {
      @extend .general-close-icon;
    }

    .pop-span {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    :deep(.confirm-button) {
      width: 317px;
      height: 53px;
      border: none;
      // margin-bottom: 22px;

      span {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #0A3D75;
        line-height: 33px;
      }
    }
  }

  .user-agreement {
    background: no-repeat url("~/assets/image/pop/userAgreementBg.png");
    background-size: 100% 100%;

    :deep(.user-agreement-close-icon) {
      @extend .general-close-icon;
    }

    .user-agreement-title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #1ADCFF;
      line-height: 91px;
    }

    .user-agreement-content {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #1ADCFF;
      line-height: 30px;
    }

    .user-agreement-checkbox {
      :deep(.agreement) {}

      span {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #0D96CC;
        line-height: 22px;
        margin-left: 9px;
      }
    }

    :deep(.user-agreement-next-button) {
      position: absolute;
      right: 0;
      width: 120px;
      height: 48px;
      background: #1ADCFF;
      border-radius: 4px;

      span {
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #02389B;
        line-height: 38px;
      }
    }
  }

  .review-successful-box {
    background: no-repeat url("~/assets/image/pop/reviewSuccessful.png");
    background-size: 100% 100%;
  }

  .audit-failed-box {
    background: no-repeat url("~/assets/image/pop/auditFailed.png");
    background-size: 100% 100%;

    :deep(.audit-failed-close-icon) {
      @extend .general-close-icon;
    }

    .pop-span {
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #05FFFF;
      line-height: 33px;
    }

    :deep(.audit-failed-button) {
      width: 317px;
      height: 44px;
      background: #1ADCFF;
      border-radius: 4px;
      margin-top: 35px;

      span {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #0A3D75;
        line-height: 33px;
      }
    }
  }

}
</style>
