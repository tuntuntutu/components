var webpack = require('webpack'),
  colors = require('colors'),
  glob = require('glob'),
  path = require('path');

var publicPath = "/";

var entries = getEntries('views/pages/*.pug', './public/module/');
module.exports = {
  entry: entries,
  watch:true,
  cache: false,
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: '[name].js',
    publicPath: publicPath
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: "style!css?sourceMap!resolve-url!sass?sourceMap",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: "url?limit=8192&context=client&name=[path][name].[ext]"
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
};

// 获取指定路径下的入口文件
function getEntries(globPath, jsPath) {
  var files = glob.sync(globPath), entries = {};
  files.forEach(function (filepath) {
    var split = filepath.match(/\/([\w]+?)\.pug/);
    if (split) {
      var name = split[1];
      entries[name] = jsPath+name+".js";
    }
  });
  return entries;
}
