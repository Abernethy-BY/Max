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
import userNameIcon from '~/assets/image/login/userNameIcon.png'
import passWordIcon from '~/assets/image/login/passWordIcon.png'
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
    <div
      class="login-form" bg="#023CA7" flex flex-column-between cross-axis-stretch pt-47 w-552 position-absolute
      pot-255 por-344 bw-1 bs-solid
    >
      <header flex cross-axis-center flex-row-between ml-53 mr-56>
        <span fs-24 fw-400 color="#05FFFF" opacity-50>{{ loginType }}</span>
        <div class="handoff-login-type" cursor-p @click="handoffLoginType">
          <span fs-18 lh-42 color="#05FFFF">{{ handoffLoginTypeSpan }}</span>
          <el-image class="handoff-icon" :src="handoffIcon" fit="fill" />
        </div>
      </header>
      <el-form class="login-form-content" :model="loginForm" ml-53 mr-56>
        <el-form-item mt-48>
          <el-input v-model="loginForm.userName" class="user-name-input" placeholder="请输入用户名">
            <template #prepend>
              <el-image w-26 h-26 :src="userNameIcon" fit="fill" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item mt-48>
          <el-input v-model="loginForm.userName" placeholder="请输入用户密码" class="user-name-input">
            <template #prepend>
              <el-image w-26 h-26 :src="passWordIcon" fit="fill" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item mt-37>
          <span wPE-100 fs-16 fw-400 flex cross-axis-center flex-row-end color="#1AD1FF" lh-42>忘记密码？</span>
        </el-form-item>
        <el-form-item mt-48>
          <el-button class="login-button" type="primary">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <footer mt-36 h-64 flex cross-axis-center flex-row-between position-relative>
        <span ml-53 cursor-p color="#05FFFF" fs-18>扫一扫登录</span>
        <span mr-56 cursor-p color="#05FFFF" fs-18>立即注册</span>
      </footer>
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

  ::v-deep(.login-form-content) {
    .el-form-item {
      margin-bottom: 0;
    }

    // padding-bottom: 36px;
  }

  ::v-deep(.user-name-input) {
    height: 56px;
    border: 1px solid #1489CC;
    border-radius: 4px;
    --el-border-color: none;

    .el-input__wrapper {
      background: inherit;

      .el-input__inner {
        &::-webkit-input-placeholder {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #17A1E6;
        }
      }
    }

    .el-input-group__prepend {
      background: inherit;
      position: relative;
      display: flex;
      align-items: center;

      &:after {
        content: "";
        width: 2px;
        height: 20.4px;
        position: absolute;
        right: 0;
        background-color: #0071D4;
      }

    }

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

  footer {
    &:after {
      content: '';
      width: 100%;
      height: 1px;
      background: #1ADCFF;
      position: absolute;
      top: 0;
    }
  }
}
</style>
