# vue-MultiplePage-Application
多页面应用配置文件分享
# webpack 的生产环境和开发环境配置
打包文件
# webpack 的生产环境和开发环境使用的模版页面
模版文件
# node.js 的https服务
var https = require('https')
var fs = require("fs")

var options = {
    key: fs.readFileSync('./httpskey/privatekey.pem'),
    cert: fs.readFileSync('./httpskey/certificate.pem')
};

https.createServer(options, app).listen(3011, function () {
    console.log('Https server listening on port ' + 3011);
});
#增加rollup.js
