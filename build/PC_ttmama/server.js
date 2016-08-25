var express = require('express')
var compression = require('compression')
// var bodyParser = require("body-parser");
// var errorHandler = require("errorhandler");
// var methodOverride = require("method-override");
// var cookieParser = require('cookie-parser');
// var webpack = require('webpack')
// var config = require('./webpack.dev.conf')
var index = require("../../server/PC_ttmama/index")
var index1 = require('../../server/PC_ttmama/index1')
var env_1 = require('../../env')
var app = express()
// var compiler = webpack(config)
var test = require('../../server/PC_ttmama/test.js')

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
app.set('views', __dirname + '/view/dist');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname+'/dist'));

// Routes
app.get('/', index.index)
app.get('/:id',index.index)
app.get('/test', test.index)

index1.index();

app.listen(4000, '172.16.0.69', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://172.16.0.68:4000')
})
exports.App = app;