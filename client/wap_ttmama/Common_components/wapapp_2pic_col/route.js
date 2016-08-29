import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import XImg from 'vux-components/x-img';

let myVue = Vue.extend({
	template: Tpl,
	props:['wapapp2picCol'],
	data: function() {
		return {
			
		}
	},
	components: {
		XImg
	},
	methods: {

	},
	created: function () {
		
	},
	ready: function() {
		
	},
	watch: {

	}
});
var myComplate = Vue.component('wapapp-2pic-col', myVue);
export default myComplate;