import { defineStore } from 'pinia'
import { navigate } from '@/utils/navigate'
import { ref } from 'vue'
// import { GET_USER_INFO } from '@/api/system/user'

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
      userData.value = {}
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      userInfo.value = { ...initState }
    }
    const isLogined = computed(() => !!userInfo.value.token)
    async function logout() {
      clearUserInfo()
      // 回登录页带上当前路由地址
      await navigate.redirect('/pages-sub/login/index')
    }
    async function getUserData() {
      // const res = await GET_USER_INFO()
      // userData.value = res
      const res = {
        nickname: 'admin',
        avatar: 'https://avatars.githubusercontent.com/u/10213409?v=4',
        roles: ['admin'],
        token: 'admin',
        id: 'admin',
      }
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
