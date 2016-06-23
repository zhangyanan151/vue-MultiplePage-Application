var webpack = require('webpack')
var config = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// eval-source-map is faster for development
config.devtool = 'eval-source-map'

// add hot-reload related code to entry chunks
var polyfill = 'eventsource-polyfill'
var hotClient = 'webpack-hot-middleware/client?noInfo=true&reload=true'
Object.keys(config.entry).forEach(function (name, i) {
  var extras = i === 0 ? [polyfill, hotClient] : [hotClient]
  config.entry[name] = extras.concat(config.entry[name])
})

// necessary for the html plugin to work properly
// when serving the html from in-memory

config.output.filename = '[name].js'
config.output.chunkFilename = '[id].[hash:8].js'

config.plugins = (config.plugins || []).concat([
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  // https://github.com/ampedandwired/html-webpack-plugin
  new ExtractTextPlugin("[name].css"),
  new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      // chunks: chunks,  // chunks是需要提取的模块
      minChunks: Infinity,
  })
//new webpack.optimize.UglifyJsPlugin({
//  compressor: {
//    warnings: false
//  }
//})
   
])

module.exports = config
