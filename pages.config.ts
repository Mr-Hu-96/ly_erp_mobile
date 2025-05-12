import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/index.png',
        selectedIconPath: 'static/tabbar/indexHL.png',
        pagePath: 'pages/index/index',
        text: '工单',
      },
      {
        iconPath: 'static/tabbar/task.png',
        selectedIconPath: 'static/tabbar/taskHL.png',
        pagePath: 'pages/task/index',
        text: '任务',
      },
      {
        iconPath: 'static/tabbar/about.png',
        selectedIconPath: 'static/tabbar/aboutHL.png',
        pagePath: 'pages/about/index',
        text: '菜单',
      },
      {
        iconPath: 'static/tabbar/reportWork.png',
        selectedIconPath: 'static/tabbar/reportWorkHL.png',
        pagePath: 'pages/reportWork/index',
        text: '报工',
      },
      {
        iconPath: 'static/tabbar/userCenter.png',
        selectedIconPath: 'static/tabbar/userCenterHL.png',
        pagePath: 'pages/userCenter/index',
        text: '我的',
      },
    ],
  },
})
