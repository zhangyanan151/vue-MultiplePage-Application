import Vue from 'vue';
import Tpl from './brand.html';
import './style.css';
import {getlocalStorage} from '../../assets/js/util.js';

let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			brandData: null
		}
	},
	created: function() {
		this.brandData = JSON.parse(getlocalStorage('brandInfo'));
	},
	methods: {
		goBack: function() {
			history.go(-1);
		}
	}
});

export default Index