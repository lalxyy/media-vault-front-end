// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

import BaseURL from '@/utils/BaseURL';

// Vendor
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// import '/src/assets/css/index.css'
import 'element-ui/lib/theme-testing/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.use(Vuex)

Vue.prototype.$axios = axios.create({
  baseURL: BaseURL
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
