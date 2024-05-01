import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/global.css'//引入全局css


//引入 Element
const app = createApp(App)
app.use(router).use(store).use(ElementPlus).mount('#app')
