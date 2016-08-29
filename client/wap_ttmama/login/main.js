import Vue from 'vue'
// import VueTouch from 'vue-touch'
import VueRouter from 'vue-router';
import './../assets/css/reset.css'
import login from './route'


// Vue.use(VueTouch)
Vue.use(VueRouter);

var router = new VueRouter({
  // hashbang: false,
  history: true,
  saveScrollPosition: true
});


//定义路由
router.map({
    
    '/login': {
      component: login
    }
});

var App = Vue.extend({})
router.start(App, '#app');

