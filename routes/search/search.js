
const Component = require('../../models/component.js');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('search/index', {title: 'Express'});
  });
  app.get('/newComponent', function (req, res) {
    res.render('search/newComponent', {title: 'New Components'});
  });
  app.get('/component/new', function (req, res) {
    var newComponent = new Component({
      name: req.query.name,
      componentName: req.query.componentName
    });
    Component.getOne(newComponent.name, function (err, component) {
      var result = {msg: '', data: null};
      if (err) {
        result.msg = '数据库报错了';
        return res.json(result);
      }
      if (component) {
        result.msg = '该组件已存在';
        return res.json(result);
      }

      //如果不存在则新增用户
      newComponent.save(function (err) {
        if (err) {
          result.msg = '数据库报错了';
          return res.json(result);
        }
        result.msg = '新建成功!';
        return res.json(result);
      });
    });
  });
  app.get('/component/search', function (req, res) {
    var name = req.query.name;
    Component.get(name, function (err, components) {
      var result = {msg: '', data: null};
      if (err) {
        result.msg = '后台报错了';
        return res.json(result);
      }
      result.data = components;
      return res.json(result);
    });
  });
};

