var Q = require('q');
var $ = require('jquery');
var env = require('../../../env.js');

function indexData () {
 	return Q.Promise((success, error)=>{
	  var indexObj = [];
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.indexad.get_special_info',
	    data: {'path': env.config.INDEX_PATH},
	    type: 'get',
	    success: function (data) {
	      var resData = JSON.parse(data);
	      if (resData.rsp === 'succ') {
	        indexObj =  resData.data;
	      }else {
	        indexObj = [];
	      }
	      success(indexObj)
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function cartData(member_id, accesstoken) {
	return Q.Promise((success, error)=>{
		var cartObj = [];
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.cart.get_list',
			data: {'member_id': member_id, 'accesstoken': accesstoken},
			type: 'get',
			success: function(data) {
				var cartObj = JSON.parse(data);
				success(cartObj);
			},
			error: function(xhr) {
				error('请求失败');
			}
		});
	});
}
function addCart(member_id, accesstoken, product_id, num, buy_code, btype) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.cart.add',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'product_id': product_id,
				'num': num,
				'buy_code': buy_code,
				'btype': btype
			},
			type:'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function updateCart(member_id, accesstoken, obj_type, obj_ident, quantity) {
	return Q.Promise((success, error)=>{
		var cartObj = [];
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.cart.update',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'obj_type': obj_type,
				'obj_ident': obj_ident,
				'quantity': quantity
			},
			type: 'post',
			success: function(data) {
				var cartObj = JSON.parse(data);
				success(cartObj);
			},
			error: function(xhr) {
				error('请求失败');
			}
		});
	});
}
function deleteCart(member_id, accesstoken, obj_type, obj_ident) {
	return Q.Promise((success, error)=>{
		var cartObj = [];
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.cart.remove',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'obj_type': obj_type,
				'obj_ident': obj_ident
			},
			type: 'post',
			success: function(data) {
				var cartObj = JSON.parse(data);
				success(cartObj);
			},
			error: function(xhr) {
				error('请求失败');
			}
		});
	});
}
function submitCart(obj_ident, member_id, accesstoken, is_submit, buy_num) {
	var identStr = '';
	var submitStr = '';
	var numStr = '';
	for(var i=0; i<obj_ident.length; i++) {
		identStr += "obj_ident["+(i+1)+"]=" + obj_ident[i]+"&";
		submitStr += 'is_submit['+obj_ident[i]+"]=" +is_submit[i]+"&";
		numStr += 'buy_num['+obj_ident[i]+"]=" + buy_num[i] + "&";
	}
	var dataStr = identStr+submitStr+numStr;
	dataStr+= "member_id="+member_id+"&accesstoken="+accesstoken;
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.cart.set_product_status&'+dataStr,
			type: 'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	})
}
function getClassify() {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.goods.get_cat',
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
function getHotKeywords() {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.keywords.get_all_list',
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
function getCartNum(member_id, accesstoken) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.cart.get_cart_num',
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
function addFav(member_id, accesstoken, gid) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.add_fav',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'gid': gid
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
function delFav(member_id, accesstoken, gid) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.member.del_fav',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'gid': gid
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
function checkout(member_id, accesstoken, isfastbuy) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.cart.checkout',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'isfastbuy': isfastbuy
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
function deliveryChange(member_id, accesstoken, addr_id) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.cart.delivery_change',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'addr_id': addr_id
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
function useCoupon(isfastbuy, coupon, member_id, accesstoken) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.cart.add_coupon',
			data: {
				'isfastbuy': isfastbuy,
				'coupon': coupon,
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
function updateTotal(member_id, accesstoken, addr_id, shipping_id, pay_app_id) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.cart.update_total',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'addr_id': addr_id,
				'shipping_id': shipping_id,
				'pay_app_id': pay_app_id
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
function reAddCart(member_id, accesstoken, order_id, buy_code, btype) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.cart.reAddCart',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'order_id': order_id,
				'buy_code': buy_code,
				'btype': btype
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
exports.indexData = indexData;
exports.cartData = cartData;
exports.updateCart = updateCart;
exports.deleteCart = deleteCart;
exports.submitCart = submitCart;
exports.getClassify = getClassify;
exports.getHotKeywords = getHotKeywords;
exports.addCart = addCart;
exports.getCartNum = getCartNum;
exports.addFav = addFav;
exports.delFav = delFav;
exports.checkout = checkout;
exports.deliveryChange = deliveryChange;
exports.useCoupon = useCoupon;
exports.updateTotal = updateTotal;
exports.reAddCart = reAddCart;