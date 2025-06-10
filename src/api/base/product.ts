import { http } from '@/utils/http'

/**
 * 查询product记录列表
 */
export function selectProductListApi(data) {
  return http.get<any>('/base/product/selectProductList', data)
}
