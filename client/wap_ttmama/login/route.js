import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import login from '../service/login.js';
import $ from 'jquery';
import {Cookieset,setCookieDate} from '../assets/js/util.js';
import Pop from '../Common_components/pop/route.js';
import clearinput from '../Common_components/clear_input/route.js';
import foundShow from '../Common_components/found-pwd/route.js';

let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			pageTitle: '快速登录',
			uname: '',
			password:'',
			eye: true,
			unameClear: false,
			pwdClear: false,
			loginShow: true,
			foundShow: false,
			unameShow: true,
			vcodeShow: false,
			pwdShow: false,
			pop_tips: false,
			showText: '',
			isLoading: false
		}
	},
	methods: {
		login_succ: function() {
			this.isLoading = true;
			login.loginData(this.uname, this.password).then((data) => {
				this.isLoading = false;
				if (data.rsp == 'succ') {
					setTimeout(function(){
						window.location.href = "/user";
					},800);
					Cookieset('member_id', data.data.member_id, setCookieDate(7));
					Cookieset('accesstoken', data.data.accesstoken, setCookieDate(7));
					Cookieset('member_pic', data.data.member_pic, setCookieDate(7));
					Cookieset('login_account', data.data.login_account, setCookieDate(7));
					Cookieset('name', data.data.name, setCookieDate(7));
				} else if (data.rsp == 'fail') {
					this.pop_show(data.data.msg);
					return false;
				}
			});
		},
		foundStart: function() {
            this.loginShow = false;
            this.foundShow = true;
            this.pageTitle = '找回密码';
        },
        pageBack: function(event) {
        	if(this.foundShow) {
                if (this.unameShow) {
                    event.preventDefault();
                    this.foundShow = false;
                    this.loginShow = true;
                }
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
            }
        },
		//消息提示框状态变化方法
		pop_show: function(text) {
			this.showText = text;
			this.pop_tips = true;
			var _this=this;
			setTimeout(function(){
				_this.pop_tips = false;
			},800);
		}
	}
});


export default Index