var vueServer = require("vue-server");
var fs = require('fs');
var request = require('request'); //第3方http请求的插件
var queryString = require('querystring'); //转换get参数的插件
var env_1 = require('../../env');
var Vue = new vueServer.renderer();

function index(req, res) {
	var vm = new Vue({
	    template: fs.readFileSync(env_1.config.PATH_TTMAMA + '/Common_components/test/tpl1.html', 'utf-8'),
	}); 
	vm.$on('vueServer.htmlReady', function (html) {
	    res.render('index',{
	      server_html:html,
	      server_data: ''
	    })
	});
}
exports.index = index;