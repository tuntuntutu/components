var webpack = require('webpack'),
  colors = require('colors'),
  glob = require('glob'),
  path = require('path');

var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
var publicPath = "http://localhost:3000/dist";

var entries = getEntries('views/*/*.pug', './public/module/');
console.log("Entry-files-list:\r\n", colors.green(JSON.stringify(entries, null, 2)));
module.exports = {
  entry: entries,
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
        loader: "style!css?sourceMap!sass?sourceMap",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue',
        exclude: /node_modules/
      }
      // , {
      //   test: /\.(jpg|png|svg)$/,
      //   loader: "url?limit=8192&context=client&name=[path][name].[ext]"
      // }
      // ,{
      //   test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      //   loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]'
      // }
    ]
  },
  vue:{ //为了vue lang=scss能够被识别
    loaders:{
      scss:'vue-style!css!sass'
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  resolve: {
    alias:{
      vuePro: path.resolve(__dirname, 'public/vue'),//这个的名字不能和实例的名字冲突
      scss: path.resolve(__dirname, 'public/scss')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      "jQuery": "jquery" //我们在JS中，就不需要引入jQuery等常用模块了，直接使用配置的这些变量，webpack就会自动引入配置的库
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    // new webpack.optimize.CommonsChunkPlugin('common.js',[]),//合并公用js
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

// 获取指定路径下的入口文件
function getEntries(globPath, jsPath) {
  var files = glob.sync(globPath), entries = {};
  files.forEach(function (filepath) {
    var split = filepath.match(/views\/([\w\/]+?)\.pug/);
    if (split) {
      var name = split[1];
      entries[name] = [jsPath + name + '.js', hotMiddlewareScript];
    }
  });
  return entries;
}
