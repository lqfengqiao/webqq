var mysql = require('../conf/mysql.js').db;
var loggerMysql = require('../conf/log4js.js').loggerMysql;//mysql的log日志
module.exports.authorization = function(req, res, next) {
  switch (req.route.path) {
    case '/login':
      return req.session.username ? res.redirect('/') : next();
    case '/edit':
      return req.session.username ? next(): res.redirect('/user/login');
    default:
      return next();
  }
};
module.exports.path = {
	'/': {
		get: function (req, res) {
			res.send('用户登录后界面');
		}
	},
	'/login': {
		get: function (req,res) {
			res.render('login');
		},
		post: function (req, res) {
			var sql = 'select * from `user` where `username` = "' + req.body.username + '"';
			mysql.query(sql, function(err, data) {
				loggerMysql.info(sql);
				if (data[0] == null || data[0].password != req.body.password) {//找不到该用户或者密码错误
					res.send('error');
					return;
				}
				req.session.username = req.body.username;//记住用户名字
				res.send('success');
			});
		}
	}

}