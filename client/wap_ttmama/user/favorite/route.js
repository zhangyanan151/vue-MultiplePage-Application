import Vue from 'vue';
import Tpl from './template.html';
import $ from 'jquery';
import './style.css';
import {Cookieget} from '../../assets/js/util.js';
import orderService from '../../service/userService.js';
import indexService from '../../service/indexService.js';
import findService from '../../service/findService.js';
import shareComponent from '../../Common_components/share_component/route.js';

let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			member_id: null,
			accesstoken: null,
			data: null,
			tag: 'goods',
			page: 1,
            leftId: null,
            loadingMore: false,
            shareShow: false,
            shareUrl: ''
		}
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.queryData();
	},
    ready: function() {
        this.scrollLisen();
    },
	computed:{
        delZindex: function() {
            if(this.leftId === null) {
                return 10;
            }else {
                return 30;
            }
        },
		hideIndex: function() {
            if(this.leftId === null) {
                return 1;
            }else {
                return 20;
            }
        },
        hasNext: function() {
            var flag = false;
            if(this.data != null) {
                if(this.tag == 'goods') {
                    flag = this.data.has_next;
                }else {
                    this.tag = this.data.pages.has_next;
                }
            }
            return flag;
        }
	},
    methods: {
    	queryData: function() {
            if(this.page > 1) {
                this.loadingMore = true;
            }
    		if(this.tag == 'goods') {
    			orderService.favorite(this.member_id, this.accesstoken, this.page).then((data)=>{
    				if(data.rsp == 'succ') {
    					if(this.page == 1) {
    						this.data = data.data;
    					}else {
    						this.page = parseInt(data.data.curpage, 10);
    						this.data.has_next = data.data.has_next;
    						this.data.item = this.data.item.concat(data.data.item);
                            this.loadingMore = false;
    					}
    				}else {
    					this.data.item = [];
    				}
    			})
    		}else {
    			orderService.favblog(this.member_id, this.accesstoken, this.page).then((data)=>{
    				if(data.rsp == 'succ') {
    					if(this.page == 1) {
    						this.data = data.data;
    					}else {
    						this.page = this.page + 1;
    						this.data.pages = data.data.pages;
    						this.data.items = this.data.items.concat(data.data.items);
                            this.loadingMore = false;
    					}
    				}else {
    					this.data.items = [];
    				}
    			})
    		}
    	},
    	tagClick: function(tag) {
    		this.tag = tag;
    		this.page = 1;
    		this.data = null;
            this.leftId = null;
    		this.queryData();
    	},
    	toDetail: function(goods_id) {
    		location.href="/details?goods_id="+goods_id;
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
                    if(e.deltaX>-50) {
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
                            leftX = '1.8rem';
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
                        $("#item_desc_"+index).parent().find(".fav-dele-coll").css({
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
            $("#item_desc_"+id).parent().find(".fav-dele-coll").css({
                'z-index': this.delZindex
            });
            window.event.returnValue = false;
            return false;
        },
        scrollLisen: function() {
            var _this = this;
            window.onscroll = function() {
                if($(document).scrollTop() >= Math.abs($(document).height() - $(window).height() -100)) {
                    if(_this.loadingMore) return;
                    if(_this.hasNext) {
                        _this.page ++;
                        _this.queryData();
                    }
                }
            }
        },
        cancelFavGoods: function(goods_id, index) {
            indexService.delFav(this.member_id, this.accesstoken, goods_id).then((data)=>{
                if(data.rsp == 'succ') {
                    var data = [];
                    data = this.data.item.slice(0,index).concat(this.data.item.slice(index+1,this.data.item.lenght));
                    this.data.item = data;
                    this.leftId = null;
                }
            });
        },
        cancelFavLog: function(article_id, index) {
            findService.addFind(this.member_id, this.accesstoken, article_id, 'false').then((data)=>{
                if(data.rsp == 'succ') {
                    var data = [];
                    data = this.data.items.slice(0,index).concat(this.data.items.slice(index+1,this.data.items.lenght));
                    this.data.items = data;
                    this.leftId = null;
                }
            })
        },
        logShare: function(article_id) {
            this.shareUrl = '/blogInfo/'+article_id;
            this.shareShow = true;
        }
	},
	events: {
		
	}
})
export default Index