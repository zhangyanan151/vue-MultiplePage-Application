import Q from 'q'
var $ = require('jquery');
 function showData (url, flashSale_or_underline, page) {

 return Q.Promise((success, error)=>{
  var goodslist;
  $.ajax({
    // url: 'http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list',
    url: url + '',
    type: 'get',
    async: false,
    data: {
      'type': flashSale_or_underline + '',
      'page': page,
      'page_size': 4,
      'orderby': 'initial_num desc'
    },
    success: function (data) {
      console.log('showData ...')
      var resData = $.parseJSON(data);
      if (resData.rsp === 'succ') {
        goodslist =  resData.data.items;
        for(var i=0; i<goodslist.length; i++) {
        	var goods = goodslist[i];
          goods.timeStr = '';
        };
        goodslist.total=resData.data.total;
        
        success(goodslist)
      }else {
        goodslist = [];
      }
    },
    error: function(xhr){
                    error('请求失败')
                }
  })
  
})
                  }
let showService = {
    showData: showData

};

export default showService;