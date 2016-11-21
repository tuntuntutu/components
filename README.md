# ms组件工程文档


## 目录树
``` oxygene
├─models--------------------------------//数据库对应模型
├─public--------------------------------//前端根目录
│  ├─vue-------------------------------//vue组件目录（这样命名是为了扩展react，regular等组件，不耦合）
│  │  ├─modal
│  │  ├─notify
│  │  ├─pager
│  │  └─upload
│  ├─css-------------------------------//base.css存放目录
│  ├─dist-------------------------------//打包后的目录
│  ├─res-------------------------------//静态资源
│  │  └─img---------------------------//图片目录
│  ├─module----------------------------//入口js
│  │  └─search
│  │        └─component---------------//业务相关代码
│  └─scss
│      ├─search------------------------//具体业务的样式文件
│      └─_base-------------------------//组合成base.css的样式文件
├─routes--------------------------------//后台路由
│  └─search
└─views---------------------------------//后台模板
    └─search
```
## 开发

#### 修改前端代码

 - webpack-dev-middleware&webpack-hot-middleware
 > 无刷新实时热替换，和webpack-dev-server原理相同
 ```
  npm  start
```
 - tinylrs（王飞大神写的）
 > 配置见webpack.config2.js，缺点是需要入口html额外引入liveload.js
```
npm  startdev
```
- gulp-nodemon
> 和tinylrs类似，优势是能够热替换后台模板和监听node代码自动重启，但需要引入gulp
```
npm  startgulp
```


#### 调试后台代码（需要断点）
  -  idea启动
  -  supervisor插件
```
npm run breakpoint
```

## vue



### vue-resource

前后端交互插件

-  form-data
 > application/x-www-form-urlencoded
```javascript
Vue.http.options.emulateJSON = true;
```

-  restful

```javascript
Vue.http.options.emulateHTTP = true;
```

- 使用
```
this.$http.get('/component/search?name=' + this.searchText).then((response)=> {
          // 响应成功回调


        }, (response) => {
          // 响应错误回调

        });
```

### vue-router
```javascript
const router = new VueRouter();
router.map({
  '/index': {
    name: 'index',
    component: search,
    //子路由
    subRoutes:{
      '/xxx':{
        name:'zxxx',
        component:xxx
      }
    }
  },
  '/new': {
    name: 'new',
    component: newC
  }
});
//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
router.redirect({
  '*':"/index"//重定向任意未匹配路径到/index
});
var App = Vue.extend({});
router.start(App, "#app");
```

### 注意
- 用 npm 构建时，由于在构建时单个组件预编译模板进入渲染函数，所以默认导出的vue npm 包是 只在运行环境下使用的，它不支持template选项。如你希望使用template选项，你需要配置你的构建工具软连接vue单独构建。
用webpack，添加下面的配置:
```json
resolve: {
  alias: {
    vue: 'vue/dist/vue.js'
  }
}
```

> 不要用import Vue from 'vue/dist/vue - 因为一些工具或第三方库可能z正常引入vue,这样做可能导致应用程序运行时和独立的构建导致错误。

## express

#### 依赖插件
- connect-flash （session操作）
- serve-favicon（favicon.io）
- body-parser
- morgan（log）
- express-session
-  connect-mongo
-  mongodb
-  mongoose
- app-module-path(解决相对路径过长的问题)
```
//app/models/article
require('app-module-path').addPath(__dirname + '/app');
var Article = require('models/article');
```
#### 数据库
- 端口 27017
- 配置文件：dbSetting.js

### mongoose

#### 为什么使用它？
每次访问都要`db.open();`，而且访问完毕还得`db.close();`。于是就有一个问题：刷新得太快，或者多个用户同时访问数据库，数据库没来得及关闭，下面这个Error就会出现。用mongoose就不会出现这错误，因为一旦连接好数据库，db就会处于open状态，不存在访问时要打开，结束又要关闭的规则，而且代码量和嵌套层数能够减少很多！
```
Error: db object already connecting, open cannot be called multiple times
```
```
var settings = require('../../dbSetting');
var mongoose = require('mongoose');

mongoose.connect(`mongodb://${settings.host}:27017/${settings.db}`);
module.exports = mongoose;
```

## mongodb
#### 增

```javascript
//打开数据库
mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 components 集合
    db.collection('components', function (err, collection) {
      if (err) {//错误捕获
        mongodb.close();
        return callback(err);
      }
      //将用户数据插入 components 集合
      collection.insert(components, {safe: true}, function (err, component) {
        mongodb.close();
        callback(err, component);//成功！返回插入的信息
      });
    });
  });
```
#### 删
#### 改
#### 查
- 返回单个
``` javascript

      collection.findOne({
        name: name
      }, function (err, doc) {
        mongodb.close();
        if (doc) {
          var component = new Component(doc);
          callback(err, component);//成功！返回查询的用户信息
        } else {
          callback(err, null);//失败！返回null
        }
      });

```

- 模糊查询

``` javascript
      var regex = new RegExp(".*" + name + ".*");
      //查找components name 值为 name文档
      collection.find({'$or':[{'name': regex},{'componentName':regex}]}).toArray(function (err, doc) {
        mongodb.close();
        if (doc) {
          callback(err, doc);
        } else {
          callback(err, null);
        }
      });
```




## webpack plugins

- webpack dev middleware&webpack hot middleware (适合前后端耦合项目在express中引入webpack配置前端热插拔)
- webpack dev server (适合前后端分离工程前端热部署)
- colors（日志打印颜色）
- extract-text-webpack-plugin（合并css文件）
- glob（文件操作）
- path（路径）
- HtmlWebpackPlugin

|    参数 | 描述    |
| --- | --- |
|   title  | 用于生成的HTML文件的标题。|
|   filename | 用于生成的HTML文件的名称，默认是index.html。你可以在这里指定子目录（例如:assets/admin.html）|
|   template |模板的路径。支持加载器，例如 html!./index.html|
|   inject   | true \| ‘head’ \| ‘body’ \| false 。把所有产出文件注入到给定的 template 或templateContent。当传入 true或者 ‘body’时所有javascript资源将被放置在body元素的底部，“head”则会放在head元素内    |
|   favicon |给定的图标路径，可将其添加到输出html中 |
|   minify |{…} \| false 。传一个html-minifier 配置object来压缩输出 |
|   hash |  true \| false。如果是true，会给所有包含的script和css添加一个唯一的webpack编译hash值。这对于缓存清除非常有用|
|   cache| true \| false 。如果传入true（默认），只有在文件变化时才 发送（emit）文件|
|   showErrors | true \| false 。如果传入true（默认），错误信息将写入html页面
|   chunks |只允许你添加chunks 。（例如：只有单元测试块 ） |
|   chunksSortMode|在chunk被插入到html之前，你可以控制它们的排序。允许的值 ‘none’ \| ‘auto’ \| ‘dependency’ \| {function} 默认为‘auto’. |
|   excludeChunks | 允许你跳过一些chunks（例如，不要单元测试的 chunk）|
|  xhtml | 用于生成的HTML文件的标题|
|  title |  true \| false。如果是true，把link标签渲染为自闭合标签，XHTML要这么干的。默认false

## 小知识
- external外部文件比npm管理打包速度更快，但也只限于不会有改动且已经被压缩过的类似于jquery的插件
- vue组件设计可参考 [radon-ui](https://luojilab.github.io/radon-ui/#!/)
