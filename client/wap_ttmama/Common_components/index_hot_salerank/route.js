import Vue from 'vue'
import Tpl from './template.html'
import './style.css'

let myVue = Vue.extend({
	props:['child_data'],
	template: Tpl,
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
var myComplate = Vue.component('hot_salerank', myVue);
export default myComplate;