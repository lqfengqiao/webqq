var mysql = require('../conf/mysql.js').db;
var loggerMysql = require('../conf/log4js.js').loggerMysql;
var loggerUser = require('../conf/log4js.js').loggerUser;
var sio = require('socket.io');
var server = require('../app.js').server;
module.exports.path = {
	'/chat': {
		get: function (req, res) {
			res.send('111111111');
		}
	},
	'/': {
		get: function(req, res) {
			res.render('room', {username: req.session.username});
		}
	}
}