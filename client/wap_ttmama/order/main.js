import Vue from 'vue'
// import VueTouch from 'vue-touch'
import VueRouter from 'vue-router';
import './../assets/css/reset.css';
import order from './route.js';
import details from './order_details/route.js';
import delivery from './order_delivery/route.js';
import cancel from './order_cancel/route.js';
import aftersale from './order_aftersale/route.js';
import returnSche from './return_sche/route.js';
import returnLater from './return_later/route.js';
import nodiscuss from './order_discuss/route.js';
import '../service/filters.js';
// Vue.use(VueTouch)
Vue.use(VueRouter);

// VueTouch.registerCustomEvent('doubletap', {
//   type: 'tap',
//   taps: 2
// })

//filter(Vue); //定义过滤器
// Vue.config.debug = true;

var router = new VueRouter({
  // hashbang: false,
  history: true,
  saveScrollPosition: true
});


//定义路由
router.map({
    '/order': {
    	component: order
    },
    '/order/:type': {
      component: order
    },
    '/order_details/:order_id': {
      component: details
    },
    '/delivery/:order_id': {
      component: delivery
    },
    '/cancel/:order_id': {
      component: cancel
    },
    '/aftersale': {
      component: aftersale
    },
    '/aftersale/:order_id': {
      component: aftersale
    },
    '/return_sche/:order_id/:return_id': {
      component: returnSche
    },
    '/return_later/:order_id/:return_id': {
      component: returnLater
    },
    '/order_nodiscuss/:order_id': {
      component: nodiscuss
    }
});

var App = Vue.extend({})
router.start(App, '#app');

