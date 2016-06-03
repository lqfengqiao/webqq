
function msg() {

	function receiveMsgMsg() {

		var createMsg = document.createElement("div");
		createMsg.className = 'createMsg';
		var headImg = document.createElement('img');
		headImg.src = '/images/favicon.png';
		var newMsg = document.createElement('span');
		newMsg.className = 'newMsg';
		var leftTop = document.createElement("div");
		var rightTop = document.createElement("div");
		var newMsgContent = document.createElement("span");
		var leftBottom = document.createElement("div");
		var rightBottom = document.createElement("div");
		var nodeP = document.createElement("p");
		nodeP.innerHTML = '姓名';
		leftTop.className = 'leftTop';
		rightTop.className = 'rightTop';
		newMsgContent.className = 'newMsgContent';
		newMsgContent.innerHTML = 'sadfsadfaf';
		leftBottom.className = 'leftBottom';
		rightBottom.className = 'rightBottom';

		createMsg.appendChild(headImg);
		newMsg.appendChild(leftTop);
		newMsg.appendChild(rightTop);
		newMsg.appendChild(newMsgContent);
		newMsg.appendChild(leftBottom);
		newMsg.appendChild(rightBottom);
		newMsg.appendChild(nodeP);
		createMsg.appendChild(newMsg);
		var message = document.getElementById('message');
		message.appendChild(createMsg);

		message.scrollTop = message.scrollHeight;

	}
	receiveMsg();
	function sendMsg() {
		var createMsgR = document.createElement("div");
		createMsgR.className = 'createMsgR';
		var headImg = document.createElement('img');
		headImg.src = '/images/favicon.png';
		var newMsgR = document.createElement('span');
		newMsgR.className = 'newMsgR';
		var leftTop = document.createElement("div");
		var rightTop = document.createElement("div");
		var newMsgContent = document.createElement("span");
		var leftBottom = document.createElement("div");
		var rightBottom = document.createElement("div");
		var clearNode = document.createElement("div");
		var nodeP = document.createElement("p");
		nodeP.innerHTML = '我';
		leftTop.className = 'leftTop';
		rightTop.className = 'rightTop';
		newMsgContent.className = 'newMsgContent';
		newMsgContent.innerHTML = '发送消息';
		leftBottom.className = 'leftBottom';
		rightBottom.className = 'rightBottom';
		clearNode.className = 'clear';
		createMsgR.appendChild(headImg);
		newMsgR.appendChild(leftTop);
		newMsgR.appendChild(rightTop);
		newMsgR.appendChild(newMsgContent);
		newMsgR.appendChild(leftBottom);
		newMsgR.appendChild(rightBottom);
		newMsgR.appendChild(nodeP);
		createMsgR.appendChild(newMsgR);
		createMsgR.appendChild(clearNode);
		var message = document.getElementById('message');
		message.appendChild(createMsgR);

		message.scrollTop = message.scrollHeight;
	}
}