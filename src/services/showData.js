var jq = require('jquery')
export function showData (url, flashSale_or_underline, page) {
  var goodslist;
  jq.ajax({
    // url: 'http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list',
    url: url + '',
    type: 'post',
    async: false,
    data: {
      'type': flashSale_or_underline + '',
      'page': page,
      'page_size': 4,
      'orderby': 'initial_num desc'
    },
    success: function (data) {
      var resData = jq.parseJSON(data);
      if (resData.rsp === 'succ') {
        goodslist =  resData.data.items;
        for(var i=0; i<goodslist.length; i++) {
        	var goods = goodslist[i];
          goods.timeStr = '';
        };
        goodslist.total=resData.data.total;
      }else {
        goodslist = [];
      }
    }
  })
  return goodslist;
}

export function showData2 (url, flashSale_or_underline, page) {
  var goodsObj;
  jq.ajax({
    // url: 'http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list',
    url: url + '',
    type: 'post',
    async: false,
    data: {
      'type': flashSale_or_underline + '',
      'page': page,
      'page_size': 4,
      'orderby': 'initial_num desc'
    },
    success: function (data) {
      var resData = jq.parseJSON(data);
      if (resData.rsp === 'succ') {
        goodsObj =  resData.data;
      }else {
        goodsObj = [];
      }
    }
  })
  return goodsObj;
}
