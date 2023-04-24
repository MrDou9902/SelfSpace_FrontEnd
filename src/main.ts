import { createApp } from 'vue';
import axios from 'axios';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

import App from './App.vue';
import './style.css';
import '@/styles/index.scss';

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount('#app');
