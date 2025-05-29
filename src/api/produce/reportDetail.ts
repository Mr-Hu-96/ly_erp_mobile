import { http } from '@/utils/http'

/**
 * 查询detail记录列表
 */
export function listDetailApi(data) {
  return http.get<any>('/produce/report/detail/list', data)
}

/**
 * 新增detail记录
 */
export function addDetailApi(data) {
  return http.post<any>('/produce/report/detail', data)
}

/**
 * 查询detail记录详细
 */
export function getDetailApi(id) {
  return http.get<any>('/produce/report/detail/' + id)
}

/**
 * 修改detail记录
 */
export function updateDetailApi(data) {
  return http.put<any>('/produce/report/detail', data)
}

/**
 * 删除detail记录
 */
export function delDetailApi(id) {
  return http.delete<any>('/produce/report/detail/' + id)
}

/**
 * 首页-统计不良品项分布饼图
 */
export function getDefectBarApi() {
  return http.get<any>('/produce/report/detail/getDefectBar')
}
