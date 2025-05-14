import { http } from '@/utils/http'

/** 获取用户详细信息 */
export function getInfo() {
  return http.get('/getInfo')
}

/** 登录方法 */
export function login(data: { username: string; password: string; code: string; uuid: string }) {
  return http.post<any>('/login', data)
}

/** 退出方法 */
export function logout() {
  return http.post<any>('/logout')
}

/** 获取验证码 */
export function getCodeImg() {
  return http.get<any>('/captchaImage')
}

/**
 * 获取用户班组
 */
export function deptTree() {
  return http.get<any>('/system/user/deptTree')
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return http.get<any>(`/system/dict/data/type/${dictType}`)
}
