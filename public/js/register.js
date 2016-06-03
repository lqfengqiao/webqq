window.onload = function() {
	//左边搜索框
	var search = document.getElementById('search');
	var searchInput = search.getElementsByTagName('input')[0];
	searchInput.onfocus = function() {
		if(this.value == '输入想要的4-10位数字') {
			this.value = '';
		}
	}
	searchInput.onblur = function() {
		if(this.value === '') {
			this.value = '输入想要的4-10位数字';
		}
	}
	var s = [];//s数组用来判定注册输入数据是否合法
	for(var i = 0; i < 5; i++) {
		s[i] = false;
	}
	//内容部分
	//昵称变化提示
	var username = document.getElementById('username');
	var usernameTips = document.getElementById('usernameTip').getElementsByTagName('div');//username输入框提示
	username.focus();//文档加载完聚焦昵称输入框
	username.onblur = function () {
		if(this.value === '') {
			usernameTips[0].className = 'hide';
			usernameTips[1].className = 'hide';
			usernameTips[2].className = 'show';
			this.className = 'errorBlur';
			s[0] = false;
		}
		else {
			usernameTips[0].className = 'hide';
			usernameTips[1].className = 'show';
			usernameTips[2].className = 'hide';
			s[0] = true;
		}
	}
	username.onfocus = function() {
		this.className = '';
		usernameTips[0].className = 'show';
		usernameTips[1].className = 'hide';
		usernameTips[2].className = 'hide';
	}

	//密码提示
	var password = document.getElementById('password');
	var pswTip = document.getElementById('pswTip');//password输入框提示
	var pswTipLogo = pswTip.getElementsByTagName('span');//小图标提示
	password.onblur = function () {
		//检测长度
		var n = 0;//检测三个条件是否全满足
		if(this.value.length < 6 || this.value.length > 16) {
			pswTipLogo[0].className = 'falseTip';
			pswTipLogo[0].parentNode.style.color = '#F05858';//改错误字体颜色
		}
		else {
			pswTipLogo[0].className = 'trueTip';
			pswTipLogo[0].parentNode.style.color = '#727171';//正确时字体颜色
			n++;
		}
		if(this.value.length < 9) {
			//正则来检测是否纯数字
			var notNumber = /[^0-9]/;//匹配非数字
			if(!notNumber.test(this.value)) {//如果没有非数字
				pswTipLogo[1].className = 'falseTip';
				pswTipLogo[1].parentNode.style.color = '#F05858';//改错误字体颜色
			}
			else {
				pswTipLogo[1].className = 'trueTip';
				pswTipLogo[1].parentNode.style.color = '#727171';
				n++;
			}
		}
		else {
			pswTipLogo[1].className = 'trueTip';
			pswTipLogo[1].parentNode.style.color = '#727171';
			n++;
		}

		//检测空格
		hasSpace = /[\s]/;
		if(hasSpace.test(this.value)) {
			pswTipLogo[2].className = 'falseTip';
			pswTipLogo[2].parentNode.style.color = '#F05858';//改错误字体颜色
		}
		else {
			pswTipLogo[2].className = 'trueTip';
			pswTipLogo[2].parentNode.style.color = '#727171';
			n++;
		}
		if(n === 3) {
			this.className = '';
			s[1] = true;
		}
		else {
			this.className = 'errorBlur';
			s[1] = false;
		}
	}
	password.onfocus = function() {
		pswTip.className = 'show';
		this.className = '';
	}

	//确认密码提示
	var repeatPassword = document.getElementById('repeatPassword');
	var repeatPswTip = document.getElementById('repeatPswTip').getElementsByTagName('p');
	repeatPassword.onblur = function() {
		repeatPswTip[0].className = 'hide';
		if (this.value == '') {
			repeatPswTip[1].className = 'show';
			repeatPswTip[2].className = 'hide';
			repeatPswTip[3].className = 'hide';
			this.className = 'errorBlur';
			s[2] = false;
		}
		else if (password.value != this.value) {
			repeatPswTip[2].className = 'show';
			repeatPswTip[1].className = 'hide';
			repeatPswTip[3].className = 'hide';
			this.className = 'errorBlur';
			s[2] = false;
		}
		else {
			repeatPswTip[3].className = 'show';
			repeatPswTip[1].className = 'hide';
			repeatPswTip[2].className = 'hide';
			this.className = '';
			s[2] = true;
		}
	}
	repeatPassword.onfocus = function () {
		this.className = '';
		repeatPswTip[0].className = 'show';
		repeatPswTip[1].className = 'hide';
		repeatPswTip[2].className = 'hide';
		repeatPswTip[3].className = 'hide';
	}

	//性别选择
	var boy =document.getElementById('boy');
	var girl =document.getElementById('girl');
	boy.onclick = function() {
		this.className = 'sexOn';
		girl.className = 'sexOff';
	}
	girl.onclick = function() {
		this.className = 'sexOn';
		boy.className = 'sexOff';
	}

	//邮箱部分
	var emailAddress = document.getElementById('emailAddress');
	var emailTip =document.getElementById('emailTip');
	emailTips = emailTip.getElementsByTagName('p');
	emailAddress.onfocus = function() {
		this.className = '';

	}
	emailAddress.onblur = function() {
		if(this.value == '') {
			this.className = 'errorBlur';
			s[3] = false;
			emailTips[0].className = 'hide';
			emailTips[1].className = 'hide';
			emailTips[2].className = 'show';
		}
		else {
			s[3] = true;
			emailTips[0].className = 'hide';
			emailTips[1].className = 'hide';
			emailTips[2].className = 'hide';
		}
	}

	//获取邮件验证码
	var getEmail = document.getElementById('getEmail');
	var jsonMsg = {};//用户名，密码等组成的json，用来注册
	getEmail.onclick = function () {
		if (s[0] == false) {
			username.focus();
			return;
		}
		if (s[1] == false) {
			password.focus();
			return;
		}
		if (s[2] == false) {
			repeatPassword.focus();
			return;
		}
		if (emailAddress.value == '') {
			emailAddress.focus();
			return;
		}
		else {//有填写邮箱则获取验证码
			jsonMsg['email'] = emailAddress.value;
			jsonMsg['username'] = username.value;
			jsonMsg['password'] = password.value;
			var getCode = new XMLHttpRequest();
			getCode.open('POST', 'http://127.0.0.1/getEmailCode', false);
			getCode.setRequestHeader('Content-Type', 'application/json');
			getCode.send(JSON.stringify(jsonMsg));
			//如果请求不是200 OK,就报错
			if (getCode.status !== 200) throw new Error(getCode.statusText);

			//如果类型错误，就报错
			var type = getCode.getResponseHeader('content-Type');
			if (getCode.responseText == 'error') {
				emailTips[0].className = 'hide';
				emailTips[1].className = 'hide';
				emailTips[2].className = 'show';
				emailAddress.focus();
			}
			else {
				emailTips[0].className = 'hide';
				emailTips[1].className = 'show';
				emailTips[2].className = 'hide';
				var n = 60;
				this.disabled = 'true';
				var timer = setInterval(function() {
					getEmail.value = n+ '秒后重新获取';
					n--;
					if(n === 0) {
						getEmail.value = '获取邮件验证码';
						getEmail.disabled = 'false';
						n = 60;
						clearInterval(timer);
					}
				}, 1000);
			}
		}
	}

	//提交注册
	var emailCode = document.getElementById('emailCode');
	var emailCodeTip  = document.getElementById('emailCodeTip');
	var emailCodeTips = emailCodeTip.getElementsByTagName('p');
	submitRegister.onclick = function() {
		//检测输入信息是否完善
		if (s[0] == false) {
			username.focus();
			return;
		}
		if (s[1] == false) {
			password.focus();
			return;
		}
		if (s[2] == false) {
			repeatPassword.focus();
			return;
		}
		if (s[3] == false) {
			emailAddress.focus();
			return;
		}
		if (emailCode.value.length  !== 4) {
			emailCode.focus();
			emailCodeTips[0].className = 'show';
			emailCodeTips[1].className = 'hide';
			return;
		}
		else {
			emailCodeTips[0].className = 'show';
			emailCodeTips[1].className = 'hide';
		}

		//信息齐全则发送注册请求
		var request = new XMLHttpRequest();
		jsonMsg['emailCode'] = emailCode.value;
		request.open('POST', '/userRegister', false);
		request.setRequestHeader('Content-type', 'application/json');
		request.send(JSON.stringify(jsonMsg));

		//如果请求不是200 OK,就报错
		if (request.status !== 200) throw new Error(request.statusText);
		else if (request.responseText == 'success') {
			alert('注册成功,现在可用帐号及密码登录邮箱');
			window.location.href = '/';
		}
		else if (request.responseText == 'userExist') {
			alert('邮箱已注册，请使用其他邮箱，或者尝试找回密码');

		}
		if (request.responseText == 'error') {//注册失败，重新注册
			alert('注册失败,请重新注册');
			window.location.href = '/userRegister';
		}
	}
}