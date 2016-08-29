import Vue from 'vue'
import VueTouch from 'vue-touch'
import VueRouter from 'vue-router';
import './../assets/css/reset.css'
import pay from './route.js';
import topay from './topay/route.js';


// Vue.use(VueTouch)
Vue.use(VueRouter);

VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})

// Vue.config.debug = true;

var router = new VueRouter({
  // hashbang: false,
  history: true,
  saveScrollPosition: true
});


//定义路由
router.map({
    '/pay/:order_id': {
      component: pay
    },
    '/pay/:order_id/:payback': {
    	component: pay
    },
    '/topay/:order_id/:pay_app_id': {
    	component: topay
    }
});

var App = Vue.extend({})
router.start(App, '#app');