var Q = require('q');
var $ = require('jquery');
var env = require('../../../env.js');

function userAddress(member_id, accesstoken) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.receiver',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken
			},
			type: 'get',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function deleteAddr(member_id, accesstoken, addr_id) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.del_rec',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'addr_id': addr_id
			},
			type: 'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function getRegions(p_region_id) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.get_regions',
			data: {
				'p_region_id': p_region_id
			},
			type: 'get',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function addAddress(member_id, accesstoken, addr_id, area, addr, name, zip, tel, mobile, def_addr){
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.save_rec',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'addr_id': addr_id,
				'area': area,
				'addr': addr,
				'name': name,
				'zip': zip,
				'tel': tel,
				'mobile': mobile,
				'def_addr': def_addr
			},
			type: 'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function modifyAddress(member_id, accesstoken, addr_id) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.modify_receiver',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'addr_id': addr_id
			},
			type: 'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function setDefaultAddr(member_id, accesstoken, addr_id, disabled) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.set_default',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'addr_id': addr_id,
				'disabled': disabled
			},
			type: 'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function addReceiver(member_id, accesstoken) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.add_receiver',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken
			},
			type: 'get',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function myTtmama(member_id, accesstoken) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.my_ttmama',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken
			},
			type: 'get',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
//身份证管理相关接口
function cardData (member_id, accesstoken ) {
 	return Q.Promise((success, error) => {	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.get_membercards',
	    //http://nb.ittmom.com/ttmamaapp2/appapi?method=mobileapi2.member.my_ttmama&member_id=2298&accesstoken=9da95cff81c370929790286e82398d9c
	    data: {
	    	'member_id': member_id,
	    	'accesstoken': accesstoken
	    },
	    type: 'get',
	    success: function (data) {
	        success(JSON.parse(data));  
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function saveCard(member_id, accesstoken, card_id, card_name, front_pic, back_pic){
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.add_membercard',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'idcard': card_id,
				'member_name': card_name,
				'front_pic': front_pic,
				'back_pic': back_pic
			},
			type: 'post',
			success: function(data) {
	        	success(JSON.parse(data)); 
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function modifyCard(member_id, accesstoken, membercard_id, idcard, member_name, front_pic, back_pic) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.edit_membercard',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'membercard_id': membercard_id,
				'idcard': idcard,
				'member_name': member_name,
				'front_pic': front_pic,
				'back_pic': back_pic
			},
			type: 'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function deleteCard(member_id, accesstoken, membercard_id) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.del_membercard',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'membercard_id': membercard_id
			},
			type: 'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}

function setDefaultCard(member_id, accesstoken, membercard_id) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.set_membercard',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'membercard_id': membercard_id
			},
			type: 'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
//会员等级相关接口
function gradeData (member_id,accesstoken ) {
 	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.levels_info',
	    data: {
	    	'member_id': member_id,
	    	'accesstoken':accesstoken
	    },
	    type: 'get',
	    success: function (data) {
	        success(JSON.parse(data));      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
//用户退出登录接口
function logout (member_id,accesstoken ) {
 	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.passport.logout',
	    data: {
	    	'member_id': member_id,
	    	'accesstoken':accesstoken
	    },
	    type: 'get',
	    success: function (data) {
	        success(JSON.parse(data));      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
//修改密码
function changePwd (member_id, accesstoken, old_passwd, passwd, passwd_re) {
 	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.save_security',
	    data: {
	    	member_id: member_id,
			accesstoken: accesstoken,
	    	old_passwd: old_passwd,
			passwd: passwd,
			passwd_re: passwd_re
	    },
	    type: 'get',
	    success: function (data) {
	        success(JSON.parse(data));      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function visitData (member_id,accesstoken,limit,page) {
 	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.history_show',
	    data: {
	    	'member_id': member_id,
	    	'accesstoken':accesstoken,
	    	'limit':limit,
	    	'page':page
	    },
	    type: 'post',
	    success: function (data) {
		    success(JSON.parse(data));     
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function visitEmpty (member_id, accesstoken) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.history_delall',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken
			},
			type: 'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}

function memberHeadBack() {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.appimg.memberhead_backimg',
			data: {},
			type: 'get',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
//优惠券相关接口
function couponData (member_id, accesstoken, useable, coupon_type ) {
 	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.coupon',
	    data: {
	    	'member_id': member_id,
	    	'accesstoken': accesstoken,
	    	'useable': useable,
	    	'coupon_type': coupon_type
	    },
	    type: 'get',
	    success: function (data) {
	      var resData = JSON.parse(data);
	        success(resData)      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	})
}
//会员信息设置相关接口
function personalData (member_id, accesstoken) {
 	return Q.Promise((success, error)=>{
	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.setting',
	    data: {
	    	'member_id': member_id,
	    	"accesstoken": accesstoken	
	    },
	    type: 'get',
	    success: function (data) {
	      var resData = JSON.parse(data);
	        success(resData)      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function personalDataSave (member_id, accesstoken, name, sex, birth) {
 	return Q.Promise((success, error)=>{
	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.save_setting',
	    data: {
	    	'member_id': member_id,
	    	'accesstoken': accesstoken,
	    	'name': name,
	    	'sex': sex,
	    	'birth': birth
	    },
	    type: 'post',
	    success: function (data) {
	      var resData = JSON.parse(data);
	        success(resData)      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function picUpload (member_id, accesstoken, img_url) {
 	return Q.Promise((success, error)=>{
	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.upload_image',
	    data: {
	    	'member_id': member_id,
	    	'accesstoken': accesstoken,
	    	'img_url': img_url
	    },
	    type: 'post',
	    success: function (data) {
	      var resData = JSON.parse(data);
	        success(resData)      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}

//从七牛获取token接口
function getToken (member_id, accesstoken) {
 	return Q.Promise((success, error)=>{
	 
		  $.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.get_qiniu_token',
		    data: {
		    	'member_id': member_id,
		    	'accesstoken': accesstoken
		    },
		    type: 'get',
		    success: function (data) {
		      var resData = JSON.parse(data);
		      success(resData)
		    },
		    error: function(xhr){
	            error('请求失败')
	        }
		});
	});
}
//检验账户是否绑定手机号
function isBound (member_id, accesstoken) {
 	return Q.Promise((success, error)=>{
	 
		  $.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.brandmobile',
		    data: {
		    	'member_id': member_id,
		    	'accesstoken': accesstoken
		    },
		    type: 'get',
		    success: function (data) {
		      success(JSON.parse(data));
		    },
		    error: function(xhr){
	            error('请求失败')
	        }
		});
	});
}
function toBound (member_id, accesstoken, vcode, mobile, password, type) {
 	return Q.Promise((success, error)=>{
	 
		  $.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.bdmobile',
		    data: {
		    	"member_id": member_id,
				"accesstoken": accesstoken,
			    "vcode": vcode,
			    "mobile": mobile,
			    "password":  password,  //绑定手机登录密码  *第一次绑定手机号时必提交，修改绑定手机号时不提交
			    "codetype": type
		    },
		    type: 'get',
		    success: function (data) {
		      success(JSON.parse(data));
		    },
		    error: function(xhr){
	            error('请求失败')
	        }
		});
	});
}
//宝宝信息
function babysInfo (member_id, accesstoken) {
 	return Q.Promise((success, error)=>{
	 
		  $.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.baby_list',
		    data: {
		    	'member_id': member_id,
		    	'accesstoken': accesstoken
		    },
		    type: 'get',
		    success: function (data) {
		      success(JSON.parse(data));
		    },
		    error: function(xhr){
	            error('请求失败')
	        }
		});
	});
}
function addBabysInfo (member_id, accesstoken, sex, birthday) {
 	return Q.Promise((success, error)=>{
	 
		  $.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.save_baby',
		    data: {
		    	'member_id': member_id,
		    	'accesstoken': accesstoken,
		    	'sex': sex,
				'birthday': birthday
		    },
		    type: 'post',
		    success: function (data) {
		      success(JSON.parse(data));
		    },
		    error: function(xhr){
	            error('请求失败')
	        }
		});
	});
}

function orderConfirm(member_id, accesstoken, order_id) {
	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.order_confirm',
	    data: {
	    	'member_id': member_id,
	    	'accesstoken': accesstoken,
	    	'order_id': order_id
	    },
	    type: 'post',
	    success: function (data) {
	      	var resData = JSON.parse(data);
	        success(resData)      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function userSilde() {
	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.appimg.slide_show',
	    data: {},
	    type: 'get',
	    success: function (data) {
	      	var resData = JSON.parse(data);
	        success(resData)      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function nodiscuss(member_id, accesstoken, order_id) {
	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.nodiscuss',
	    data: {
	    	'member_id': member_id,
	    	'accesstoken': accesstoken,
	    	'order_id': order_id
	    },
	    type: 'get',
	    success: function (data) {
	      	var resData = JSON.parse(data);
	        success(resData)      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function comment(member_id, accesstoken, order_id, goods_id, product_id, comment, comment_all, point, discussverifyCode, image1, image2, image3, image4, image5) {
	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.comment.toComment',
	    data: {
	    	'member_id': member_id,
	    	'accesstoken': accesstoken,
	    	'order_id': order_id,
	    	'goods_id': goods_id,
	    	'product_id': product_id,
	    	'comment': comment,
	    	'comment_all': comment_all,
	    	'point': point,
	    	'discussverifyCode': discussverifyCode,
	    	'image1': image1,
	    	'image2': image2,
	    	'image3': image3,
	    	'image4': image4,
	    	'image5': image5
	    },
	    type: 'post',
	    success: function (data) {
	      	var resData = JSON.parse(data);
	        success(resData)      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function favorite(member_id, accesstoken, n_page){
	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.favorite',
	    data: {
	    	'member_id': member_id,
	    	'accesstoken': accesstoken,
	    	'n_page': n_page
	    },
	    type: 'get',
	    success: function (data) {
	      	var resData = JSON.parse(data);
	        success(resData)      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function favblog(member_id, accesstoken, n_page){
	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.favblog',
	    data: {
	    	'member_id': member_id,
	    	'accesstoken': accesstoken,
	    	'n_page': n_page
	    },
	    type: 'get',
	    success: function (data) {
	      	var resData = JSON.parse(data);
	        success(resData)      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function suggest(member_id, accesstoken, comment){
	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.contes_back',
	    data: {
	    	'member_id': member_id,
	    	'accesstoken': accesstoken,
	    	'comment': comment
	    },
	    type: 'post',
	    success: function (data) {
	        success(JSON.parse(data));   
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function visitDel(member_id,accesstoken,history_id){
	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.history_del',
	    data: {
	    	'member_id': member_id,
	    	'accesstoken': accesstoken,
	    	'history_id': history_id
	    },
	    type: 'post',
	    success: function (data) {
	        success(JSON.parse(data));   
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}

exports.userAddress = userAddress;
exports.deleteAddr = deleteAddr;
exports.getRegions = getRegions;
exports.addAddress = addAddress;
exports.modifyAddress = modifyAddress;
exports.setDefaultAddr = setDefaultAddr;
exports.addReceiver = addReceiver;
exports.myTtmama = myTtmama;
exports.gradeData = gradeData;
exports.visitData = visitData;
exports.visitEmpty = visitEmpty;
exports.memberHeadBack = memberHeadBack;
exports.couponData = couponData;
exports.personalData = personalData;
exports.personalDataSave = personalDataSave;
exports.picUpload = picUpload;
exports.cardData = cardData;
exports.saveCard = saveCard;
exports.modifyCard = modifyCard;
exports.deleteCard = deleteCard;
exports.setDefaultCard = setDefaultCard;
exports.logout = logout;
exports.changePwd = changePwd;
exports.getToken = getToken;
exports.isBound = isBound;
exports.toBound = toBound;
exports.orderConfirm = orderConfirm;
exports.userSilde = userSilde;
exports.nodiscuss = nodiscuss;
exports.comment = comment;
exports.favorite = favorite;
exports.favblog = favblog;
exports.suggest = suggest;
exports.babysInfo = babysInfo;
exports.addBabysInfo = addBabysInfo;
exports.visitDel = visitDel;