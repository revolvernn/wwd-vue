// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import config from '@/config/config.js'
import utils from '@/utils/utils.js'
import http from '@/utils/httpUtil.js'
import 'vant/lib/index.css'
import '@/assets/font_652571_w7v1chopogp/iconfont.css'
import VueLazyload from 'vue-lazyload'
Vue.use(Vant)
Vue.use(VueLazyload, {
  loading: 'http://p3.qhimg.com/t01f9eff21fde930194.png', // 加载中图片，一定要有，不然会一直重复加载占位图
  error: 'http://p3.qhimg.com/t01f9eff21fde930194.png' // 加载失败图片
})
Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$http = http
Vue.prototype.$utils = utils
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
