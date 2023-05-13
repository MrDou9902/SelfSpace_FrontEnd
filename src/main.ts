import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Particles from 'particles.vue3'
import router from '@/router/router'
import App from './App.vue'
import '@/styles/index.scss'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-message-box.css'

import coolButton from '@/components/elements/coolButton.vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

Particles(app, {})
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.component('coolButton', coolButton)

app.mount('#app')
