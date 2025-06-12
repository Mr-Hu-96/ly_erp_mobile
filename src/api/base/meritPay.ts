import { http } from '@/utils/http'

/**
 * 查询meritPay记录列表
 */
export function listMeritPayApi(data) {
  return http.get<any>('/base/meritPay/list', data)
}

/**
 * 新增meritPay记录
 */
export function addMeritPayApi(data) {
  return http.post<any>('/base/meritPay', data)
}

/**
 * 查询meritPay记录详细
 */
export function getMeritPayApi(id) {
  return http.get<any>('/base/meritPay/' + id)
}

/**
 * 修改meritPay记录
 */
export function updateMeritPayApi(data) {
  return http.put<any>('/base/meritPay', data)
}

/**
 * 删除meritPay记录
 */
export function delMeritPayApi(id) {
  return http.delete<any>('/base/meritPay/' + id)
}

/**
 * 查询绩效工资配比
 */
export function getMeritPayDataApi(data) {
  return http.get<any>('/base/meritPay/getData', data)
}
