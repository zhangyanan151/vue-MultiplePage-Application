
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
        if(self.has_next) {
          groupbuyService.showData(self.page_size, self.current_page+1).then((data)=>{
            self.current_page ++;
            self.has_next = data.has_next;
            self.page_data.items = self.page_data.items.concat(data.items);
          });
        }
        isLoading = false;
        self.isLoading = false;
      }
    });
  },
  props:['scroll-load'],
  data: ()=> {
    return {
      column_number: '',
      page_size: '',
      page_data: [],
      current_page: 1,
      has_next: true,
      isLoading: false
    }
  },
  computed: {
    listTotal: function() {
      return this.page_data.items.length;
    },
    has_next: function() {
      return {
        alive: this.page_data.has_next
      }
    }
  },
  methods: {
    
  },
  created: function() {
      
  },
  watch: {
      'page_data': function (val, oldVal) {
        
      },
      'scrollLoad': {
          handler: function (val, oldVal) {
            this.column_number = val.pdata.column;
            this.page_size = val.pdata.pagesize;

            var self = this;
            groupbuyService.showData(self.page_size,1).then(function(data){
              self.page_data = data;
            });
          },
          immediate: true
    }
  }
});
var myComponent = Vue.component('scroll-load', Index);
export default myComponent
