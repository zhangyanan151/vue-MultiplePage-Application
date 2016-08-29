import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import $ from 'jquery';
import DateTime from 'vux-components/datetime';
import Pop from '../../Common_components/pop/route.js';
import {Cookieget} from '../../assets/js/util.js';
import babyService from '../../service/userService.js';

let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			member_id: null,
			accesstoken: null,
			tag: 'default',
			babyList: null,
			babysInfo: {
				sex: '0',
				birthday: '请选择生日'
			},
			baby_tips: false,
			showText: '',
            isLoading: false,
            babyShow: true,
            sexShow: false,
            babyOver: false,
            babyOverBg: ''
		 }
	},
	components: {
        DateTime
    },
	created: function() {
		this.initData();
	},
	computed: {
		birthFormat: function() {
			return new Date(this.babysInfo.birthday).getTime().toString().substr(0, 10);
		}
	},
	methods: {
		initData: function() {
			this.isLoading = true;
			this.member_id = Cookieget('member_id');
			this.accesstoken = Cookieget('accesstoken');
			babyService.babysInfo(this.member_id, this.accesstoken).then((data) => {
				if(data.rsp === "succ") {
					this.isLoading = false;
					this.babyList = data.data;
					if(this.babyList.length >= 2) {
						this.babyOverBg = '#ababab';
						this.babyOver = true;
					}
				}else if(data.res === "need_login") {
					window.location.href = "/login";
				}
			});
		},
    	setSex: function() {
    		this.babyShow = false;
    		this.sexShow = true;
            this.oldSex = this.babysInfo.sex;
    	},
        birthChange: function(val) {
             this.babysInfo.birthday = val;
        },
		addBabysInfo: function() {
			if(this.babysInfo.birthday == '请选择生日') {
				this.pop_show("请完善生日信息");
				return;
			}
			this.isLoading = true;
			babyService.addBabysInfo(this.member_id, this.accesstoken, this.babysInfo.sex, this.birthFormat).then((data) => {
				this.isLoading = false;
				if(data.rsp==="succ") {
					this.babysInfo.birthday = '请选择生日';
					this.tag = 'default';
					this.initData();
					this.pop_show("添加宝宝信息成功");
				} else if (data.rsp == "fail") {
					this.pop_show(data.data);
				}
			})
		},
    	babySexBack: function(event,sexCode) {
			event.preventDefault();
			this.babysInfo.sex = sexCode;
			this.babyShow = true;
			this.sexShow = false;
    	},
    	pageBack: function() {
    		if(this.tag == 'default') {
    			history.go(-1);
    		} else if (this.sexShow) {
    			this.sexShow = false;
    			this.babyShow = true;
    		} else if (this.babyShow) {
    			this.tag = 'default';
    		}
    	},
        //提示框
        pop_show: function(text) {
            this.showText = text;
            this.baby_tips = true;
            var _this = this;
            setTimeout(function() {
                _this.baby_tips = false;
            },800);
        }
	}
});
export default Index