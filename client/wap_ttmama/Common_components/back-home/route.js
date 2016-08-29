import Vue from 'vue';
import Tpl from './template.html';
import './style.css';

let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {}
	}
});
var myComplate = Vue.component('back-home', Index);
export default myComplate;