var fs = require('fs'), express = require('express');
module.exports = function(app) {
	return {
		loadControllers: function() {
			//函数在app.js文件里运行，所以目录是相对于app.js文件来说的
			fs.readdirSync(app.locals.path.CONTROLLERS).forEach(function (controller, basepath, path, router) {
				// console.log('controller: ' + controller);
				// console.log('basepath: ' + basepath);
				// console.log('path: ' + path);
				// console.log('router: ' + router);
				if (/\.js$/.test(controller)) {//如果是js文件
					basePath = controller.match(/(.*)\.js$/)[1];
					controller = require(app.locals.path.CONTROLLERS + '/' + controller);//引用每个文件
					basePath = controller.basePath !== undefined ? controller.basePath : basePath;
					router = express.Router();

					if (typeof controller.authorization !== 'function') {
						controller.authorization = function(req, res, next) {
              if (!req.session.username) { return res.redirect('/user/login');}
              return  next();
            }
					}
					//把controller中封装的对象全部变成路由
					for (path in controller.path) {
            router.all(path, controller.authorization);
            if (typeof controller.path[path].all === 'function') {
              router.all(path, controller.path[path].all);
            }
            if (typeof controller.path[path].post === 'function') {
              router.post(path, controller.path[path].post);
            }
            if (typeof controller.path[path].get === 'function') {
              router.get(path, controller.path[path].get);
            }
          }
					app.use('/' + basePath, router);//使路由为文件名加path值
				}
			});
		},
		NotFindHandel: function(req, res) {
      res.sendStatus(404);
    },
    errorHandel: function(err, req, res) {
      res.sendStatus(500);
    }
	}
}