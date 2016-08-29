import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import foundPwd from '../../service/signup.js';
import $ from 'jquery';
import {Cookieset,setCookieDate,checkMobile} from '../../assets/js/util.js';
import Pop from '../pop/route.js';
import clearinput from '../clear_input/route.js';


let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			type: 'forgot',
			timer: null,
			uname: '',
			vcode: '',
			times: 120,  //一个固定值，用来重置验证码确认countdow，一处修改，全局适用
			countdown: 120,
			unameShow: true,
			vcodeShow: false,
			pwdShow: false,
			vcodeGet: true,
			found_tips: false,
			showText: '',
			password:'',
			psw_confirm:'',
			eye: true,
			unameClear: false,
			pwdClear: false,
			pwd2Clear: false
		}
	},
	methods: {
		//点击下一步时，分别检验账号、验证码和密码
		found_next: function() {
			if (this.unameShow) {
				if(!checkMobile(this.uname)) {
					this.pop_show("不是有效的手机号码");
					return false;
				}
				this.idVerify(this.type, this.uname);
				if (!this.timer) {
					this.getVerify();
				} else {
					this.unameShow= false;
					this.vcodeShow= true;
					return false;
				}
			}
			if(this.vcodeShow){
				foundPwd.validateVerify(this.vcode, this.uname, this.type).then((data) => {
					if (data.rsp === 'succ') {
						this.vcodeShow= false;
						this.pwdShow= true;
					} else if (data.rsp === 'fail') {
						this.pop_show(data.data);
						return false;
					}
				});
			}
			if (this.pwdShow) {
				if (this.password=='') {
					this.pop_show("密码不能为空");
					return false;
				} else if (this.password!=this.psw_confirm){
					this.pop_show("两次密码输入不一致");
					return false;
				}
				foundPwd.foundInfo(this.vcode, this.password, this.psw_confirm, this.uname).then((data) => {
					if (data.rsp === 'succ') {
						this.pop_show("成功找回密码");
						setTimeout(function(){
							window.location.href = "/user";
						},800);
					} else if (data.rsp === 'fail') {
						this.pop_show(data.data);
					}
				});
				return false;
			}
		},
		//身份验证
		idVerify: function(send_type, username) {
			foundPwd.idVerify(send_type, username).then((data) => {
					if (data.rsp === 'fail') {
						this.pop_show(data.data);
						return false;
					}
				});
		},
		//获取验证码
		getVerify: function(){
				foundPwd.getVerify(this.uname, this.type).then((data) => {
					if (data.rsp === 'succ') {
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
						this.unameShow= false;
						this.vcodeShow= true;
					} else if (data.rsp === 'fail') {
						this.pop_show(data.data);
						return false;
					}
				});
		},
		//重新获取验证码
		regetVerify: function() {
			this.vcodeGet= true;
			this.countdown= this.times;
			this.getVerify();
		},
		//消息提示框状态变化方法
		pop_show: function(text) {
			this.showText=text;
			this.found_tips= true;
			var _this=this;
			setTimeout(function(){
				_this.found_tips= false;
			},800);
		}
		
	}
});

var myComplate = Vue.component('found-pwd', Index);
export default myComplate;