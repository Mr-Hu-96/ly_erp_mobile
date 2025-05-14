import { defineStore } from 'pinia'
import { navigate } from '@/utils/navigate'
import { ref } from 'vue'
import { getInfo } from '@/api/login'
const initState = { nickname: '', avatar: '' }

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })
    const userData = ref<any>({})
    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      userInfo.value = { ...initState }
    }
    const isLogined = computed(() => !!userInfo.value.token)
    async function logout() {
      setUserInfo({})
      // 回登录页带上当前路由地址
      await navigate.redirect('/pages-sub/login/index')
    }
    async function getUserData() {
      const res = await getInfo()
      userData.value = res
      return res
    }
    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
      logout,
      getUserData,
      userData,
    }
  },
  {
    persist: true,
  },
)
