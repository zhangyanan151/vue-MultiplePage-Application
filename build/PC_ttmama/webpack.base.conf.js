var path = require('path')
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  
  entry: {
    app: './client/ttmama/main',
    //mobile: './client/wap_ttmama/main.js',
    vendors: [ 'vue','vue-router','q']
  },
  output: {
   path: __dirname + '/dist/static',
    publicPath: '/static/',
    chunkFilename: '[id].[chunkhash:8].js',
    filename: '[name].[hash:8].js'
  },
   
  //plugins: [ignoreFiles],
  resolve: {
    extensions: ['', '.js', '.vue'],
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      // {
      //   test: /\.vue$/,
      //   loader: 'vue'
      // },
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
      },
      // {
      //   test: /\.json$/,
      //   loader: 'json'
      // },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'img/[name].[ext]?[hash:7]'
        }
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader') },
      { test: /\.html$/, loader: 'raw' }
      // {test: /\.(eot|woff)$/, loader: "file-loader" }
      { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot$/,  loader: "file-loader" },
      { test: /\.svg$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
    ]
  }
  ,
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
