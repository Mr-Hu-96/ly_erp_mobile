import { http } from '@/utils/http'

/**
 * 查询position记录列表
 */
export function listPositionApi(data) {
  return http.get<any>('/base/position/list', data)
}

/**
 * 新增position记录
 */
export function addPositionApi(data) {
  return http.post<any>('/base/position', data)
}

/**
 * 查询position记录详细
 */
export function getPositionApi(id) {
  return http.get<any>('/base/position/' + id)
}

/**
 * 修改position记录
 */
export function updatePositionApi(data) {
  return http.put<any>('/base/position', data)
}

/**
 * 删除position记录
 */
export function delPositionApi(id) {
  return http.delete<any>('/base/position/' + id)
}

/**
 * 查询库位信息列表
 */
export function getPositionListApi(data) {
  return http.post<any>('/base/position/getPositionList', data)
}
