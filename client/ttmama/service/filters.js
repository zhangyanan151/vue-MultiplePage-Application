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


