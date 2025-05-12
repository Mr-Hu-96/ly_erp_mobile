<route lang="json5">
{
  style: {
    navigationBarTitleText: '登录',
  },
}
</route>

<template>
  <view class="login-page">
    <wd-card>
      <wd-cell-group>
        <!-- 用户名输入框 -->
        <wd-input v-model="username" label="用户名" placeholder="请输入用户名" clearable />

        <!-- 密码输入框 -->
        <wd-input
          v-model="password"
          label="密码"
          placeholder="请输入密码"
          type="password"
          clearable
        />
      </wd-cell-group>

      <!-- 登录按钮 -->
      <wd-button class="mt-2" type="primary" block @click="handleLogin">登录</wd-button>
    </wd-card>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { navigate } from '@/utils/navigate'
import { ref } from 'vue'
// import { LOGIN, todo } from '@/api/system/user'
const username = ref('')
const password = ref('')
const redirectPath = ref('/pages/index/index')
const userStore = useUserStore()
onLoad((options) => {
  console.log(options, '页面跳转时传递的参数') // 页面跳转时传递的参数
  if (options?.redirect) {
    redirectPath.value = options.redirect
  }
  if (isLogined()) {
    navigate.redirect(redirectPath.value) // 跳转到目标页面
  }
})

const isLogined = () => {
  return userStore.isLogined
}

function handleLogin() {
  if (!username.value || !password.value) {
    uni.showToast({
      title: '请输入用户名和密码',
      icon: 'none',
    })
    return
  }
  uni.showToast({
    title: '登录成功',
    icon: 'success',
  })
  userStore.setUserInfo({
    nickname: username.value,
    token: '123456',
  })
  console.log(redirectPath.value)

  navigate.redirect(redirectPath.value)
  //   LOGIN({ username: username.value, password: password.value })
  //     .then((res) => {
  //       console.log(res)
  //       if (res.code === 200) {
  //         // 登录逻辑处理
  //         uni.showToast({
  //           title: '登录成功',
  //           icon: 'success',
  //         })
  //         userStore.setUserInfo({
  //           nickname: username.value,
  //           token: res.token,
  //         })
  //         userStore.getUserData().then((res) => {
  //           function getMsg() {
  //             todo().then((res) => {
  //               if (res.msg) {
  //                 uni.showModal({
  //                   title: '提示',
  //                   content: res.msg,
  //                   showCancel: false,
  //                   success: function (res) {
  //                     if (res.confirm) {
  //                       navigate.redirect(redirectPath.value)
  //                     }
  //                   },
  //                 })
  //               } else {
  //                 navigate.redirect(redirectPath.value)
  //               }
  //             })
  //           }
  //           getMsg()
  //         })
  //       } else {
  //         uni.showToast({
  //           title: '账户或密码错误',
  //           icon: 'error',
  //         })
  //       }
  //     })
  //     .catch(() => {
  //       uni.showToast({
  //         title: '账户或密码错误',
  //         icon: 'error',
  //       })
  //     })
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
  width: 80%;
  max-width: 500rpx;
  padding: 40rpx;
  background-color: #ffffff; /* 白色背景 */
  border-radius: 16rpx; /* 圆角 */
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1); /* 阴影 */
}
</style>
