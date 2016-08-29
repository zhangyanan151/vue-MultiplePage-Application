import Q from 'q';
import $ from 'jquery';

function showData (page_size, page) {
 	return Q.Promise((success, error)=>{
	  var goodsObj;
	  $.ajax({
	    url: 'http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.filter_get_goods',
	    type: 'get',
	    data: {
	      'page': page,
	      'pagesize': page_size
	    },
	    success: function (data) {
	      var resData = JSON.parse(data);
	      if (resData.rsp === 'succ') {
	        goodsObj =  resData.data;
	      }else {
	        goodsObj = [];
	      }
	      success(goodsObj)
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	  
	});
}






function details_show_data (goods_id, product_id,member_id) {
 	return Q.Promise((success, error)=>{
	  var goodsObj;
	  $.ajax({
	    // url: 'http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list',
	    url: 'http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.get_item',
	    type: 'get',
	    // async: false,
	    data: {
	      'goods_id': goods_id
	      // ,		//商品id
	      // 'product_id': product_id,	//货品id goods_id product_id必填一个
	      // 'member_id': member_id	//会员id
	    },
	    success: function (data) {
	      var resData = JSON.parse(data);
	      if (resData.rsp === 'succ') {
	        goodsObj =  resData.data;
	      }else {
	        goodsObj = [];
	      }
	      success(goodsObj)
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	  
	});
}
let groupbuyService = {
    showData: showData,
    details_show_data: details_show_data
};

export default groupbuyService;