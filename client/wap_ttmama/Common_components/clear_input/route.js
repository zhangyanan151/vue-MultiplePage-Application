import Vue from 'vue';
import Tpl from './template.html';
import './style.css';

/*本组件参考案例可见注册模块signup*/
let Index = Vue.extend({
	template: Tpl,
	props: {
		showClear: {  /*显示或隐藏本组件*/
			type: Boolean,
			default: false
		},
		inputText: {  /*绑定挂载元素input值，以便清空*/
			type: String,
			default: ''
		},
		rightDis: {   /*设置本组件距离挂载元素右边的距离*/
			type: Number,
			default: 0
		}
	},
	data: () => {
		return {}
	},
	methods: {
		hide_clear: function() {
			this.showClear= false;
			this.inputText= '';
		}
	}

});
var myComplate = Vue.component('clearinput', Index);
export default myComplate;