webpackJsonp([7],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}var r=n(1),s=i(r),o=n(20),a=i(o),c=n(43),u=i(c);n(17);var h=n(95),l=i(h);s["default"].use(a["default"]),s["default"].use(u["default"]),a["default"].registerCustomEvent("doubletap",{type:"tap",taps:2});var p=new u["default"]({history:!0,saveScrollPosition:!0});p.map({"/find":{component:function(t){t(l["default"])}}}),p.redirect({"*":"/"});var f=s["default"].extend({});p.start(f,"#app")},5:function(t,e){(function(e){"use strict";var n={NODE_ENV:"development",SELF_HOST:"127.0.0.1:3000",PATH_TTMAMA:e+"/client/ttmama",PATH_WAP_TTMAMA:e+"/client/wap_ttmama",PATH_BUILD:e+"/dist/static",API_BASE_HOST:"http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list",API_WX_HOST:"http://",PATH_TPL:e+"/src",BASE_HOST:"http://nb.ittmom.com/ttmamaapp2/",INDEX_PATH:"ttwapspecial-hometext.html"};t.exports.config=n}).call(e,"/")},17:function(t,e){},18:function(t,e,n){var i;/*! Hammer.JS - v2.0.7 - 2016-04-22
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */
!function(r,s,o,a){"use strict";function c(t,e,n){return setTimeout(f(t,n),e)}function u(t,e,n){return Array.isArray(t)?(h(t,n[e],n),!0):!1}function h(t,e,n){var i;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==a)for(i=0;i<t.length;)e.call(n,t[i],i,t),i++;else for(i in t)t.hasOwnProperty(i)&&e.call(n,t[i],i,t)}function l(t,e,n){var i="DEPRECATED METHOD: "+e+"\n"+n+" AT \n";return function(){var e=new Error("get-stack-trace"),n=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",s=r.console&&(r.console.warn||r.console.log);return s&&s.call(r.console,i,n),t.apply(this,arguments)}}function p(t,e,n){var i,r=e.prototype;i=t.prototype=Object.create(r),i.constructor=t,i._super=r,n&&vt(i,n)}function f(t,e){return function(){return t.apply(e,arguments)}}function d(t,e){return typeof t==yt?t.apply(e?e[0]||a:a,e):t}function v(t,e){return t===a?e:t}function m(t,e,n){h(E(e),function(e){t.addEventListener(e,n,!1)})}function g(t,e,n){h(E(e),function(e){t.removeEventListener(e,n,!1)})}function y(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function T(t,e){return t.indexOf(e)>-1}function E(t){return t.trim().split(/\s+/g)}function b(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var i=0;i<t.length;){if(n&&t[i][n]==e||!n&&t[i]===e)return i;i++}return-1}function _(t){return Array.prototype.slice.call(t,0)}function w(t,e,n){for(var i=[],r=[],s=0;s<t.length;){var o=e?t[s][e]:t[s];b(r,o)<0&&i.push(t[s]),r[s]=o,s++}return n&&(i=e?i.sort(function(t,n){return t[e]>n[e]}):i.sort()),i}function x(t,e){for(var n,i,r=e[0].toUpperCase()+e.slice(1),s=0;s<mt.length;){if(n=mt[s],i=n?n+r:e,i in t)return i;s++}return a}function S(){return xt++}function A(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||r}function P(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){d(t.options.enable,[t])&&n.handler(e)},this.init()}function I(t){var e,n=t.options.inputClass;return new(e=n?n:Pt?j:It?U:At?$:F)(t,D)}function D(t,e,n){var i=n.pointers.length,r=n.changedPointers.length,s=e&Rt&&i-r===0,o=e&(qt|kt)&&i-r===0;n.isFirst=!!s,n.isFinal=!!o,s&&(t.session={}),n.eventType=e,M(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function M(t,e){var n=t.session,i=e.pointers,r=i.length;n.firstInput||(n.firstInput=z(e)),r>1&&!n.firstMultiple?n.firstMultiple=z(e):1===r&&(n.firstMultiple=!1);var s=n.firstInput,o=n.firstMultiple,a=o?o.center:s.center,c=e.center=R(i);e.timeStamp=bt(),e.deltaTime=e.timeStamp-s.timeStamp,e.angle=H(a,c),e.distance=k(a,c),O(n,e),e.offsetDirection=q(e.deltaX,e.deltaY);var u=N(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=u.x,e.overallVelocityY=u.y,e.overallVelocity=Et(u.x)>Et(u.y)?u.x:u.y,e.scale=o?Y(o.pointers,i):1,e.rotation=o?X(o.pointers,i):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,C(n,e);var h=t.element;y(e.srcEvent.target,h)&&(h=e.srcEvent.target),e.target=h}function O(t,e){var n=e.center,i=t.offsetDelta||{},r=t.prevDelta||{},s=t.prevInput||{};e.eventType!==Rt&&s.eventType!==qt||(r=t.prevDelta={x:s.deltaX||0,y:s.deltaY||0},i=t.offsetDelta={x:n.x,y:n.y}),e.deltaX=r.x+(n.x-i.x),e.deltaY=r.y+(n.y-i.y)}function C(t,e){var n,i,r,s,o=t.lastInterval||e,c=e.timeStamp-o.timeStamp;if(e.eventType!=kt&&(c>zt||o.velocity===a)){var u=e.deltaX-o.deltaX,h=e.deltaY-o.deltaY,l=N(c,u,h);i=l.x,r=l.y,n=Et(l.x)>Et(l.y)?l.x:l.y,s=q(u,h),t.lastInterval=e}else n=o.velocity,i=o.velocityX,r=o.velocityY,s=o.direction;e.velocity=n,e.velocityX=i,e.velocityY=r,e.direction=s}function z(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:Tt(t.pointers[n].clientX),clientY:Tt(t.pointers[n].clientY)},n++;return{timeStamp:bt(),pointers:e,center:R(e),deltaX:t.deltaX,deltaY:t.deltaY}}function R(t){var e=t.length;if(1===e)return{x:Tt(t[0].clientX),y:Tt(t[0].clientY)};for(var n=0,i=0,r=0;e>r;)n+=t[r].clientX,i+=t[r].clientY,r++;return{x:Tt(n/e),y:Tt(i/e)}}function N(t,e,n){return{x:e/t||0,y:n/t||0}}function q(t,e){return t===e?Ht:Et(t)>=Et(e)?0>t?Xt:Yt:0>e?Ft:jt}function k(t,e,n){n||(n=Vt);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return Math.sqrt(i*i+r*r)}function H(t,e,n){n||(n=Vt);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return 180*Math.atan2(r,i)/Math.PI}function X(t,e){return H(e[1],e[0],$t)+H(t[1],t[0],$t)}function Y(t,e){return k(e[0],e[1],$t)/k(t[0],t[1],$t)}function F(){this.evEl=Gt,this.evWin=Zt,this.pressed=!1,P.apply(this,arguments)}function j(){this.evEl=Qt,this.evWin=te,P.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function W(){this.evTarget=ne,this.evWin=ie,this.started=!1,P.apply(this,arguments)}function L(t,e){var n=_(t.touches),i=_(t.changedTouches);return e&(qt|kt)&&(n=w(n.concat(i),"identifier",!0)),[n,i]}function U(){this.evTarget=se,this.targetIds={},P.apply(this,arguments)}function V(t,e){var n=_(t.touches),i=this.targetIds;if(e&(Rt|Nt)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var r,s,o=_(t.changedTouches),a=[],c=this.target;if(s=n.filter(function(t){return y(t.target,c)}),e===Rt)for(r=0;r<s.length;)i[s[r].identifier]=!0,r++;for(r=0;r<o.length;)i[o[r].identifier]&&a.push(o[r]),e&(qt|kt)&&delete i[o[r].identifier],r++;return a.length?[w(s.concat(a),"identifier",!0),a]:void 0}function $(){P.apply(this,arguments);var t=f(this.handler,this);this.touch=new U(this.manager,t),this.mouse=new F(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function B(t,e){t&Rt?(this.primaryTouch=e.changedPointers[0].identifier,G.call(this,e)):t&(qt|kt)&&G.call(this,e)}function G(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var n={x:e.clientX,y:e.clientY};this.lastTouches.push(n);var i=this.lastTouches,r=function(){var t=i.indexOf(n);t>-1&&i.splice(t,1)};setTimeout(r,oe)}}function Z(t){for(var e=t.srcEvent.clientX,n=t.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var r=this.lastTouches[i],s=Math.abs(e-r.x),o=Math.abs(n-r.y);if(ae>=s&&ae>=o)return!0}return!1}function J(t,e){this.manager=t,this.set(e)}function K(t){if(T(t,fe))return fe;var e=T(t,de),n=T(t,ve);return e&&n?fe:e||n?e?de:ve:T(t,pe)?pe:le}function Q(){if(!ue)return!1;var t={},e=r.CSS&&r.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(n){t[n]=e?r.CSS.supports("touch-action",n):!0}),t}function tt(t){this.options=vt({},this.defaults,t||{}),this.id=S(),this.manager=null,this.options.enable=v(this.options.enable,!0),this.state=ge,this.simultaneous={},this.requireFail=[]}function et(t){return t&_e?"cancel":t&Ee?"end":t&Te?"move":t&ye?"start":""}function nt(t){return t==jt?"down":t==Ft?"up":t==Xt?"left":t==Yt?"right":""}function it(t,e){var n=e.manager;return n?n.get(t):t}function rt(){tt.apply(this,arguments)}function st(){rt.apply(this,arguments),this.pX=null,this.pY=null}function ot(){rt.apply(this,arguments)}function at(){tt.apply(this,arguments),this._timer=null,this._input=null}function ct(){rt.apply(this,arguments)}function ut(){rt.apply(this,arguments)}function ht(){tt.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function lt(t,e){return e=e||{},e.recognizers=v(e.recognizers,lt.defaults.preset),new pt(t,e)}function pt(t,e){this.options=vt({},lt.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=I(this),this.touchAction=new J(this,this.options.touchAction),ft(this,!0),h(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function ft(t,e){var n=t.element;if(n.style){var i;h(t.options.cssProps,function(r,s){i=x(n.style,s),e?(t.oldCssProps[i]=n.style[i],n.style[i]=r):n.style[i]=t.oldCssProps[i]||""}),e||(t.oldCssProps={})}}function dt(t,e){var n=s.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e,e.target.dispatchEvent(n)}var vt,mt=["","webkit","Moz","MS","ms","o"],gt=s.createElement("div"),yt="function",Tt=Math.round,Et=Math.abs,bt=Date.now;vt="function"!=typeof Object.assign?function(t){if(t===a||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var i=arguments[n];if(i!==a&&null!==i)for(var r in i)i.hasOwnProperty(r)&&(e[r]=i[r])}return e}:Object.assign;var _t=l(function(t,e,n){for(var i=Object.keys(e),r=0;r<i.length;)(!n||n&&t[i[r]]===a)&&(t[i[r]]=e[i[r]]),r++;return t},"extend","Use `assign`."),wt=l(function(t,e){return _t(t,e,!0)},"merge","Use `assign`."),xt=1,St=/mobile|tablet|ip(ad|hone|od)|android/i,At="ontouchstart"in r,Pt=x(r,"PointerEvent")!==a,It=At&&St.test(navigator.userAgent),Dt="touch",Mt="pen",Ot="mouse",Ct="kinect",zt=25,Rt=1,Nt=2,qt=4,kt=8,Ht=1,Xt=2,Yt=4,Ft=8,jt=16,Wt=Xt|Yt,Lt=Ft|jt,Ut=Wt|Lt,Vt=["x","y"],$t=["clientX","clientY"];P.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(A(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&g(this.element,this.evEl,this.domHandler),this.evTarget&&g(this.target,this.evTarget,this.domHandler),this.evWin&&g(A(this.element),this.evWin,this.domHandler)}};var Bt={mousedown:Rt,mousemove:Nt,mouseup:qt},Gt="mousedown",Zt="mousemove mouseup";p(F,P,{handler:function(t){var e=Bt[t.type];e&Rt&&0===t.button&&(this.pressed=!0),e&Nt&&1!==t.which&&(e=qt),this.pressed&&(e&qt&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:Ot,srcEvent:t}))}});var Jt={pointerdown:Rt,pointermove:Nt,pointerup:qt,pointercancel:kt,pointerout:kt},Kt={2:Dt,3:Mt,4:Ot,5:Ct},Qt="pointerdown",te="pointermove pointerup pointercancel";r.MSPointerEvent&&!r.PointerEvent&&(Qt="MSPointerDown",te="MSPointerMove MSPointerUp MSPointerCancel"),p(j,P,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),r=Jt[i],s=Kt[t.pointerType]||t.pointerType,o=s==Dt,a=b(e,t.pointerId,"pointerId");r&Rt&&(0===t.button||o)?0>a&&(e.push(t),a=e.length-1):r&(qt|kt)&&(n=!0),0>a||(e[a]=t,this.callback(this.manager,r,{pointers:e,changedPointers:[t],pointerType:s,srcEvent:t}),n&&e.splice(a,1))}});var ee={touchstart:Rt,touchmove:Nt,touchend:qt,touchcancel:kt},ne="touchstart",ie="touchstart touchmove touchend touchcancel";p(W,P,{handler:function(t){var e=ee[t.type];if(e===Rt&&(this.started=!0),this.started){var n=L.call(this,t,e);e&(qt|kt)&&n[0].length-n[1].length===0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:Dt,srcEvent:t})}}});var re={touchstart:Rt,touchmove:Nt,touchend:qt,touchcancel:kt},se="touchstart touchmove touchend touchcancel";p(U,P,{handler:function(t){var e=re[t.type],n=V.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:Dt,srcEvent:t})}});var oe=2500,ae=25;p($,P,{handler:function(t,e,n){var i=n.pointerType==Dt,r=n.pointerType==Ot;if(!(r&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(i)B.call(this,e,n);else if(r&&Z.call(this,n))return;this.callback(t,e,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var ce=x(gt.style,"touchAction"),ue=ce!==a,he="compute",le="auto",pe="manipulation",fe="none",de="pan-x",ve="pan-y",me=Q();J.prototype={set:function(t){t==he&&(t=this.compute()),ue&&this.manager.element.style&&me[t]&&(this.manager.element.style[ce]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return h(this.manager.recognizers,function(e){d(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),K(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)return void e.preventDefault();var i=this.actions,r=T(i,fe)&&!me[fe],s=T(i,ve)&&!me[ve],o=T(i,de)&&!me[de];if(r){var a=1===t.pointers.length,c=t.distance<2,u=t.deltaTime<250;if(a&&c&&u)return}return o&&s?void 0:r||s&&n&Wt||o&&n&Lt?this.preventSrc(e):void 0},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var ge=1,ye=2,Te=4,Ee=8,be=Ee,_e=16,we=32;tt.prototype={defaults:{},set:function(t){return vt(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(u(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=it(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return u(t,"dropRecognizeWith",this)?this:(t=it(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(u(t,"requireFailure",this))return this;var e=this.requireFail;return t=it(t,this),-1===b(e,t)&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(u(t,"dropRequireFailure",this))return this;t=it(t,this);var e=b(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){n.manager.emit(e,t)}var n=this,i=this.state;Ee>i&&e(n.options.event+et(i)),e(n.options.event),t.additionalEvent&&e(t.additionalEvent),i>=Ee&&e(n.options.event+et(i))},tryEmit:function(t){return this.canEmit()?this.emit(t):void(this.state=we)},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(we|ge)))return!1;t++}return!0},recognize:function(t){var e=vt({},t);return d(this.options.enable,[this,e])?(this.state&(be|_e|we)&&(this.state=ge),this.state=this.process(e),void(this.state&(ye|Te|Ee|_e)&&this.tryEmit(e))):(this.reset(),void(this.state=we))},process:function(t){},getTouchAction:function(){},reset:function(){}},p(rt,tt,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,i=e&(ye|Te),r=this.attrTest(t);return i&&(n&kt||!r)?e|_e:i||r?n&qt?e|Ee:e&ye?e|Te:ye:we}}),p(st,rt,{defaults:{event:"pan",threshold:10,pointers:1,direction:Ut},getTouchAction:function(){var t=this.options.direction,e=[];return t&Wt&&e.push(ve),t&Lt&&e.push(de),e},directionTest:function(t){var e=this.options,n=!0,i=t.distance,r=t.direction,s=t.deltaX,o=t.deltaY;return r&e.direction||(e.direction&Wt?(r=0===s?Ht:0>s?Xt:Yt,n=s!=this.pX,i=Math.abs(t.deltaX)):(r=0===o?Ht:0>o?Ft:jt,n=o!=this.pY,i=Math.abs(t.deltaY))),t.direction=r,n&&i>e.threshold&&r&e.direction},attrTest:function(t){return rt.prototype.attrTest.call(this,t)&&(this.state&ye||!(this.state&ye)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=nt(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),p(ot,rt,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[fe]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&ye)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),p(at,tt,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[le]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime>e.time;if(this._input=t,!i||!n||t.eventType&(qt|kt)&&!r)this.reset();else if(t.eventType&Rt)this.reset(),this._timer=c(function(){this.state=be,this.tryEmit()},e.time,this);else if(t.eventType&qt)return be;return we},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===be&&(t&&t.eventType&qt?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=bt(),this.manager.emit(this.options.event,this._input)))}}),p(ct,rt,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[fe]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&ye)}}),p(ut,rt,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Wt|Lt,pointers:1},getTouchAction:function(){return st.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(Wt|Lt)?e=t.overallVelocity:n&Wt?e=t.overallVelocityX:n&Lt&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&Et(e)>this.options.velocity&&t.eventType&qt},emit:function(t){var e=nt(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),p(ht,tt,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[pe]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime<e.time;if(this.reset(),t.eventType&Rt&&0===this.count)return this.failTimeout();if(i&&r&&n){if(t.eventType!=qt)return this.failTimeout();var s=this.pTime?t.timeStamp-this.pTime<e.interval:!0,o=!this.pCenter||k(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,o&&s?this.count+=1:this.count=1,this._input=t;var a=this.count%e.taps;if(0===a)return this.hasRequireFailures()?(this._timer=c(function(){this.state=be,this.tryEmit()},e.interval,this),ye):be}return we},failTimeout:function(){return this._timer=c(function(){this.state=we},this.options.interval,this),we},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==be&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),lt.VERSION="2.0.7",lt.defaults={domEvents:!1,touchAction:he,enable:!0,inputTarget:null,inputClass:null,preset:[[ct,{enable:!1}],[ot,{enable:!1},["rotate"]],[ut,{direction:Wt}],[st,{direction:Wt},["swipe"]],[ht],[ht,{event:"doubletap",taps:2},["tap"]],[at]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var xe=1,Se=2;pt.prototype={set:function(t){return vt(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?Se:xe},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var n,i=this.recognizers,r=e.curRecognizer;(!r||r&&r.state&be)&&(r=e.curRecognizer=null);for(var s=0;s<i.length;)n=i[s],e.stopped===Se||r&&n!=r&&!n.canRecognizeWith(r)?n.reset():n.recognize(t),!r&&n.state&(ye|Te|Ee)&&(r=e.curRecognizer=n),s++}},get:function(t){if(t instanceof tt)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(u(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(u(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=b(e,t);-1!==n&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){if(t!==a&&e!==a){var n=this.handlers;return h(E(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this}},off:function(t,e){if(t!==a){var n=this.handlers;return h(E(t),function(t){e?n[t]&&n[t].splice(b(n[t],e),1):delete n[t]}),this}},emit:function(t,e){this.options.domEvents&&dt(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](e),i++}},destroy:function(){this.element&&ft(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},vt(lt,{INPUT_START:Rt,INPUT_MOVE:Nt,INPUT_END:qt,INPUT_CANCEL:kt,STATE_POSSIBLE:ge,STATE_BEGAN:ye,STATE_CHANGED:Te,STATE_ENDED:Ee,STATE_RECOGNIZED:be,STATE_CANCELLED:_e,STATE_FAILED:we,DIRECTION_NONE:Ht,DIRECTION_LEFT:Xt,DIRECTION_RIGHT:Yt,DIRECTION_UP:Ft,DIRECTION_DOWN:jt,DIRECTION_HORIZONTAL:Wt,DIRECTION_VERTICAL:Lt,DIRECTION_ALL:Ut,Manager:pt,Input:P,TouchAction:J,TouchInput:U,MouseInput:F,PointerEventInput:j,TouchMouseInput:$,SingleTouchInput:W,Recognizer:tt,AttrRecognizer:rt,Tap:ht,Pan:st,Swipe:ut,Pinch:ot,Rotate:ct,Press:at,on:m,off:g,each:h,merge:wt,extend:_t,assign:vt,inherit:p,bindFn:f,prefixed:x});var Ae="undefined"!=typeof r?r:"undefined"!=typeof self?self:{};Ae.Hammer=lt,i=function(){return lt}.call(e,n,e,t),!(i!==a&&(t.exports=i))}(window,document,"Hammer")},20:function(t,e,n){!function(){function e(t){return t.charAt(0).toUpperCase()+t.slice(1)}function i(t){var e=t.direction;if("string"==typeof e){var n="DIRECTION_"+e.toUpperCase();a.indexOf(e)>-1&&s.hasOwnProperty(n)?t.direction=s[n]:console.warn("[vue-touch] invalid direction: "+e)}}var r={},s=n(18),o=["tap","pan","pinch","press","rotate","swipe"],a=["up","down","left","right","horizontal","vertical","all"],c={};if(!s)throw new Error("[vue-touch] cannot locate Hammer.js.");r.config={},r.install=function(t){t.directive("touch",{isFn:!0,acceptStatement:!0,priority:t.directive("on").priority,bind:function(){this.el.hammer||(this.el.hammer=new s.Manager(this.el));var t=this.mc=this.el.hammer,n=this.arg;n||console.warn("[vue-touch] event type argument is required.");var a,u;if(c[n]){var h=c[n];a=h.type,u=new(s[e(a)])(h),u.recognizeWith(t.recognizers),t.add(u)}else{for(var l=0;l<o.length;l++)if(0===n.indexOf(o[l])){a=o[l];break}if(!a)return void console.warn("[vue-touch] invalid event type: "+n);u=t.get(a),u||(u=new(s[e(a)]),u.recognizeWith(t.recognizers),t.add(u));var p=r.config[a];p&&(i(p),u.set(p));var f=this.el.hammerOptions&&this.el.hammerOptions[a];f&&(i(f),u.set(f))}this.recognizer=u},update:function(t){var e=this.mc,n=this.arg;this.handler&&e.off(n,this.handler),"function"!=typeof t?(this.handler=null,console.warn("[vue-touch] invalid handler function for v-touch: "+this.arg+'="'+this.descriptor.raw)):e.on(n,this.handler=t)},unbind:function(){this.handler&&this.mc.off(this.arg,this.handler),Object.keys(this.mc.handlers).length||(this.mc.destroy(),this.el.hammer=null)}}),t.directive("touch-options",{priority:t.directive("on").priority+1,update:function(t){var e=this.el.hammerOptions||(this.el.hammerOptions={});this.arg?e[this.arg]=t:console.warn("[vue-touch] recognizer type argument for v-touch-options is required.")}})},r.registerCustomEvent=function(t,e){e.event=t,c[t]=e},t.exports=r}()},45:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),s=i(r),o=n(50),a=i(o);n(48);var c=n(3),u=i(c),h=s["default"].extend({template:a["default"],props:["state"],data:function(){return{topShow:!1}},methods:{},created:function(){},ready:function(){var t=this;(0,u["default"])(window).scroll(function(){(0,u["default"])(document).scrollTop()>=2*(0,u["default"])(window).height()?t.topShow=!0:t.topShow=!1})}}),l=s["default"].component("foot-index",h);e["default"]=l},48:function(t,e){},50:function(t,e){t.exports='<div style="padding-bottom:44px;"></div>\r\n<div class="foot-nav">\r\n    <ul>\r\n        <li :class="state==\'home\'?\'active\':\'\'"><a href="/"><i class="home"></i><span>首页</span></a></li>\r\n        <li :class="state==\'all\'?\'active\':\'\'"><a href="/classify"><i class="all"></i><span>全部分类</span></a></li>\r\n        <li :class="state==\'found\'?\'active\':\'\'"><a href="/find"><i class="found"></i><span class="found-text">发现</span></a></li>\r\n        <li :class="state==\'car\'?\'active\':\'\'"><a href="/cart"><i class="car"></i><span>购物车</span></a></li>\r\n        <li :class="state==\'user\'?\'active\':\'\'"><a href="/"><i class="user"></i><span>用户中心</span></a></li>\r\n    </ul>\r\n</div>\r\n<div class="right-nav">\r\n    <ul>\r\n        <li><a href="/"><i class="customer"></i></a></li>\r\n        <li id="right-top" v-show="topShow"><a href="javascript:scrollTo(0,0);"><i class="top"></i></a></li>\r\n    </ul>\r\n</div>'},58:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),s=i(r),o=n(70),a=i(o);n(65);var c=n(3),u=s["default"].extend({template:a["default"],props:["shareShow"],data:function(){return{}},computed:{bottom:function l(){var l="";if(this.shareShow)l="0px";else{var t=this.$els.sharebox,e=t.offsetHeight;e=0===e?300:e,l=-e+"px"}return l}},methods:{hide:function(){this.$dispatch("hide-share")}},created:function(){var t=window.location.href,e=c(".title").html(),n=c(".title").html();window._bd_share_config={common:{bdText:e,bdDesc:n,bdUrl:t,bdPic:""},share:[{bdSize:32,bdCustomStyle:""}],image:[{viewType:"list",viewPos:"top",viewColor:"black",viewSize:"32",viewList:["douban","kaixin001","qzone","renren","tsina","tqq"]}],selectShare:[{bdselectMiniList:["douban","kaixin001","qzone","renren","tsina","tqq"]}]}},watch:{}}),h=s["default"].component("share-component",u);e["default"]=h},60:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));for(var i in n)new RegExp("("+i+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?n[i]:("00"+n[i]).substr((""+n[i]).length)));return e}var s=n(1),o=i(s);o["default"].filter("isBaoshui",function(t){return t?"bsc":"xhc"}),o["default"].filter("addUrl",function(t){return"http://nb.ittmom.com/ttmamaapp2/"+t}),o["default"].filter("checkPrice",function(t){return t%1>0?parseInt(t,10)+".":parseInt(t,10)}),o["default"].filter("checkPriceChange",function(t){return t%1>0?t.split(".")[1]:""}),o["default"].filter("isFreeShipping",function(t){for(var e=0;e<t.length;e++)if("包邮"===t[e].tag_name)return!0;return!1}),o["default"].filter("DateParse",function(t){var e=new Date;return e.setTime(1e3*t),r(e,"yyyy-MM-dd hh:mm:ss")}),o["default"].filter("findstrtime",function(t){function e(t){return t>9?t:"0"+t}var n=new Date(1e3*t),i=n.getFullYear(),r=n.getMonth()+1,s=n.getDate(),o=n.getHours(),a=n.getMinutes(),c=(n.getSeconds(),i+"-"+e(r)+"-"+e(s)+" "+e(o)+":"+e(a));return c})},65:function(t,e){},70:function(t,e){t.exports='<div class="bgg" v-show="shareShow" @click="hide"></div>\n<div class="fenx-row" v-el:sharebox :style="{bottom:bottom}">\n    <div class="fenx-fxd">\n        <p class="fxd">分享到 </p>     \n        <div class="icon-fx">\n            <div class="bdsharebuttonbox bitcom" data-tag="share_1">\n                <a class="bds_douban" data-cmd="douban" href="#"></a>\n                <a class="bds_kaixin001" data-cmd="kaixin001"></a>\n                <a class="bds_qzone" data-cmd="qzone"></a>\n                <a class="bds_renren" data-cmd="renren"></a>\n                <a class="bds_tsina" data-cmd="tsina"></a>\n                <a class="bds_tqq" data-cmd="tqq"></a>\n            </div>\n        </div>\n        <div class="cancel" @click="hide">取 消</div>\n    </div>\n</div>'},95:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),s=i(r),o=n(139),a=i(o);n(119);var c=n(101),u=i(c),h=n(3),l=(i(h),n(45)),p=(i(l),n(58));i(p);n(60);var f=s["default"].extend({template:a["default"],data:function(){return{findData:[]}},created:function(){var t=this;u["default"].findData().then(function(e){"succ"===e.rsp&&(t.findData=e.data)}),window.onblur=function(t){t.preventDefault()&&t.stopPropagation()}},computed:{},methods:{substractNum:function(t,e,n){console.log(t);var i=this;"succ"===data.rsp&&(item.fav_type===n?(alert("已收藏"),i.fav=i.nofav):item.fav_type===e&&(alert("取消收藏"),i.nofav=i.fav))},component:function(t){console.log(t)}}});e["default"]=f},101:function(t,e,n){"use strict";function i(t){return r.Promise(function(e,n){s.ajax({url:o.config.BASE_HOST+"appapi?method=mobileapi2.find.findlist",data:{uname:t},type:"get",success:function(t){var n=JSON.parse(t);e(n)},error:function(t){n("请求失败")}})})}var r=n(19),s=n(3),o=n(5);e.findData=i},119:function(t,e){},139:function(t,e){t.exports='<div class="find-tit-box" v-for=\'item in findData\'>\r\n    <div class="find-tit-top">\r\n        <div class="find-tit-top-l">\r\n            <h2><a href="{{ item.link }}">{{ item.title }}</a></h2>\r\n            <span>{{ item.pubtime | findstrtime }}</span>\r\n        </div>\r\n        <div class="find-tit-top-r">\r\n            <a href="javascript:;" class="find-tit-top-r-1" @click="item.fav_type === \'nofav\'? substractNum($index):\'javascript:\'" :class="item.fav_type === \'fav\'? \'\':\'find-tit-top-r-3\'"></a>\r\n            <a href="javascript:;" class="find-tit-top-r-2" @click="component($index)"></a>\r\n        </div>\r\n    </div>\r\n    <div class="find-tit-mid">\r\n        <a href="{{ item.link }}"><img :src="item.image_id_list"></a>\r\n    </div>\r\n    <div class="find-tit-foo">\r\n        <ul>\r\n            <li style="border-right: 2px solid #eee"><a href="javascript:;"><i class="i-1"></i><span>{{ item.visits }}</span></a></li>\r\n            <li><a href="javascript:;"><i class="i-2"></i><span>{{ item.contentnums }}</span></a></li>\r\n            <li style="border-left: 2px solid #eee"><a href="javascript:;"><i class="i-3"></i><span>{{ item.praise }}</span></a></li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n<foot-index state="found"></foot-index>\r\n<share-component id=\'fens\'></share-component> \r\n'}});