import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import $ from 'jquery';
import {Cookieget} from '../assets/js/util.js';
import orderService from '../service/orderService.js';
import Pop from '../Common_components/pop/route.js';
import Confirm from 'vux-components/confirm';
import Spinner from 'vux-components/spinner';
import indexService from '../service/indexService.js';
import userService from '../service/userService.js';

let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			order_type: '',
			member_id: null,
			accesstoken: null,
			orderData: null,
			typeHead: [
				{
					type: 'all',
					name: '全部订单'
				},
				{
					type: 'nopayed',
					name: '待付款订单'
				},
				{
					type: 'noship',
					name: '待发货订单'
				},
				{
					type: 'deliver_ship',
					name: '已发货订单'
				},
				// {
				// 	type: 'shipd',
				// 	name: '待收货订单'
				// },
				{
					type: 'nodiscuss',
					name: '待评价订单'
				},
				{
					type: 'finish',
					name: '交易成功'
				},
				{
					type: 'aftersale',
					name: '售后中订单'
				},
				{
					type: 'dead',
					name: '已失效订单'
				}
			],
			showType: false,
			isLoading: true,
			confirmShow: false,
			del_order_id: null,
			loadingMore: false,
			isPop: false,
			popText: ''
		}
	},
	components: {
		Confirm,
		Spinner
	},
	computed: {
		headTit: function() {
			var tit = "";
			for(var i in this.typeHead) {
				if(this.typeHead[i].type == this.order_type) {
					tit = this.typeHead[i].name;
				}
			}
			return tit;
		}
	},
	created: function() {
		this.order_type = this.$route.params.type ? this.$route.params.type : 'all';
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.queryData(1);
	},
	methods: {
		goDetails: function(order_id) {
			window.location.href="/order_details/"+order_id;
		},
		queryData: function(page) {
			orderService.orders(this.order_type, this.member_id, this.accesstoken, page).then((data)=>{
				this.isLoading = false;
				this.loadingMore = false;
				if(data.rsp == "succ") {
					if(page == 1) {
						this.orderData = data.data;
					}else {
						this.orderData.pager = data.data.pager;
						this.orderData.orderlist = this.orderData.orderlist.concat(data.data.orderlist);
					}
				}else if(data.res == "need_login"){
					window.location.href="/login";
				}
			})
		},
		goBack: function(e) {
			e.stopPropagation();
			e.preventDefault();
			window.history.go(-1);
		},
		choseType: function(type) {
			this.order_type = type;
			this.showType = false;
			this.isLoading = true;
			this.queryData(1);
		},
		showDelivery: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			window.location.href="/delivery/"+order_id;
		},
		deleteOrder: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			this.del_order_id = order_id;
			this.confirmShow = true;
		},
		deleteOrderHandler: function() {
			orderService.deleteOrder(this.del_order_id, this.member_id, this.accesstoken).then((data)=>{
				this.isLoading = true;
				this.queryData(1);
			});
		},
		orderCancel: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			this.$router.go('/cancel/'+order_id);
		},
		aftersale: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			location.href = '/aftersale/'+order_id;
		},
		scrollLisen: function() {
			var _this = this;
			window.onscroll = function() {
				if($(document).scrollTop() >= $(document).height() - $(window).height() -100) {
					if(_this.loadingMore) return;
					if(parseInt(_this.orderData.pager.current, 10) < _this.orderData.pager.total) {
						_this.loadingMore = true;
						_this.queryData(parseInt(_this.orderData.pager.current, 10)+1);
					}
				}
			}
		},
		reAddCart: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			indexService.reAddCart(this.member_id, this.accesstoken, order_id, '', '').then((data)=>{
				if(data.rsp == 'succ') {
					this.showPop('添加购物车成功');
				}else {
					this.showPop(data.data);
				}
			})
		},
		orderComfirem: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			this.isLoading = true;
			userService.orderConfirm(this.member_id, this.accesstoken, order_id).then((data)=>{
				if(data.rsp == 'succ') {
					this.queryData(1);
				}else {
					this.showPop(data.data);
				}
			})
		},
		showPop: function(text) {
			var _this = this;
			_this.popText = text;
			_this.isPop = true;
			setTimeout(function(){
				_this.isPop = false;
			}, 800);
		},
		discuss: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			location.href = '/order_nodiscuss/'+order_id;
		},
		toPayment: function(order_id, pay_app_id, e) {
			e.stopPropagation();
			e.preventDefault();
			location.href='/pay/'+order_id;
		}
	},
	ready: function() {
		this.scrollLisen();
	},
	events: {
		'on-confirm': function() {
			this.deleteOrderHandler();
		}
	}
});

export default Index