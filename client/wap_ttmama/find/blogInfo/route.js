import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import ShareComponent from '../../Common_components/share_component/route.js'
import '../../service/filters.js'
import Pop from '../../Common_components/pop/route.js'
import findService from '../../service/findService.js';
import { Cookieget } from '../../assets/js/util.js';
import TtmamaEmotion from '../../Common_components/emotion/route.js';
import emotionList from '../../assets/emotion/Expression.js';
import $ from 'jquery';

let Index = Vue.extend({
	template: Tpl,
	components: {
		
	},
	data: () => {
		return {
			blog_id: null,
			member_id: null,
			accesstoken: null,
			tag: 'pl',
			data: {},
			for_comment_id: null,
			to_id: null,
			member_name: null,
			emotion: emotionList,
			showText: false,
			popText: '',
			commentData: null,
			n_page: 1,
			loadingMore: false,
			shareShow: false
		}
	},
	created: function() {
		this.blog_id = this.$route.params.blog_id;
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.initData();
	},
	ready: function() {
		this.scrollLisen();
	},
    methods: {
    	scrollLisen: function() {
			var _this = this;
			window.onscroll = function() {
				if($(document).scrollTop() >= $(document).height() - $(window).height() -100) {
					if(_this.loadingMore) return;
					if(_this.commentData.pages.has_next) {
						_this.loadMore();
					}
				}
			}
		},
		loadMore: function() {
			var _this = this;
			_this.loadingMore = true;
			findService.commentList(this.blog_id, this.n_page+1).then((data)=>{
				_this.loadingMore = false;
    			if(data.rsp == 'succ') {
    				this.commentData.items = this.commentData.items.concat(data.data.items);
    				this.commentData.pages = data.data.pages;
    				this.n_page ++;
    			}
    		})
		},
    	initData: function() {
    		findService.blogInfo(this.blog_id, this.member_id).then((data)=>{
    			if(data.rsp == 'succ') {
    				this.data = data.data;
    			}
    		});
    		findService.commentList(this.blog_id, this.n_page).then((data)=>{
    			if(data.rsp == 'succ') {
    				this.commentData = data.data;
    			}
    		})
    	},
    	reply: function(comment_id, author_id, member_name) {
    		this.for_comment_id = comment_id;
    		this.to_id = author_id;
    		this.member_name = member_name;
    		this.$broadcast('comment-input');
    	},
    	showPopText: function(text) {
    		this.popText = text;
    		this.showText = true;
    		var _this = this;
    		setTimeout(function(){
    			_this.showText = false;
    		},800)
    	},
    	addComment: function() {
    		this.$broadcast('comment-input');
    	},
    	zan: function() {
    		if(this.member_id == null || this.accesstoken == null) {
    			location.href="/login";
    		}else {
    			findService.findPraise(this.member_id, this.accesstoken, this.blog_id).then((data)=>{
    				if(data.rsp == 'succ') {
    					if(data.data.add) {
    						this.data.params_type = 'true';
    						var list = [];
    						list.push({
    							"id": "",
						        "member_id": data.data.member_id,//点赞会员id
						        "blog_id": this.blog_id,//博客id
						        "pratype": "b",//点赞状态(b:已点;a：取消或为点)
						        "headpic": data.data.head_pic,//点赞会员头像
						        "member_name": data.data.member_name
    						});
    						list = list.concat(this.data.praise_list);
    						this.data.praise_list = list;
    						this.data.praise_count++;
    					}else if(data.data.del) {
    						this.data.params_type = 'false';
    						for(var i in this.data.praise_list) {
    							if(this.data.praise_list[i].member_id == this.member_id) {
    								this.data.praise_list[i].pratype = "a";
    							}
    						}
    						this.data.praise_count--;
    					}
    				}
    			})
    		}
    	}
	},
	events: {
		'on-comment-submit': function(value) {
			if(value=='') {
				this.showPopText('评论内容不能为空');
			}
			findService.addComment(this.member_id, this.accesstoken, this.blog_id, value, this.for_comment_id, this.to_id).then((data)=>{
				if(data.rsp == 'succ') {
					if(this.data.blog_verify=='false') {
						var newdata = [];
						newdata.push({
							'comment_id': data.data.comment_id,
							'blog_id': data.data.blog_id,
							'for_comment_id': data.data.for_comment_id,
							'author_id': data.data.author_id,
							'author': data.data.author,
							'time': data.data.time,
							'to_id': data.data.to_id,
							'to_uname': data.data.to_uname,
							'comment': data.data.comment,
							'display': data.data.display,
							'headpic': data.data.head_pic,
							'member_name': data.data.author
						});
						newdata = newdata.concat(this.commentData.items);
						this.commentData.items = newdata;
						// this.data.comments_list.add(data.data);
						this.data.comments_count ++;
					}else {
						this.showPopText(data.data);
					}
				}else {
					this.showPopText(data.data);
				}
			})
		},
		'is-login': function() {
			if(this.member_id==null || this.accesstoken==null) {
				location.href = '/login';
			}
		}
	},
	watch: {

	}
})
export default Index