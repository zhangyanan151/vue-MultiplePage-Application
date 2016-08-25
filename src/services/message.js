var jq=require('jquery')
export function getMessage (id) {
  var goodslist;
  jq.ajax({
    url: 'http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list',
    type: 'post',
    async: false,
    data: {
      'type': 'promit',
      'page': 1,
      'page_size': 999,
      'orderby': 'initial_num desc'
    },
    success: function (data) {
      var resData = jq.parseJSON(data);
        console.log(resData.rsp+' this is request');
      if (resData.rsp === 'succ') {
        goodslist =  resData.data.items;
        for(var i=0; i<goodslist.length; i++) {
        	var goods = goodslist[i];
        	goods.timeStr = '';
        }
      }else {
        goodslist = [];
      }
    }
  })

    

    
  return 'Hello from Component A!'+id;
    
};
export function get (b){
    
  jq(b).css('color', 'red');
 
};






