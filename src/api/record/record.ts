import { http } from '@/utils/http'

/**
 * 查询record记录列表
 */
export function listRecordApi(data) {
  return http.get<any>('/record/record/list', data)
}

/**
 * 新增record记录
 */
export function addRecordApi(data) {
  return http.post<any>('/record/record', data)
}

/**
 * 查询record记录详细
 */
export function getRecordApi(id) {
  return http.get<any>('/record/record/' + id)
}

/**
 * 修改record记录
 */
export function updateRecordApi(data) {
  return http.put<any>('/record/record', data)
}

/**
 * 删除record记录
 */
export function delRecordApi(id) {
  return http.delete<any>('/record/record/' + id)
}

/**
 * 查询record记录列表
 */
export function getRecordCheckApi(data) {
  return http.get<any>('/record/record/getRecordCheck', data)
}
