var Q = require('q');
var $ = require('jquery');
var env = require('../../../env.js');

//获取百川初始化数据
function InitWkitData (member_id, accesstoken) {
 	return Q.Promise((success, error)=>{
	 
		  $.ajax({
		    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.openim.get_info',
		    data: {
		    	'member_id': member_id,
		    	'accesstoken': accesstoken
		    },
		    type: 'get',
		    success: function (data) {
		      success(JSON.parse(data))
		    },
		    error: function(xhr){
	            error('请求失败')
	        }
		});
	});
}
exports.InitWkitData = InitWkitData;