import './assets/main.css'
import '@/styles/animationExce.scss'
import 'virtual:windi.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from '@/router'
import { pinia } from '@/stores'
import 'element-plus/dist/index.css'
// 黑白模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import i18nPlugin from '@/plugins/i18n'
import vFocus from '@/directives/vFocus'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const i18nType = { name: 'hjh' }
app.use(pinia).use(i18nPlugin, i18nType).use(router).directive('focus', vFocus).mount('#app')
console.log(app, 'App')
