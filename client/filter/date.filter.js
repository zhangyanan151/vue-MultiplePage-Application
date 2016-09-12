var env_1 = require('../../env');
//计算时间差
module.exports = function (Vue){
    Vue.filter('time-diff', function(dateTime){
        console.log(dateTime)
      
        var date1=dateTime;  //开始时间
        var date2=new Date();    //结束时间
      
        var date3=date1-date2.getTime()/1000  //时间差的毫秒数
  

        //计算出相差天数
        var days=Math.floor(date3/(24*3600))
        //计算出小时数
        var leave1=date3%(24*3600)    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600))

        //计算相差分钟数
        var leave2=leave1%(3600)        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60))

        //计算相差秒数
        var leave3=leave2%(60)      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1)

        if(days>0){
            return days+'天'
        }else if(hours > 0){
            return hours+'小时'
        }else if(minutes > 0){
            return minutes+'分钟'
        }else if(seconds > 0 ){
            return seconds+'秒'
        }else{
            return '刚刚'
        }
    });

Vue.filter('addUrl', function(value){
	/*这里的URL 需要自动获取（不能写死）*/
	return env_1.config.BASE_HOST + value;
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


//find timeout export
Vue.filter('findstrtime', function(value){
    console.log(value)
        var deltaTime = value;
        var day = parseInt(deltaTime / 3600 /24, 10);
        var hour = parseInt(deltaTime / 3600 % 24, 10);
        var minutes = parseInt(deltaTime / 60 % 60, 10);
        var seconds = parseInt(deltaTime % 60, 10);
        day = day < 0 ? 0 : day;
        hour = hour < 0 ? 0 : hour;
        minutes = minutes < 0 ? 0 : minutes;
        seconds = seconds < 0 ? 0 : seconds;
        //goods.timeStr = day+'天'+hour+'小时'+minutes+'分'+seconds+'秒';
        var str=day+'天'+hour+'小时'+minutes+'分'+seconds+'秒';
         return str;
})

}
