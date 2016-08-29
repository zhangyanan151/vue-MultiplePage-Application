import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import '../../assets/css/swiper.min.css'
var $ = require('jquery')
import '../../assets/js/swiper.min.js'
import productIndexService from '../../service/productIndexService.js'


let myVue = Vue.extend({
	props: ['child_data'],
	template: Tpl,
	data: function() {
		return {
		}				
	},
	computed: {
		
	},
	methods: {
		init_plugin: function(){
			var self =this;
			$(function(){
				var box_id = self.box_id;
				// console.log(box_id);

		 		// setTimeout(function(){
			 		var swiperSildes = $('#'+box_id+' .swiper-slide');
			 	    if(swiperSildes.size()<=1) {
			 	        // var swiper = new Swiper('.swiper-container', {
			 	        var swiper = new Swiper('#'+box_id, {
			 	            noSwiping: true
			 	        });
			 	    }else {
			 	        // var swiper = new Swiper('.swiper-container', {
		 	        		// console.log('#'+box_id)
		 	        	var swiper = new Swiper('#'+box_id, {
			 	        pagination: '#'+box_id+' .swiper-pagination',
			 	        paginationClickable: true,
			 	        spaceBetween: 30,
			 	        autoplay: 3000,
			 	        loop: true
			 	        });
			 	    }	
		 			
		 		// },10)
		 	    
		 	})
		}
	},
	created: function () {	

	},
	ready: function() {
		
	},
	watch: {
	    'child_data': {
	    	handler: function (val, oldVal) {
				console.log(oldVal);
	    		/*在watch 里面获取 id 然后通过 id初始化swiper组件*/
		      this.box_id =  this.child_data.box_id;
		      this.init_plugin();
	    	},
	    	deep: true
		}
  }

});
var myComplate = Vue.component('tab-slide', myVue);
export default myComplate;