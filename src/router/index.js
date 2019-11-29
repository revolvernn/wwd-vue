import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Activity from '@/pages/activity/activity'
import User from '@/pages/user/user'
import Login from '@/pages/login/login'
import UserDetail from '@/pages/user/user-detail'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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
    },
    {
      path: '/user-detail',
      name: 'UserDetail',
      component: UserDetail
    }
  ]
})
