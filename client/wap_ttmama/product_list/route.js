import Vue from 'vue';
import Tpl from './product_list.html';
import './style.css';
import Search from '../Common_components/search/route.js';
import {getQueryString} from '../assets/js/util.js';
import produceService from '../service/productIndexService.js';
import indexService from '../service/indexService.js';
import XImg from 'vux-components/x-img';
import Spinner from 'vux-components/spinner';
import BackHome from '../Common_components/back-home/route.js';
import SpecProduct from '../Common_components/spec_product/route.js';
import $ from 'jquery';
import {Cookieget,savelocalStorage} from '../assets/js/util.js';
import Confirm from 'vux-components/confirm';
import MiniCar from '../Common_components/mini_car/route.js';
import Sticky from 'vux-components/sticky';
import Pop from '../Common_components/pop/route.js';


let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			productData: [],
			catId: null,
			page: 1,
			price: null,
			gTag: null,
			pTag: null,
			brandId: null,
			p_: null,
			s_: null,
			searchKeywords: '',
			flag: true,
			order: {
				buy_count: 1,
				price: 1
			},
			orderType: '',
			isLoading: true,
			loadingMore: false,
			bigImgTag: 1,
			screenShow: false,
			tagHeight: {
				price: 0,
				brand: 0,
				sub_cat: 0,
				tags_promotion: 0
			},
			screenTag: [],
			parentCatId: null,
			chosedTag: [],
			showSpec: false,
			productSpec: {},
			isAlert: false,
			showText: '当前库存不足',
			confirmShow: false,
			productId: null,
			cartNum: "0",
			brandData: null
		}
	},
	computed: {
		tag: function() {
			var tag = false;
			if(this.productData.screen) {
				if(this.productData.screen.length===0) {
					tag = false;
				}else if(this.productData.screen.price.length===0 && this.productData.screen.brand.length===0 && 
					this.productData.screen.sub_cat.length===0 && this.productData.screen.tags.length===0){
					tag = false;
				}else {
					tag = true;
				}
			}
			return tag;
		},
		hasNext: function() {
			return this.productData.has_next;
		},
		orderBy: function() {
			var str = '';
			if(this.orderType==='') {
				str = '';
			}else if(this.orderType==='buy_count') {
				str = 'buy_count ' + (this.order.buy_count===1?'desc':'asc');
			}else if(this.orderType==='price') {
				str = 'price ' + (this.order.price===1?'desc':'asc');
			}
			return str;
		},
		chosedTagName: function() {
			var catId = null;
			var priceId = null;
			var brandId = null;
			for(var i=0; i<this.chosedTag.length; i++) {
				if(this.chosedTag[i].type === 'cat') {
					catId = this.chosedTag[i].id;
				}else if(this.chosedTag[i].type === 'price') {
					priceId = this.chosedTag[i].id;
				}else if(this.chosedTag[i].type === 'brand') {
					brandId = this.chosedTag[i].id;
				}
			}
			return {
				catId: catId,
				priceId: priceId,
				brandId: brandId
			}
		}
	},
	components: {
		Search,
		XImg,
		Spinner,
		Confirm,
		Sticky
	},
	created: function() {
		this.catId = getQueryString('cat_id');
		this.price = getQueryString('price');
		this.gTag = getQueryString('gTag');
		this.pTag = getQueryString('pTag');
		this.brandId = getQueryString('brand_id');
		this.searchKeywords = getQueryString('search_keywords');
		produceService.getProListByParams(this.catId, this.page, this.price, this.gTag, this.pTag, this.brandId, this.p_, this.s_, this.orderBy, this.searchKeywords, this.flag).then((data)=>{
			this.isLoading = false;
			if(data.rsp === "succ") {
				this.productData = data.data;
			}else {
				this.showAlert("加载失败");
			}
		});
		if(this.brandId!=null && this.brandId!='') {
			produceService.getBrandInfo(this.brandId).then((data)=>{
				if(data.rsp==="succ") {
					this.brandData = data.data;
					savelocalStorage('brandInfo',JSON.stringify(data.data));
				}
			})
		}
		produceService.getScreen(this.catId, this.brandId, this.searchKeywords).then((data)=>{
			if(data.rsp === "succ") {
				this.screenTag = data.data;
			}
		});
	},
	ready: function() {
		this.scrollLisen();
	},
	methods: {
		goBack: function() {
			history.go(-1);
		},
		buyClick: function(productId, goodsId, store, specDesc, e) {
			e.stopPropagation();
			e.preventDefault();
			if(store <= 0) {
				this.showAlert("当前库存不足");
			}else if(specDesc) {
				this.showSpecFun(goodsId);
			}else {
				this.sureAddCart(productId);
			}
		},
		sureAddCart: function(productId) {
			var memberId = Cookieget('member_id');
			var accesstoken = Cookieget('accesstoken');
			if(!memberId || !accesstoken) {
				window.location.href='/login';
				return;
			}
			this.confirmShow = true;
			this.productId = productId;
		},
		addCart: function(num,buy_code, btype, callback) {
			var memberId = Cookieget('member_id');
			var accesstoken = Cookieget('accesstoken');
			indexService.addCart(memberId, accesstoken, this.productId, num, buy_code, btype).then((data)=>{
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
		showSpecFun: function(goodsId) {
			this.showSpec = true;
			produceService.getSpecDesc(goodsId).then((data)=>{
				if(data.rsp === "succ") {
					this.productSpec = data.data;
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
		addScreenTag: function(name, id, type) {
			var flag = false;
			for(var i=0; i<this.chosedTag.length; i++) {
				if(this.chosedTag[i].type === type) {
					this.chosedTag[i].name = name;
					this.chosedTag[i].id = id;
					flag = true;
				}
			}
			if(!flag) {
				this.chosedTag.push({name:name, id:id, type:type});
			}
		},
		delScreenTag: function(type) {
			var index = null;
			for(var i=0; i<this.chosedTag.length; i++) {
				if(this.chosedTag[i].type === type) {
					index = i;
				}
			}
			this.chosedTag = this.chosedTag.slice(0, index).concat(this.chosedTag.slice(index+1, this.chosedTag.length));
			if(type === 'cat') {
				this.catId = this.parentCatId;
			}else if(type === 'price') {
				this.price = [];
			}else if(type === 'brand') {
				this.brandId = [];
			}
			this.screenShow = false;
			this.orderTap('');
		},
		getDataByCatid: function(name, catId) {
			this.addScreenTag(name, catId, 'cat');
			this.screenShow = false;
			this.parentCatId = this.catId;
			this.catId = catId;
			this.orderTap('');
		},
		getDataByPrice: function(price, id) {
			this.addScreenTag(price, id, 'price');
			this.screenShow = false;
			if(this.price===null) {
				this.price = [];
			}
			this.price.push(price);
			this.orderTap('');
		},
		getDataByBrand: function(name, id) {
			this.addScreenTag(name, id, 'brand');
			this.screenShow = false;
			if(this.brandId===null) {
				this.brandId = [];
			}
			this.brandId.push(id);
			this.orderTap('');
		},
		showScreen: function() {
			this.screenShow = true;
		},
		orderData: function() {
			this.isLoading = true;
			this.page = 1;
			produceService.getProListByParams(this.catId, this.page, this.price, this.gTag, this.pTag, this.brandId, this.p_, this.s_, this.orderBy, this.searchKeywords, this.flag).then((data)=>{
				this.isLoading = false;
				$(document).scrollTop(0);
				if(data.rsp === "succ") {
					this.productData = data.data;
				}
			});
		},
		loadMore: function() {
			var _this = this;
			_this.loadingMore = true;
			produceService.getProListByParams(this.catId, this.page+1, this.price, this.gTag, this.pTag, this.brandId, this.p_, this.s_, this.orderBy, this.searchKeywords, this.flag).then((data)=>{
				if(data.rsp === "succ") {
					_this.loadingMore = false;
					_this.page = _this.page + 1;
					_this.productData.items = _this.productData.items.concat(data.data.items);
					_this.productData.has_next = data.data.has_next;
				}
			});
		},
		scrollLisen: function() {
			var _this = this;
			window.onscroll = function() {
				if($(document).scrollTop() >= $(document).height() - $(window).height() -100) {
					if(_this.loadingMore) return;
					if(_this.hasNext) {
						_this.loadMore();
					}
				}
			}
		},
		orderTap: function(type) {
			if(type===this.orderType) {
				if(this.orderType==='buy_count') {
					this.order.buy_count = this.order.buy_count * -1;
				}else if(this.orderType==='price') {
					this.order.price = this.order.price * -1;
				}
			}else {
				this.orderType = type;
			}
			this.orderData();
		}
	},
	watch: {
		'screenTag': function(val) {
			var price = 0;
			var brand = 0;
			var sub_cat = 0;
			var tags_promotion = 0;
			if(val.price) {
				price = val.price.length>6?1:0;
			}
			if(val.brand) {
				brand = val.brand.length>6?1:0;
			}
			if(val.sub_cat) {
				sub_cat = val.sub_cat.length>6?1:0;
			}
			if(val.tags && val.tags.promotion.tags_promotion) {
				tags_promotion = val.tags.promotion.tags_promotion.length>6?1:0;
			}
			this.tagHeight = {
				price: price,
				brand: brand,
				sub_cat: sub_cat,
				tags_promotion: tags_promotion 
			};
		},
		'showSpec': function(val) {
			if(val) {
				$('.bg').css({'overflow':'hidden'});
			}else {
				$('.bg').css({'overflow':'auto'});
			}
		},
		'screenShow': function(val) {
			if(val) {
				$('.bg').css({'overflow':'hidden'});
			}else {
				$('.bg').css({'overflow':'auto'});
			}
		}
	},
	events: {
		'on-hideSpec': function() {
			this.productSpec = {};
			this.showSpec = false;
		},
		'on-confirm': function() {
			this.addCart(1);
		},
		'on-addcart': function(index, num) {
			this.productId = this.productSpec.data[index].product_id;
			this.addCart(num);
		},
		'on-addorder': function(index, num) {
			this.productId = this.productSpec.data[index].product_id;
			this.addCart(num, '', 'is_fastbuy', function(){
				location.href = '/checkout';
			});
		}
	}
})

export default Index
