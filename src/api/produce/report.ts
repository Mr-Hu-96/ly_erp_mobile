import { http } from '@/utils/http'

/**
 * 查询report记录列表
 */
export function listReportApi(data) {
  return http.get<any>('/produce/report/list', data)
}

/**
 * 新增report记录
 */
export function addReportApi(data) {
  return http.post<any>('/produce/report', data)
}

/**
 * 查询report记录详细
 */
export function getReportApi(id) {
  return http.get<any>('/produce/report/' + id)
}

/**
 * 修改report记录
 */
export function updateReportApi(data) {
  return http.put<any>('/produce/report', data)
}

/**
 * 删除report记录
 */
export function delReportApi(id) {
  return http.delete<any>('/produce/report/' + id)
}

/**
 * 不良品项分布统计列表
 */
export function statisticsDefectListApi(data) {
  return http.get<any>('/produce/report/detail/statisticsDefectList', data)
}
