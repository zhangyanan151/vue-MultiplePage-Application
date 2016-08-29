import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import signup from '../service/signup.js';
import $ from 'jquery';
import {Cookieset,setCookieDate,checkMobile} from '../assets/js/util.js';
import Pop from '../Common_components/pop/route.js';
import clearinput from '../Common_components/clear_input/route.js';


let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			type: 'signup',
			timer: null,
			uname: '',
			vcode: '',
			prot_on: true,
			times: 120,  //一个固定值，用来重置验证码确认countdow，一处修改，全局适用
			countdown: 120,
			portShow: false,
			unameShow: true,
			vcodeShow: false,
			pwdShow: false,
			vcodeGet: true,
			signup_tips: false,
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
		signup_next: function() {
			if (this.unameShow) {
				if (!this.prot_on) {
					this.pop_show("未同意汤团妈妈服务协议");
					return false;
				}
				if(!checkMobile(this.uname)) {
					this.pop_show("不是有效的手机号码");
					return false;
				}
				if (!this.timer) {
					this.getVerify();
				} else {
					this.unameShow= false;
					this.vcodeShow= true;
					return false;
				}
			}
			if(this.vcodeShow){
				signup.validateVerify(this.vcode, this.uname, this.type).then((data) => {
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
				var license=this.prot_on ? 'on': 'off';
				signup.signupInfo(this.uname, this.password, this.psw_confirm, license, this.vcode).then((data) => {
					if (data.rsp === 'succ') {
						this.pop_show("注册成功");
						setTimeout(function(){
							history.go(-1);
						},800);
					} else if (data.rsp === 'fail') {
						this.pop_show(data.data);
					}
				});
				return false;
			}
		},
		//注册页内部返回
		signup_back: function(event) {
			if (this.vcodeShow) {
				event.preventDefault();
				this.unameShow= true;
				this.vcodeShow= false;
			}
			if (this.pwdShow) {
				event.preventDefault();
				this.vcodeShow= true;
				this.pwdShow= false;
			}
		},
		//获取验证码
		getVerify:function(){
				signup.getVerify(this.uname, this.type).then((data) => {
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
			this.signup_tips= true;
			var _this=this;
			setTimeout(function(){
				_this.signup_tips= false;
			},800);
		}
		
	}
});

export default Index