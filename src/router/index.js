import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/home/App.vue'
import List from '@/list/App.vue'
import Detail from '@/detail/App.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/(home|index)?',
    name: 'Home',
    component: Home,
  }, {
    path: '/test/(home|index)',
    name: 'Home',
    component: Home,
  }, {
    path: '/test/list/:id',
    name: 'List',
    component: List,
  }, {
    path: '/test/detail/:id',
    name: 'Detail',
    component: Detail,
  }],
})
