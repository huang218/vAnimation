import './assets/main.css'
import 'virtual:windi.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from '@/router'
import { pinia } from "@/stores";
import "element-plus/dist/index.css";

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
