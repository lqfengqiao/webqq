window.onload = function () {
	//消息到底部
	// document.getElementById('message').scrollTop = document.getElementById('message').scrollHeight;
	//表情处理
	var data = document.getElementById('data');//后台往前端传递的参数

	var smallImg  = document.getElementById('smallImg');
	var smallImgBtns  = smallImg.getElementsByTagName('li');//表情，截图，字体等按钮的数组
	var emoji = document.getElementById('emoji');//表情弹框
	var emoliGifs = emoji.getElementsByTagName('img');
	var input = document.getElementById('input');//消息输入框

	smallImgBtns[1].onclick = function() {
		if (emoji.style.display != 'block') {
			emoji.style.display  = 'block';
		}
		else {
			emoji.style.display = 'none';
		}
	}

	//发送消息按钮点击事件
	var sendBtn = document.getElementById('sendBtn');
	sendBtn.onclick = function () {
		var msg = {};
		input.innerHTML = input.innerHTML.replace(/<div.*/g, '').replace(/<br.*/g, '');
		if (input.innerHTML == '') {
			msgTip.style.display = 'block';
			setTimeout(function () {
				msgTip.style.display = 'none';
			}, 5000);
			input.focus();
		}
		else {
			msg['username'] = myname;
			msg['message'] = input.innerHTML;
			socket.emit('message', msg);//发送消息
			input.innerHTML = '';
			input.focus();
		}
	}

	//Enter键盘输入
	document.onkeyup = function(e){
		e=e?e:window.event;
		if (e.keyCode == 13) {
			sendBtn.onclick();
		}
	}
	input.onfocus = function() {
		emoji.style.display = 'none';
	}
	for(var i in emoliGifs) {
		emoliGifs[i].onclick = function() {
			input.innerHTML += '<img ' + 'src="' + this.src + '">';
		}
	}

	//发送消息
	var socket  = io.connect('http://127.0.0.1/room/chat');
	var sendBtn = document.getElementById('sendBtn');
	var msgTip = document.getElementById('msgTip');
	var myname = document.getElementById('myname').innerHTML;//得到用户名
	//收到其他人消息时增加的内容
	input.focus();
	//消息监听
	socket.on('msg', function(msg) {
		if (myname == msg.username) {
			sendMsg('/images/favicon.png', msg.username, msg.message);
		}
		else {
			receiveMsg('/images/favicon.png', msg.username, msg.message);
		}
	})


	//发送消息的节点
	var message = document.getElementById('message');
	function receiveMsg(img_url, name, content) {
		var time = new Date();
		//顶级节点
		var createMsgL = document.createElement("div");
		createMsgL.className = 'createMsgL';

		var newMsgL = document.createElement('span');
		newMsgL.className = 'newMsgL';

		var headImg = document.createElement('img');
		headImg.className = 'headImgL';
		headImg.src = img_url || '/images/favicon.png';

		//创造信息节点
		var newMsgContent = document.createElement("span");
		newMsgContent.innerHTML = content || '接受消息';
		newMsgContent.className = 'newMsgContent';

		//姓名及时间的节点
		var nodeP = document.createElement("p");
		nodeP.innerHTML = name || '姓名';
		nodeP.innerHTML += '&nbsp;' + time.toLocaleString();

		var div = document.createElement("div");
		//增加节点
		createMsgL.appendChild(headImg);//添加头像节点
		newMsgL.appendChild(newMsgContent);//添加信息内容节点
		newMsgL.appendChild(nodeP);//添加姓名及时间的节点
		createMsgL.appendChild(newMsgL);
		createMsgL.appendChild(div);
		message.appendChild(createMsgL);

		message.scrollTop = message.scrollHeight;//消息到底部
	}

	//发送消息后的显示,自己的消息
	function sendMsg(img_url, username, content) {
		var time = new Date();
		//顶级节点
		var createMsgR = document.createElement("div");
		createMsgR.className = 'createMsgR';

		var headImg = document.createElement('img');
		headImg.className = 'headImgR';
		headImg.src = img_url || '/images/favicon.png';

		var newMsgR = document.createElement('span');
		newMsgR.className = 'newMsgR';


		//创造信息节点
		var newMsgContent = document.createElement("span");
		newMsgContent.innerHTML = content || '接受消息';
		newMsgContent.className = 'newMsgContent';

		//姓名及时间的节点
		var nodeP = document.createElement("p");
		nodeP.innerHTML = username || '姓名';
		nodeP.innerHTML += '&nbsp;' + time.toLocaleString();

		var div = document.createElement("div");
		//增加节点
		createMsgR.appendChild(headImg);//添加头像节点
		newMsgR.appendChild(newMsgContent);//添加信息内容节点
		newMsgR.appendChild(nodeP);//添加姓名及时间的节点
		createMsgR.appendChild(newMsgR);
		createMsgR.appendChild(div);
		message.appendChild(createMsgR);

		message.scrollTop = message.scrollHeight;//消息到底部
	}
}