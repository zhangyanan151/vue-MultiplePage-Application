import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import $ from 'jquery';
import qiniu from '../../assets/js/qiniu.js';
import {Cookieget} from '../../assets/js/util.js';
import orderService from '../../service/orderService.js';
import Pop from '../../Common_components/pop/route.js';
import userService from '../../service/userService.js';

let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			tag: '',
			member_id: null,
			accesstoken: null,
			order_id: null,
			data: null,
			star: [],
			showGoodsList: false,
			curGoods: null,
			goodsStar: 0,
			goodsComment: '',
			orderComment: '',
			popShow: false,
			popText: '',
			isSubmit: false,
			picUpload: false,
			upToken: '',
			key: '',
			picSelect: '',
			orderImg: [],
			orderImgAdd: true,
			goodsImg: [],
			goodsImgAdd: true
		}
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.order_id = this.$route.params.order_id;
		this.initData();
	},
	ready: function() {
		this.tag = 'main';
	},
	computed: {
		formatDate: function(){
            var date = new Date();
            var formatDate = date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate();
            return formatDate;
        }
	},
	methods: {
		goBack: function() {
			history.back();
		},
		initData: function() {
			userService.nodiscuss(this.member_id, this.accesstoken, this.order_id).then((data)=>{
				if(data.rsp == 'succ') {
					if(data.data == null) {
						history.back();
					}
					this.data = data.data;
					for(var i=0; i<data.data.comment_goods_type.length; i++) {
						this.star.push({
							'type_id': data.data.comment_goods_type[i].type_id,
							'score': 5
						})
					}
				}
			});
		},
		goodsDis: function(index) {
			this.curGoods = this.data.goods[index];
			this.goodsStar = 5;
			this.tag = "goods";
		},
		backMain: function() {
			this.curGoods = null;
			this.goodsStar = 0;
			this.tag = 'main';
		},
		goodsCommentSubmit: function() {
			var point = '';
			for(var i=0; i<this.star.length; i++) {
				point += this.star[i].type_id+'_'+this.goodsStar;
				if(i!=this.star.length-1) {
					point += '|';
				}
			}
			if(this.goodsComment == '') {
				this.goodsComment = '非常好，我很喜欢';
			}
			this.isSubmit = true;
			userService.comment(this.member_id, this.accesstoken, this.order_id, this.curGoods.goods_id, this.curGoods.product_id, this.goodsComment, 'false', point, '', this.goodsImg[0], this.goodsImg[1], this.goodsImg[2], this.goodsImg[3], '').then((data)=>{
				this.isSubmit = false;
				if(data.rsp == 'succ') {
					this.pop_show('商品评价成功');
					this.initData();
				}else{
					this.pop_show('评价失败');
				}
				this.tag = 'main';
			})
		},
		orderCommentSubmit: function() {
			var point = '';
			for(var i=0; i<this.star.length; i++) {
				point += this.star[i].type_id+'_'+this.star[i].score;
				if(i!=this.star.length-1) {
					point += '|';
				}
			}
			if(this.orderComment == '') {
				this.orderComment = '非常好，我很喜欢';
			}
			this.isSubmit = true;
			userService.comment(this.member_id, this.accesstoken, this.order_id, '', '', this.orderComment, 'true', point, '', this.orderImg[0], this.orderImg[1], this.orderImg[2], this.orderImg[3], '').then((data)=>{
				this.isSubmit = false;
				if(data.rsp == 'succ') {
					this.pop_show('评价成功，感谢您的支持');
					this.initData();
				}else{
					this.pop_show('评价失败');
				}
			})
		},
		initQiniu: function() {
			qiniu.removeAllListeners('file');
			this.getToken(this.member_id, this.accesstoken);
		},
		getToken: function(member_id, accesstoken) {
            userService.getToken(member_id, accesstoken).then((data) => {
                if (data.rsp === 'succ') {
                    this.upToken = data.data;
                    this.uploadserver();
                } else if (data.rsp === 'fail') {
					this.pop_show(data.data);
                }
            });
        },
        uploadserver: function() {
            var images = qiniu.bucket('ttmama-test', {
                putToken: this.upToken,
                url: 'http://upload.qiniu.com/'
            });
            var _this = this;
            qiniu.bind($(".addImg"),{filter: 'image'}).on('file', function(file) {
                _this.picUpload = true;
                _this.key = _this.formatDate + '/' + Math.random().toString(36).substr(2,8) + '.jpg';
                //图片上传
                images.putFile(_this.key, file, {}, function(err, reply) {
                    if (err) {
                        _this.picUpload = false;
                        _this.pop_show("上传出错：" + err);
	                    return;
	                }
                    _this.picUpload = false;
                    //图片预览（上传成功后同步预览）
                	file.imageView({mode: 1, width: 75, height: 75}, 
	                    function(err, image) {
	                        if (err) {return;}
	                        $(".comment-pic").append($("<span></span>").append(image));
	                       /* //多文件上传
	                       	if($(".comment-pic").children().length<4) {
	                       		$(".comment-pic").append($("<span></span>").append(image));
	                       	} else {
								_this.pop_show("晒图最多4张哦");
	                       	}
	                       	*/
	                    }
	                );
	                if(_this.tag == 'main'){
                    	_this.orderImg.push(reply.key);
                    	//第四张上传完毕，上传控件隐藏
		                if(_this.orderImg.length >= 4) {
	                    	_this.orderImgAdd = false;
	                    }
                	} else {
                		_this.goodsImg.push(reply.key);
                		//第四张上传完毕，上传控件隐藏
		                if(_this.goodsImg.length >= 4) {
	                    	_this.goodsImgAdd = false;
	                    }
                	}
                });
            });
            if($("input[type='file']").length > 0){
            	$("input[type='file']").attr({"multiple": false});
            }
        },
        //提示框
        pop_show: function(text) {
            this.popText = text;
            this.popShow = true;
            var _this = this;
            setTimeout(function() {
                _this.popShow = false;
            },800);
        }
	},
	watch: {
		'tag': function(val) {
			if(val == 'main') {
				this.orderImg = [];
				this.orderImgAdd = true;
			} else {
				this.goodsImg = [];
			}
			this.initQiniu();
		}
	}
});

export default Index