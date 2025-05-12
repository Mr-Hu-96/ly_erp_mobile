import '@/style/index.scss'
import { VueQueryPlugin } from '@tanstack/vue-query'
import 'virtual:uno.css'
import { createSSRApp } from 'vue'

import App from './App.vue'
import { prototypeInterceptor, requestInterceptor, routeInterceptor } from './interceptors'
import store from './store'
import WdDatetimePickerCustom from '@/components/WdDatetimePickerCustom/WdDatetimePickerCustom.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.component('WdDatetimePickerCustom', WdDatetimePickerCustom)
  app.use(store)
  app.use(routeInterceptor)
  app.use(requestInterceptor)
  app.use(prototypeInterceptor)
  app.use(VueQueryPlugin)

  return {
    app,
  }
}
