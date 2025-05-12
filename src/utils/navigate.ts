import { tabBar } from '@/pages.json'
export const navigate = {
  // 普通页面跳转 (navigateTo)
  push(url, params = {}) {
    if (this._isTabBarPage(url)) {
      this.switchTab(url) // 如果是tabBar页面，使用switchTab
    } else {
      uni.navigateTo({
        url: this._buildUrl(url, params),
      })
    }
  },

  // 替换当前页面 (redirectTo)
  redirect(url, params = {}) {
    if (this._isTabBarPage(url)) {
      this.switchTab(url) // 如果是tabBar页面，使用switchTab
    } else {
      uni.redirectTo({
        url: this._buildUrl(url, params),
      })
    }
  },

  // 重新启动应用 (reLaunch)
  reLaunch(url, params = {}) {
    if (this._isTabBarPage(url)) {
      this.switchTab(url) // 如果是tabBar页面，使用switchTab
    } else {
      uni.reLaunch({
        url: this._buildUrl(url, params),
      })
    }
  },

  // tabBar 跳转 (switchTab)
  switchTab(url) {
    uni.switchTab({
      url,
    })
  },

  // 判断是否是 tabBar 页面
  _isTabBarPage(url) {
    // 根据你的项目需求，调整 tabBar 页面的路径
    const tabBarPages = tabBar.list.findIndex((item) => {
      return '/' + item.pagePath === url
    }) // 示例的 tabBar 页面路径
    return tabBarPages !== -1
  },

  // 拼接带参数的 URL
  _buildUrl(url, params) {
    if (params && Object.keys(params).length > 0) {
      const paramStr = Object.entries(params)
        .map(([key, value]) => {
          if (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean'
          ) {
            return `${key}=${encodeURIComponent(value as string)}`
          }
          return `${key}=`
        })
        .join('&')
      return `${url}?${paramStr}`
    }
    return url
  },
}

export function goBackRefresh() {
  const pages = getCurrentPages() // 获取页面栈
  const prevPage = pages[pages.length - 2] // 获取上一页
  console.log('prevPage', prevPage, pages)

  if (prevPage) {
    if (typeof prevPage.$vm.$.exposed.shouldRefresh.value === 'boolean') {
      prevPage.$vm.$.exposed.shouldRefresh.value = true // 设置上一页的刷新标记
    }
  }
  uni.navigateBack() // 返回上一页
}
