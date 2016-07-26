var fs = require('fs');
var request = require('request'); //第3方http请求的插件
var env = require('../../env');

function index() {
	console.log("测试生成index.html和route.js");
	var indexOptions = {
		method: 'get',
      	async: false,
      	url: env.config.BASE_HOST + '/appapi?method=mobileapi2.indexad.get_special_info&path='+env.config.INDEX_PATH
	};
	var filePath =env.config.PATH_WAP_TTMAMA + '/index';
	var fileName = 'index.html'
	request(indexOptions, function (err, resp, body) {
		if (!err && resp.statusCode == 200) {
			var bb = JSON.parse(body);
		    if (bb.rsp === 'succ') {
		        var data =  bb.data;
		        createRoute(data,filePath,fileName)
		    }
		}
	});
}

function createRoute(data,filePath,fileName) {
	var htmlStr = '';
	var fileStr = '';
	var dataStr = 'allData: {},';
	var initDataStr = 'this.allData = data;';
	htmlStr += "<div class='index-box'>";
	htmlStr +="<div class='search-box'><search label-color='#fff' head-color='115,192,188' opacity placeholder='查询全球精选宝宝产品' cancel-text='取消' ></search></div>";
	for(var i=0; i<data.wdata.length; i++) {
		var item = data.wdata[i];
		if(item.type === 'wapapp_2pic_col') {
			htmlStr += "<wapapp-2pic-col :wapapp2pic-col='wapapp2picCol_" + i +"'></wapapp-2pic-col>";
			dataStr += "wapapp2picCol_" + i +": {pdata: {}},";
			initDataStr += "this.wapapp2picCol_" + i +" = data.wdata[" + i +"];";
		}else if(item.type === 'wapapp_3pic1_2') {
			htmlStr += "<wapapp-3pic1-2 :wapapp3pic12='wapapp3pic12_" + i +"'></wapapp-3pic1-2>";
			dataStr += "wapapp3pic12_" + i +": {pdata: {}},";
			initDataStr += "this.wapapp3pic12_" + i +" = data.wdata[" + i + "];";
		}else if(item.type === 'wapapp_3pic2_1') {
			htmlStr += "<wapapp-3pic2-1 :wapapp3pic21='wapapp3pic21_" + i +"'></wapapp-3pic2-1>";
			dataStr += "wapapp3pic21_" + i +": {pdata: {}},";
			initDataStr += "this.wapapp3pic21_" + i +" = data.wdata[" + i + "];";
		}else if(item.type === 'wapapp_3pic_col') {
			htmlStr += "<wapapp-3pic-col :wapapp3pic-col='wapapp3picCol_" + i +"'></wapapp-3pic-col>";
			dataStr += "wapapp3picCol_" + i +": {pdata: {slide_pic: []}},";
			initDataStr += "this.wapapp3picCol_" + i +" = data.wdata[" + i + "];";
		}else if(item.type === 'wapapp_goods2col') {
			htmlStr += "<wapapp-goods2col :wapapp-goods2col='wapappGoods2col_" + i +"'></wapapp-goods2col>";
			dataStr += "wapappGoods2col_" + i +": {pdata: []},";
			initDataStr += "this.wapappGoods2col_" + i +" = data.wdata[" + i + "];";
		}else if(item.type === 'wapapp_goods3col') {
			htmlStr += "<wapapp-goods3col :wapapp-goods3col='wapappGoods3col_" + i +"'></wapapp-goods3col>"
			dataStr += "wapappGoods3col_" + i +": {pdata: []},";
			initDataStr += "this.wapappGoods3col_" + i +" = data.wdata[" + i + "];";
		}else if(item.type === 'wapapp_onepic') {
			htmlStr += "<wapapp-onepic :wapapp-onepic='wapappOnepic_" + i +"'></wapapp-onepic>";
			dataStr += "wapappOnepic_" + i +": {pdata: {}},";
			initDataStr += "this.wapappOnepic_" + i +" = data.wdata[" + i + "];";
		}else if(item.type === 'wapapp_piclist') {
			htmlStr += "<wapapp-piclist :wapapp-piclist='wapappPiclist_" + i +"'></wapapp-piclist>";
			dataStr += "wapappPiclist_" + i +": {pdata: []},";
			initDataStr += "this.wapappPiclist_" + i +" = data.wdata[" + i + "];";
		}else if(item.type === 'index_custom') {
			htmlStr += "<custom-component :index-custom = 'indexCustom_" + i +"'></custom-component>";
			dataStr += "indexCustom_" + i +": {pdata: []},";
			initDataStr += "this.indexCustom_" + i +" = data.wdata[" + i + "];";
		}else if(item.type === 'wapapp_tab_slide') {
			htmlStr += "<wapapp-tab-slide :wapapp-tab-slide='wapappTabSlide_" + i +"'></wapapp-tab-slide>";
			dataStr += "wapappTabSlide_" + i +": {pdata: []},";
			initDataStr += "this.wapappTabSlide_" + i +" = data.wdata[" + i + "];" + "this.wapappTabSlide_" + i +".box_id ="+"'id_"+i+"';";
		}else if(item.type === 'index_related_products') {
			htmlStr += "<scroll-load :scroll-load = 'scrollLoad_" + i +"'></scroll-load>";
			dataStr += "scrollLoad_" + i +": {pdata: []},";
			initDataStr += "this.scrollLoad_" + i +" = data.wdata[" + i + "];";
		}
	}
	htmlStr +="<foot-index state='home'></foot-index>";
	htmlStr +="</div>";
	dataStr = dataStr.substring(0, dataStr.length-1);
	fileStr += "import Vue from 'vue';" 
			+ "import Tpl from './index.html';"
			+ "import indexService from '../service/indexService.js';"
			+ "import wapapp2picCol from '../Common_components/wapapp_2pic_col/route';"
			+ "import wapapp3pic12 from '../Common_components/wapapp_3pic1_2/route';"
			+ "import wapapp3pic21 from '../Common_components/wapapp_3pic2_1/route';"
			+ "import wapapp3picCol from '../Common_components/wapapp_3pic_col/route';"
			+ "import wapappGoods2col from '../Common_components/wapapp_goods2col/route';"
			+ "import wapappGoods3col from '../Common_components/wapapp_goods3col/route';"
			+ "import wapappOnepic from '../Common_components/wapapp_onepic/route';"
			+ "import wapappPiclist from '../Common_components/wapapp_piclist/route';"
			+ "import customComponent from '../Common_components/custom_component/route';"
			+ "import wapappTabSlide from '../Common_components/wapapp_tab_slide/route';"
			+ "import searchBar from '../Common_components/search_bar/route';"
			+ "import footIndex from '../Common_components/foot_index/route';"
			+ "import scrollLoad from '../Common_components/scroll_load/route';"
			+ "import Search from '../Common_components/search/route.js';"
			+ "let Index = Vue.extend({"
			+ "	template: Tpl,"
			+ "	data: ()=>{"
			+ "		return {"
			+ dataStr
			+ "		}"
			+ "	},"
			+ "methods: {"
			+ "		initData: function() {"
			+ "         if(window.cm_indexdata){"
			+ "  			var data = window.cm_indexdata.allData;"
			+ 				initDataStr
			+ "         }else{"
			+ "				indexService.indexData().then((data)=>{"
			+ 					initDataStr
			+ "				});"
			+ "			}"
			+ "		}"
			+ "},"
			+ "created: function() {"
			+ "		this.initData();"
			+ "	},"
			+ "watch: {"
			// + "		'allData': {"
			// + "			handler: function(val, oldVal) {"
			// + "				require('../assets/js/lazyload.js');"
			// + "			},"
			// + " 		immediate: true"
			// + "		}"
			+ "	}"
			+ "});"
			+ "export default Index";
	// 存储到文件
    fs.writeFileSync(filePath+"/"+fileName, htmlStr, 'utf8', function(err) {
      	if (err) throw err;
      	console.log('It\'s saved!');
    });
	// 存储到文件
    fs.writeFileSync(filePath+"/route.js", fileStr, 'utf8', function(err) {
      	if (err) throw err;
      	console.log('It\'s saved!');
    });
}

exports.index = index;