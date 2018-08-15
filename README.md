# vue-components-show

vue + express + mongodb写的一个演示vue组件的平台，支持组件数据的增删改查。

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

 - tinylrs
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

- vue-resource
- vue-router

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

#### 数据库

> 配置文件：dbSetting.js

- mongoose
- mongodb

## webpack plugins

- webpack dev middleware&webpack hot middleware (适合前后端耦合项目在express中引入webpack配置前端热插拔)
- webpack dev server (适合前后端分离工程前端热部署)
- colors（日志打印颜色）
- extract-text-webpack-plugin（合并css文件）
- glob（文件操作）
- path（路径）
- HtmlWebpackPlugin

## 注
- external外部文件比npm管理打包速度更快，但也只限于不会有改动且已经被压缩过的包，类似jquery
