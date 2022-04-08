import { createApp } from 'vue'
import App from './App.vue'
import router from './js/router'
import store from './js/store'
import './sass/index.scss'
import { Icon } from '@iconify/vue';


createApp(App).use(router).use(store).use({Icon}).mount('#app')
