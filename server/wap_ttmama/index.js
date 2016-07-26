var vueServer = require("vue-server");
var fs = require('fs');
var request = require('request'); //第3方http请求的插件
var queryString = require('querystring'); //转换get参数的插件
var env = require('../../env');
var Vue = new vueServer.renderer();

function index(req, res) {
	var fileName = env.config.PATH_WAP_TTMAMA + '/static/index.html';
  	var jsonName = env.config.PATH_WAP_TTMAMA + '/static/index.json';
	fs.exists(fileName, (exists)=>{
	    if(exists) {
	      	fs.exists(jsonName, (exists)=>{
		      	if(exists) {
		            res.render('index',{
			            server_html: fs.readFileSync(fileName, 'utf-8'),
			            server_data: fs.readFileSync(jsonName, 'utf-8'),
			            title:'首页'
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
      	url: env.config.BASE_HOST + 'appapi?method=mobileapi2.indexad.get_special_info&path='+env.config.INDEX_PATH
	}
	request(indexOptions, function (err, resp, body) {
		if (!err && resp.statusCode == 200) {
			var bb = JSON.parse(body);
		    if (bb.rsp === 'succ') {
		        var data =  bb.data;
		        dataList = data;
		    }
		}
		var strObj = parseData(dataList);
		var dataStr = strObj.dataStr;
		var initDataStr = strObj.initDataStr;
		var fileStr = strObj.htmlStr;
		
	    if(dataStr.scrollLoad) {
	    	var filterOptions = {
				method: 'get',
		      	async: false,
		      	url: env.config.BASE_HOST + 'appapi?method=mobileapi2.goods.filter_get_goods&pagesize='+dataStr.scrollLoad.pdata.pagesize+'&page=1'
			};
			request(filterOptions, function (err, resp, body) {
				if (!err && resp.statusCode == 200) {
					var bd = JSON.parse(body);
				    if (bd.rsp === 'succ') {
				        var filterdata =  bd.data;
				        dataStr.page_data = filterdata;
				    }
				}
				render(res, fileStr, dataStr, initDataStr, dataList);
			})
	    }else {
	    	render(res, fileStr, dataStr, initDataStr, dataList);
	    }
	});
}
function render(res, fileStr, dataStr, initDataStr, dataList) {
	var vm = new Vue({
        template: fileStr,
        data: function(){
        	return dataStr;
        },
        methods: {
        	initData: function() {
        		initDataStr
        	}
        },
        created: function() {
        	this.initData();
        }
    });
    vm.$on('vueServer.htmlReady', function (html) {
    	var dataJson = "window.cm_indexdata = {\"allData\":" + JSON.stringify(dataList) +"}";
        res.render('index',{
          server_html:html,
          server_data: dataJson,
          title:'首页'
        });
        // 存储到文件
        fs.writeFileSync(env.config.PATH_WAP_TTMAMA + '/static/index.html', html, 'utf8', function(err) {
          	if (err) throw err;
          	console.log('It\'s saved!');
        });
        fs.writeFileSync(env.config.PATH_WAP_TTMAMA + '/static/index.json', dataJson, 'utf8', function(err) {
          	if (err) throw err;
          	console.log('It\'s saved!');
        });
    });
}
function parseData(data) {
	var htmlStr = '';
	var fileStr = '';
	var dataStr = {
		allData: {}
	};
	var initDataStr = 'this.allData = data;';
	htmlStr +=fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/search_bar/template.html', 'utf-8');
	for(var i=0; i<data.wdata.length; i++) {
		var item = data.wdata[i];
		if(item.type === 'wapapp_2pic_col') {
			htmlStr += fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/wapapp_2pic_col/template.html', 'utf-8');
			dataStr.wapapp2picCol = item;
		}else if(item.type === 'wapapp_3pic1_2') {
			htmlStr += fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/wapapp_3pic1_2/template.html', 'utf-8');
			dataStr.wapapp3pic12 = item;
		}else if(item.type === 'wapapp_3pic2_1') {
			htmlStr += fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/wapapp_3pic2_1/template.html', 'utf-8');
			dataStr.wapapp3pic21 = item;
		}else if(item.type === 'wapapp_3pic_col') {
			htmlStr += fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/wapapp_3pic_col/template.html', 'utf-8');
			dataStr.wapapp3picCol = item;
		}else if(item.type === 'wapapp_goods2col') {
			htmlStr += fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/wapapp_goods2col/template.html', 'utf-8');
			dataStr.wapappGoods2col = item;
		}else if(item.type === 'wapapp_goods3col') {
			htmlStr += fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/wapapp_goods3col/template.html', 'utf-8');
			dataStr.wapappGoods3col = item;
		}else if(item.type === 'wapapp_onepic') {
			htmlStr += fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/wapapp_onepic/template.html', 'utf-8');
			dataStr.wapappOnepic = item;
		}else if(item.type === 'wapapp_piclist') {
			htmlStr += fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/wapapp_piclist/template.html', 'utf-8');
			dataStr.wapappPiclist = item;
		}else if(item.type === 'index_custom') {
			htmlStr += fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/custom_component/template.html', 'utf-8');
			dataStr.indexCustom = item;
		}else if(item.type === 'wapapp_tab_slide') {
			htmlStr += fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/wapapp_tab_slide/template.html', 'utf-8');
			dataStr.wapappTabSlide = item;
			initDataStr += "this.wapappTabSlide.box_id ="+"'id_"+i+"';";
		}else if(item.type === 'index_related_products') {
			htmlStr += fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/scroll_load/template.html', 'utf-8');
			dataStr.scrollLoad = item;
			dataStr.column_number = item.pdata.column;
			var filterGoods = {
				method: 'get',
		      	async: false,
		      	url: env.config.BASE_HOST + 'appapi?method=mobileapi2.goods.filter_get_goods&pagesize=' + item.pdata.pagesize + '&page=1'
			};
			request(filterGoods, function (err, resp, body) {
				if (!err && resp.statusCode == 200) {
					var bd = JSON.parse(body);
				    if (bd.rsp === 'succ') {
				        var filter =  bd.data;
				        dataStr.page_data = filter;
				    }
				}
			});
		}
	}
	htmlStr += fs.readFileSync(env.config.PATH_WAP_TTMAMA + '/Common_components/foot_index/template.html', 'utf-8');

	return {
		htmlStr: htmlStr,
		dataStr: dataStr,
		initDataStr: initDataStr
	}
}
exports.index = index;