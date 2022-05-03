import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import VueApexCharts from 'vue3-apexcharts'
import { loadFonts } from './plugins/webfontloader'
import vuetify from './plugins/vuetify'

loadFonts()

createApp(App)
  .use(store)
  .use(VueApexCharts)
  .use(vuetify)
  .mount('#app')
