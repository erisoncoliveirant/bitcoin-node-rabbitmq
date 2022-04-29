import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import VueApexChats from 'vue3-apexcharts'

createApp(App)
  .use(store)
  .use(VueApexChats)
  .mount('#app')
