import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import $ from 'jquery';
import '../assets/js/jquery_md5.js';
import { Cookieget } from '../assets/js/util.js';
import openim from '../service/openimService.js';

let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			member_id: null,
			accesstoken: null,
			member_pic: null,
			wkit_info: {}
		}
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.member_pic = Cookieget('member_pic');
		this.getInitWkit(this.member_id, this.accesstoken);	
	},
	computed:{
		credential: function() {
			var md5Str = this.wkit_info.uid + this.wkit_info.loc_secret_key + this.member_id;
			return $.md5(md5Str);
		}
	},
    methods: {
    	getInitWkit: function(member_id, accesstoken) {
    		openim.InitWkitData(this.member_id, this.accesstoken).then((data) => {
				if(data.rsp === "succ") {
					this.wkit_info = data.data;
				}else if(data.res === "no login!") {
					window.location.href="/login";
				}
			});
    	},
    	wkitInit: function() {
    		WKIT.init({
	            uid: this.wkit_info.uid,
	            appkey: this.wkit_info.appkey,
	            credential: this.credential,
	            touid: this.wkit_info.touid,
	            titleBar: false,
	            avatar: this.member_pic,
	            sendMsgToCustomService: true,
	            themeBgColor: '#eee', // 必须设置此项，其他自定义颜色才能生效
                themeColor: '#eee',
                msgBgColor: '#76C1BC',
                msgColor: '#fff',
                onLoginSuccess: function(){
		            if($("#pName").text() != ''){
	                    WKIT.sendMsg({
	                        msgType: 0,
	                        msg: '我正在浏览《'+$("#pName").text()+'》,'+"<a href="+$("#pUrl").text()+" target=_blank>"+$("#pUrl").text()+"</a>"
	                    });
	                }
	            },
	            onLoginError: function () {
                	WKIT.destroy();
            	}
	        });
	        $("#J_wkitMsgContent").focus();
    	},
    	pageBack: function() {
			WKIT.destroy();
    	}
	},
    watch: {
        'wkit_info': function(val) {
            this.wkitInit();
        }
    }
})

export default Index