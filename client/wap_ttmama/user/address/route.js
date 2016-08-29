import Vue from 'vue';
import Tpl from './template.html';
import $ from 'jquery';
import address from '../../Common_components/address/route.js';
let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			
		}
	},
	created: function() {
		
	},
	computed:{
		
	},
    methods: {
    	
	},
	events: {
		'addr-back': function() {
			history.back();
		},
		'on-addr-item-tap': function(addrObj) {
			this.$broadcast('toEditAddr', addrObj);
		}
	}
})
export default Index