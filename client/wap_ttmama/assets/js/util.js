export function getQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = decodeURI(window.location.search.substr(1)).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

//创建cookie
export function Cookieset(name, value, expires, path, domain, secure) {
	var cookieText = encodeURIComponent(name) + '=' +
		encodeURIComponent(value);
	if (expires instanceof Date) {
		cookieText += ';expires=' + expires.toGMTString();
	}
	if (path) {
		cookieText += ';path=' + path;
	}
	if (domain) {
		cookieText += ';domain=' + domain;
	}
	if (secure) {
		cookieText += ';secure';
	}
	document.cookie = cookieText;
}
export function Cookieget(name) {
	var cookieName = encodeURIComponent(name) + '=';
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;
	if (cookieStart > -1) {
		var cookieEnd = document.cookie.indexOf(';', cookieStart);
		if (cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
	}
	return cookieValue;
}
export function Cookieunset(name, path, domain, secure) {
	Cookieset(name, '', new Date(0), domain, path)
}

export function setCookieDate(day) {
	var date = null;
	if (typeof day == 'number' && day > 0) {
		date = new Date();
		date.setDate(date.getDate() + day);
	} else {
		throw new Error('!!')
	}
	return date;
}

//存储sessionStorage
export function savesessionStorage(name, value) {
	if (sessionStorage.length <= 0) {
		sessionStorage.setItem(name, value);
	} else {
		for (let i = 0, len = sessionStorage.length; i < len; i++) {
			var key = sessionStorage.key(i);
			var oldvalue = sessionStorage.getItem(key);
			if (oldvalue == value) {
				return;
			} else {
				sessionStorage.setItem(name, value);
			}
		}
	}
}
//读取sessionStorage
export function getsessionStorage(name) {
	var namevalue = sessionStorage.getItem(name);
	return namevalue;
}
//删除getsessionStorage
export function erasesessionStorage(name) {
	sessionStorage.removeItem(name);
}

//获取localstorage
export function getLoacalStorage() {
	if (typeof localStorage == 'object') {
		return localStorage;
	} else if (typeof globalStrage == 'object') {
		return globalStorage[location.host];
	} else {
		throw new Error('local storage not available')
	}
}
//存储localStorage
export function savelocalStorage(name, value) {
	var storage = getLoacalStorage();
	if (storage.length <= 0) {
		storage.setItem(name, value);
	} else {
		for (let i = 0, len = storage.length; i < len; i++) {
			var key = storage.key(i);
			var oldvalue = storage.getItem(key);
			if (oldvalue == value) {
				return;
			} else {
				storage.setItem(name, value);
			}
		}
	}
}
//读取localStorage
export function getlocalStorage(name) {
	var storage = getLoacalStorage();
	var namevalue = storage.getItem(name);
	return namevalue;
}
//删除getlocalStorage
export function eraselocalStorage(name) {
	var storage = getLoacalStorage();
	storage.removeItem(name);
}

//判断是否为合法的手机号码
export function checkMobile(mobile) {
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
	if(!myreg.test(mobile)) { 
	    return false; 
	}else {
		return true;
	}
}
//判断是否为合法的身份证号
export function checkCard(card) {
	//如果通过该验证，说明身份证格式正确，但准确性未必，还需计算
	var myreg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
	if(!myreg.test(card)) { 
	    return false; 
	}else {
		return true;
	}
}

// 拼接地址字符串
export function filterAddr (value, list) {
	var area1 = '';
	var area2 = '';
	var area3 = '';
	for(var i in list) {
		if(list[i].value == value[0]) {
			area1 = list[i].name;
			continue;
		}
		if(list[i].value == value[1]){
			area2 = list[i].name;
			continue;
		}
		if(list[i].value == value[2]){
			area3 = list[i].name;
			continue;
		}
	}
	var area = area1+"/"+area2+"/"+area3;
	area = area.replace('--', '');
	return area;
}
// 根据地址字符串获取value数组
export function filterAddrValue(area, list) {
	var value = [];
	var value1 = '';
	var value2 = '';
	var value3 = '';
	var areas = area.split(":")[1].split("/");
	
	for(var i in list) {
		if(list[i].name == areas[0]) {
			value1 = list[i].value;
			continue;
		}
		if(list[i].name == areas[1]) {
			value2 = list[i].value;
			continue;
		}
	}
	value3 = area.split(":")[2]==''?value2+'--':area.split(":")[2];
	value.push(value1);
	value.push(value2);
	value.push(value3);
	return value;
}