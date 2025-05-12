// loadingManager.js
let loadingCount = 0 // 记录当前显示 Loading 的请求数量

export const showLoading = (options = { title: '加载中...', mask: true }) => {
  if (loadingCount === 0) {
    uni.showLoading(options) // 只有第一次请求才显示 Loading
  }
  loadingCount++ // 增加引用计数
}

export const hideLoading = () => {
  if (loadingCount > 0) {
    loadingCount-- // 请求完成后减少引用计数
  }
  if (loadingCount === 0) {
    uni.hideLoading() // 所有请求完成后关闭 Loading
  }
}
