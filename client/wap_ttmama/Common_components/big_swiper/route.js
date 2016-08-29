import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import Swiper from 'vux-components/swiper';

let Index = Vue.extend({
	template: Tpl,
	components: {
		Swiper
	},
	props:{
		showBigImg: {
			type: Boolean,
			default: false
		},
		bigImgs: {
			type: Array,
			default: []
		}
	},
	data: ()=>{
		return {}
	},
	watch: {
		'showBigImg': function(val) {
			this.$dispatch('on-show-bigimg', val);
		}
	}
});
var myComplate = Vue.component('big-swiper', Index);
export default myComplate;