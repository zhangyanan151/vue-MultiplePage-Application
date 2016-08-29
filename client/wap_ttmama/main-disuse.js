import Vue from 'vue'
import VueTouch from 'vue-touch'
import VueRouter from 'vue-router';
import filter from './../filter/date.filter'
import index from './index/route'
import listPage from './product_list/route'
import detailsPage from './product_details/route'
import cart from './cart/route'
import './assets/css/reset.css'
// import test1 from '../../src/components/test1.vue'
import login from './login/route'
import classify from './classify/route'

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
    '/': {
      component: function (resolve) {
        resolve(index)
      }
    },
    '/test': {
        component: function (resolve) {
        	require.ensure([], function(require){
        		var test=require('./Common_components/test/route');
        		resolve(test)	

        	}) 
        }
    },
    '/test1': {
        component:function(resolve){
          require(['../../src/components/test1.vue'], resolve)
        }
        // require.ensure([], function(require) {
        //   var productList = require('./product_list/route');
        //   resolve(productList);
        // })
       
    },
    '/list': {
      component: function(resolve) {
        resolve(listPage);
        // require.ensure([], function(require) {
        //   var productList = require('./product_list/route');
        //   resolve(productList);
        // })
      }
    },
    '/details': {
      component: function(resolve) {
        resolve(detailsPage);
        // require.ensure([], function(require) {
        //   var productList = require('./product_list/route');
        //   resolve(productList);
        // })
      }
    },
    '/cart': {
      component: cart
    },
    '/login': {
      component: login
    },
    '/classify': {
      component: function(resolve) {
        resolve(classify);
      }
    }
});
router.redirect({
    '*': '/1'
})

var App = Vue.extend({})
router.start(App, '#app');

