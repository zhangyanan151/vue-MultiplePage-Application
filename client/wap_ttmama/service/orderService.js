var Q = require('q');
var $ = require('jquery');
var env = require('../../../env.js');

function selectPayment() {
 	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.order.select_payment',
	    data: {
	    	'platform': 'iswap'
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
function createOrder(md5_cart_info, member_id, accesstoken, addr_id, shipping_id, pay_app_id, memo, payment_is_tax, payment_tax_type, payment_tax_company, payment_tax_content, use_balance, idcard_image_id){
	return Q.Promise((success, error)=>{	 
		$.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.order.create',
		    data: {
		    	'md5_cart_info': md5_cart_info,
		    	'member_id': member_id,
		    	'accesstoken': accesstoken,
		    	'addr_id': addr_id,
		    	'shipping_id': shipping_id,
		    	'pay_app_id': pay_app_id,
		    	'memo': memo,
		    	'payment[is_tax]': payment_is_tax,
		    	'payment[tax_type]': payment_tax_type,
		    	'payment[tax_company]': payment_tax_company,
		    	'payment[tax_content]': payment_tax_content,
		    	'use_balance': use_balance,
		    	'idcard_image_id': idcard_image_id
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
function orders(order_type, member_id, accesstoken, n_page) {
	return Q.Promise((success, error)=>{	 
		$.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.order.orders_new',
		    data: {
		    	'order_type': order_type,
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
function orderDetail(order_id, member_id, accesstoken) {
	return Q.Promise((success, error)=>{	 
		$.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.order.orderdetail_new',
		    data: {
		    	'order_id': order_id,
		    	'member_id': member_id,
		    	'accesstoken': accesstoken
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
function delivery(member_id, accesstoken, order_id) {
	return Q.Promise((success, error)=>{	 
		$.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.order.delivery',
		    data: {
		    	'order_id': order_id,
		    	'member_id': member_id,
		    	'accesstoken': accesstoken
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
function deleteOrder(order_id, member_id, accesstoken) {
	return Q.Promise((success, error)=>{	 
		$.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.order.del',
		    data: {
		    	'order_id': order_id,
		    	'member_id': member_id,
		    	'accesstoken': accesstoken
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
function orderCancel(order_id, member_id, accesstoken, reason_type) {
	return Q.Promise((success, error)=>{	 
		$.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.order.cancel',
		    data: {
		    	'order_id': order_id,
		    	'member_id': member_id,
		    	'accesstoken': accesstoken,
		    	'reason_type': reason_type
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
function afterrec(member_id, accesstoken, status, order_id, n_page, type) {
	return Q.Promise((success, error)=>{	 
		$.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.afterrec',
		    data: {
		    	'member_id': member_id,
		    	'accesstoken': accesstoken,
		    	'status': status,
		    	'order_id': order_id,
		    	'n_page': n_page,
		    	'type': type
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
function returnSche(member_id, accesstoken, order_id, return_id) {
	return Q.Promise((success, error)=>{	 
		$.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.return_sche',
		    data: {
		    	'member_id': member_id,
		    	'accesstoken': accesstoken,
		    	'order_id': order_id,
		    	'return_id': return_id
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
function returnLater(member_id, accesstoken, order_id, return_id, logis, courier_number, memo) {
	return Q.Promise((success, error)=>{	 
		$.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.return_later',
		    data: {
		    	'member_id': member_id,
		    	'accesstoken': accesstoken,
		    	'order_id': order_id,
		    	'return_id': return_id,
		    	'logis': logis,
		    	'courier_number': courier_number,
		    	'memo': memo
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
function aftersaleAdd(member_id, accesstoken, order_id) {
	return Q.Promise((success, error)=>{	 
		$.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.aftersales.add',
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
function returnSave(member_id, accesstoken, order_id, product_id, product_nums, type, title, content, image1, image2, image3) {
	return Q.Promise((success, error)=>{	 
		$.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.aftersales.return_save&product_nums['+product_id+']='+product_nums,
		    data: {
		    	'member_id': member_id,
		    	'accesstoken': accesstoken,
		    	'order_id': order_id,
		    	'type': type,
		    	'title': title,
		    	'content': content,
		    	'image1': image1,
		    	'image2': image2,
		    	'image3': image3
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
function cancelReturn(member_id, accesstoken, order_id, return_id) {
	return Q.Promise((success, error)=>{	 
		$.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.cancel_return',
		    data: {
		    	'member_id': member_id,
		    	'accesstoken': accesstoken,
		    	'order_id': order_id,
		    	'return_id': return_id
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
function changePayment(member_id, accesstoken, order_id, pay_app_id) {
	return Q.Promise((success, error)=>{	 
		$.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.order.payment_change',
		    data: {
		    	'member_id': member_id,
		    	'accesstoken': accesstoken,
		    	'order_id': order_id,
		    	'pay_app_id': pay_app_id
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
exports.selectPayment = selectPayment;
exports.createOrder = createOrder;
exports.orders = orders;
exports.orderDetail = orderDetail;
exports.delivery = delivery;
exports.deleteOrder = deleteOrder;
exports.orderCancel = orderCancel;
exports.afterrec = afterrec;
exports.returnSche = returnSche;
exports.returnLater = returnLater;
exports.aftersaleAdd = aftersaleAdd;
exports.returnSave = returnSave;
exports.cancelReturn = cancelReturn;
exports.changePayment = changePayment;