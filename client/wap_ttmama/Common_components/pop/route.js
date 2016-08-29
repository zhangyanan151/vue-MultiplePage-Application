import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import Spinner from 'vux-components/spinner';

let Index = Vue.extend({
	template: Tpl,
	props:{
		popType: {  /*text只显示文字，spin只显示加载图，spinText显示图片和文字*/
			type: String,
			default: 'text'
		},
		popText: {  /*要显示的文字*/
			type: String,
			default: ''
		}
	},
	data: ()=>{
		return {}
	},
	components: {
		Spinner
	},
	ready: function(){
		var obj = this.$el;
		var width = obj.offsetWidth;
		var height = obj.offsetHeight;
		obj.style.marginLeft=-width/2+'px';
		obj.style.marginTop=-height/2+'px';
	}
});
var myComplate = Vue.component('pop', Index);
export default myComplate;