import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import $ from 'jquery'

let myVue = Vue.extend({
	template: Tpl,
	data: function() {
		return {
			headStyle: {
				'background-color':'rgba(255,255,255,0)'
			}
		}
	},
	methods: {
   		changeOpacity() {
   			var scrollTop = $(window).scrollTop();
			if(scrollTop <= 300) {
				var op = scrollTop/300;
				this.headStyle = {
					'background-color': 'rgba(255,255,255,'+ op +')'
				}
			}else {
				this.headStyle = {
					'background-color': 'rgba(255,255,255,1)'
				}
			}
   		}
	},
	created: function () {
		
	},
	ready: function() {
		var self = this;
		$('body').on('touchmove', self.changeOpacity);
	}
});
var myComplate = Vue.component('search-bar', myVue);
export default myComplate;