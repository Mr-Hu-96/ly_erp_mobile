import { http } from '@/utils/http'

/**
 * 查询inWarehouse记录列表
 */
export function listInWarehouseApi(data) {
  return http.get<any>('/warehouse/inWarehouse/list', data)
}

/**
 * 新增inWarehouse记录
 */
export function addInWarehouseApi(data) {
  return http.post<any>('/warehouse/inWarehouse', data)
}

/**
 * 查询inWarehouse记录详细
 */
export function getInWarehouseApi(id) {
  return http.get<any>('/warehouse/inWarehouse/' + id)
}

/**
 * 修改inWarehouse记录
 */
export function updateInWarehouseApi(data) {
  return http.put<any>('/warehouse/inWarehouse', data)
}

/**
 * 删除inWarehouse记录
 */
export function delInWarehouseApi(id) {
  return http.delete<any>('/warehouse/inWarehouse/' + id)
}

/**
 * 扫码入库
 */
export function scanWarehouseApi(data) {
  return http.post<any>('/warehouse/inWarehouse/scanWarehouse', data)
}

/**
 * 查询inWarehouse 明细记录列表
 */
export function getInWarehouseDetailListApi(data) {
  return http.get<any>('/warehouseDetail/detail/list', data)
}
