import './assets/main.css';
import '@/styles/animationExce.scss';
import 'virtual:windi.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from '@/router'
import { pinia } from "@/stores";
import "element-plus/dist/index.css";
// 黑白模式样式
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/styles/dark/css-vars.css';
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
