import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import $ from 'jquery'

let myVue = Vue.extend({
	template: Tpl,
	props: ['dailyTasting'],
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
		$(document).ready(function(){
			var width = Math.ceil($('.index_daily_tasting .tasting-item').outerWidth(true));
			var num = $('.index_daily_tasting .tasting-item').size();
			$('.index_daily_tasting .tasting-box').css({'width': width*num+'px'})
		});
	}
});
var myComplate = Vue.component('daily-tasting', myVue);
export default myComplate;