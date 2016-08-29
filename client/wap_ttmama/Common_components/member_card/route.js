import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import $ from 'jquery';
import qiniu from '../../assets/js/qiniu.js';
import Pop from '../../Common_components/pop/route.js';
import Confirm from 'vux-components/confirm';
import {Cookieget ,Cookieset ,setCookieDate, checkCard} from '../../assets/js/util.js';
import memberCard from '../../service/userService.js';

let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			member_id: null,
			accesstoken: null,
			tag: 'default',
			cardList: null,
			cardTitle: '添加身份证信息',
			cardInfo: {
				cardId: '',
				cardName: '',
				cardFrontPic: '',
				cardBackPic: '',
				is_default: false,
				image_id: ''
			},
			upToken: '',
			key: '',
			card_tips: false,
            isLoading: false,
			picUpload: false,
			confirmShow: false,
			picSelect: ''
		 }
	},
	components: {
		Confirm
	},
	created: function() {
		this.initData();
	},
	computed: {
		formatDate: function(){
            var date = new Date();
            var formatDate = date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate();
            return formatDate;
        }
	},
	methods: {
		initData: function() {
			this.isLoading = true;
			this.member_id = Cookieget('member_id');
			this.accesstoken = Cookieget('accesstoken');
			memberCard.cardData(this.member_id, this.accesstoken).then((data) => {
				if(data.rsp === "succ") {
					this.isLoading = false;
					this.cardList = data.data;
				}else if(data.res === "need_login") {
					window.location.href="/login";
				}
			});
		},
		getToken: function(member_id, accesstoken) {
            memberCard.getToken(member_id, accesstoken).then((data) => {
                if (data.rsp === 'succ') {
                    this.upToken = data.data;
                    this.uploadserver();
                } else if (data.rsp === 'fail') {
                    this.pop_show(data.data);
                }
            });
        },
		addCard: function() {
			if(!this.submitCheck()){
				return;
			}
			this.isLoading = true;
			memberCard.saveCard(this.member_id, this.accesstoken, this.cardInfo.cardId, this.cardInfo.cardName, this.cardInfo.cardFrontPic, this.cardInfo.cardBackPic).then((data) => {
				this.isLoading = false;
				if(data.rsp==="succ") {
					this.tag = 'default';
					this.pop_show("添加身份信息成功");
				}else if(data.rsp == "fail") {
					this.pop_show(data.data);
				}
			})
		},
		getEditData: function(index) {
			this.cardInfo.cardId = this.cardList[index].id;
			this.cardInfo.cardName = this.cardList[index].member_name;
			this.cardInfo.cardFrontPic = this.cardList[index].card_front_pic;
			this.cardInfo.cardBackPic = this.cardList[index].card_back_pic;
			this.cardInfo.is_default = this.cardList[index].is_default;
			this.cardInfo.image_id = this.cardList[index].image_id;
			this.tag = "editCard";
		},
		editCard: function() {
			if(!this.submitCheck()){
				return;
			}
			this.isLoading = true;
			var frontPic = this.cardInfo.cardFrontPic;
			var backPic = this.cardInfo.cardBackPic;
			if(frontPic.length > 25){
				frontPic = frontPic.substr(26,22);
			}
			if(backPic.length > 25){
				backPic = backPic.substr(26,22);
			}
			memberCard.modifyCard(this.member_id, this.accesstoken, this.cardInfo.image_id, this.cardInfo.cardId, this.cardInfo.cardName, frontPic, backPic).then((data)=>{
				this.isLoading = false;
				if(data.rsp === 'succ') {
					this.tag = 'default';
					this.pop_show("修改身份信息成功");
				} else if(data.res === 'fail') {
					this.pop_show(data.data);
				}
			})
		},
		delCardHandler: function() {
			this.isLoading = true;
			memberCard.deleteCard(this.member_id, this.accesstoken, this.cardInfo.image_id).then((data)=>{
				this.isLoading = false;
				if(data.rsp === 'succ') {
					this.tag = 'default';
					this.pop_show("删除身份证信息成功");
				} else if(data.res === 'fail') {
					this.pop_show(data.data);
				}
			})
		},
		setCardDefault: function(index) {
			memberCard.setDefaultCard(this.member_id, this.accesstoken, this.cardList[index].image_id).then((data)=>{
				if(data.rsp === 'succ') {
					this.initData();
				} else if(data.rsp === 'fail') {
					this.pop_show(data.data);
				}
			})
		},
		clearCardInfo: function() {
			this.cardInfo.image_id = '';
			this.cardInfo.cardId = '';
			this.cardInfo.cardName = '';
			this.cardInfo.cardFrontPic = '';
			this.cardInfo.cardBackPic = '';
			this.cardList = null;
		},
		cardBack: function() {
			history.go(-1);
		},
		submitCheck: function() {
			if(this.cardInfo.cardId == '' || this.cardInfo.cardName == '' || this.cardInfo.cardFrontPic == '' || this.cardInfo.cardBackPic == ''){
				this.pop_show('请完善身份证件信息');
				return false;
			}
			if(!checkCard(this.cardInfo.cardId)) {
				this.pop_show('请输入有效身份证号码');
				return false;
			}
			return true;
		},
        uploadserver: function(){
            var images = qiniu.bucket('ttmama-test', {
                putToken: this.upToken,
                url: 'http://upload.qiniu.com/'
            });
            var _this=this;
            qiniu.bind($(".picFront"),{filter : 'image'}).bind($(".picBack"),{filter : 'image'}).on('file', function(file) {
                _this.picUpload = true;
                _this.key = _this.formatDate + '/' + Math.random().toString(36).substr(2,8) + '.jpg';
                //图片上传
                images.putFile(_this.key, file, {}, function(err, reply) {
                    if (err) {
                        _this.picUpload = false;
                        _this.pop_show("上传出错："+err);
                        return;
                    }
                    _this.picUpload = false;
                    if(_this.picSelect == '.picFront'){
                    	_this.cardInfo.cardFrontPic = reply.key;
                    } else {
                    	_this.cardInfo.cardBackPic = reply.key;
                    }
                    //图片预览（上传成功后同步预览）
	                file.imageView({mode: 1,width: 50,height: 50}, 
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
        //提示框
        pop_show: function(text) {
            this.showText=text;
            this.card_tips= true;
            var _this=this;
            setTimeout(function(){
                _this.card_tips= false;
            },1000);
        }
	},
	events: {
		'on-confirm': function() {
			this.delCardHandler();
		}
	},
	watch: {
		'tag': function(val) {
			if(val == 'editCard' || val == 'addCard') {
				this.cardTitle = (val == 'addCard') ? '添加身份证信息':'编辑身份证信息';
				this.$els.cardName.focus();    //pc端可以获取焦点，手机端没效果
				qiniu.removeAllListeners('file');
				this.getToken(this.member_id, this.accesstoken);
			}
			if(val == 'default') {
				this.clearCardInfo();
				this.initData();
			}
		}
	}
});
var myComplate = Vue.component('member-card', Index);
export default myComplate;