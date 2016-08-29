import Vue from 'vue'
import Tpl from './template.html'
import './style.css'

let myVue = Vue.extend({
	template: Tpl,
	props:['child_data'],
	data: function() {
		return {
		}
	},
	methods: {

	},
	created: function () {
		
	},
	ready: function() {
	}
});
var myComplate = Vue.component('brand_discount', myVue);
export default myComplate;