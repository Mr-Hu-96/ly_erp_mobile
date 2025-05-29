import { http } from '@/utils/http'

/**
 * 查询plan记录列表
 */
export function listPlanApi(data) {
  return http.get<any>('/device/plan/list', data)
}

/**
 * 新增plan记录
 */
export function addPlanApi(data) {
  return http.post<any>('/device/plan', data)
}

/**
 * 查询plan记录详细
 */
export function getPlanApi(id) {
  return http.get<any>('/device/plan/' + id)
}

/**
 * 修改plan记录
 */
export function updatePlanApi(data) {
  return http.put<any>('/device/plan', data)
}

/**
 * 删除plan记录
 */
export function delPlanApi(id) {
  return http.delete<any>('/device/plan/' + id)
}
