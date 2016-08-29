import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import $ from 'jquery';
import Pop from '../../Common_components/pop/route.js';
import foundPwd from '../../Common_components/found-pwd/route.js';
import {Cookieget , Cookieunset} from '../../assets/js/util.js';
import logout from '../../service/userService.js';

var about_1 = require('../../assets/about_us/about_1@2x.png');
var about_2 = require('../../assets/about_us/about_2@2x.png');
var about_3 = require('../../assets/about_us/about_3@2x.png');
var about_4 = require('../../assets/about_us/about_4@2x.png');
var about_5 = require('../../assets/about_us/about_5@2x.png');
var about_6 = require('../../assets/about_us/about_6@2x.png');
var about_7 = require('../../assets/about_us/about_7@2x.png');
var about_8 = require('../../assets/about_us/about_8@2x.png');
var about_9 = require('../../assets/about_us/about_9@2x.png');
var about_10 = require('../../assets/about_us/about_10@2x.png');
var about_11 = require('../../assets/about_us/about_11@2x.png');
let Index = Vue.extend({
	template: Tpl,
    data: () => {
        return {
            member_id: null,
            accesstoken: null,
            setShow: true,
            aboutShow: false,
            changeShow: false,
            foundShow: false,
            unameShow: true,
            pwdShow: false,
            vcodeShow: false,
            pageTitle: '设置',
            oldPwd: '',
            newPwd: '',
            newPwd2: '',
            signup_tips: false,
            isLoading: false,
            aboutList: [about_1, about_2, about_3, about_4, about_5, about_6, about_7, about_8, about_9, about_10, about_11]
        }
    },
    created: function() {
        this.member_id = Cookieget('member_id');
        this.accesstoken = Cookieget('accesstoken');
    },
    methods: {
        modifyPwd: function() {
            this.setShow = false;
            this.changeShow = true;
            this.pageTitle = '账户安全';
        },
        changOk: function() {
            logout.changePwd(this.member_id, this.accesstoken, this.oldPwd, this.newPwd, this.newPwd2).then((data) => {
                if (data.rsp === 'succ') {
                    this.pop_show("您已修改密码，请重新登录");
                    this.clearCookie();
                    setTimeout(function(){
                        window.location.href = "/login";
                    },1000);
                } else if(data.rsp === 'fail') {
                    this.pop_show(data.data);

                }
            });
        },
        foundStart: function() {
            this.changeShow = false;
            this.foundShow = true;
            this.pageTitle = '找回密码';
        },
        aboutTt: function() {
            this.setShow = false;
            this.aboutShow = true;
            this.pageTitle = '关于汤团';
        },
        logout: function() {
            logout.logout(this.member_id, this.accesstoken).then((data) => {
                if (data.rsp === 'succ') {
                    history.go(-1);
                }
            });
        },
        logoutBack: function(event) {
            if(this.foundShow) {
                if (this.unameShow) {
                    event.preventDefault();
                    this.foundShow = false;
                    this.changeShow = true;
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
            } else if(!this.setShow) {
                this.aboutShow = false;
                this.changeShow = false;
                this.foundShow = false;
                this.setShow = true;
                this.pageTitle = '设置';
                event.preventDefault();
            }
            
        },
        clearCookie: function() {
            Cookieunset('member_id');
            Cookieunset("accesstoken");
            Cookieunset("login_account");
            Cookieunset("member_pic");
            Cookieunset("name");
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
})
export default Index