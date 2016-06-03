var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '12345678',
	database: 'webqq'
});
exports.db = connection;