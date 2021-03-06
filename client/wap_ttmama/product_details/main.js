﻿import Vue from 'vue'
import VueTouch from 'vue-touch'
import VueRouter from 'vue-router';
import filter from './../../filter/date.filter'
import './../assets/css/reset.css'
import details from './route'


Vue.use(VueTouch)
Vue.use(VueRouter);

VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})

filter(Vue); //定义过滤器
// Vue.config.debug = true;

var router = new VueRouter({
  // hashbang: false,
  history: true,
  saveScrollPosition: true
});


//定义路由
router.map({
    
    '/details': {
      component: details
    }
});


var App = Vue.extend({})
router.start(App, '#app');

