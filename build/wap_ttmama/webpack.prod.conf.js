var path = require('path')
var webpack = require('webpack')
var config = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var glob = require('glob');
// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URLs.


// whether to generate source map for production files.
// disabling this can speed up the build.
//var SOURCE_MAP = true
//
//config.devtool = SOURCE_MAP ? 'source-map' : false
//
//// generate loader string to be used with extract text plugin
//function generateExtractLoaders (loaders) {
//  return loaders.map(function (loader) {
//    return loader + '-loader' + (SOURCE_MAP ? '?sourceMap' : '')
//  }).join('!')
//}
//
//config.vue.loaders = {
//  js: 'babel!eslint',
//  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
//  css: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css'])),
//  less: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'less'])),
//  sass: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'sass'])),
//  stylus: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'stylus']))
//}

config.plugins = (config.plugins || []).concat([
  // http://vuejs.github.io/vue-loader/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({minimize: true,
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendors",

    filename: "[name].[hash:8].js",
    // (Give the chunk a different name)

    minChunks: Infinity,
    // (with more entries, this ensures that no other module
    //  goes into the vendor chunk)
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  // extract css into its own file
  new ExtractTextPlugin('[name].[contenthash:8].css'),
  // generate dist index.html with correct asset hash for caching.
  // you can customize output by editing /build/index.template.html
  // see https://github.com/ampedandwired/html-webpack-plugin

     // new HtmlWebpackPlugin({
     //   title: 'Hello Mobile app',
     //   template:'src/wap_ttmama/index1.ejs',
     //   filename: '../../view/dist/index.html',
     //    minify:{
     //     //压缩HTML文件
     //      removeComments:true,    //移除HTML中的注释
     //      collapseWhitespace:false    //删除空白符与换行符
     //           },
     //   chunks: ['mobile', 'vendors'],
     //   inject: 'body'
     // })
])
module.exports = config

var pages = getEntry('src/wap_ttmama/*.ejs');
for (var pathname in pages) {
  var name=pathname;
  var pname=name.substring(name.lastIndexOf("/")+1);//生成JS文件名称
  // 配置生成的html文件，定义路径等
  var conf = {
    template: pages[pathname], // 模板路径
    filename: '../../view/dist/'+pname + '.html',
    inject: true,              // js插入位置
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
   chunks:[ pname, 'vendors'], 
  };
 
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}

// 根据项目具体需求，输出正确的js和html路径
function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    entries[pathname] = entry;
  });
  return entries;
}