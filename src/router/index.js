import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Detail from "@/views/Detail.vue"
import Collect from "@/views/Collect.vue"
import Care from "@/views/Care.vue"
import My from "@/views/My.vue"
import Setup from "@/views/Setup.vue"

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
    },{
      path: '/collect/:kind',
      name: 'Collect',
      component: Collect
    },{
      path: '/care',
      name: 'Care',
      component: Care
    },{
      path: '/my',
      name: 'My',
      component: My
    },{
      path: '/setup',
      name: 'Setup',
      component: Setup
    }
  ]
})
