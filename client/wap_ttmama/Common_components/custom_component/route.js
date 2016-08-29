import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
var $ = require('jquery')
import XImg from 'vux-components/x-img';

let myVue = Vue.extend({
	props: ['index-custom'],
	template: Tpl,
	data: function() {
		return {
			
		}				
	},
	components: {
		XImg
	},
	computed: {
		
	},
	methods: {
		init_plugin: function(){
			var self =this;
			$(function(){
				
		 	    
		 	})
		}
	},
	created: function () {	

	},
	ready: function() {
		
	},
	watch: {
	    'my_data_01': function (val, oldVal) {
	    /*在watch 里面获取 id 然后通过 id初始化swiper组件*/
	      // this.box_id =  this.child_data.box_id;
	      // this.init_plugin();
	      // console.log(my_data_01.type);
	    }
  }

});
var myComplate = Vue.component('custom-component', myVue);
export default myComplate;