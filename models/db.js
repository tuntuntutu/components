var settings = require('../dbSetting'),
  Db = require('mongodb').Db,
  Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host, '27017', {}));
