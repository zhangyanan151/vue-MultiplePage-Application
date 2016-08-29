import Vue from 'vue'
import VueTouch from 'vue-touch'
import VueRouter from 'vue-router';
// import filter from './../../filter/date.filter'
import './../assets/css/reset.css'
import user from './route'
import grade from './grade/route'
import visit from './visit/route'
import coupon from './coupon/route'
import perset from './personal_settings/route'
import logout from './logout/route'
import memberCard from './member_card/route'
import address from './address/route.js'
import bound from './phone_bound/route'
import suggest from './suggest/route'
import baby from './babys/route'
import favorite from './favorite/route.js'
import filter from '../service/filters.js'


Vue.use(VueTouch)
Vue.use(VueRouter);

var router = new VueRouter({
  // hashbang: false,
  history: true,
  saveScrollPosition: true
});


//定义路由
router.map({
    
    '/user': {
      component: user
    },
    '/user/grade': {
      component: grade
    },
    '/user/visit': {
      component: visit
    },
    '/user/coupon': {
      component: coupon
    },
    '/user/perset': {
      component: perset
    },
    '/user/logout': {
      component: logout
    },
    '/user/memberCard': {
      component: memberCard
    },
    '/user/address': {
      component: address
    },
    '/user/favorite': {
      component: favorite
    },
    '/user/bound': {
      component: bound
    },
    '/user/suggest': {
      component: suggest
    },
    '/user/baby': {
      component: baby
    }

});


var App = Vue.extend({})
router.start(App, '#app');