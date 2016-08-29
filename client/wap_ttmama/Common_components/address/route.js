import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import Pop from '../pop/route.js';
import {Cookieget,checkMobile,filterAddr,filterAddrValue} from '../../assets/js/util.js';
import userService from '../../service/userService.js';
import $ from 'jquery';
import Address from 'vux-components/address';
import addrJson from '../../static/address.js';

let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			tag: 'default',
			addData: null,
			isLoading: true,
			leftId: null,
			member_id: null,
			accesstoken: null,
			regions: null,
			addrList: addrJson.default.provinces,			
			showAlert: false,
			showText: '',
			addrInfo: {
				addrId: '',
				addrName: '',
				addrMobile: '',
				addrDesc: '',
				zip: '',
				tel: '',
				def_addr: '',
				addrValue: []
			}
		}
	},
	components: {
		Address
	},
	created: function() {
		this.initData();
	},
	computed: {
		delZindex: function() {
			if(this.leftId === null) {
				return 10;
			}else {
				return 30;
			}
		}
	},
	methods: {
		addAddr: function() {
			userService.addReceiver(this.member_id, this.accesstoken).then((data)=>{
				if(data.rsp=="succ") {
					this.tag = 'addAddr';
				}else if(data.data == "4003") {
					this.showPop(data.res);
				}
			})
			
		},
		submitAddr: function() {
			if(this.addrInfo.addrName==''||this.addrInfo.addrMobile==''||this.addrInfo.addrValue==[]||this.addrInfo.addrDesc=='') {
				this.showPop('请完善信息');
				return;
			}
			if(!checkMobile(this.addrInfo.addrMobile)) {
				this.showPop('请输入正确的手机号码');
				return;
			}
			
			var area = 'mainland:';
			area += filterAddr(this.addrInfo.addrValue, this.addrList);
			area += ":";
			if(this.addrInfo.addrValue[2].indexOf("--")<0) {
				area += this.addrInfo.addrValue[2];
			}
			userService.addAddress(this.member_id, this.accesstoken, this.addrInfo.addrId, area, this.addrInfo.addrDesc, this.addrInfo.addrName, this.addrInfo.zip, this.addrInfo.tel, this.addrInfo.addrMobile, this.addrInfo.def_addr).then((data)=>{
				if(data.rsp == 'succ') {
					this.initData();
					this.tag = 'default';
					this.clearAddrInfo();
				}else {
					this.showPop('添加地址失败');
				}
			})
		},
		showPop: function(text) {
			this.showAlert = true;
			this.showText = text;
			var that = this;
			setTimeout(function(){
				that.showAlert = false;
			},800);
		},
		initData: function() {
			this.member_id = Cookieget('member_id');
			this.accesstoken = Cookieget('accesstoken');
			userService.userAddress(this.member_id, this.accesstoken).then((data)=>{
				this.isLoading = false;
				if(data.rsp === "succ") {
					this.addData = data.data;
				}else if(data.res === "need_login") {
					window.location.href="/login";
				}
			});
		},
		moveLeft: function(e, index) {
			if(this.leftId === null) {
				$("#addr-item-"+index).css({
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
						$("#addr-item-"+index).css({
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
						$("#addr-item-"+index).css({
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
						$("#addr-item-"+index).parent().find(".item-dele-coll").css({
							'z-index': this.delZindex
						});
					}
				}
			}
		},
		hideTap: function(e) {
			$("#addr-item-"+this.leftId).css({
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
			$("#addr-item-"+id).parent().find(".item-dele-coll").css({
				'z-index': this.delZindex
			});
			window.event.returnValue = false;
			return false;
		},
		editAddr: function(index, e) {
			e.stopPropagation();
			e.preventDefault();
			this.leftId = null;
			userService.modifyAddress(this.member_id, this.accesstoken, this.addData[index].addr_id).then((data)=>{
				if(data.rsp == 'succ') {
					this.addrInfo.addrId = data.data.addr_id;
					this.addrInfo.addrName = data.data.name;
					this.addrInfo.addrMobile = data.data.phone.mobile;
					this.addrInfo.addrDesc = data.data.addr;
					this.addrInfo.zip = data.data.zipcode;
					this.addrInfo.tel = data.data.phone.tel;
					this.addrInfo.def_addr = data.data.default;
					this.addrInfo.addrValue=filterAddrValue(data.data.area, this.addrList);
					this.tag = "editAddr";
				}
			})
		},
		editAddr2: function(addrObj) {
			this.leftId = null;
			userService.modifyAddress(this.member_id, this.accesstoken, addrObj.addr_id).then((data)=>{
				if(data.rsp == 'succ') {
					this.addrInfo.addrId = data.data.addr_id;
					this.addrInfo.addrName = data.data.name;
					this.addrInfo.addrMobile = data.data.phone.mobile;
					this.addrInfo.addrDesc = data.data.addr;
					this.addrInfo.zip = data.data.zipcode;
					this.addrInfo.tel = data.data.phone.tel;
					this.addrInfo.def_addr = data.data.default;
					this.addrInfo.addrValue=filterAddrValue(data.data.area, this.addrList);
					this.tag = "editAddr";
				}
			})
		},
		deleteAddr: function(index, e) {
			e.stopPropagation();
			e.preventDefault();
			this.isLoading = true;
			userService.deleteAddr(this.member_id, this.accesstoken, this.addData[index].addr_id).then((data)=>{
				this.isLoading = false;
				if(data.rsp === "succ") {
					this.initData();
				}
			})
		},
		addrBack: function() {
			this.$dispatch('addr-back');
		},
		clearAddrInfo: function() {
			this.addrInfo.addrId = '';
			this.addrInfo.addrName = '';
			this.addrInfo.addrMobile = '';
			this.addrInfo.addrDesc = '';
			this.addrInfo.zip = '';
			this.addrInfo.tel = '';
			this.addrInfo.def_addr = '';
			this.addrInfo.addrValue = [];
		},
		setDefaultAddr: function(index, e) {
			e.stopPropagation();
			e.preventDefault();
			if(this.addData[index].def_addr=="1") {
				return;
			}else {
				this.isLoading = true;
				userService.setDefaultAddr(this.member_id, this.accesstoken, this.addData[index].addr_id, '2').then((data)=>{
					this.isLoading = false;
					if(data.rsp == "succ") {
						this.initData();
					}
				})
			}
		},
		addrItemTap: function(index, e) {
			e.stopPropagation();
			e.preventDefault();
			this.$dispatch('on-addr-item-tap', this.addData[index]);
		}
	},
	watch: {
		'tag': function(val) {
			if(val == 'editAddr' || val == 'addAddr') {
				this.$els.addrName.focus();
			}
			if(val == 'default') {
				this.clearAddrInfo();
			}
		}
	},
	events: {
		'toEditAddr': function(addrObj) {
			this.editAddr2(addrObj);
		}
	}
});
var myComplate = Vue.component('my-address', Index);
export default myComplate;