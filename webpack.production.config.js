var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var colors = require('colors');
var glob = require('glob');


var entries = getEntries('views/pages/*.pug', './public/module/');
console.log("Entry-files-list:\r\n", colors.green(JSON.stringify(entries, null, 2)));
var productionConfig = [{
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public/dist'),
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192&context=client&name=[path][name].[ext]'
    }, {
      test: /\.vue$/,
      loader: 'vue',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
    }]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new ExtractTextPlugin('./[name]/index.css', {
      allChunks: true
    })
  ]
}];
// 获取指定路径下的入口文件
function getEntries(globPath, jsPath) {
  var files = glob.sync(globPath), entries = {};
  files.forEach(function (filepath) {
    var split = filepath.match(/\/([\w]+?)\.pug/);
    if (split) {
      var name = split[1];
      entries[name] = jsPath + name + '.js';
    }
  });
  return entries;
}
module.exports = productionConfig;
