import Vue from 'vue';
import Tpl from './product_details.html';
import './style.css';
import $ from 'jquery';
import {getQueryString,Cookieget} from '../assets/js/util.js';
import indexService from '../service/indexService.js';
import productService from '../service/productIndexService.js';
import Tab from 'vux-components/tab';
import TabItem from 'vux-components/tab-item';
import Swiper from 'vux-components/swiper';
import Spinner from 'vux-components/spinner';
import filter from '../service/filters.js';
import BackHome from '../Common_components/back-home/route.js';
import Scroller from 'vux-components/scroller';
import SpecProduct from '../Common_components/spec_product/route.js';
import MiniCar from '../Common_components/mini_car/route.js';
import ShareComponent from '../Common_components/share_component/route.js';
import xImg from 'vux-components/x-img';
import Pop from '../Common_components/pop/route.js';
let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			goods_id: null,
			product_id: null,
			member_id: null,
			detailData: null,
			productName: null,
			isLoading: true,
			nowSpec: '请选择商品规格',
			goodsLinkDate: null,
			showTag: 0,
			commentData: null,
			commentPage: 1,
			loadingMore: false,
			showSpec: false,
			showText: '',
			isAlert: false,
			shareShow: false,
			showBigImg: false
		}
	},
	computed: {
		swiperImgs: function() {
			var imgs = [];
			if(this.detailData) {
				var len = this.detailData.imgs.length;
				len = len > 6 ? 6 : len;
				for(var i=0; i<len; i++) {
					imgs.push({
						url: 'javascript:',
						img: this.detailData.imgs[i],
						tit: ''
					});
				}
			}
			return imgs;
		},
		nowProduct: function() {
			return this.detailData.now_product;
		},
		defaultIndex: function() {
			var defaultIndex = '';
			if(this.detailData.product.spec[0]){
				for(var obj in this.detailData.product.data) {
					if(this.detailData.product.data[obj].is_default==="true") {
						defaultIndex = obj;
					}
				}
			}
			return defaultIndex;
		},
		is_fav: function() {
			var is_fav = "false";
			if(this.detailData) {
				is_fav = this.detailData.is_fav
			}
			return is_fav;
		},
		current_url: function() {
			return document.location.href;
		}
	},
	created: function() {
		this.goods_id = getQueryString('goods_id');
		this.product_id = getQueryString('product_id');
		this.member_id = Cookieget('member_id');
		productService.getGoodsDetail(this.goods_id, this.product_id, this.member_id).then((data)=>{
			this.isLoading = false;
			if(data.rsp==="succ") {
				this.detailData = data.data;
				if(this.detailData.name!=null){
					this.productName = this.detailData.name;
				}
			}
		});
		productService.getGoodsLink().then((data)=>{
			if(data.rsp==="succ") {
				this.goodsLinkDate = data.data;
			}
		})
	},
	components: {
		Tab,
		TabItem,
		Swiper,
		Spinner,
		Scroller,
		xImg
	},
	methods: {
		getCommentData: function(goods_id, page) {
			productService.getComment(goods_id, page).then((data)=>{
				if(data.rsp==="succ") {
					if(this.commentData==null) {
						this.commentData = data.data;
					}else {
						this.loadingMore = false;
						this.commentData.has_next = data.data.has_next;
						this.commentData.discuss = this.commentData.discuss.concat(data.data.discuss);
						this.commentPage ++;
					}
				}
			});
		},
		scrollLisen: function() {
			var _this = this;
			window.onscroll = function() {
				if(_this.showTag == 2) {
					if($(document).scrollTop() >= $(document).height() - $(window).height() -100) {
						if(_this.loadingMore) return;
						if(_this.commentData.has_next) {
							_this.loadingMore = true;
							_this.getCommentData(_this.goods_id, _this.commentPage+1);
						}
					}
				}
			}
		},
		addCart: function(productId, num, buy_code, btype, callback) {
			var memberId = Cookieget('member_id');
			var accesstoken = Cookieget('accesstoken');
			if(memberId==null || memberId==='') {
				window.location.href="/login";
				return;
			}
			indexService.addCart(memberId, accesstoken, productId, num, buy_code, btype).then((data)=>{
				if(data.rsp === "succ") {
					if(callback) {
						callback();
					}else {
						this.showAlert("添加购物车成功");
						this.$broadcast('update-cart');
					}
				}else {
					this.showAlert("添加购物车失败");
				}
			});
		},
		showAlert: function(text) {
			var _this = this;
			_this.showText = text;
			_this.isAlert = true;
			setTimeout(function(){
				_this.isAlert = false;
			}, 900);
		},
		toAddCart: function() {
			if(this.detailData.product.spec[0]) {
				if(this.nowSpec === '请选择商品规格') {
					this.showSpec = true;
					return;
				}else {
					var productId = this.detailData.product.data[this.defaultIndex].product_id;
					this.addCart(productId, 1);
				}
			}else {
				var productId = this.detailData.now_product.product_id;
				this.addCart(productId, 1);
			}
		},
		toBuy: function() {
			if(this.detailData.product.spec[0]) {
				if(this.nowSpec === '请选择商品规格') {
					this.showSpec = true;
					return;
				}else {
					var productId = this.detailData.product.data[this.defaultIndex].product_id;
					this.addCart(productId, 1, '', 'is_fastbuy', function(){
						location.href = '/checkout';
					});
				}
			}else {
				var productId = this.detailData.now_product.product_id;
				this.addCart(productId, 1, '', 'is_fastbuy', function(){
					location.href = '/checkout';
				});
			}
		},
		favGoods: function() {
			var memberId = Cookieget('member_id');
			var accesstoken = Cookieget('accesstoken');
			if(memberId==null || memberId==='') {
				window.location.href="/login";
				return;
			}
			this.isLoading = true;
			if(this.is_fav === "false") {
				indexService.addFav(memberId, accesstoken, this.detailData.goods_id).then((data)=>{
					this.isLoading = false;
					if(data.rsp === "succ") {
						this.detailData.is_fav = "true";
						this.showAlert("收藏成功");
					}else {
						this.showAlert(data.data);
					}
				});
			}else {
				indexService.delFav(memberId, accesstoken, this.detailData.goods_id).then((data)=>{
					this.isLoading = false;
					if(data.rsp === "succ") {
						this.detailData.is_fav = "false";
						this.showAlert("收藏取消");
					}
				});
			}		
		},
		checkLogin: function(event) {
			if(!Cookieget('member_id') || !Cookieget('accesstoken')){
	            window.location.href = "/login";
	            event.preventDefault();
	        }
		}
	},
	watch: {
		showTag: function(val) {
			if(val==2) {
				if(this.commentData == null) {
					this.getCommentData(this.nowProduct.goods_id, 1);
				}
			}
		},
		showSpec: function() {
			this.nowSpec = this.detailData.product.data[this.defaultIndex].spec_desc;
		}
	},
	events: {
		'on-hideSpec': function() {
			this.showSpec = false;
		},
		'on-addcart': function(index, num) {
			var productId = this.detailData.product.data[index].product_id;
			this.addCart(productId, num);
		},
		'on-addorder': function(index, num) {
			var productId = this.detailData.product.data[index].product_id;
			this.addCart(productId, num, '', 'is_fastbuy', function(){
				location.href = '/checkout';
			});
		},
		'on-show-bigimg': function(flag) {
			this.showBigImg = flag;
		}
	}
})

export default Index
