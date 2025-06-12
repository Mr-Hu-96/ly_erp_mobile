import { http } from '@/utils/http'

/**
 * 查询defect记录列表
 */
export function listDefectApi(data) {
  return http.get<any>('/base/defect/list', data)
}

/**
 * 新增defect记录
 */
export function addDefectApi(data) {
  return http.post<any>('/base/defect', data)
}

/**
 * 查询defect记录详细
 */
export function getDefectApi(id) {
  return http.get<any>('/base/defect/' + id)
}

/**
 * 修改defect记录
 */
export function updateDefectApi(data) {
  return http.put<any>('/base/defect', data)
}

/**
 * 删除defect记录
 */
export function delDefectApi(id) {
  return http.delete<any>('/base/defect/' + id)
}

//
/**
 * 通过工序查找不良列表
 */
export function selectDefectItemListApi(data) {
  return http.get<any>('/base/process/selectDefectItemList', data)
}
