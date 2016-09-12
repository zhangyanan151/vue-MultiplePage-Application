
import Vue from 'vue'
import VueRouter from 'vue-router';
import filter from './../filter/date.filter'
import index from './index/route'
import test from './Common_components/test/route'

  
Vue.use(VueRouter);

filter(Vue); //定义过滤器
Vue.config.debug = true
var router = new VueRouter({
  // hashbang: false,
  history: true,
  saveScrollPosition: true
});


//定义路由
router.map({
    '/': {
      component: function (resolve) {
        resolve(index)
      }
    },
    '/:id': {
        component: function (resolve) {
          resolve(index)
        }
    },
    '/test': {
        component: function (resolve) {
          resolve(test)
        }
    }
});
router.redirect({
    '*': '/1'
})

var App = Vue.extend({})
router.start(App, '#app');
console.log('本地存储用了');
