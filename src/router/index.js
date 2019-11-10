import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Activity from '@/pages/activity/activity'
import User from '@/pages/user/user'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
