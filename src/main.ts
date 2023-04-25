import { createApp } from 'vue';
import router from '@/router/router'
// import axios from 'axios';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue';
// import './style.css';
import '@/styles/index.scss';

const app = createApp(App);

app.use(router)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale: zhCn,
});


app.mount('#app');
