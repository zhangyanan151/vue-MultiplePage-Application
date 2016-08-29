import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import $ from 'jquery'

let myVue = Vue.extend({
	template: Tpl,
	props: ['state'],
	data: function() {
		return {
			topShow: false
		}
	},
	methods: {

	},
	created: function () {
	},
	ready: function() {
		var self = this;
		$(window).scroll(function(){
			if($(document).scrollTop() >= $(window).height()*2) {
				self.topShow = true;
			}else {
				self.topShow = false;
			}
		})
	}
});
var myComplate = Vue.component('foot-index', myVue);
export default myComplate;