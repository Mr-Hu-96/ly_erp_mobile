import { CustomRequestOptions } from '@/interceptors/request'
import { showLoading, hideLoading } from '@/interceptors/loadingManager'
import { useUserStore } from '@/store/user'
// #ifdef APP-PLUS
const modal = uni.requireNativePlugin('modal')
// #endif

const handleError = (msg: string) => {
  // #ifdef APP-PLUS
  modal.toast({
    message: msg,
    duration: 1.5,
  })
  // #endif
  // #ifndef APP-PLUS
  uni.showToast({
    icon: 'error',
    title: msg,
  })
  // #endif
}
export const http = <T>(options: CustomRequestOptions) => {
  // 如果不需要显示 Loading，则跳过
  if (options.useLoading !== false) {
    showLoading()
  }
  // 1. 返回 Promise 对象
  return new Promise<IResData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      dataType: 'json',
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // #endif
      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计

        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (res.data.code === 401) {
            const { clearUserInfo } = useUserStore()
            // 401错误  -> 清理用户信息，跳转到登录页
            clearUserInfo()
            uni.navigateTo({ url: '/pages-sub/login/index' })
            reject(res)
          } else if (res.data.code === 200) {
            // 2.1 提取核心数据 res.data
            resolve(res.data as IResData<T>)
          } else {
            handleError(res.data.msg || '请求错误')
            reject(res)
          }
        } else if (res.statusCode === 401) {
          const { clearUserInfo } = useUserStore()
          // 401错误  -> 清理用户信息，跳转到登录页
          clearUserInfo()
          uni.navigateTo({ url: '/pages-sub/login/index' })
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          if (!options.hideErrorToast) {
            handleError(res.data.msg || '请求错误')
          }

          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        handleError('网络错误，换个网络试试')
        reject(err)
      },
      complete() {
        if (options.useLoading !== false) {
          hideLoading()
        }
      },
    })
  })
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @returns
 */
export const httpGet = <T>(url: string, query?: Record<string, any>) => {
  return http<T>({
    url,
    query,
    method: 'GET',
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @returns
 */
export const httpPost = <T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
) => {
  return http<T>({
    url,
    query,
    data,
    method: 'POST',
  })
}

export const httpPut = <T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
) => {
  return http<T>({
    url,
    query,
    data,
    method: 'PUT',
  })
}

export const httpDelete = <T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
) => {
  return http<T>({
    url,
    query,
    data,
    method: 'DELETE',
  })
}

http.get = httpGet
http.post = httpPost
http.put = httpPut
http.delete = httpDelete
