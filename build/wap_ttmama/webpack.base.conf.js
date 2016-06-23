var path = require('path')
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var glob = require('glob');
var entries = getEntry('./client/wap_ttmama/*/main.js'); // 获得入口js文件
module.exports = {

  entry:entries,
  output: {
    path: __dirname + '/dist/static',
    publicPath: '/static/',
    chunkFilename: '[id].[chunkhash:8].js',
    filename: '[name].[hash:8].js'
  },

  //plugins: [ignoreFiles],
  resolve: {
    alias: {
    'vux-components': 'vux/components/'
  },
    extensions: ['', '.js', '.vue'],
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [{
        test: /\.vue$/,
        loader: 'vue'
      }, {
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
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }, {
        test: /\.html$/,
        loader: 'raw'
      }, {
        test: /vux.src.*?js$/,
        loader: 'babel'
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
// 根据项目具体需求，输出正确的js和html路径
function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = tmp.splice(1, 1); // 正确输出js和html的路径
    entries[pathname] = entry;
  });
   entries['vendors'] = ['vue','vue-router','q','jquery'];
  return entries;
}