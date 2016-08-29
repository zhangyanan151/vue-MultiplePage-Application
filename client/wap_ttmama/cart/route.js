import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import indexService from '../service/indexService.js';
import Sticky from 'vux-components/sticky';
import Tab from 'vux-components/tab';
import TabItem from 'vux-components/tab-item';
import Scroller from 'vux-components/scroller';
import $ from 'jquery';
import {Cookieget} from '../assets/js/util.js';
import Pop from '../Common_components/pop/route.js';


let isLogin = false;
var headImg = require('../assets/head.png');

let Index = Vue.extend({
	template: Tpl,
	init: function(){
		if(!Cookieget('accesstoken') || !Cookieget('member_id')) {
			isLogin = false;
		}else {
			isLogin = true;
		}
	},
	components: {
		TabItem,
		Tab,
		Sticky,
		Scroller
	},
	data: ()=>{
		return {
			isLoading: true,
			isLogin: isLogin,
			headImg: headImg,
			cartData: [],
			stockData: [],
			bondedData: [],
			directmailData: [],
			// cartTab: {
			// 	stock: true,
			// 	bonded: false,
			// 	directmail: false
			// },
			member_id: '',
			accesstoken: '',
			leftId: null,
			isSubmit: false,
			submitDesc: false,
			showText: '订单生成失败,请稍后重试',
			showType: false,
			typeHead: [
				{
					type: 'stock',
					name: '购物车(现货)'
				},
				{
					type: 'bonded',
					name: '购物车(保税仓)'
				},
				{
					type: 'directmail',
					name: '购物车(直邮)'
				}
			],
			sale_type: 'stock'
		}
	},
	computed: {
		headTit: function() {
			var tit = "";
			for(var i in this.typeHead) {
				if(this.typeHead[i].type == this.sale_type) {
					tit = this.typeHead[i].name;
				}
			}
			return tit;
		},
		curData: function() {
			var data = [];
			if(this.sale_type == 'stock') {
				data = this.stockData;
			}else if(this.sale_type == 'bonded') {
				data = this.bondedData;
			}else if(this.sale_type == 'directmail') {
				data = this.directmailData;
			}
			return data;
		},
		checkAll: function() {
			var checkAll = true;
			for(var i=0;i<this.curData.length;i++) {
				if(this.curData[i].is_submit == 'false') {
					checkAll = false;
					break;
				}
			}
			
			return checkAll;
		},
		sumPrice: function() {
			var sumPrice = 0;
			for(var i=0;i<this.curData.length;i++) {
				if(this.curData[i].is_submit == "true") {
					var num = parseInt(this.curData[i].quantity, 10);
					sumPrice += parseFloat(this.curData[i].price.price) * num;
				}
			}
			return sumPrice;
		},
		checkNum: function() {
			var num = 0;
			for(var i=0;i<this.curData.length;i++) {
				if(this.curData[i].is_submit == "true") {
					num += parseInt(this.curData[i].quantity, 10);
				}
			}
			return num;
		},
		delZindex: function() {
			if(this.leftId === null) {
				return 10;
			}else {
				return 30;
			}
		},
		hideIndex: function() {
			if(this.leftId === null) {
				return 1;
			}else {
				return 20;
			}
		}
	},
	created: function() {
		if(this.isLogin) {
			this.gotData();
		}else {
			this.isLoading = false;
		}
	},
	methods: {
		goBack: function(e) {
			e.stopPropagation();
			e.preventDefault();
			history.back();
		},
		choseType: function(type) {
			this.sale_type = type;
			this.showType = false;
			this.leftId = null;
		},
		gotData: function() {
			//已经登录，获取购物车信息
			this.member_id = Cookieget('member_id');
			this.accesstoken = Cookieget('accesstoken');
			indexService.cartData(this.member_id, this.accesstoken).then((data)=>{
				this.isLoading = false;
				if(data.rsp === 'succ') {
					this.initData(data.data);
				}else if(data.res === "need_login") {
					this.isLogin = false;
				}
			});
		},
		showLoad: function() {
			var _this = this;
			_this.isLoading = true;
			setTimeout(function(){
				_this.isLoading = false;
			},800);
		},
		initData: function(data) {
			this.cartData = data;
			var bondedData = [];
			var stockData = [];
			var directmailData = [];
			for(var i=0, j=data.object.goods.length; i<j; i++) {
				var obj = data.object.goods[i];
				if(obj.sale_type === 'stock') {
					stockData.push(obj);
				}else if(obj.sale_type === 'bonded') {
					bondedData.push(obj);
				}else if(obj.sale_type === 'directmail') {
					directmailData.push(obj);
				}
			}
			this.bondedData = bondedData;
			this.stockData = stockData;
			this.directmailData = directmailData;
			if(stockData.length != 0) {
				this.sale_type = 'stock';
			}else if(bondedData.length != 0) {
				this.sale_type = 'bandenData';
			}else if(directmailData.length != 0) {
				this.sale_type = 'directmail';
			}else {
				this.sale_type = 'stock';
			}
		},
		tabClick: function(tab) {
			if(tab === 'stock') {
				this.cartTab = {
					stock: true,
					bonded: false
				}
			}else {
				this.cartTab = {
					stock: false,
					bonded: true
				}
			}
			this.leftId = null;
		},
		changeAll: function(check) {
			for(var i=0;i<this.curData.length;i++) {
				this.curData[i].is_submit = !check + '';
			}
		},
		substractNum: function(index, e) {
			e.stopPropagation();
			e.preventDefault();
			this.showLoad();
			var num = parseInt(this.curData[index].quantity, 10);
			this.curData[index].quantity = num > 1 ? num-1 : num; 
			this.updateCart('goods', this.curData[index].obj_ident, this.curData[index].quantity);

		},
		addNum: function(index, e) {
			e.stopPropagation();
			e.preventDefault();
			this.showLoad();
			var num = parseInt(this.curData[index].quantity, 10);
			this.curData[index].quantity = num < parseInt(this.curData[index].store, 10) ? num + 1 : num; 
			this.updateCart('goods', this.curData[index].obj_ident, this.curData[index].quantity);
		},
		updateCart: function(obj_type, obj_ident, quantity) {
			// 更新购物车
			indexService.updateCart(this.member_id, this.accesstoken, obj_type, obj_ident, quantity).then((data)=>{
				if(data.rsp==='succ') {
					this.initData(data.data);
				}
			});
		},
		deleteCart: function(index, e) {
			e.stopPropagation();
			e.preventDefault();
			this.leftId = null;
			var obj_type = 'goods';
			var obj_ident = this.curData[index].obj_ident;
			indexService.deleteCart(this.member_id, this.accesstoken, obj_type, obj_ident).then((data)=>{
				if(data.rsp === 'succ') {
					this.initData(data.data);
				}
			});
		},
		addFav: function(index, e) {
			e.stopPropagation();
			e.preventDefault();
			this.isLoading = true;
			var gid = this.curData[index].goods_id;
			indexService.addFav(this.member_id, this.accesstoken, gid).then((data)=>{
				this.isLoading = false;
				this.showAlert(data.data);
			});
		},
		showAlert: function(text) {
			var _this = this;
			_this.showText = text;
			_this.submitDesc = true;
			setTimeout(function(){
				_this.submitDesc = false;
			}, 900);
		},
		moveLeft: function(e, index) {
			if(this.leftId === null) {
				$("#item_desc_"+index).css({
					"transform": "translateX("+ e.deltaX + "px)",
					"transition-duration": '0s',
					"transition-property": 'transform',
					"-webkit-transform": "translateX("+ e.deltaX + "px)",
					"-webkit-transition-duration": '0s',
					"-webkit-transition-property": 'transform',
					"-moz-transform": "translateX("+ e.deltaX + "px)",
					"-moz-transition-duration": '0s',
					"-moz-transition-property": 'transform'
				});
				if(e.isFinal) {
					if(e.deltaX>-50) {
						$("#item_desc_"+index).css({
							"transform":"translateX(0px)",
							"transition-duration": ".3s",
							"transition-property": "transform",
							"-webkit-transform":"translateX(0px)",
							"-webkit-transition-duration": ".3s",
							"-webkit-transition-property": "transform",
							"-moz-transform":"translateX(0px)",
							"-moz-transition-duration": ".3s",
							"-moz-transition-property": "transform"
						});
						this.leftId = null;
					}else {
						$("#item_desc_"+index).css({
							"transform": "translateX(-1.9rem)",
							"transition-duration": ".3s",
							"transition-property": "transform",
							"-webkit-transform": "translateX(-1.9rem)",
							"-webkit-transition-duration": ".3s",
							"-webkit-transition-property": "transform",
							"-moz-transform": "translateX(-1.9rem)",
							"-moz-transition-duration": ".3s",
							"-moz-transition-property": "transform"
						});
						this.leftId = index;
						$("#item_desc_"+index).parent().find(".item-dele-coll").css({
							'z-index': this.delZindex
						});
					}
				}
			}
		},
		hideTap: function(e) {
			$("#item_desc_"+this.leftId).css({
				"transform":"translateX(0px)",
				"transition-duration": "0.3s",
				"transition-property": "transform",
				"-webkit-transform":"translateX(0px)",
				"-webkit-transition-duration": ".3s",
				"-webkit-transition-property": "transform",
				"-moz-transform":"translateX(0px)",
				"-moz-transition-duration": ".3s",
				"-moz-transition-property": "transform"
			});
			let id = this.leftId;
			this.leftId = null;
			$("#item_desc_"+id).parent().find(".item-dele-coll").css({
				'z-index': this.delZindex
			});
			window.event.returnValue = false;
			return false;
		},
		checkSubmit: function(index, e) {
			e.stopPropagation();
			var obj = this.curData[index];
			if(obj.is_submit=='true') {
				obj.is_submit = 'false';
			}else {
				obj.is_submit = 'true';
			}
		},
		submitCart: function() {
			this.isSubmit = true;
			var obj_ident = [];
			var is_submit = [];
			var buy_num = [];
			for(var i=0; i<this.curData.length; i++) {
				var obj = this.curData[i];
				obj_ident.push(obj.obj_ident);
				is_submit.push(obj.is_submit=='true'?1:0);
				buy_num.push(obj.quantity);
			}
			if(this.sale_type != 'stock') {
				for(var i=0; i<this.stockData.length; i++) {
					var obj = this.stockData[i];
					obj_ident.push(obj.obj_ident);
					is_submit.push(0);
					buy_num.push(obj.quantity);
				}
			}
			if(this.sale_type != 'bonded') {
				for(var i=0; i<this.bondedData.length; i++) {
					var obj = this.bondedData[i];
					obj_ident.push(obj.obj_ident);
					is_submit.push(0);
					buy_num.push(obj.quantity);
				}
			}
			if(this.sale_type != 'directmail') {
				for(var i=0; i<this.directmailData.length; i++) {
					var obj = this.directmailData[i];
					obj_ident.push(obj.obj_ident);
					is_submit.push(0);
					buy_num.push(obj.quantity);
				}
			}
			indexService.submitCart(obj_ident, this.member_id, this.accesstoken, is_submit, buy_num).then((data)=>{
				this.isSubmit = false;
				if(data.rsp === "succ") {
					window.location.href='/checkout';
				}else {
					this.showAlert('订单生成失败,请稍后重试');
				}
			});
		},
		goDetails: function(goods_id) {
			window.location.href="/details?goods_id="+goods_id;
		}
	}
});

export default Index