var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var swig = require('swig');
var server = require('http').createServer(app);
var sio = require('socket.io');
var session = require('express-session');
var loggerAPP = require('./conf/log4js.js').loggerAPP;
var fs =require('fs');
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized:true,
  resave:false,
  cookie: {maxAge: 1000 * 60 * 60}//maxAge为超时时间
}));
swig.setDefaults({
  autoescape: true,
  cache: false
});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}));
app.locals.path = {
  ROOT: __dirname,
  CONF: __dirname + '/conf',
  LIB: __dirname + '/lib',
  LOGS: __dirname + '/logs',
  PUBLIC: __dirname + '/public',
  CONTROLLERS: __dirname + '/controllers',
  MODELS: __dirname + '/models'
};

process.on('SIGTERM', function() {
  if (fs.existsSync(pidfile)) {
    fs.unlinkSync(pidfile);
  }
  process.exit(0);
})
process.on('SIGINT', function() {
  if (fs.existsSync(pidfile)) {
    fs.unlinkSync(pidfile);
  }
  process.exit(0);
})

var onError = function(error, level) {
  // log
  if (level === 'fatal') {
    loggerAPP.fatal(error);
  } else {
    loggerAPP.error(error);
  }
  // process.exit(0);
};
process.on('uncaughtException', onError)
process.on('Error', onError);
var core = require('./lib/core.js')(app);
core.loadControllers();
app.use(core.NotFindHandel);
app.use(core.errorHandel);
// var index = require('./lib/index.js')(app);
// for parsing application/x-www-form-urlencoded


//pid文件,记录启动的进程号
var pidfile = './app.pid';
fs.writeFileSync(pidfile, process.pid, 'utf-8', function(err) {
	if(err){
		logger.error(err);
	}
});

server.listen(80, function() {
  loggerAPP.info('系统启动80');
  console.log('系统启动80');
});
require('./lib/socket.js')(server);








