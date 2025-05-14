<route lang="json5">
{
  needLogin: true,
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '个人中心',
  },
}
</route>

<template>
  <view>
    <view class="header">
      <view class="flex items-center relative">
        <wd-img :width="80" :height="80" mode="aspectFill" round src="/static/images/logo.png" />
        <view class="ml-2">
          <view>{{ userData?.user?.userName || '用户' }}</view>
        </view>
      </view>
    </view>
    <wd-card title="个人信息">
      <wd-cell-group>
        <wd-cell title="用户名" :value="userData?.user?.userName" icon="user" />
        <wd-cell title="手机号" :value="userData?.user?.phonenumber" icon="call" />
        <wd-cell title="邮箱" :value="userData?.user?.email" icon="logout" />
        <wd-cell title="角色" :value="getRoleNames" icon="user-circle" />
        <wd-button type="warning" block @click="logout">退出登录</wd-button>
      </wd-cell-group>
    </wd-card>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
const { userData, logout } = useUserStore()
const getRoleNames = computed(() => {
  return userData?.user?.roles?.map((item: any) => item.roleName).join(',')
})
//
</script>

<style lang="scss" scoped>
.header {
  min-height: 110px;
  padding: 30px 15px;
  margin-bottom: -40px;
  color: #fff;
  background: linear-gradient(to right, rgb(239, 147, 54), rgb(236, 98, 43));
}
</style>
