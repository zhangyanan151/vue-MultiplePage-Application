webpackJsonp([5],[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var o=n(1),a=r(o),i=n(43),s=r(i);n(17);var c=n(97),u=r(c);a["default"].use(s["default"]);var l=new s["default"]({history:!0,saveScrollPosition:!0});l.map({"/login":{component:u["default"]}}),l.redirect({"*":"/"});var f=a["default"].extend({});l.start(f,"#app")},,function(e,t){var n=Object;e.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},,function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){(function(t){"use strict";var n={NODE_ENV:"development",SELF_HOST:"127.0.0.1:3000",PATH_TTMAMA:t+"/client/ttmama",PATH_WAP_TTMAMA:t+"/client/wap_ttmama",PATH_BUILD:t+"/dist/static",API_BASE_HOST:"http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list",API_WX_HOST:"http://",PATH_TPL:t+"/src",BASE_HOST:"http://nb.ittmom.com/ttmamaapp2/",INDEX_PATH:"ttwapspecial-hometext.html"};e.exports.config=n}).call(t,"/")},function(e,t,n){var r=n(34),o=n(29);e.exports=function(e){return r(o(e))}},function(e,t){var n=e.exports={version:"1.2.6"};"number"==typeof __e&&(__e=n)},,function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){e.exports=!n(11)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){var r=n(4),o="__core-js_shared__",a=r[o]||(r[o]={});e.exports=function(e){return a[e]||(a[e]={})}},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},function(e,t,n){var r=n(14)("wks"),o=n(15),a=n(4).Symbol;e.exports=function(e){return r[e]||(r[e]=a&&a[e]||(a||o)("Symbol."+e))}},function(e,t){},,,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=decodeURI(window.location.search.substr(1)).match(t);return null!=n?unescape(n[2]):null}function a(e,t,n,r,o,a){var i=encodeURIComponent(e)+"="+encodeURIComponent(t);n instanceof Date&&(i+=";expires="+n.toGMTString()),r&&(i+=";path="+r),o&&(i+=";domain="+o),a&&(i+=";secure"),document.cookie=i}function i(e){var t=encodeURIComponent(e)+"=",n=document.cookie.indexOf(t),r=null;if(n>-1){var o=document.cookie.indexOf(";",n);-1==o&&(o=document.cookie.length),r=decodeURIComponent(document.cookie.substring(n+t.length,o))}return r}function s(e,t,n,r){a(e,"",new Date(0),n,t)}function c(e){var t=null;if(!("number"==typeof e&&e>0))throw new Error("!!");return t=new Date,t.setDate(t.getDate()+e),t}function u(e,t){if(sessionStorage.length<=0)sessionStorage.setItem(e,t);else for(var n=0,r=sessionStorage.length;r>n;n++){var o=sessionStorage.key(n),a=sessionStorage.getItem(o);if(a==t)return;sessionStorage.setItem(e,t)}}function l(e){var t=sessionStorage.getItem(e);return t}function f(e){sessionStorage.removeItem(e)}function p(){if("object"==("undefined"==typeof localStorage?"undefined":(0,h["default"])(localStorage)))return localStorage;if("object"==("undefined"==typeof globalStrage?"undefined":(0,h["default"])(globalStrage)))return globalStorage[location.host];throw new Error("local storage not available")}function d(e,t){var n=p();if(n.length<=0)n.setItem(e,t);else for(var r=0,o=n.length;o>r;r++){var a=n.key(r),i=n.getItem(a);if(i==t)return;n.setItem(e,t)}}function m(e){var t=p(),n=t.getItem(e);return n}function g(e){var t=p();t.removeItem(e)}Object.defineProperty(t,"__esModule",{value:!0});var v=n(24),h=r(v);t.getQueryString=o,t.Cookieset=a,t.Cookieget=i,t.Cookieunset=s,t.setCookieDate=c,t.savesessionStorage=u,t.getsessionStorage=l,t.erasesessionStorage=f,t.getLoacalStorage=p,t.savelocalStorage=d,t.getlocalStorage=m,t.eraselocalStorage=g},,function(e,t,n){e.exports={"default":n(25),__esModule:!0}},function(e,t,n){"use strict";var r=n(23)["default"];t["default"]=function(e){return e&&e.constructor===r?"symbol":typeof e},t.__esModule=!0},function(e,t,n){n(42),n(41),e.exports=n(7).Symbol},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){var r=n(36);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t,n){var r=n(26);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,n){var r=n(2);e.exports=function(e){var t=r.getKeys(e),n=r.getSymbols;if(n)for(var o,a=n(e),i=r.isEnum,s=0;a.length>s;)i.call(e,o=a[s++])&&t.push(o);return t}},function(e,t,n){var r=n(4),o=n(7),a=n(28),i="prototype",s=function(e,t,n){var c,u,l,f=e&s.F,p=e&s.G,d=e&s.S,m=e&s.P,g=e&s.B,v=e&s.W,h=p?o:o[t]||(o[t]={}),y=p?r:d?r[t]:(r[t]||{})[i];p&&(n=t);for(c in n)u=!f&&y&&c in y,u&&c in h||(l=u?y[c]:n[c],h[c]=p&&"function"!=typeof y[c]?n[c]:g&&u?a(l,r):v&&y[c]==l?function(e){var t=function(t){return this instanceof e?new e(t):e(t)};return t[i]=e[i],t}(l):m&&"function"==typeof l?a(Function.call,l):l,m&&((h[i]||(h[i]={}))[c]=l))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,e.exports=s},function(e,t,n){var r=n(6),o=n(2).getNames,a={}.toString,i="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(e){try{return o(e)}catch(t){return i.slice()}};e.exports.get=function(e){return i&&"[object Window]"==a.call(e)?s(e):o(r(e))}},function(e,t,n){var r=n(2),o=n(13);e.exports=n(10)?function(e,t,n){return r.setDesc(e,t,o(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var r=n(9);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t,n){var r=n(9);e.exports=Array.isArray||function(e){return"Array"==r(e)}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){var r=n(2),o=n(6);e.exports=function(e,t){for(var n,a=o(e),i=r.getKeys(a),s=i.length,c=0;s>c;)if(a[n=i[c++]]===t)return n}},function(e,t){e.exports=!0},function(e,t,n){e.exports=n(33)},function(e,t,n){var r=n(2).setDesc,o=n(12),a=n(16)("toStringTag");e.exports=function(e,t,n){e&&!o(e=n?e:e.prototype,a)&&r(e,a,{configurable:!0,value:t})}},function(e,t){},function(e,t,n){"use strict";var r=n(2),o=n(4),a=n(12),i=n(10),s=n(31),c=n(39),u=n(11),l=n(14),f=n(40),p=n(15),d=n(16),m=n(37),g=n(32),v=n(30),h=n(35),y=n(27),b=n(6),w=n(13),S=r.getDesc,_=r.setDesc,x=r.create,k=g.get,O=o.Symbol,P=o.JSON,j=P&&P.stringify,D=!1,I=d("_hidden"),E=r.isEnum,T=l("symbol-registry"),C=l("symbols"),M="function"==typeof O,A=Object.prototype,N=i&&u(function(){return 7!=x(_({},"a",{get:function(){return _(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=S(A,t);r&&delete A[t],_(e,t,n),r&&e!==A&&_(A,t,r)}:_,H=function(e){var t=C[e]=x(O.prototype);return t._k=e,i&&D&&N(A,e,{configurable:!0,set:function(t){a(this,I)&&a(this[I],e)&&(this[I][e]=!1),N(this,e,w(1,t))}}),t},F=function(e){return"symbol"==typeof e},B=function(e,t,n){return n&&a(C,t)?(n.enumerable?(a(e,I)&&e[I][t]&&(e[I][t]=!1),n=x(n,{enumerable:w(0,!1)})):(a(e,I)||_(e,I,w(1,{})),e[I][t]=!0),N(e,t,n)):_(e,t,n)},J=function(e,t){y(e);for(var n,r=v(t=b(t)),o=0,a=r.length;a>o;)B(e,n=r[o++],t[n]);return e},R=function(e,t){return void 0===t?x(e):J(x(e),t)},U=function(e){var t=E.call(this,e);return t||!a(this,e)||!a(C,e)||a(this,I)&&this[I][e]?t:!0},W=function(e,t){var n=S(e=b(e),t);return!n||!a(C,t)||a(e,I)&&e[I][t]||(n.enumerable=!0),n},z=function(e){for(var t,n=k(b(e)),r=[],o=0;n.length>o;)a(C,t=n[o++])||t==I||r.push(t);return r},G=function(e){for(var t,n=k(b(e)),r=[],o=0;n.length>o;)a(C,t=n[o++])&&r.push(C[t]);return r},L=function(e){if(void 0!==e&&!F(e)){for(var t,n,r=[e],o=1,a=arguments;a.length>o;)r.push(a[o++]);return t=r[1],"function"==typeof t&&(n=t),!n&&h(t)||(t=function(e,t){return n&&(t=n.call(this,e,t)),F(t)?void 0:t}),r[1]=t,j.apply(P,r)}},K=u(function(){var e=O();return"[null]"!=j([e])||"{}"!=j({a:e})||"{}"!=j(Object(e))});M||(O=function(){if(F(this))throw TypeError("Symbol is not a constructor");return H(p(arguments.length>0?arguments[0]:void 0))},c(O.prototype,"toString",function(){return this._k}),F=function(e){return e instanceof O},r.create=R,r.isEnum=U,r.getDesc=W,r.setDesc=B,r.setDescs=J,r.getNames=g.get=z,r.getSymbols=G,i&&!n(38)&&c(A,"propertyIsEnumerable",U,!0));var X={"for":function(e){return a(T,e+="")?T[e]:T[e]=O(e)},keyFor:function(e){return m(T,e)},useSetter:function(){D=!0},useSimple:function(){D=!1}};r.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),function(e){var t=d(e);X[e]=M?t:H(t)}),D=!0,s(s.G+s.W,{Symbol:O}),s(s.S,"Symbol",X),s(s.S+s.F*!M,"Object",{create:R,defineProperty:B,defineProperties:J,getOwnPropertyDescriptor:W,getOwnPropertyNames:z,getOwnPropertySymbols:G}),P&&s(s.S+s.F*(!M||K),"JSON",{stringify:L}),f(O,"Symbol"),f(Math,"Math",!0),f(o.JSON,"JSON",!0)},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),a=r(o),i=n(141),s=r(i);n(121);var c=n(103),u=r(c),l=n(3),f=r(l),p=n(21),d=a["default"].extend({template:s["default"],data:function(){return{cookdata:[]}},methods:{login:function(e){var t=this;e.preventDefault();var n=(0,f["default"])("#uname").val(),r=(0,f["default"])("#password").val();u["default"].loginData(n,r).then(function(e){if("succ"===e.rsp){t.cookdata=e.data;var n=e.data.name,r=e.data.member_pic,o=e.data.accesstoken;console.log(o);var a=e.data.login_account,i=e.data.member_id;(0,p.Cookieset)("name",n,(0,p.setCookieDate)(7)),(0,p.Cookieset)("member_pic",r,(0,p.setCookieDate)(7)),(0,p.Cookieset)("accesstoken",o,(0,p.setCookieDate)(7)),(0,p.Cookieset)("login_account",a,(0,p.setCookieDate)(7)),(0,p.Cookieset)("member_id",i,(0,p.setCookieDate)(7)),location.href="/"}else"fail"===e.rsp&&alert(e.data.msg)})}},ready:function(){}});t["default"]=d},,,,,,function(e,t,n){"use strict";function r(e,t){return o.Promise(function(n,r){a.ajax({url:i.config.BASE_HOST+"appapi?method=mobileapi2.passport.post_login",data:{uname:e,password:t},type:"get",success:function(e){var t=JSON.parse(e);n(t)},error:function(e){r("请求失败")}})})}var o=n(19),a=n(3),i=n(5);t.loginData=r},,,,,,,,,,,,,,,,,,function(e,t){},,,,,,,,,,,,,,,,,,,,function(e,t){e.exports='<div class="bd mtm">\r\n	<div class="herder">\r\n    	<a href="javascript:history.back()" class="detail-a-back"><span>返回</span></a>\r\n        <h2>登录</h2>\r\n    	<a href="#" class="new-a-tm"><span>团妈键</span></a>\r\n	</div>\r\n	<div class="ggimg">\r\n    	<div class="ggimg-01">\r\n        	<img src="http://img.ttmama.com/public/images/31/32/f0/c9374f67cdd0a62daf74383bc3bb218046e2aa12.jpg?1461834102#w">\r\n    	</div>\r\n	</div>\r\n	<form method="post" class="login-form" autocomplete="off" action="#">\r\n    <fieldset>\r\n        <div class="c-form-search">\r\n            <input type="text" class="name" id="uname" name="uname" placeholder="手机号／邮箱" value="">\r\n            <button type="button" style="display: none;"></button>\r\n        </div>\r\n        <div class="pwd">\r\n            <input type="password" class="pass" id="password" name="password" placeholder="输入密码">\r\n        </div>\r\n\r\n                <div class="auth-code" style="display: none;">\r\n        <div class="auth-co"><input class="x-input verify-input code" type="text" bg_img="vcodebg-white.png" name="verifycode" placeholder="填写验证码" id="dom_el_e85f010" maxlength="4" autocomplete="off" vtype="required&amp;&amp;alphaint"></div> <div class="check-img"><img src="/index-gen_vcode-b2c-4-vcodebg;jh;white;dian;png.html" alt="验证码" title="点击更换验证码" class="verify-code check-code-img auto-change-verify-handle"></div><span class="sxwz"> <a href="/index-gen_vcode-b2c-4-vcodebg;jh;white;dian;png.html" class="verify-code auto-change-verify-handle">看不清<br>换一张</a></span>\r\n        </div>\r\n        <div class="both"></div>\r\n        <div class="wjpass"><a href="/wap/passport-lost.html" class="wj-a">忘记登录密码？</a></div>\r\n        <div class="bf1">\r\n            <em class="jzpas is_remember v-bind:class=\'bel\'">记住密码\r\n                <input type="radio" style="display: none" value="1">\r\n            </em>\r\n            <em class="jzpas site_autologin right" style="display: none;">自动登录\r\n                <input type="radio" style="display: none;" value="1">\r\n            </em>\r\n\r\n            <!--<em class="landing">自动登录-->\r\n                <!--<input type="radio" value="2" style="display: none;">-->\r\n            <!--</em>-->\r\n        </div>\r\n    </fieldset>\r\n	</form>\r\n	<div class="dgsc-ft marg">\r\n    	<a href="/wap/passport-signup.html" class="c-btn-orgn"><span>注册</span></a>\r\n    	<a @click="login($event)" class="c-btn-blue" href="javascript:;" ><span>登录</span></a> \r\n	</div>\r\n	<input type="hidden" name="is_remember" value="on">\r\n	<input type="hidden" name="site_autologin" value="off">\r\n	<div class="new-tm-tab" style="display: none; right: -58px;">\r\n    	<div class="new-tbl-type">\r\n        	<a href="/index.html?ignore_ua_check=0" class="new-tbl-cell">\r\n            	<span class="icon">首页</span>\r\n            	<p style="color:#6e6e6e;">首页</p>\r\n       		 </a>\r\n       		 <a href="/wap/openim-chat.html" class="new-tbl-cell">\r\n            	<span class="icon2">客服</span>\r\n            	<p style="color:#6e6e6e;">客服</p>\r\n        	</a>\r\n        	<a href="/wap/member.html" class="new-tbl-cell">\r\n           	 	<span class="icon4">会员</span>\r\n            	<p style="color:#6e6e6e;">会员</p>\r\n        	</a>\r\n        	<a href="/wap/cart.html" class="new-tbl-cell new-tbb">\r\n            	<span class="icon3">购物车</span>\r\n            	<p style="color:#6e6e6e;">购物车</p>\r\n        	</a>\r\n    	</div>\r\n	</div>\r\n</div>'}]);