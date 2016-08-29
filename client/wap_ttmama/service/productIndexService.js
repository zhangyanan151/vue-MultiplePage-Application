var Q = require('q');
var $ = require('jquery');
var env = require('../../../env.js');

function indexData () {
 	return Q.Promise((success, error)=>{
	  var indexObj = [];
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.indexad.get_list',
	    type: 'get',
	    success: function (data) {
	      var resData = JSON.parse(data);
	      if (resData.rsp === 'succ') {
	        indexObj =  resData.data;
	        // console.log(indexObj)
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
function getProListByParams(catId, page, price, gTag, pTag, brandId, p_, s_, orderBy, searchKeywords, flag) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.goods.filter_get_goods',
			data: {
				'cat_id': catId,
				'page': page,
				'price': price,
				'gTag': gTag,
				'PTag': pTag,
				'brand_id': brandId,
				'p_': p_,
				's_': s_,
				'orderBy': orderBy,
				'search_keywords': searchKeywords,
				'flag': flag
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
function getScreen(catId, searchKeywords, brandId) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.goods.get_screen',
			data: {
				'cat_id': catId,
				'search_keywords': searchKeywords,
				'brand_id': brandId
			},
			type: 'get',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		});
	});
}
function getSpecDesc(goodsId) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.goods.getspec_product',
			data: {
				'goods_id': goodsId
			},
			type: 'get',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		});
	});
}
function getGoodsDetail(goods_id, product_id, member_id) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.goods.get_item',
			data: {
				'goods_id': goods_id,
				'product_id': product_id,
				'member_id': member_id
			},
			type: 'get',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		});
	});
}
function getGoodsLink(iid, member_id, order_id) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.goods.goodslink',
			data: {
				'iid': iid,
				'member_id': member_id,
				'order_id': order_id
			},
			type: 'get',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		});
	});
}
function getComment(goods_id, page) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.goods.comment',
			data: {
				'goods_id': goods_id,
				'page': page
			},
			type: 'get',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		});
	});
}
function getBrandInfo(brand_id){
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.goods.get_brandinfo',
			data: {
				'brand_id': brand_id
			},
			type: 'get',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		});
	});
}

exports.indexData = indexData;
exports.getProListByParams = getProListByParams;
exports.getScreen = getScreen;
exports.getSpecDesc = getSpecDesc;
exports.getGoodsDetail = getGoodsDetail;
exports.getGoodsLink = getGoodsLink;
exports.getComment = getComment;
exports.getBrandInfo = getBrandInfo;