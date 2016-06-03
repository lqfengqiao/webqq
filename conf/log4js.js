var log4js = require('log4js');
log4js.configure({
  appenders: [
    // { type: 'console' },
    { type: 'file', filename: './logs/app.log', category: 'app' },
    { type: 'file', filename: './logs/mysql.log', category: 'mysql' },
    { type: 'file', filename: './logs/email.log', category: 'email'},
    { type: 'file', filename: './logs/socket.log', category: 'socket'},
    { type: 'file', filename: './logs/user.log', category: 'user'}
  ]
});
exports.loggerAPP = log4js.getLogger('app');
exports.loggerMysql = log4js.getLogger('mysql');
exports.loggerEmail = log4js.getLogger('email');
exports.loggerSocket = log4js.getLogger('socket');
exports.loggerUser = log4js.getLogger('user');