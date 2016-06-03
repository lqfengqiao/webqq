var loggerSocket = require('../conf/log4js.js').loggerSocket;

module.exports = function (server) {
	var sio = require('socket.io');
	var io = sio.listen(server);
	io.of('/room/chat').on('connect', function(socket) {
		socket.on('message', function (msg) {
			socket.broadcast.emit('msg', msg);//向其他人发送消息
			socket.emit('msg', msg);//向自己发送消息
			loggerSocket.info(msg.username + '说：' + msg.message);
		})
	});
}
