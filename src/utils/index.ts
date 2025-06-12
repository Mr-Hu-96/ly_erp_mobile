import { pages, subPackages, tabBar } from '@/pages.json'
import { isMpWeixin } from './platform'

const getLastPage = () => {
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  // const lastPage = getCurrentPages().at(-1)
  // 上面那个在低版本安卓中打包会报错，所以改用下面这个【虽然我加了 src/interceptions/prototype.ts，但依然报错】
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

/** 判断当前页面是否是 tabbar 页  */
export const getIsTabbar = () => {
  if (!tabBar) {
    return false
  }
  if (!tabBar.list.length) {
    // 通常有 tabBar 的话，list 不能有空，且至少有2个元素，这里其实不用处理
    return false
  }
  const lastPage = getLastPage()
  const currPath = lastPage.route
  return !!tabBar.list.find((e) => e.pagePath === currPath)
}

/**
 * 获取当前页面路由的 path 路径和 redirectPath 路径
 * path 如 '/pages/login/index'
 * redirectPath 如 '/pages/demo/base/route-interceptor'
 */
export const currRoute = () => {
  const lastPage = getLastPage()
  const currRoute = (lastPage as any).$page
  // console.log('lastPage.$page:', currRoute)
  // console.log('lastPage.$page.fullpath:', currRoute.fullPath)
  // console.log('lastPage.$page.options:', currRoute.options)
  // console.log('lastPage.options:', (lastPage as any).options)
  // 经过多端测试，只有 fullPath 靠谱，其他都不靠谱
  const { fullPath } = currRoute as { fullPath: string }
  // console.log(fullPath)
  // eg: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor (小程序)
  // eg: /pages/login/index?redirect=%2Fpages%2Froute-interceptor%2Findex%3Fname%3Dfeige%26age%3D30(h5)
  return getUrlObj(fullPath)
}

const ensureDecodeURIComponent = (url: string) => {
  if (url.startsWith('%')) {
    return ensureDecodeURIComponent(decodeURIComponent(url))
  }
  return url
}
/**
 * 解析 url 得到 path 和 query
 * 比如输入url: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
 * 输出: {path: /pages/login/index, query: {redirect: /pages/demo/base/route-interceptor}}
 */
export const getUrlObj = (url: string) => {
  const [path, queryStr] = url.split('?')
  // console.log(path, queryStr)

  if (!queryStr) {
    return {
      path,
      query: {},
    }
  }
  const query: Record<string, string> = {}
  queryStr.split('&').forEach((item) => {
    const [key, value] = item.split('=')
    // console.log(key, value)
    query[key] = ensureDecodeURIComponent(value) // 这里需要统一 decodeURIComponent 一下，可以兼容h5和微信y
  })
  return { path, query }
}
/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 这里设计得通用一点，可以传递 key 作为判断依据，默认是 needLogin, 与 route-block 配对使用
 * 如果没有传 key，则表示所有的 pages，如果传递了 key, 则表示通过 key 过滤
 */
export const getAllPages = (key = 'needLogin') => {
  // 这里处理主包
  const mainPages = [
    ...pages
      .filter((page) => !key || page[key])
      .map((page) => ({
        ...page,
        path: `/${page.path}`,
      })),
  ]
  // 这里处理分包
  const subPages: any[] = []
  subPackages.forEach((subPageObj) => {
    // console.log(subPageObj)
    const { root } = subPageObj

    subPageObj.pages
      .filter((page) => !key || page[key])
      .forEach((page: { path: string } & Record<string, any>) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`,
        })
      })
  })
  const result = [...mainPages, ...subPages]
  // console.log(`getAllPages by ${key} result: `, result)
  return result
}

/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 只得到 path 数组
 */
export const getNeedLoginPages = (): string[] => getAllPages('needLogin').map((page) => page.path)

/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 只得到 path 数组
 */
export const needLoginPages: string[] = getAllPages('needLogin').map((page) => page.path)

/**
 * 根据微信小程序当前环境，判断应该获取的 baseUrl
 */
export const getEnvBaseUrl = () => {
  // 请求基准地址
  let baseUrl = import.meta.env.VITE_SERVER_BASEURL

  // 微信小程序端环境区分
  if (isMpWeixin) {
    const {
      miniProgram: { envVersion },
    } = uni.getAccountInfoSync()

    switch (envVersion) {
      case 'develop':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_DEVELOP || baseUrl
        break
      case 'trial':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_TRIAL || baseUrl
        break
      case 'release':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_RELEASE || baseUrl
        break
    }
  }

  return baseUrl
}

/**
 * 根据微信小程序当前环境，判断应该获取的 UPLOAD_BASEURL
 */
export const getEnvBaseUploadUrl = () => {
  // 请求基准地址
  let baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL

  // 微信小程序端环境区分
  if (isMpWeixin) {
    const {
      miniProgram: { envVersion },
    } = uni.getAccountInfoSync()

    switch (envVersion) {
      case 'develop':
        baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL__WEIXIN_DEVELOP || baseUploadUrl
        break
      case 'trial':
        baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL__WEIXIN_TRIAL || baseUploadUrl
        break
      case 'release':
        baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL__WEIXIN_RELEASE || baseUploadUrl
        break
    }
  }

  return baseUploadUrl
}

/**
 * @description 限制小数位数
 * @param value 要处理的数字值
 * @param n 小数位数限制，默认为 2
 * @returns 处理后的数字
 */
export function toFixedWithLimit(value: number | string, n: number = 2): number {
  // 将传入的值转换为数字类型
  const number = parseFloat(value as string)

  // 判断是否为有效的数字
  if (isNaN(number)) {
    return 0
    // throw new Error('Invalid input: not a valid number');
  }

  // 获取传入数字的小数部分位数
  const decimalLength = (number.toString().split('.')[1] || '').length

  // 如果 n 大于等于实际小数位数，则直接返回原数
  if (n >= decimalLength) {
    return number
  }

  // 否则保留 n 位小数，返回数值类型
  const factor = Math.pow(10, n)
  return Math.round(number * factor) / factor
}

/**
 * 获取当前日期的格式化字符串
 * @param format 日期格式，支持替换占位符 YYYY、MM、DD、hh、mm、ss
 * @returns 格式化后的日期字符串
 */
export function formatDateFormat(format: string): string {
  const date = new Date()

  // 获取当前日期的各个部分
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，因此要加 1
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // 替换格式中的占位符
  const formattedDate = format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('hh', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)

  return formattedDate
}

/**
 * 解析时分字符串，返回小时和分钟的数值
 * @param timeString 格式为 "HH:mm" 的字符串，例如 "09:01"
 * @returns 包含小时和分钟的对象 { hours: number, minutes: number }
 * @throws 如果输入格式无效会抛出错误
 */
export function parseTimeString(timeString: string): { hours: number; minutes: number } {
  // 验证输入格式
  const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/
  if (!timeRegex.test(timeString)) {
    console.error('无效的时间格式，请使用 "HH:mm" 格式，例如 "09:01"')
    return { hours: 0, minutes: 0 }
  }

  // 分割字符串
  const [hoursStr, minutesStr] = timeString.split(':')

  // 转换为数字（会自动去掉前导零）
  const hours = parseInt(hoursStr, 10)
  const minutes = parseInt(minutesStr, 10)

  return { hours, minutes }
}

/**
 * 计算两个日期时间之间的差值，返回hh:mm格式
 * @param startDate 开始时间字符串，格式 'YYYY-MM-DD HH:mm'
 * @param endDate 结束时间字符串，格式 'YYYY-MM-DD HH:mm'
 * @returns 时间差字符串，格式 'hh:mm'
 */
export function calcDate(startDate: string, endDate: string): string {
  // 1. 将日期字符串转换为Date对象
  const start = new Date(startDate.replace(' ', 'T') + ':00')
  const end = new Date(endDate.replace(' ', 'T') + ':00')

  // 2. 计算时间差（毫秒）
  const diffInMs = end.getTime() - start.getTime()

  // 3. 检查开始时间是否早于结束时间
  if (diffInMs < 0) {
    throw new Error('结束时间不能早于开始时间')
  }

  // 4. 转换为小时和分钟
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const hours = Math.floor(diffInMinutes / 60)
  const minutes = diffInMinutes % 60

  // 5. 格式化为hh:mm
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}
