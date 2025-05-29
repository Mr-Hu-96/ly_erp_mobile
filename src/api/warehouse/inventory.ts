import { http } from '@/utils/http'

/**
 * 查询inventory记录列表
 */
export function listInventoryApi(data) {
  return http.get<any>('/warehouse/inventory/list', data)
}

/**
 * 新增inventory记录
 */
export function addInventoryApi(data) {
  return http.post<any>('/warehouse/inventory', data)
}

/**
 * 查询inventory记录详细
 */
export function getInventoryApi(id) {
  return http.get<any>('/warehouse/inventory/' + id)
}

/**
 * 修改inventory记录
 */
export function updateInventoryApi(data) {
  return http.put<any>('/warehouse/inventory', data)
}

/**
 * 删除inventory记录
 */
export function delInventoryApi(id) {
  return http.delete<any>('/warehouse/inventory/' + id)
}
