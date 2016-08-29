import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import DateTime from 'vux-components/datetime';
import xInput from 'vux-components/x-input';
import $ from 'jquery';
import qiniu from '../../assets/js/qiniu.js';
import Pop from '../../Common_components/pop/route.js';
import {Cookieget ,Cookieset ,setCookieDate} from '../../assets/js/util.js';
import perset from '../../service/userService.js';

let Index = Vue.extend({
	template: Tpl,
    data: () => {
        return {
            member_id: null,
            accesstoken: null,
            upToken: '',
            key: '',
            oldName: '',
            oldSex: '',
            personalInfo: {
                member_pic: '',
                uname: '',
                name: '',
                sex: '',
                b_birth: ''
            },
            countShow: true,
            nameShow: false,
            sexShow: false,
            perset_tips: false,
            picUpload: false
        }
    },
    components: {
        DateTime,
        xInput
    },
    created: function() {
        this.member_id = Cookieget('member_id');
        this.accesstoken = Cookieget('accesstoken');
        this.getPersonalData(this.member_id, this.accesstoken);
    },
    ready: function() {
        this.getToken(this.member_id, this.accesstoken);
    },
    computed: {
        formatDate: function(){
            var date = new Date();
            var formatDate = date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate();
            return formatDate;
        }
    },
    methods: {
        getToken: function(member_id, accesstoken) {
            perset.getToken(member_id, accesstoken).then((data) => {
                if (data.rsp === 'succ') {
                    this.upToken = data.data;
                } else if (data.rsp === 'fail') {
                    this.pop_show(data.data);
                }
            });
        },
        uploadserver: function(){
            var images = qiniu.bucket('ttmama-test', {
                putToken: this.upToken,
                url: 'http://upload.qiniu.com/'
            });
            var _this=this;
            qiniu.bind($('#select'), {}).on('file', function(file) {
                _this.picUpload = true;
                _this.key = _this.formatDate + '/' + Math.random().toString(36).substr(2,8) + '.jpg';
                
                images.putFile(_this.key, file, {}, function(err, reply) {
                    if (err) {
                        _this.picUpload = false;
                        _this.pop_show("上传出错："+err);
                        return;
                    }
                    //头像上传
                    perset.picUpload(_this.member_id, _this.accesstoken, reply.key).then((data) => {
                        _this.picUpload = false;
                        if (data.rsp === 'succ') {
                            Cookieset('member_pic', data.data, setCookieDate(7));
                            //头像上传成功，再同步预览
                            file.imageView(
                                {mode: 1,width: 30,height: 30}, 
                                function(err, image) {
                                    if (err) {return;}
                                    $('#pic_review').empty().append(image);
                                }
                            );
                            _this.pop_show("头像上传成功");
                        } else if (data.rsp === 'fail') {
                            _this.pop_show("头像上传失败");
                        }
                    });
                });
            });
            if($("input[type='file']").length > 0){
                $("input[type='file']").attr({"multiple": false});
            }
        },
    	setName: function() {
    		this.countShow = false;
    		this.nameShow = true;
            this.oldName = this.personalInfo.name;
    	},
    	setSex: function() {
    		this.countShow = false;
    		this.sexShow = true;
            this.oldSex = this.personalInfo.sex;
    	},
        birthChange: function(val) {
             this.personalInfo.b_birth = val;
             this.setPersonalData(this.member_id, this.accesstoken, this.personalInfo.name, this.personalInfo.sex, this.personalInfo.b_birth);
        },
    	getPersonalData: function(member_id ,accesstoken) {
			perset.personalData(member_id, accesstoken).then((data) => {
    			
    			if (data.rsp === 'succ') {
    				this.personalInfo.member_pic= data.data.member_pic;
    				this.personalInfo.uname= data.data.uname;
    				this.personalInfo.name= data.data.name;
    				this.personalInfo.sex= data.data.sex;
    				this.personalInfo.b_birth= data.data.b_birth;
				} else if (data.rsp === 'fail') {
					this.pop_show(data.data);
				}
    		});
    	},
    	setPersonalData: function(member_id ,accesstoken ,name , sex, birth) {
			perset.personalDataSave(member_id ,accesstoken ,name , sex, birth).then((data) => {
    			if (data.rsp === 'succ') {
    				return true;
				} else if (data.rsp === 'fail') {
					return false;
				}
    		});
    	},
    	personalSetBack: function(event,sexCode) {
    		if(this.nameShow){
    			event.preventDefault();
                var nameLen = this.personalInfo.name.length;
                if(nameLen < 1){
                    this.pop_show("昵称不能为空");
                    return;
                } else if(nameLen < 4 || nameLen > 8) {
                    this.pop_show("请检查昵称长度");
                    return;
                }
    			this.countShow = true;
    			this.nameShow = false;
                //如果修改了，才发送请求
                if(this.personalInfo.name != this.oldName) {
                    this.setPersonalData(this.member_id, this.accesstoken, this.personalInfo.name, this.personalInfo.sex, this.personalInfo.b_birth);
                    Cookieset('name', this.personalInfo.name, setCookieDate(7));
                }
    			
    		} else if(this.sexShow){
    			event.preventDefault();
    			if(sexCode){
    				this.personalInfo.sex = sexCode;
    			}
    			this.countShow = true;
    			this.sexShow = false;
                //如果修改了，才发送请求
                if(this.personalInfo.sex != this.oldSex) {
                    this.setPersonalData(this.member_id, this.accesstoken, this.personalInfo.name, this.personalInfo.sex, this.personalInfo.b_birth);
                }
    		} else {
                qiniu.removeAllListeners('file');
            }
    	},
        //消息提示框状态变化方法
        pop_show: function(text) {
            this.showText=text;
            this.perset_tips= true;
            var _this=this;
            setTimeout(function(){
                _this.perset_tips= false;
            },1000);
        }
	},
    watch: {
        'upToken': function(val) {
            this.uploadserver();
        }
    }
})
export default Index