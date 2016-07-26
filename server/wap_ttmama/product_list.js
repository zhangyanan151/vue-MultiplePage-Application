var vueServer = require("vue-server");
var fs = require('fs');
var request = require('request'); //第3方http请求的插件
var queryString = require('querystring'); //转换get参数的插件
var env = require('../../env');
var Vue = new vueServer.renderer();

function index(req, res) {
	var fileName = env.config.PATH_WAP_TTMAMA + '/static/product_list.html';
  	var jsonName = env.config.PATH_WAP_TTMAMA + '/static/product_list.json';
	fs.exists(fileName, (exists)=>{
	    if(exists) {
	      	fs.exists(jsonName, (exists)=>{
		      	if(exists) {
		            res.render('index',{
			            server_html: fs.readFileSync(fileName, 'utf-8'),
			            server_data: fs.readFileSync(jsonName, 'utf-8')
			        });
		        }else {
		          	renderData(req, res);
		        }
		        
		    });
	    }else {
		    renderData(req, res);
	    }
	});	
}
function renderData(req, res) {
	var dataList = [];
	var indexOptions = {
		method: 'get',
      	async: false,
      	url: env.config.BASE_HOST + 'appapi?method=mobileapi2.goods.filter_get_goods&page=1&pagesize=20'
	};
	request(indexOptions, function (err, resp, body) {
		if (!err && resp.statusCode == 200) {
			var bb = JSON.parse(body);
		    if (bb.rsp === 'succ') {
		        var data =  bb.data;
		        dataList = data;
		    }
		}
		var tpl = fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/list_page/template.html', 'utf-8');
		var vm = new Vue({
			template: tpl,
			data: {
				page_size: 20,
			    page_data: dataList,
			    current_page: 1,
			    has_next: true,
			    isLoading: false
			}
		});
		vm.$on('vueServer.htmlReady', function (html) {
	    	var dataJson = "window.cm_produce_list = {\"pageData\":" + JSON.stringify(dataList) +"}";
	        res.render('index',{
	          server_html:html,
	          server_data: dataJson
	        });
	        // 存储到文件
	        fs.writeFileSync(env.config.PATH_WAP_TTMAMA + '/static/product_list.html', html, 'utf8', function(err) {
	          	if (err) throw err;
	          	console.log('It\'s saved!');
	        });
	        fs.writeFileSync(env.config.PATH_WAP_TTMAMA + '/static/product_list.json', dataJson, 'utf8', function(err) {
	          	if (err) throw err;
	          	console.log('It\'s saved!');
	        });
	    });

	});
}
exports.index = index;