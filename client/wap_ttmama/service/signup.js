var Q = require('q');
var $ = require('jquery');
var env = require('../../../env.js');

function getVerify (uname, type) {
 	return Q.Promise((success, error)=>{
	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.passport.send_vcode_sms',
	    data: {
	    	'uname': uname,
	    	"type": type	
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
function validateVerify (vcode, uname, type) {
 	return Q.Promise((success, error)=>{
	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.passport.chkvcode',
	    data: {
	    	'vcode': vcode,
	    	'uname': uname,
	    	"type": type	
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
function signupInfo (uname, password, psw_confirm, license, vcode) {
 	return Q.Promise((success, error)=>{
	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.passport.member_create',
	    data: {
	    	'uname': uname,
	    	'password': password,
	    	'psw_confirm': psw_confirm,
	    	'license': license,
	    	'vcode': vcode
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
//找回密码
function foundInfo (vcode, new_pwd, new_confirm, username) {
 	return Q.Promise((success, error)=>{
	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.passport.resetpwd_code',
	    data: {
	    	'vcode': vcode,
	    	'login_password': new_pwd,
	    	'psw_confirm': new_confirm,
	    	'username': username
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
function idVerify (send_type, username) {
 	return Q.Promise((success, error)=>{
	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.passport.sendPSW',
	    data: {
	    	'send_type': send_type,
	    	'username': username
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
exports.getVerify = getVerify;
exports.validateVerify = validateVerify;
exports.signupInfo = signupInfo;
exports.foundInfo = foundInfo;
exports.idVerify = idVerify;