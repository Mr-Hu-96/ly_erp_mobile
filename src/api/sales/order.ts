import { http } from '@/utils/http'

/**
 * 查询order记录列表
 */
export function listOrderApi(data) {
  return http.get<any>('/sales/order/list', data)
}

/**
 * 新增order记录
 */
export function addOrderApi(data) {
  return http.post<any>('/sales/order', data)
}

/**
 * 查询order记录详细
 */
export function getOrderApi(id) {
  return http.get<any>('/sales/order/' + id)
}

/**
 * 修改order记录
 */
export function updateOrderApi(data) {
  return http.put<any>('/sales/order', data)
}

/**
 * 删除order记录
 */
export function delOrderApi(id) {
  return http.delete<any>('/sales/order/' + id)
}
