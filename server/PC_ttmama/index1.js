'use strict';
var vueServer = require("vue-server");
var fs = require('fs');
var request = require('request'); //第3方http请求的插件
var queryString = require('querystring'); //转换get参数的插件
var env_1 = require('../../env');
var Vue = new vueServer.renderer();
var timeDiff = require('../../client/filter/date.filter');

function index(req, res) {
  console.log(new Date() + 'the server start running...');
  var interval = 1000 * 60 * 2;
  (function schedule(){
    setTimeout(function(){
        checkFile();
        console.log(new Date() + 'async is done');
        schedule();
      
    },interval)
  }());
}

function checkFile() {
  console.log('checkFile...')
}
exports.index = index;
