import Q from 'q';
import $ from 'jquery';

function showData (flashSale_or_underline, page) {
 	return Q.Promise((success, error)=>{
	  var goodsObj;
	  $.ajax({
	    url: 'http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list',
	    type: 'get',
	    async: false,
	    data: {
	      'type': flashSale_or_underline + '',
	      'page': page,
	      'page_size': 4,
	      'orderby': 'initial_num desc'
	    },
	    success: function (data) {
	      var resData = $.parseJSON(data);
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
    showData: showData
};

export default groupbuyService;