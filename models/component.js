/**
 * ----------------------------------------------
 *  ms-components数据库对象
 * Created by hzqiushengqiang on 2016/8/24.
 * ----------------------------------------------
 */
var mongodb = require('./db');

function Component(user) {
  this.name = user.name;
  this.componentName = user.componentName;
}

module.exports = Component;

Component.prototype.save = function (callback) {
  //新建Component
  //要存入数据库的用户文档
  var components = {
    name: this.name,
    componentName: this.componentName
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 components 集合
    db.collection('components', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //将用户数据插入 components 集合
      collection.insert(components, {safe: true}, function (err, component) {
        mongodb.close();
        callback(err, component);//成功！返回插入的用户信息
      });
    });
  });
};

Component.get = function (name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('components', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
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
    });
  });
};
Component.getOne = function (name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('components', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //查找components name 值为 name文档
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
    });
  });
};
