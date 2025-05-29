import { http } from '@/utils/http'

/**
 * 查询workOrder记录列表
 */
export function listWorkOrderApi(data) {
  return http.get<any>('/produce/workOrder/list', data)
}

/**
 * 新增workOrder记录
 */
export function addWorkOrderApi(data) {
  return http.post<any>('/produce/workOrder', data)
}

/**
 * 查询workOrder记录详细
 */
export function getWorkOrderApi(id) {
  return http.get<any>('/produce/workOrder/' + id)
}

/**
 * 修改workOrder记录
 */
export function updateWorkOrderApi(data) {
  return http.put<any>('/produce/workOrder', data)
}

/**
 * 删除workOrder记录
 */
export function delWorkOrderApi(id) {
  return http.delete<any>('/produce/workOrder/' + id)
}

/**
 * 首页-获取订单状态列表
 */
export function getWorkOrderStatusApi() {
  return http.get<any>('/produce/workOrder/getWorkOrderStatus')
}
