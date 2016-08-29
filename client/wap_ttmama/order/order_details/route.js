import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import $ from 'jquery';
import qiniu from '../../assets/js/qiniu.js';
import {Cookieget} from '../../assets/js/util.js';
import orderService from '../../service/orderService.js';
import Pop from '../../Common_components/pop/route.js';
import Confirm from 'vux-components/confirm';
import indexService from '../../service/indexService.js';
import userService from '../../service/userService.js';

let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			tag: 'main',
			member_id: null,
			accesstoken: null,
			order_id: null,
			orderDetail: null,
			isLoading: true,
			picUpload: false,
			confirmShow: false,
			aftersaleObj: null,
			afterNum: 0,
			aftersaleReturn: {
				type: '',
				title: '',
				content: '',
				image1: null,
				image2: null,
				image3: null
			},
			isPop: false,
			popText: '',
			upToken: '',
			key: '',
			picSelect: ''
		}
	},
	components: {
		Confirm
	},
	computed: {
		returnInfo: function() {
			var list = [];
			if(this.orderDetail.return_info.aftersale=='2'){
				for(var i in this.orderDetail.order_info) {
					var orderi = this.orderDetail.order_info[i];
					var flag = false;
					for(var j in this.orderDetail.return_info.products) {
						var productsj = this.orderDetail.return_info.products[j];
						if(productsj.product_id.indexOf(orderi.product_id)>-1) {
							flag = true;
							list.push({
								return_id: productsj.return_id,
								return_status: productsj.return_status
							})
						}
					}
					if(!flag) {
						list.push({
							return_id: '',
							return_status: ''
						})
					}
				}
			}
			return list;
		},
		formatDate: function(){
            var date = new Date();
            var formatDate = date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate();
            return formatDate;
        }
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.order_id = this.$route.params.order_id;
		this.initData();
	},
	methods: {
		initData: function() {
			orderService.orderDetail(this.order_id, this.member_id, this.accesstoken).then((data)=>{
				this.isLoading = false;
				if(data.rsp==="succ") {
					this.orderDetail = data.data;
				}else {
					window.history.go(-1);
				}
			})
		},
		showDelivery: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			window.location.href="/delivery/"+order_id;
		},
		deleteOrder: function(e) {
			e.stopPropagation();
			e.preventDefault();
			this.confirmShow = true;
		},
		deleteOrderHandler: function() {
			orderService.deleteOrder(this.order_id, this.member_id, this.accesstoken).then((data)=>{
				if(data.rsp == "succ") {
					window.self.location=document.referrer; // 返回上一页并刷新
				}
			});
		},
		aftersale: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			location.href="/aftersale/"+order_id;
		},
		returnSche: function(return_id, e) {
			e.stopPropagation();
			e.preventDefault();
			location.href="/return_sche/"+this.order_id+"/"+return_id;
		},
		goodsDetail: function(product_id) {
			location.href = '/details?product_id='+product_id;
		},
		aftersaleAdd: function(index, e) {
			e.stopPropagation();
			e.preventDefault();
			this.aftersaleObj = this.orderDetail.order_info[index];
			this.tag = "aftersale";
		},
		goBack: function() {
			this.aftersaleObj = null;
			this.aftersaleReturn = {
				type: '',
				title: '',
				content: '',
				image1: null,
				image2: null,
				image3: null
			}
			this.tag = "main";
		},
		numDesc: function() {
			if(this.afterNum <= 1) {
				return;
			}else {
				this.afterNum = this.afterNum - 1;
			}
		},
		numAdd: function() {
			if(this.afterNum >= this.aftersaleObj.nums) {
				return;
			}else {
				this.afterNum = this.afterNum + 1;
			}
		},
		submit: function() {
			if(this.aftersaleReturn.type == "") {
				this.showPop("请选择售后类型");
				return;
			}
			if(this.aftersaleReturn.title == '') {
				this.showPop("请选择退货原因");
				return;
			}
			if(this.aftersaleReturn.content == "") {
				this.showPop("请填写问题描述");
				return;
			}
			this.isLoading = true;
			orderService.returnSave(this.member_id, this.accesstoken, this.aftersaleObj.order_id, this.aftersaleObj.product_id, this.afterNum, this.aftersaleReturn.type, this.aftersaleReturn.title, this.aftersaleReturn.content, this.aftersaleReturn.image1, this.aftersaleReturn.image2, this.aftersaleReturn.image3).then((data)=>{
				this.isLoading = false;
				if(data.rsp=="succ") {
					location.href="/aftersale/"+this.aftersaleObj.order_id;
				}else {
					this.showPop("申请失败，请稍后重试");
					this.goBack();
				}
			})
		},
		reAddCart: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			indexService.reAddCart(this.member_id, this.accesstoken, order_id, '', '').then((data)=>{
				if(data.rsp == 'succ') {
					this.showPop('添加购物车成功');
				}else {
					this.showPop(data.data);
				}
			})
		},
		orderComfirem: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			this.isLoading = true;
			userService.orderConfirm(this.member_id, this.accesstoken, order_id).then((data)=>{
				if(data.rsp == 'succ') {
					this.queryData(1);
				}else {
					this.showPop(data.data);
				}
			})
		},
		orderCancel: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			this.$router.go('/cancel/'+order_id);
		},
		discuss: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			location.href = '/order_nodiscuss/'+order_id;
		},
		toPayment: function(order_id, pay_app_id, e) {
			e.stopPropagation();
			e.preventDefault();
			location.href='/pay/'+order_id;
		},
		getToken: function(member_id, accesstoken) {
            userService.getToken(member_id, accesstoken).then((data) => {
                if (data.rsp === 'succ') {
                    this.upToken = data.data;
                    this.uploadserver();
                } else if (data.rsp === 'fail') {
                    this.showPop(data.data);
                }
            });
        },
        uploadserver: function(){
            var images = qiniu.bucket('ttmama-test', {
                putToken: this.upToken,
                url: 'http://upload.qiniu.com/'
            });
            var _this=this;
            qiniu.bind($(".addImg1"),{filter : 'image'}).bind($(".addImg2"),{filter : 'image'}).bind($(".addImg3"),{filter : 'image'}).on('file', function(file) {
                _this.picUpload = true;
                _this.key = _this.formatDate + '/' + Math.random().toString(36).substr(2,8) + '.jpg';
                //图片上传
                images.putFile(_this.key, file, {}, function(err, reply) {
                    if (err) {
                        _this.picUpload = false;
                        _this.showPop("上传出错："+err);
                        return;
                    }
                    _this.picUpload = false;
                    if(_this.picSelect == '.addImg1'){
                    	_this.aftersaleReturn.image1 = reply.key;
                    } else if(_this.picSelect == '.addImg2') {
                    	_this.aftersaleReturn.image2 = reply.key;
                    } else {
                    	_this.aftersaleReturn.image3 = reply.key;
                    }
                    //图片预览（上传成功后同步预览）
	                file.imageView({mode: 1,width: 75,height: 75}, 
	                    function(err, image) {
	                        if (err) {return;}
	                        $(_this.picSelect).empty().append(image);
	                    }
	                );
                });
            });
            //默认多文件上传，重置该属性使单个文件上传
            if($("input[type='file']").length > 0){
        		$("input[type='file']").attr({"multiple":false});
        	}
        },
        showPop: function(text) {
			var _this = this;
			_this.popText = text;
			_this.isPop = true;
			setTimeout(function(){
				_this.isPop = false;
			},800);
		}
	},
	events: {
		'on-confirm': function() {
			this.deleteOrderHandler();
		}
	},
	watch: {
		'aftersaleObj': function(val) {
			if(val != null) {
				this.afterNum = val.nums;
			}else {
				this.afterNum = 0;
			}
		},
		'tag': function(val) {
			if(val == 'aftersale') {
				qiniu.removeAllListeners('file');
				this.getToken(this.member_id, this.accesstoken);
			}
		}
	}
});

export default Index