import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
// import $ from 'jquery';
import {Cookieget} from '../assets/js/util.js';
import Pop from '../Common_components/pop/route.js';
import Confirm from 'vux-components/confirm';
import cartService from '../service/cartService.js';
import orderService from '../service/orderService.js';

let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			member_id: null,
			accesstoken: null,
			order_id: null,
			pay_app_id: 'malipay',
			pay_object: 'order',
			data: null,
			payList: null,
			isLoading: true,
			confirmShow: false,
			isWechat: true,
			payback: ''
		}
	},
	components: {
		Confirm
	},
	computed: {
		payCom: function() {
			var flag = false;
			if(this.payback=='payback') {
				flag = true;
			}else {
				flag = false;
			}
			return flag;
		}
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.order_id = this.$route.params.order_id;
		this.payback = this.$route.params.payback?this.$route.params.payback:'';
		this.initData();
		this.getPayList();
		this.isWeiXin();
	},
	methods: {
		initData: function() {
			cartService.gotopay(this.member_id, this.accesstoken, this.order_id, this.pay_app_id, this.pay_object).then((data)=>{
				this.isLoading = false;
				if(data.rsp == 'succ') {
					this.data = data.data;
				}else {
					location.back();
				}
			})
		},
		getPayList: function() {
			orderService.selectPayment().then((data)=>{
				if(data.rsp == 'succ') {
					this.payList = data.data;
				}
			})
		},
		changePay: function(pay_app_id) {
			this.isLoading = true;
			orderService.changePayment(this.member_id, this.accesstoken, this.order_id, pay_app_id).then((data)=>{
				if(data.rsp == 'succ') {
					location.href = '/topay/'+this.order_id+"/"+pay_app_id;
				}
			})
		},
		cancelPay: function() {
			this.confirmShow = true;
		},
		isWeiXin: function(){
		    var ua = window.navigator.userAgent.toLowerCase();
		    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		        this.isWechat = true;
		    }else{
		        this.isWechat = false;
		    }
		}
	},
	events: {
		'on-confirm': function() {
			location.href='/user';
		}
	}
});

export default Index