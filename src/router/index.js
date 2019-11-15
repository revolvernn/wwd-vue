import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Activity from '@/pages/activity/activity'
import User from '@/pages/user/user'
import Login from '@/pages/login/login'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
