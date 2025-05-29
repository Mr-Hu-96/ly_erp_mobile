import { http } from '@/utils/http'

/**
 * 查询out记录列表
 */
export function listOutApi(data) {
  return http.get<any>('/warehouse/out/list', data)
}

/**
 * 新增out记录
 */
export function addOutApi(data) {
  return http.post<any>('/warehouse/out', data)
}

/**
 * 查询out记录详细
 */
export function getOutApi(id) {
  return http.get<any>('/warehouse/out/' + id)
}

/**
 * 修改out记录
 */
export function updateOutApi(data) {
  return http.put<any>('/warehouse/out', data)
}

/**
 * 删除out记录
 */
export function delOutApi(id) {
  return http.delete<any>('/warehouse/out/' + id)
}
