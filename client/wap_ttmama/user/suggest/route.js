import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import $ from 'jquery';
import {Cookieget} from '../../assets/js/util.js';
import Pop from '../../Common_components/pop/route.js';
import userService from '../../service/userService.js';

let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			comment: '',
			suggest_tips: false,
			showText: ''
		}
	},
	init: function(){
		this.member_id = Cookieget('member_id');
    	this.accesstoken = Cookieget('accesstoken');
	},
	methods: {
		suggestSubmit: function() {
			if(this.comment == '') {
				this.pop_show("还没有建议内容哦");
				return;
			}
			userService.suggest(this.member_id, this.accesstoken, this.comment).then((data)=>{
				if(data.rsp === 'succ') {
					this.pop_show("反馈成功");
					setTimeout(function(){
						window.location.href = "/user";
					},800);
				}else if(data.rsp === "fail") {
					this.pop_show(data.data);
				}
			});
		},
		//消息提示框状态变化方法
		pop_show: function(text) {
			this.showText=text;
			this.suggest_tips= true;
			var _this=this;
			setTimeout(function(){
				_this.suggest_tips= false;
			},800);
		}
	}
});

export default Index