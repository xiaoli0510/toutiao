// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// axios.defaults.baseURL = 'http://10.100.70.166:8080/'
// Vue.prototype.$http = axios

import moment from 'moment'
import animate from 'animate.css'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index.js'
import  './assets/js/flexible.js'
import Vuex from "vuex"

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: '/src/assets/imgs/imgerror.jpg',
  loading: '/src/assets/imgs/imgloading.gif',
  preLoad: 1,
  attempt: 1
});

Vue.use(Vuex)
Vue.use(iView);

Vue.use(ElementUI)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
