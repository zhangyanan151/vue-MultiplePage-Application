import Vue from 'vue'
// import VueTouch from 'vue-touch'
import VueRouter from 'vue-router';
// import filter from './../../filter/date.filter'
import './../assets/css/reset.css'
import openim from './route'

Vue.use(VueRouter);

var router = new VueRouter({
  // hashbang: false,
  history: true,
  saveScrollPosition: true
});


//定义路由
router.map({
    '/openim': {
      component: openim
    }
});

var App = Vue.extend({})
router.start(App, '#app');

