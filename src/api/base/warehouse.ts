import { http } from '@/utils/http'

/**
 * 查询warehouse记录列表
 */
export function listWarehouseApi(data) {
  return http.get<any>('/base/warehouse/list', data)
}

/**
 * 新增warehouse记录
 */
export function addWarehouseApi(data) {
  return http.post<any>('/base/warehouse', data)
}

/**
 * 查询warehouse记录详细
 */
export function getWarehouseApi(id) {
  return http.get<any>('/base/warehouse/' + id)
}

/**
 * 修改warehouse记录
 */
export function updateWarehouseApi(data) {
  return http.put<any>('/base/warehouse', data)
}

/**
 * 删除warehouse记录
 */
export function delWarehouseApi(id) {
  return http.delete<any>('/base/warehouse/' + id)
}

/**
 * 查询warehouse列表
 */
export function getWareHouseListApi(data) {
  return http.get<any>('/base/warehouse/getWareHouseList', data)
}
