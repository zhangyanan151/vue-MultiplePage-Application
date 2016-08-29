import Vue from 'vue'
import Tpl from './template.html'
import './style.css'

let myVue = Vue.extend({
	template: Tpl,
	props: ['productClassify'],
	data: function() {
		return {
			defaultImg: require('../../assets/default.png')
		}
	},
	methods: {
   
	},
	created: function () {
		
		
	},
	ready: function() {
		
	}
});
var myComplate = Vue.component('product-classify', myVue);
export default myComplate;