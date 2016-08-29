/*
 * 引用此模块需在模板页引入 http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=407017
 */
import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
var $ = require('jquery');
let Index = Vue.extend({
  template: Tpl,
  props:{
      shareShow: {
        default: false
      },
      shareUrl: {
        type: String,
        default: ''
      }
  },
  data: ()=> {
    return { 
    }
  },
  computed: {
    bottom: function() {
      var bottom = '';
      if(this.shareShow) {
        bottom = '0px';
      }else {
        var o = this.$els.sharebox;
        var height = o.offsetHeight;
        height = height === 0 ? 300 : height;
        bottom = -height+'px';
      }
      return bottom;
    },
    url: function() {
      var url = '';
      if(this.shareUrl==''){
        url = location.href;
      }else {
        url = window.location.host + this.shareUrl;
      }
      return url;
    }
  },
  methods: {
    hide: function() {
      this.shareShow = false;
    }
  },
  created: function() {

  },
  watch: {
      
  },
  events: {

  }
});
var myComponent = Vue.component('share-component', Index);
export default myComponent
