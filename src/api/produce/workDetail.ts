import { http } from '@/utils/http'

/**
 * 查询workDetail记录列表
 */
export function listWorkDetailApi(data) {
  return http.get<any>('/produce/workDetail/list', data)
}

/**
 * 新增workDetail记录
 */
export function addWorkDetailApi(data) {
  return http.post<any>('/produce/workDetail', data)
}

/**
 * 查询workDetail记录详细
 */
export function getWorkDetailApi(id) {
  return http.get<any>('/produce/workDetail/' + id)
}

/**
 * 修改workDetail记录
 */
export function updateWorkDetailApi(data) {
  return http.put<any>('/produce/workDetail', data)
}

/**
 * 删除workDetail记录
 */
export function delWorkDetailApi(id) {
  return http.delete<any>('/produce/workDetail/' + id)
}

/**
 * 查询工单明细列表
 */
export function noPageListWorkDetailApi(data) {
  return http.get<any>('/produce/workDetail/noPageList', data)
}
