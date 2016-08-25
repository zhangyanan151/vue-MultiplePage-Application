var express = require('express')
var compression = require('compression')
// var bodyParser = require("body-parser");
// var errorHandler = require("errorhandler");
// var methodOverride = require("method-override");
// var cookieParser = require('cookie-parser');
// var webpack = require('webpack')
// var config = require('./webpack.dev.conf')
var index = require("../../server/wap_ttmama/index")
var create = require("../../server/wap_ttmama/create_route_index")
var index1 = require('../../server/wap_ttmama/index1')
var env_1 = require('../../env')
var app = express()
var test = require('../../server/wap_ttmama/test.js')
var client_render = require('../../server/wap_ttmama/client_render.js')
var create_route_index = require('../../server/wap_ttmama/create_route_index.js')
// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())

// // serve webpack bundle output
// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }))

// // enable hot-reload and state-preserving
// // compilation error display
// app.use(require('webpack-hot-middleware')(compiler))

app.use(compression());
app.use(require('prerender-node'));
app.set('views', __dirname + '/view/dist');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname+'/dist'));

// Routes
app.get('/', index.index)
app.get('/create',create.index)
//app.get('/:id',index.index)
app.get('/test', test.index)
app.get('/test1', client_render.test)
app.get('/details', client_render.product_details)
app.get('/cart', client_render.cart)
app.get('/login', client_render.login)
app.get('/list', client_render.product_list)
app.get('/classify', client_render.classify)

//生成模版接口
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

app.post('/create_route_index', create_route_index.index);
// app.get('/redirect-wap-index', generate_wap_index.index)



index1.index();

app.listen(4000, '172.16.0.45', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://172.16.0.68:4000')
})
exports.App = app;