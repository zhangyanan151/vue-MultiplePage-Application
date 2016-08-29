import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import $ from 'jquery';
import {getQueryString,Cookieget} from '../assets/js/util.js';
import indexService from '../service/indexService.js';
import orderService from '../service/orderService.js';
import MyAddress from '../Common_components/address/route.js';
import Pop from '../Common_components/pop/route.js';
import defaultImg from '../assets/default.png';

let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			isLoading: true,
			isfastbuy: 'false',
			data: null,
			showTag: 'main',
			tax_type: 'false', //发票类型 ('false' 不需发票','personal' =>个人发票', 'company' =>'公司发票')
			tax_company: '',    //发票抬头
			// tax_content: '',   //发票内容
			is_tax: false,
			member_id: null,
			accesstoken: null,
			addr_id: null,
			tax: {
				tax_type: 'false',
				tax_company: '',
				tax_content: ''
			},
			couponChose: -1,
			couponText: '未使用',
			defaultImg: defaultImg,
			paymentList: null,
			isAlert: false,
			alertText: '',
			idcard_image_id: '',
			memo: ''
		}
	},
	computed: {
		addr_id: function() {
			var id = "";
			if(this.data.def_addr.addr_id) {
				id = this.data.def_addr.addr_id;
			}
			return id;
		},
		goodsList: function() {
			var list = [];
			if(this.data) {
				for(var i=0; i<this.data.aCart.object.goods.length; i++) {
					var obj = this.data.aCart.object.goods[i];
					list.push({
						type: 'goods',
						img: obj.thumbnail_url,
						data: obj
					});
					if(obj.gift) {
						for(var j=0; j<obj.gift.length; j++) {
							list.push({
								type: 'gift',
								img: obj.gift[j].image_spec_url,
								data: obj.gift[j]
							});
						}
					}
				}
			}
			return list;
		}
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.initData();
		// this.deliveryChange();
	},
	methods: {
		initData: function() {
			indexService.checkout(this.member_id, this.accesstoken, this.isfastbuy).then((data)=>{
				this.isLoading = false;
				if(data.rsp==="succ") {
					this.data = data.data;
					this.deliveryChange();
				}else if(data.res === "need_login") {
					this.goLogin();
				}
			});
		},
		goLogin: function() {
			window.location.href="/login";
		},
		goList: function() {
			this.$router.go('/checkout/list');
		},
		changeAddr: function(addrObj) {
			this.showTag = 'main';
			this.data.def_addr = addrObj;
			this.isLoading = true;
			this.deliveryChange();
			this.updateTotal();
		},
		deliveryChange: function () {
			indexService.deliveryChange(this.member_id, this.accesstoken, this.addr_id).then((data)=>{
				if(data.rsp == "succ") {
					this.data.dltype_list = data.data;
				}
			})
		},
		choseTax: function(tag) {
			if(tag == '0') {
				this.is_tax = false;
			}else {
				this.is_tax = true;
				if(this.tax_type == 'false') {
					this.tax_type = 'personal';
				}
			}
		},
		choseTaxType: function(tag) {
			if(tag == '0') {
				this.tax_type = 'personal';
				this.tax_company = '';
			}else {
				this.tax_type = 'company';
				this.$els.taxCompany.focus();
			}
		},
		taxBack: function() {
			this.is_tax = this.tax.tax_type != "false";
			this.tax_type = this.tax.tax_type;
			this.taxCompany = this.tax.taxCompany;
			this.showTag = 'main';
		},
		taxSure: function() {
			this.tax.tax_type = this.tax_type;
			this.tax.tax_company = this.tax_company;
			if(this.is_tax == false) {
				this.tax = {
					tax_type: 'false',
					tax_company: '',
					tax_content: ''
				}
			}
			this.showTag = 'main';
		},
		showCoupon: function() {
			if(this.data.coupon_lists.length == 0) {
				return;
			}else {
				this.showTag = 'coupon';
			}
		},
		couponClick: function(index) {
			if(this.couponChose != index) {
				this.couponChose = index;
			}else {
				this.couponChose = -1;
			}
		},
		useCoupon: function() {
			if(this.couponChose == -1) {
				this.showTag='main';
				return;
			}else {
				this.isLoading = true;
				indexService.useCoupon(this.isfastbuy, this.data.coupon_lists[this.couponChose].memc_code, this.member_id, this.accesstoken).then((data)=>{
					if(data.rsp === "succ") {
						this.couponText = data.data.coupon_info[0].name;
						this.data.md5_cart_info = data.data.md5_cart_info;
						this.showTag='main';
						this.updateTotal();
					}else {
						this.couponText = '未使用';
						this.showTag='main';
					}
				})
			}
		},
		updateTotal: function() {
			indexService.updateTotal(this.member_id, this.accesstoken, this.addr_id, this.data.def_dltype.dt_id, this.data.def_payment_id).then((data)=>{
				this.isLoading = false;
				if(data.rsp === "succ") {
					this.data.order_detail = data.data;
				}
			})
		},
		changeDltype: function(index) {
			this.data.def_dltype = this.data.dltype_list[index];
			this.isLoading = true;
			this.showTag = "main";
			this.updateTotal();
		},
		selectPayment: function() {
			this.showTag = "payment";
			if(this.paymentList == null) {
				this.getPayment();
			}
		},
		getPayment: function() {
			this.isLoading = true;
			orderService.selectPayment().then((data)=>{
				this.isLoading = false;
				if(data.rsp == "succ") {
					this.paymentList = data.data;
				}
			});
		},
		changePay: function(index) {
			var obj = this.paymentList[index];
			if(this.data.def_payment_id == obj.app_id) {
				this.showTag = 'main';
				return;
			}
			this.isLoading = true;
			this.data.def_payment_id = obj.app_id;
			this.data.def_payment_name = obj.app_name;
			this.showTag = 'main';
			this.updateTotal();
		},
		createOrder: function() {
			var md5_cart_info = this.data.md5_cart_info;
			var member_id = this.member_id;
			var accesstoken = this.accesstoken;
			var addr_id = this.addr_id;
			if(addr_id == "") {
				this.showAlert("请添加收货地址");
				return;
			}
			if(this.data.aCart.need_membercard == "true" && this.data.aCart.membercard.length == 0) {
				this.showAlert("请上传身份信息");
				return;
			}
			var idcard_image_id = "";
			if(this.data.aCart.need_membercard == "true") {
				idcard_image_id = this.idcard_image_id;
			}
			var shipping_id = this.data.def_dltype.dt_id;
			// var pay_app_id = this.data.def_payment_id;
			var pay_app_id = 'malipay';
			var memo = this.memo;
			var payment_is_tax = this.is_tax;
			var payment_tax_type = this.tax.tax_type;
			var payment_tax_company = this.tax.tax_company;
			var payment_tax_content = "明细";
			var use_balance = "";
			this.isLoading = true;
			orderService.createOrder(md5_cart_info, member_id, accesstoken, addr_id, shipping_id, pay_app_id, memo, payment_is_tax, payment_tax_type, payment_tax_company, payment_tax_content, use_balance, idcard_image_id).then((data)=>{
				this.isLoading = false;
				if(data.rsp == "succ") {
					location.href='/pay/'+data.data.order_id;
				}else {
					this.showAlert('订单生成失败');
				}
			})
		},
		showAlert: function(text) {
			this.alertText = text;
			this.isAlert = true;
			var that = this;
			setTimeout(function(){
				that.isAlert = false;
			},1000);
		},
		showDltype: function() {
			if(this.data.sale_type == 'directmail') {
				return;
			}
			this.showTag = 'dltype';
		}
	},
	events: {
		'addr-back': function() {
			this.showTag = 'main';
		},
		'on-addr-item-tap': function(addrObj) {
			this.changeAddr(addrObj);
		}
	},
	watch: {
		'showTag': function(val) {
			if(val=='tax') {
				this.tax_type = this.tax.tax_type;
				this.tax_company = this.tax.tax_company;
			}
		}
	}
});
export default Index