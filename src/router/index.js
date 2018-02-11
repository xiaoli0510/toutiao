import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Detail from "@/views/Detail.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home/:type',
      name: 'Home',
      component: Home
    },{
      path: '/search',
      name: 'Search',
      component: Search
    },{
      path: '/newsDetail/:id',
      name: 'newsdetail',
      component: Detail
    }
    ,{
      path: '*',
      name: 'Home',
      component: Home
    },{
      path: '',
      name: 'Home',
      component: Home
    }
  ]
})
