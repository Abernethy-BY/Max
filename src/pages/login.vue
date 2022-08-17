<!--
 * @Author: By
 * @Date: 2022-08-13 16:25:51
 * @LastEditTime: 2022-08-17 18:11:14
 * @LastEditors: By
 * @Description:
 * @FilePath: \big-screen-vue3\src\pages\login.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script lang="ts" setup>
import handoffIcon from '~/assets/image/login/handoffIcon.png'

// 登录方式标识
const accountFlag = ref(true)

const loginType = ref('账号密码登录')
const handoffLoginTypeSpan = ref('短信快捷登录')

/**
 * @description: 登录方式切换方法
 * @return {*}
 */
const handoffLoginType = () => {
  accountFlag.value = !accountFlag.value
  loginType.value = accountFlag.value ? '账号密码登录' : '短信快捷登录'
  handoffLoginTypeSpan.value = accountFlag.value ? '短信快捷登录' : '账号密码登录'
}

// 登录表单
const loginForm = ref({ userName: '', passWord: '' })
</script>

<template>
  <div class="login-box">
    <div class="login-form" bg="#023CA7" pl-53 pt-47 pr-56 w-552 h-538 position-absolute pot-255 por-344 bw-1 bs-solid>
      <div flex flex-row-between>
        <span fs-24 fw-400 color="#05FFFF" opacity-50>{{ loginType }}</span>
        <div class="handoff-login-type" @click="handoffLoginType">
          <span fs-18 lh-42 color="#05FFFF">{{ handoffLoginTypeSpan }}</span>
          <el-image class="handoff-icon" :src="handoffIcon" fit="fill" />
        </div>
      </div>
      <el-form :model="loginForm">
        <el-form-item mt-51>
          <el-input v-model="loginForm.userName" placeholder="Please input" class="input-with-select">
            <template #prepend>
              <el-icon>
                <i-ep-User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item mt-48>
          <el-input v-model="loginForm.userName" placeholder="Please input" class="input-with-select">
            <template #prepend>
              <el-icon>
                <i-ep-Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item mt-37>
          <span wPE-100 fs-16 fw-400 flex flex-row-end color="#1AD1FF" lh-42>忘记密码？</span>
        </el-form-item>
        <el-form-item mt-51>
          <el-button class="login-button" type="primary">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: login
</route>

<style lang="scss" scoped>
.login-box {

  .login-form {
    border-color: #1A8BFF;
  }

  ::v-deep(.handoff-icon) {
    width: 9px;
    height: 14px;
    margin-left: 9px;
  }

  ::v-deep(.login-button) {
    width: 100%;
    height: 52px;
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
</style>
