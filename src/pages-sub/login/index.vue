<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '登录',
  },
}
</route>

<template>
  <view class="login-page">
    <wd-card class="login-container">
      <wd-cell-group>
        <!-- 用户名输入框 -->
        <wd-input v-model="username" label="用户名" placeholder="请输入用户名" />

        <!-- 密码输入框 -->
        <wd-input v-model="password" label="密码" placeholder="请输入密码" type="password" />

        <!-- 验证码输入框 -->
        <wd-input v-model="captcha" label="验证码" placeholder="请输入验证码">
          <template #suffix>
            <img class="captcha-image" :src="captchaImage" @click="refreshCaptcha" />
          </template>
        </wd-input>
      </wd-cell-group>

      <!-- 登录按钮 -->
      <wd-button class="mt-2" type="primary" block @click="handleLogin">登录</wd-button>
    </wd-card>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { navigate } from '@/utils/navigate'
import { ref, reactive } from 'vue'
import { login, getCodeImg } from '@/api/login' // 假设后端提供了获取验证码的接口

const username = ref('')
const password = ref('')
const captcha = ref('')
const redirectPath = ref('/pages/index/index')
const userStore = useUserStore()

// 获取验证码图片的状态
const captchaImage = ref('') // 图片 URL
const uuid = ref('')
const captchaEnabled = ref(true)
// 加载页面时获取验证码图片
const loadCaptcha = () => {
  getCodeImg()
    .then((res) => {
      captchaEnabled.value = res.captchaEnabled == undefined ? true : res.captchaEnabled
      if (captchaEnabled.value) {
        captchaImage.value = 'data:image/gif;base64,' + res.img
        uuid.value = res.uuid
      }
    })
    .catch(() => {
      uni.showToast({
        title: '获取验证码失败',
        icon: 'error',
      })
    })
}

onLoad((options) => {
  console.log(options, '页面跳转时传递的参数') // 页面跳转时传递的参数
  if (options?.redirect) {
    redirectPath.value = options.redirect
  }
  if (isLogined()) {
    navigate.redirect(redirectPath.value) // 跳转到目标页面
  }

  // 页面加载时获取验证码
  loadCaptcha()
})

const isLogined = () => {
  return userStore.isLogined
}

function handleLogin() {
  if (!username.value || !password.value || !captcha.value) {
    uni.showToast({
      title: '请输入用户名、密码和验证码',
      icon: 'none',
    })
    return
  }

  login({
    username: username.value,
    password: password.value,
    code: captcha.value,
    uuid: uuid.value,
  })
    .then((res) => {
      if (res.code === 200) {
        // 登录逻辑处理
        uni.showToast({
          title: '登录成功',
          icon: 'success',
        })
        userStore.setUserInfo({
          nickname: username.value,
          token: res.token,
        })
        userStore.getUserData().then((res) => {
          navigate.redirect(redirectPath.value)
        })
      } else {
        uni.showToast({
          title: '账户或密码错误',
          icon: 'error',
        })
      }
    })
    .catch(() => {
      uni.showToast({
        title: '账户或密码错误',
        icon: 'error',
      })
    })
}

// 刷新验证码图片
function refreshCaptcha() {
  loadCaptcha()
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #4f6d7a, #d3cbb8); /* 渐变背景色 */
}

.login-container {
  width: 90%;
  max-width: 600rpx;
  padding: 40rpx;
  background-color: #ffffff; /* 白色背景 */
  border-radius: 16rpx; /* 圆角 */
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); /* 阴影 */
}

.captcha-image {
  width: 130rpx;
  cursor: pointer;
}
</style>
