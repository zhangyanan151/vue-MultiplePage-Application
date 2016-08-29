import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import $ from 'jquery';
import userService from '../../service/userService.js';
import { Cookieget } from '../../assets/js/util.js';
import Scroller from 'vux-components/scroller';
import Spinner from 'vux-components/spinner';
import Pop from '../../Common_components/pop/route.js';

var headImg = require('../../assets/head.png');
let Index = Vue.extend({
	template: Tpl,
	components:{
		Scroller,
        Spinner
	},
	data: () => {
		return {
			member_id:'',
			accesstoken:'',
            showVisit: [],
            isLoading: false,
            isEmpty: false,
			limit:10,
			page:1,
			leftId: null,
			isLogin: true,
			headImg: headImg,
            loadingMore: true
		}
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
        if(!this.member_id || !this.accesstoken) {
            this.isLogin = false;
            return;
        }
		this.getVisitData();
	},
    ready: function() {
        this.scrollListen();
    },
	computed:{
		delZindex: function() {
            if(this.leftId === null) {
                return 10;
            }else {
                return 30;
            }
        },
        currentDate: function() {
            var month = new Date().getMonth() + 1;
            var date = new Date().getDate();
            if(month < 10) month = "0" + month;
            if(date < 10) date = "0" + date;
            return month + "月" + date + "日";
        }
	},
    methods: {
        getVisitData: function() {
            this.isLoading = true;
            userService.visitData(this.member_id,this.accesstoken,this.limit,this.page).then((data) => {
                if(data.rsp == 'succ') {
                    this.isLoading = false;
                    if(data.data == '') {
                        this.isEmpty = true;
                        return;
                    }
                    this.visitDataHandle1(data.data);
                    if(data.data.length < 10) this.loadingMore = false;
                }else if (data.res === 'need_login') {
                    this.isLoading = false;
                    this.isLogin = false;
                }
            });
        },
        //对后台获得的浏览数据按日期进行重组
        visitDataHandle1: function(visitData) {
            var dataTemp = {date: '', data: []};
            for(var i = 0, visitLen = visitData.length; i < visitLen; i++) {
                if(visitData[i].date != '') {
                    if(dataTemp.date != '') {
                        this.visitDataHandle2(dataTemp);                 
                    }
                    dataTemp = {date: '', data: []};
                    dataTemp.date = visitData[i].date;
                    dataTemp.data.push(visitData[i]);
                } else {
                    dataTemp.data.push(visitData[i]);
                }
                if(i >= visitData.length-1) {
                    this.visitDataHandle2(dataTemp);
                }
            }
        },
        visitDataHandle2: function(dataTemp) {
            if(dataTemp.date == this.currentDate) dataTemp.date = '今天';
            //加载下一页后，当日期与上一页日期重复，直接将数据追加到上一项中，否则形成新的集合
            if(this.showVisit.length >= 1 && this.showVisit[this.showVisit.length-1].date == dataTemp.date){
                this.showVisit[this.showVisit.length-1].data = this.showVisit[this.showVisit.length-1].data.concat(dataTemp.data);
            }else{
                //将处理(分组)后的结果放入新的集合
                this.showVisit.push({date:dataTemp.date, data:dataTemp.data});
            }
            
        },
    	toDetail: function(product_id) {
    		window.location.href = "/details?product_id=" + product_id;
    	},
    	visitEmpty: function() {
    		userService.visitEmpty(this.member_id,this.accesstoken).then((data) => {
    			if(data.rsp === 'succ'){
                    this.showVisit = [];
                    this.isEmpty = true;
                }
    		})
    	},
    	visitDel: function(history_id, in_index) {
            var out_index = $("#item_desc_"+history_id).parent().find(".visit-box-date").attr("id").slice(-1);
    		userService.visitDel(this.member_id, this.accesstoken, history_id).then((data) => {
                if(data.rsp == 'succ') {
                    this.showVisit[out_index].data.splice(in_index,1);
                    this.leftId = null;
                    if(this.showVisit.length <= 1 && this.showVisit[0].data.length < 1){
                        this.isEmpty = true;
                        this.showVisit = [];
                    }
                }else {
                    alert(data.data);
                }
    		})
    	},
    	moveLeft: function(e, index) {
            if(this.leftId === null) {
                $("#item_desc_"+index).css({
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
                    if(e.deltaX > -50) {
                        $("#item_desc_"+index).css({
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
                        var leftX = '';
                        if(this.tag == 'goods') {
                            leftX = '0.9rem';
                        }else {
                            leftX = '0.9rem';
                        }
                        $("#item_desc_"+index).css({
                            "transform": "translateX(-"+leftX+")",
                            "transition-duration": ".3s",
                            "transition-property": "transform",
                            "-webkit-transform": "translateX(-"+leftX+")",
                            "-webkit-transition-duration": ".3s",
                            "-webkit-transition-property": "transform",
                            "-moz-transform": "translateX(-"+leftX+")",
                            "-moz-transition-duration": ".3s",
                            "-moz-transition-property": "transform"
                        });
                        this.leftId = index;
                        $("#item_desc_"+index).children(".visit-dele-coll").css({
                            'z-index': this.delZindex
                        });
                    }
                }
            }
        },
        hideTap: function(e) {
            $("#item_desc_"+this.leftId).css({
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
            $("#item_desc_"+id).children(".visit-dele-coll").css({
                'z-index': this.delZindex
            });
            window.event.returnValue = false;
            return false;
        },
        scrollListen: function() {
            var _this = this;
            window.onscroll = function() {
                if($(document).scrollTop() >= Math.abs($(document).height() - $(window).height() -100)) {
                    if(!_this.loadingMore) return;
                    _this.page++;
                    _this.getVisitData();
                }
            }
        },
        pageBack: function(event) {
            event.stopPropagation();
            event.preventDefault();
            history.back();
        }
    }	
})
export default Index