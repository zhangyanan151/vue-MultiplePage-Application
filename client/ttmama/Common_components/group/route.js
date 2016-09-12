
import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import groupbuyService from '../../service/groupbuyService'
var $ = require('jquery');

let Index = Vue.extend({
  //replace : true,
  template: Tpl,
  ready: function(){
    var self = this;
    var isLoading = false;
    $(window).scroll(function() {
      if($(document).scrollTop() >= $(document).height() - $(window).height() -100) {
        if(isLoading) return;
        isLoading = true;
        self.isLoading = true;
        if(self.activity.alive && self.nextPage.alive) {
          groupbuyService.showData('promit', self.page.alive+1).then((data)=>{
            self.page.alive ++;
            self.flash_sale_goodsObj.has_next = data.has_next;
            self.flash_sale_goodsObj.items = self.flash_sale_goodsObj.items.concat(data.items);
          });
        }else if(self.activity.next && self.nextPage.next) {
          groupbuyService.showData('trailer', self.page.next+1).then((data)=>{
            self.page.next ++;
            self.underline_goodsObj.has_next = data.has_next;
            self.underline_goodsObj.items = self.underline_goodsObj.items.concat(data.items);
          });
        }
        isLoading = false;
        self.isLoading = false;
      }
    });
  },
  data: ()=> {
    return {
      flash_sale_goodsObj: [],
      underline_goodsObj: [],
      activity: {
        alive: true,
        next: false
      },
      page: {
        alive: 1,
        next: 1
      },
      isLoading: false
    }
  },
  computed: {
    listTotal: function() {
      if(this.activity.alive) {
        return this.flash_sale_goodsObj.items.length;
      }else {
        return this.underline_goodsObj.items.length;
      }
    },
    nextPage: function() {
      return {
        alive: this.flash_sale_goodsObj.has_next,
        next: this.underline_goodsObj.has_next
      }
    }
  },
  methods: {
    changeTab: function(type) {
      if(type === 'alive') {
        this.activity = {
          alive: true,
          next: false
        }
      }else if(type === 'next') {
        this.activity = {
          alive: false,
          next: true
        }
      }
    },
    checkTime (goodslist) {
      for (var i=0; i<goodslist.length; i++) {
        var goods = goodslist[i];
        if (!goods.products.end_time) return;
        var now = new Date().getTime();
        now = now/1000;
        var end = goods.products.end_time;
        var deltaTime = end - now;
        var day = parseInt(deltaTime / 3600 /24, 10);
        var hour = parseInt(deltaTime / 3600 % 24, 10);
        var minutes = parseInt(deltaTime / 60 % 60, 10);
        var seconds = parseInt(deltaTime % 60, 10);
        day = day < 0 ? 0 : day;
        hour = hour < 0 ? 0 : hour;
        minutes = minutes < 0 ? 0 : minutes;
        seconds = seconds < 0 ? 0 : seconds;
        //goods.timeStr = day+'天'+hour+'小时'+minutes+'分'+seconds+'秒';
        Vue.set(goods, 'timeStr', day+'天'+hour+'小时'+minutes+'分'+seconds+'秒');
      }  
    },
    invoke () {
      this.checkTime(this.flash_sale_goodsObj.items);
      this.checkTime(this.underline_goodsObj.items);
    }
  },
  created: function() {
      this.flash_sale_goodsObj = window.cm_groupbuyItems.flash_sale_goodsObj;
      this.underline_goodsObj = window.cm_groupbuyItems.underline_goodsObj;
      
      setInterval(this.invoke, 1000);
  }
});
var myComponent = Vue.component('group-buy', Index);
export default myComponent
