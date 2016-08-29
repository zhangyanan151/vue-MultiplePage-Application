import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import indexService from '../../service/indexService.js';
import {Cookieget,Cookieunset} from '../../assets/js/util.js';

let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			cartNum: '0'
		}
	},
	created: function() {
		this.getCartNum();
	},
	methods: {
		getCartNum: function() {
			var memberId = Cookieget('member_id');
			var accesstoken = Cookieget('accesstoken');
			indexService.getCartNum(memberId, accesstoken).then((data)=>{
				if(data.rsp === "succ") {
					this.cartNum = data.data;
				}else {
					this.cartNum = "0";
					if(data.res === "need_login") {
						Cookieunset('member_id');
						Cookieunset("accesstoken");
						Cookieunset("login_account");
						Cookieunset("member_pic");
						Cookieunset("name");
					}
				}
			});
		}
	},
	events: {
		'update-cart': function() {
			this.getCartNum();
		}
	}
});
var myComplate = Vue.component('mini-car', Index);
export default myComplate;