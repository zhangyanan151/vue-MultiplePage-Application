import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import '../../assets/css/swiper.min.css'
var $ = require('jquery')
import '../../assets/js/swiper.min.js'

let myVue = Vue.extend({
	props: ['child_data'],
	template: Tpl,
	data: function() {
		return {
			// my_data: this.$parent.tab_slide_data_2,
		}				
	},
	computed: {
		
	},
	methods: {
		init_plugin: function(){
			
		}
	},
	created: function () {	

	},
	ready: function() {
		var self =this;	
	},
	watch: {
	   
  	}

});
var myComplate = Vue.component('multiple_img_component', myVue);
export default myComplate;