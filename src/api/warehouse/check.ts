import { http } from '@/utils/http'

/**
 * 查询check记录列表
 */
export function listCheckApi(data) {
  return http.get<any>('/warehouse/check/list', data)
}

/**
 * 新增check记录
 */
export function addCheckApi(data) {
  return http.post<any>('/warehouse/check', data)
}

/**
 * 查询check记录详细
 */
export function getCheckApi(id) {
  return http.get<any>('/warehouse/check/' + id)
}

/**
 * 修改check记录
 */
export function updateCheckApi(data) {
  return http.put<any>('/warehouse/check', data)
}

/**
 * 删除check记录
 */
export function delCheckApi(id) {
  return http.delete<any>('/warehouse/check/' + id)
}

/**
 * 新增check记录
 */
export function scanCheckApi(data) {
  return http.get<any>('/warehouse/check/scanCheck', data)
}
