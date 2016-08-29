import Vue from 'vue'
Vue.filter('isBaoshui', function(value){
	if (value) {
		return 'bsc';
	}else {
		return 'xhc';
	}
})
Vue.filter('addUrl', function(value){
	/*这里的URL 需要自动获取（不能写死）*/
	return 'http://nb.ittmom.com/ttmamaapp2/' + value;
})
Vue.filter('checkPrice', function(value){
	if(value%1>0) {
		return parseInt(value, 10) + '.';
	}else {	
		return parseInt(value, 10);
	}
})
Vue.filter('checkPriceChange', function(value){
	if(value%1>0) {
		return value.split('.')[1]
	}else {
		return ''
	}
})
/*是否包邮过滤器*/
Vue.filter('isFreeShipping', function(promotion_tags){
	for(var i=0; i<promotion_tags.length; i++){
		if(promotion_tags[i].tag_name==='包邮'){
			return true;
		}
	}
	return false;
})

/*时间转换过滤器*/
Vue.filter('DateParse', function(time){
	var d = new Date();
	d.setTime(time*1000)
	return formatDate(d, "yyyy-MM-dd hh:mm:ss");
})
Vue.filter('DateParseParam', function(time, param){
	var d = new Date();
	d.setTime(time*1000)
	return formatDate(d, param);
})

Vue.filter('sexLabel', function(value){
    var str = '';
    switch(value){
        case '1':
            str = '男';
            break;
        case '2':
            str = '女';
            break;
        default:
        	str = '保密';
    }
    return str;
})

function formatDate(date, fmt) {
	var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o) {
    	if (new RegExp("(" + k + ")").test(fmt)){
    		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    	} 
    }
    return fmt;
}

//find timeout export
Vue.filter('findstrtime', function(value){
	var date=new Date(value*1000);
	 var year = date.getFullYear();
     var month = date.getMonth()+1;    //js从0开始取 
     var date1 = date.getDate(); 
     var hour = date.getHours(); 
     var minutes = date.getMinutes(); 
     var second = date.getSeconds();
     //goods.timeStr = day+'天'+hour+'小时'+minutes+'分'+seconds+'秒';
     var str=year+'-'+formate(month)+'-'+formate(date1)+' '+formate(hour)+':'+formate(minutes)+'';/*+formate(second)+'';*/
     return str;

	function formate(d) {
		return d > 9 ? d : '0' + d;
	}
})

Vue.filter('addressFormat', function(value){
	var add = value.split(":")[1];
	var reg = new RegExp("/","g");
	var newadd = add.replace(reg, '');
	return newadd;
})

Vue.filter('orderSpec', function(value) {
	if(value == false){
		return "默认";
	}else {
		var spec = "";
		for(var name in value.spec_value) {
			spec += value.spec_value[name] + " ";
		}
		return spec;
	}
})
Vue.filter('orderDetailSpec', function(value){
	if(value == "") {
		return "默认";
	}else {
		if(value.product_attr) {
			var spec = "";
			for(var key in value.product_attr) {
				spec += value.product_attr[key].value + " ";
			}
			return spec;
		}else {
			return "默认";
		}
	}
})

Vue.filter('orderNum', function(value) {
	var num = 0;
	for(var key in value) {
		num += parseInt(value[key].nums, 10);
	}
	return num;
})

Vue.filter('emotionFormat', function(value, emotionList){
	value = value.replace(/([\[]{1})([\u4e00-\u9fa5a-zA-Z]+)(]{1})/g, function(word){
		var clas = emotionList[word];
		return "<i contenteditable='false' class='ttmama-emotion-sp "+clas+"'></i>";
	});
	return value;
});
