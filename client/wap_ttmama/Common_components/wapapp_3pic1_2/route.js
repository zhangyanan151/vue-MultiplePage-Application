import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import XImg from 'vux-components/x-img';

let myVue = Vue.extend({
	template: Tpl,
	props:['wapapp3pic12'],
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
var myComplate = Vue.component('wapapp-3pic1-2', myVue);
export default myComplate;