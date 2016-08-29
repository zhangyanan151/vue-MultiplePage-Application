import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import XImg from 'vux-components/x-img';

let myVue = Vue.extend({
	template: Tpl,
	props:['wapappGoods3col'],
	data: function() {
		return {
			
		}
	},
	methods: {

	},
	created: function () {
		
	},
	ready: function() {
		
	},
	watch: {

	},
	components: {
		XImg
	}
});
var myComplate = Vue.component('wapapp-goods3col', myVue);
export default myComplate;