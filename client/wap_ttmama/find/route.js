import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import find from '../service/findService.js'
import $ from 'jquery'
import FootIndex from '../Common_components/foot_index/route.js'
import ShareComponent from '../Common_components/share_component/route.js'
import '../service/filters.js'
import { Cookieget } from '../assets/js/util.js'
import Pop from '../Common_components/pop/route.js'

let Index = Vue.extend({
	template: Tpl,
	components: {
		
	},
	data: () => {
		return {
			findData: [],
			member_id: '',
			accesstoken: '',
			blog_id: '',
			fav_type: 'false',
			nologintext: '请先登录',
			islogin: false,
			node_id: '',
			nPage: 1,
			shareShow: false,
			nodeFind: [],
			isLoading: true,
			loadingMore: false,
			shareUrl: ''
		}
	},
	created: function() { 
		this.member_id=Cookieget('member_id');
		this.accesstoken=Cookieget('accesstoken');
		find.nodeFind().then((data)=>{
			if(data.rsp === 'succ'){
				this.nodeFind = data.data;
				this.node_id = data.data[0].node_id;
			}
			find.findData(this.member_id,this.node_id,this.nPage).then((data)=>{
				this.isLoading = false;
				if(data.rsp === 'succ'){
					this.findData = data.data;
				}
			});
		});
	    
	},
	ready: function() {
		this.scrollLisean();
	},
    methods: {
    	substractNum:function(index,item,e){ 
    		e.stopPropagation();
   			e.preventDefault();        
            this.blog_id=index;
    		find.addFind(this.member_id,this.accesstoken,this.blog_id,this.fav_type).then((data)=>{
				if(data.rsp === 'succ') {
				 	if(item.fav_type === 'nofav'){
						item.fav_type = 'fav'
					}else if(item.fav_type === 'fav'){
						item.fav_type = 'nofav'
					}
				}else if(data.rsp === 'fail') {
					this.islogin = true;
    				var _this=this;
    				setTimeout(function(){
					_this.islogin= false;
					},1000);
    			}else{
    				this.islogin = true;
    				var _this=this;
    				setTimeout(function(){
					_this.islogin= false;
					},1000);
    	    		}
    		})
   		},
   		share: function(article_id,e) {
   			e.stopPropagation();
   			e.preventDefault();
   			this.shareUrl = '/blogInfo/'+article_id;
   			this.$broadcast('change-share-url', this.shareUrl);
   			this.shareShow = true;
   		},
   		nodeid:function(e,nodeid){
   			e.stopPropagation();
   			e.preventDefault();
	   		this.node_id = nodeid;
	   		this.nPage = 1;
	   		this.isLoading = true;
	   		this.findData = [];
	   		$(document).scrollTop(0);
	   		find.findData(this.member_id,this.node_id,this.nPage).then((data)=>{
				this.isLoading = false;
				if(data.rsp === 'succ'){
					this.findData = data.data;
				}
			});
   		},
   		scrollLisean: function() {
   			var _this = this;
			window.onscroll = function() {
				if($(document).scrollTop() >= Math.abs($(document).height() - $(window).height() -100)) {
					if(_this.loadingMore) return;
					if(_this.findData.pages.current < _this.findData.pages.maxPage) {
						_this.loadMore();
					}
				}
			}
   		},
   		loadMore: function() {
   			this.loadingMore = true;
   			find.findData(this.member_id,this.node_id,this.nPage+1).then((data)=>{
   				this.loadingMore = false;
				if(data.rsp === 'succ'){
					this.nPage ++;
					this.findData.alist = this.findData.alist.concat(data.data.alist);
					this.findData.pages = data.data.pages;
				}
			});
   		},
   		blogInfo: function(article_id) {
   			location.href = '/blogInfo/'+article_id;
   		}			
	},
	events: {
		
	}
})
export default Index