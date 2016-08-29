import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import '../../assets/css/swiper.min.css'
var $ = require('jquery')
import '../../assets/js/swiper-3.3.1.min.js'
import XImg from 'vux-components/x-img';
// import lazyload from '../../assets/js/lazyload.js';
// import defaultImg from '../../assets/default.png';

let myVue = Vue.extend({
	props: ['wapappTabSlide'],
	template: Tpl,
	data: function() {
		return {
		}
	},
	components: {
		XImg
	},
	computed: {

	},
	methods: {
		init_plugin: function() {
			var self = this;
			$(function() {
				var box_id = self.box_id;
				var swiperSildes = $('#' + box_id + ' .swiper-slide');
				if (swiperSildes.size() <= 1) {
					var swiper = new Swiper('#' + box_id, {
						noSwiping: true,
						lazyLoading: true
					});
				} else {
					var swiper = new Swiper('#' + box_id, {
						pagination: '#' + box_id + ' .swiper-pagination',
						// paginationClickable: true,
						// effect : 'fadeIn',
						spaceBetween: 30,
						autoplay: 3000,
						lazyLoading: true,
						loop: true,
						loopAdditionalSlides: 0,
						autoplayDisableOnInteraction : false
					});

				}
			})
		}
	},
	created: function() {
		// this.wapappTabSlide1=this.wapappTabSlide;
		// this.box_id = this.wapappTabSlide.box_id;
		// this.init_plugin();
	},
	ready: function() {

	},
	watch: {
		wapappTabSlide: {
			handler: function(val, oldVal) {
				if(this.wapappTabSlide.box_id){
					/*在watch 里面获取 id 然后通过 id初始化swiper组件*/
					this.box_id = this.wapappTabSlide.box_id;
					this.init_plugin();
				}
			},
			immediate: true
		}
	}

});
var myComplate = Vue.component('wapapp-tab-slide', myVue);
export default myComplate;