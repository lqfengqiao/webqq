window.onload = function() {
	var username = document.getElementById('user');
	var password = document.getElementById('password');
	var btn = document.getElementById('btn');
	var tip_user = document.getElementById('tip_user');
	var tip_psw = document.getElementById('tip_psw');
	var logo = document.getElementById('mid_logo');
	var img = document.getElementById('middle').getElementsByTagName('img')[0];
	document.onselectstart = new Function("return false");//取消双击会选中某一块的问题
	logo.onselectstart = new Function("return false");
	img.ondragstart= new Function("return false");
	//小图标样式
	function small() {
		//最小化及退出
		var small_logo = document.getElementById('small_logo');
		var imgs = small_logo.getElementsByTagName('img');
		imgs[1].onmouseover = function() {
			this.src = '/images/index/smaller_2.png';
		}
		imgs[1].onmouseout = function() {
			this.src = '/images/index/smaller_1.png';
		}
		imgs[2].onmouseover = function() {
			this.src = '/images/index/close_02.png';
		}
		imgs[2].onmouseout = function() {
			this.src = '/images/index/close_01.png';
		}
		//关闭当前页面
		imgs[2].onclick = function() {
			window.opener = null;
	    window.open("", "_self", '');
	    window.close();
		}
		var triangle = document.getElementById('triangle');
		var div = triangle.getElementsByTagName('div')[0];
		triangle.direction = 0;//0则小三角向下，1则向上
		triangle.onclick= function() {
			if(triangle.direction === 0) {
				div.style['border-top'] = 'none';
				div.style['border-bottom'] = '5px solid';
				triangle.direction = 1;
			}
			else {
				div.style['border-top'] = '5px solid';
				div.style['border-bottom'] = 'none';
				triangle.direction = 0;
			}
		}
	}
	small();
	//登录框提示
	function login_tip() {
		username.addEventListener('blur', user_tip_blur, false);
		username.onfocus = function() {
			if(this.value === 'QQ号码\\手机\\邮箱') {
				this.value = '';
				this.style['color'] = '#0D0D0D';
				this.style.border = '1px #BEBBBB solid';
			}
		}
		function user_tip_blur() {
			tip_user.style.display = 'none';
			if(this.value === '') {
				this.value = 'QQ号码\\手机\\邮箱';
				this.type = 'text';
				this.style['color'] = '#BEBBBB';
			}
		}

		password.onfocus = function() {
			if(this.value === '密码') {
				this.value = '';
				this.type = 'password';
				this.style['color'] = '#0D0D0D';
				this.style.border = '1px #BEBBBB solid';
				this.style['font-size'] = '25px';
			}
		}
		password.onblur = function() {
			tip_psw.style.display = 'none';
			if(this.value === '') {
				this.value = '密码';
				this.type = 'text';
				this.style['color'] = '#BEBBBB';
				this.style['font-size'] = '12px';
			}
		}
	}
	login_tip();

	//使窗口自由移动
	function move() {
		//浏览器宽度
		var wWidth = $(window).width();
		var wHeight = $(window).height();
		var content = document.getElementById('content');
		$('#header').mousedown(function(event) {
			var w_left = event.clientX;//鼠标到左边屏幕的距离
			var w_top = event.clientY;//鼠标到上边屏幕的距离
			var c_left = content.offsetLeft;//弹窗到左边屏幕距离
			var c_top = content.offsetTop;//弹窗到顶部屏幕距离
			var _left = w_left - c_left;//鼠标到左边弹窗的距离
			var _top = w_top - c_top;//鼠标到顶部弹窗的距离
			$(document).mousemove(function(event) {
				var n_left = event.clientX;//移动后鼠标到左边屏幕的距离
				var n_top = event.clientY;//移动后鼠标到顶部屏幕的距离
				var left = n_left - _left;
				var top = n_top - _top;
				if(left < 0) {
					left = 0;
				}
				if(left > wWidth - 430) {
					left = wWidth - 430;
				}
				if(top < 0) {
					top = 0;
				}
				if(top > wHeight - 330) {
					top = wHeight - 330;
				}
				content.style.left =  left + 'px';
				content.style.top =  top + 'px';
			})
			$(document).mouseup(function() {
				$(document).unbind('mousemove');
			});
		})
	}
	move();

	//登录操作
	var login = (function () {
		btn.onclick = function() {
			//检查数据的合法性
			if(username.value === 'QQ号码\\手机\\邮箱') {
				username.focus();
				tip_user.style.display = 'block';
				setTimeout(function(){
					tip_user.style.display = 'none';
				}, 1000 * 10);
				username.onclick = function() {
					tip_user.style.display = 'none';
				}
				return;
			}
			else if(password.value === '密码') {
				password.focus();
				tip_psw.style.display = 'block';
				setTimeout(function(){
					tip_psw.style.display = 'none';
				}, 1000 * 10);
				password.onclick = function() {
					tip_psw.style.display = 'none';
				}
				return;
			}
			var jsonObject = {};
			jsonObject['username'] = username.value;
			jsonObject['password'] = password.value;
			//用户名和密码不为空则发送登录请求
			var request = new XMLHttpRequest();
			request.open('POST', '/user/login', false);
			request.setRequestHeader('Content-Type', 'application/json');
			request.send(JSON.stringify(jsonObject));
			//如果请求不是200 OK,就报错
			if (request.status !== 200) throw new Error(request.statusText);
			var errorTip = document.getElementById('errorTip');
			if (request.responseText == 'error') {
				username.value = '';
				password.value = '';
				username.focus();
				errorTip.style.display = 'block';
			}
			else {
				window.location = '/room';
			}
		}
	}());//立即执行这个函数


}