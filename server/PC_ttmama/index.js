
var vueServer = require("vue-server");
var fs = require('fs');
var request = require('request'); //第3方http请求的插件
var queryString = require('querystring'); //转换get参数的插件
var env_1 = require('../../env');
var Vue = new vueServer.renderer();
var timeDiff = require('../../client/filter/date.filter');

var goodslist;
var trailer_goodslist;

function index(req, res) {
  var fileName = env_1.config.PATH_TTMAMA + '/static/index.html';
  var jsonName = env_1.config.PATH_TTMAMA + '/static/index.json';
  fs.exists(fileName, (exists)=>{
    if(exists) {
      fs.exists(jsonName, (exists)=>{
        if(exists) {
            res.render('index',{
            server_html: fs.readFileSync(env_1.config.PATH_TTMAMA + '/static/index.html', 'utf-8'),
            server_data: fs.readFileSync(env_1.config.PATH_TTMAMA + '/static/index.json', 'utf-8')
          });
          console.log('静态页面');
        }else {
          activityData(req, res);
          console.log('动态页面');
        }
        
      });
    }else {
      activityData(req, res);
      console.log('动态页面');
    }
  });
}

function activityData(req, res) {
  var cookbook_id = req.params.id;
  var b,bb;
  var promitOptions = {
      method: 'get',
      async: false,
      url: 'http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list&' + queryString.stringify({
        type: 'promit',
        page: 1,
        page_size: 4,
        orderby: 'initial_num desc'
      })
  };
  var traileroptions = {
      method: 'get',
      async: false,
      url: 'http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list&' + queryString.stringify({
        type: 'trailer',
        page: 1,
        page_size: 4,
        orderby: 'initial_num desc'
      })
      
  };

  request(promitOptions, function (err, resp, body) {
    if (!err && resp.statusCode == 200) { 
      var bb = JSON.parse(body);
      if (bb.rsp === 'succ') {
        goodslist =  bb.data;
        checkTime(goodslist.items);
      }
    }
    request(traileroptions, function (err, resp, body) {
      if (!err && resp.statusCode == 200) {
        b = JSON.parse(body);
        if (b.rsp === 'succ') {          
          trailer_goodslist =  b.data; 
          checkTime(trailer_goodslist.items)
        }
      }

      timeDiff(Vue);
      var fileStr = fs.readFileSync(env_1.config.PATH_TTMAMA + '/Common_components/topimg/template.html', 'utf-8') + fs.readFileSync(env_1.config.PATH_TTMAMA + '/Common_components/group/template.html', 'utf-8');
      var vm = new Vue({
        template: fileStr,
        data: {
            imgurl: 'http://img.ttmama.com/themes/ttmama/images/ttmama_mianshui_02.png',
            flash_sale_goodsObj: goodslist,
            underline_goodsObj: trailer_goodslist,
            activity: {
              alive: true,
              next: false
            },
            page: {
              alive: 1,
              next: 1
            }
        }
      }); 
      vm.$on('vueServer.htmlReady', function (html) {
        var dataJson = "window.cm_groupbuyItems = {\"flash_sale_goodsObj\":" + JSON.stringify(goodslist)+
                        ",\"underline_goodsObj\":"+JSON.stringify(trailer_goodslist)+",\"cm_gzcImg\":\"http://img.ttmama.com/themes/ttmama/images/ttmama_mianshui_02.png\"}";
        res.render('index',{
          server_html:html,
          server_data: dataJson
        });
        // 存储到文件
        fs.writeFileSync(env_1.config.PATH_TTMAMA + '/static/index.html', html, 'utf8', function(err) {
          if (err) throw err;
          console.log('It\'s saved!');
        });
        fs.writeFileSync(env_1.config.PATH_TTMAMA + '/static/index.json', dataJson, 'utf8', function(err) {
          if (err) throw err;
          console.log('It\'s saved!');
        });
      });
    });
  });
}

function checkTime (goodslist) {
      for (var i=0; i<goodslist.length; i++) {
        var goods = goodslist[i];
        if (!goods.products.end_time) return;
        var now = new Date().getTime();
        now = now/1000;
        var end = goods.products.end_time;
        var deltaTime = end - now;
        var day = parseInt(deltaTime / 3600 /24, 10);
        var hour = parseInt(deltaTime / 3600 % 24, 10);
        var minutes = parseInt(deltaTime / 60 % 60, 10);
        var seconds = parseInt(deltaTime % 60, 10);
        day = day < 0 ? 0 : day;
        hour = hour < 0 ? 0 : hour;
        minutes = minutes < 0 ? 0 : minutes;
        seconds = seconds < 0 ? 0 : seconds;
        goods.timeStr = day+'天'+hour+'小时'+minutes+'分'+seconds+'秒';
      }  
    }
exports.index = index;