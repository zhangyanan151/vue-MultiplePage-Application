import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import $ from 'jquery';
import {Cookieget} from '../../assets/js/util.js';
import Pop from '../../Common_components/pop/route.js';
import inputClear from '../../Common_components/clear_input/route.js';
import signupService from '../../service/signup.js';
import boundService from '../../service/userService.js';

let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			type: 'signup',
			timer: null,
			countdown: 120,
			vcodeGet: false,
			isBound: true,
			uname: '',
			vcode: '',
			password: '',
			unameClear: false,
			vcodeClear: false,
			pwdClear: false,
			eye: true,
			bound_tips: false,
			showText: ''
		}
	},
	created: function() {
        this.member_id = Cookieget('member_id');
        this.accesstoken = Cookieget('accesstoken');
        this.initData();
	},
	methods: {
		initData: function() {
			boundService.isBound(this.member_id, this.accesstoken).then((data)=>{
				if(data.rsp === 'succ') {
					this.uname = data.data;
				}else if(data.rsp === "fail") {
					this.isBound = false;
					this.$els.userName.focus();
				}
			});
		},
		//获取验证码
		getVerify:function(){
			signupService.getVerify(this.uname, this.type).then((data) => {
				if (data.rsp === 'succ') {
					this.vcodeGet = true;
					var _this=this;
					this.timer=setInterval(function(){
						if(_this.countdown<1){
							clearInterval(_this.timer);
							_this.timer= null;
							_this.vcodeGet= false;
							return false;
						}
					_this.countdown--;
					},1000);
				} else if (data.rsp === 'fail') {
					this.pop_show(data.data);
					return false;
				}
			});
		},
		bound: function() {
			boundService.toBound(this.member_id, this.accesstoken, this.vcode, this.uname, this.password, this.type).then((data)=>{
				if(data.rsp === 'succ') {
					window.location.href = "/user";
				}else if(data.rsp === "fail") {
					this.pop_show(data.data);
				}
			});
		},
		//消息提示框状态变化方法
		pop_show: function(text) {
			this.showText=text;
			this.bound_tips= true;
			var _this=this;
			setTimeout(function(){
				_this.bound_tips= false;
			},800);
		}
	}
});

export default Index