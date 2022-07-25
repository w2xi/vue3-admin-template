import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import './assets/styles/index.css'

import './permission';

import globalComponents from './components/global';
// plugin docs: https://vue-amap.guyixi.cn/
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css';

initAMapApiLoader({
  key: '5eaa15ae7fada053c6414c43fc869a2d',
});

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(globalComponents);
app.use(createPinia());
app.use(VueAMap);
app.use(ElementPlus);
app.use(router);

app.mount('#app');