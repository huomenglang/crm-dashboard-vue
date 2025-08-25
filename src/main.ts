import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


const app = createApp(App)
            .use(router)
            .use(createPinia())
            .use(Antd);

app.mount('#app');
