// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import config from '@/config/config.js'
import http from '@/utils/httpUtil.js'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$http = http
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
