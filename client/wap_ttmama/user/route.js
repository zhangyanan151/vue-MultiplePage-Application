import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import $ from 'jquery';
import {getQueryString,Cookieget,Cookieunset} from '../assets/js/util.js';
import FootIndex from '../Common_components/foot_index/route.js';
import indexService from '../service/indexService.js';
import userService from '../service/userService.js';
import Swiper from 'vux-components/swiper';
let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			isLogin: false,
			member_id: null,
			accesstoken: null,
			member_pic: null,
			name: null,
			cartNum: 0,
			myData: null,
			scrollDown: false,
			headBack: null,
			topHeight: 0,
			slideData: null,
			userHeadWidth: '',
			userHeadOpc: ''
		}
	},
	components: {
		Swiper
	},
	computed: {
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.member_pic = Cookieget('member_pic');
		this.name = Cookieget('name');
		if(this.member_id != null && this.member_id !== '') {
			this.isLogin = true;
		}
		userService.memberHeadBack().then((data)=>{
			if(data.rsp === "succ") {
				this.headBack = data.data.ad_img;
			}
		})
		userService.userSilde().then((data)=>{
			if(data.rsp == "succ") {
				this.slideData = [];
				for(var i=0; i<data.data.length; i++) {
					this.slideData.push({
						url: data.data[i].ad_url,
						img: data.data[i].ad_img,
						tit: ''
					});
				}
			}
		})
		if(this.isLogin) {
			indexService.getCartNum(this.member_id, this.accesstoken).then((data)=>{
				if(data.rsp==="succ") {
					this.cartNum = data.data;
				}else {
					this.cartNum = 0;
					if(data.res === "need_login") {
						this.isLogin = false;
						this.clearCookie();
					}
				}
			});
			userService.myTtmama(this.member_id, this.accesstoken).then((data)=>{
				if(data.rsp == "succ") {
					this.myData = data.data;
				}else if(data.res == "need_login") {
					this.isLogin = false;
					this.clearCookie();
				}
			});
		}
	},
	ready: function(){
		var _this = this;
		window.onload=function(){
			_this.topHeight = $("#headBox").height();
		}
		this.scrollListen();
	},
	methods: {
		scrollListen: function() {
			var _this = this;
			window.onscroll = function() {
				var scroll = $(document).scrollTop();
				var size = 100 - scroll;
				size = size <= 70 ? 70 : size;
				size = size >= 100 ? 100 : size;
				_this.userHeadWidth=size+'%';
				if(size==70) {
					_this.scrollDown = true;
				}else {
					_this.scrollDown = false;
				}
				if(scroll>90) {
					_this.userHeadOpc = '1';
				}else {
					_this.userHeadOpc = '0.85';
				}
			}
		},
		goLogin: function() {
			window.location.href="/login";
		},
		clearCookie: function() {
			Cookieunset('member_id');
			Cookieunset("accesstoken");
			Cookieunset("login_account");
			Cookieunset("member_pic");
			Cookieunset("name");
		},
		goOrder: function(type) {
			window.location.href="/order/"+type;
		},
		checkLogin: function(event) {
			if(!Cookieget('member_id') || !Cookieget('accesstoken')){
	            window.location.href = "/login";
	            event.preventDefault();
	        }
		}
	}
});
export default Index