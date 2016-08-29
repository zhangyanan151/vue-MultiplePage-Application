var Q = require('q');
var $ = require('jquery');
var env = require('../../../env.js');

function loginData (uname, password) {
 	return Q.Promise((success, error)=>{
	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.passport.post_login',
	    data: {
	    	'uname': uname,
	    	"password": password	
	    },
	    type: 'get',
	    success: function (data) {
	        success(JSON.parse(data));  
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
exports.loginData = loginData;