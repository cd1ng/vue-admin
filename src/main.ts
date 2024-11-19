import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'
/** 引入element-plus深色主题 */
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'

createApp(App).use(router).use(pinia).mount('#app')
