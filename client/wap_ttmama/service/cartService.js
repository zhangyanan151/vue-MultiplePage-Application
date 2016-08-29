var Q = require('q');
var $ = require('jquery');
var env = require('../../../env.js');

function gotopay(member_id, accesstoken, order_id, pay_app_id, pay_object) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.cart.gotopay',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'order_id': order_id,
				'pay_app_id': pay_app_id,
				'pay_object': pay_object
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

exports.gotopay = gotopay;