import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import $ from 'jquery';
import { Cookieget } from '../../assets/js/util.js';
import coupon from '../../service/userService.js';

var headImg = require('../../assets/head.png');
let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			member_id: null,
			accesstoken: null,
			member_pic: null,
			headImg: headImg,
			active: '0',
			useable: true,
			couponListSty: [
				{borderColor: '#FCA6A6', color: '#F95555'},
				{borderColor: '#BEE990', color: '#7ED321'},
				{borderColor: '#FEAA34', color: '#FF9500'},
				{borderColor: '#f4f4f4', color: '#b9b9b9'}
			],
			couponList: [],
			typeIndex: 'a',
			couponEmpty: false
		}
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.member_pic = Cookieget('member_pic');
		this.getCouponData(this.member_id, this.accesstoken, true, this.type.typeCode);
	},
	computed:{
		type: function() {
			var index;
			switch (this.typeIndex){
				case 'a':
					index = 0;
					break;
				case 'b':
					index = 1;
					break;
				case 'c':
					index = 2;
					break;
				default:;
			}
			var type = [{typeCode: 'a', typeText: '优惠券'},
					  {typeCode: 'b', typeText: '折扣卡'},
					  {typeCode: 'c', typeText: '包邮卡'}
				];
			if (this.active == 3) {
				return type[index];
			} else {
				return type[this.active];
			}
			
		}
	},
    methods: {
    	getCoupon: function(type) {
    		this.active = type;
    		this.couponList = [];
    		this.getCouponData(this.member_id, this.accesstoken, true, this.type.typeCode);
    	},
    	getCouponData :function(member_id ,accesstoken ,isuseable ,typecode) {
			coupon.couponData(member_id, accesstoken, isuseable, typecode ).then((data) => {
    			
    			if (data.rsp === 'succ') {
    				var couponLength = data.data.coupon_data.length;
    				if(couponLength < 1){
    					this.couponEmpty = true;
    					return false;
    				}else{
    					this.couponEmpty = false;
    				}
    				for(var i=0;i<couponLength;i++){
    					this.typeIndex = data.data.coupon_data[i].coupons_info.card_type;
    					this.couponList.push({
    						'name': data.data.coupon_data[i].coupons_info.cpns_name,
    						'to_time': data.data.coupon_data[i].time.to_time,
    						'type': this.type.typeText
    					});
    				}
					
				}
    		});
    	},
		toUnuseable: function() {
			this.useable = false;
			this.active = '3';
			this.couponList = [];
			this.getCouponData(this.member_id, this.accesstoken, false);
		},
		touseable: function(event) {
			if (!this.useable){
				event.preventDefault();
				this.useable = true;
				this.active = '0';
				this.couponList = [];
				this.getCouponData(this.member_id, this.accesstoken, true, this.type.typeCode);
			}
			
		}

	}
})
export default Index