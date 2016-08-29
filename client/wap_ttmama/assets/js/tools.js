/**
 * Created by andy on 2015/5/5.
 */
/**
 * 依赖关系  jquery或者zepto 两者兼容   图片  loading.gif  gou.png
 *          css base.css 中的
 *             .tools-success-gou {background:url(../gou.png) left center no-repeat; background-size: 30px 30px; width: 175px; margin: 0 auto; padding: .5em 0; text-indent: 32px; line-height: 30px;}
 *             .tools-loading {background-size: 30px 30px; background: url(../loading.gif) no-repeat;width:30px;height:30px;}
 *使用方法
 * 加载tools.js   base.css
 * tools.loading.show(); tools.error.show('添加失败');
 *
 * 待优化 不需要每次都重新创建dom
 */
 /* eslint-disable */
 var $ = require('jquery');
;(function($){
    window.tools = {
        defaults:{
            shadowbg:'position: fixed;z-index: 9999999;top: 0;left: 0;width: 100%;height: 100%;-moz-opacity: 0.5;opacity: .50;filter: alpha(opacity=50);background-color: #000;display: block;',
            tipsbg:'width: 80%;position: fixed;padding: 1em 0;z-index: 99999999;top: 50%;text-align: center;left: 50%;margin-left: -40%;border-radius: 5px;color: #73c0bc;background: #fff;margin-top: -.5em;',
            tips:'background-size: 30px 30px;width: 90%;margin: 0 auto;padding: .5em 0;text-indent: 32px;line-height: 30px;background-position: 20px center;',
            loadingtips:'margin: 0 auto;padding: .5em 0;text-indent: 32px;line-height: 64px;',
            erroricon:'color: #73c0bc;line-height: 40px;height: 40px;width: 40px;font-size: 28px;font-family: \'宋体\';vertical-align: middle;margin-right:8px;',
            successtipsbg:'width: 80%;position: fixed;padding: 1em 0;z-index: 99999999;top: 50%;text-align: center;left: 50%;margin-left: -40%;border-radius: 5px;color: #707070;background: #fff;margin-top: -.5em;',
            loadingimg:'vertical-align: top;border: 0;margin: 0;overflow: hidden;display: block;'
        },
        loading:{
            show:function(message) {
                $("#loading").remove();
                var html = '<div id="loading"><div style="'+tools.defaults.tipsbg+'background:none;"><div class="tools-loading" style="'+tools.defaults.loadingtips+'"></div></div><div  style="'+tools.defaults.shadowbg+'"></div></div>';
                $('body').append(html);
            },
            hide:function() {
                $('#loading').hide();
            }
        },
        error:{
            show:function(message,time) {
                time = time?time:false;
                $("#tips_error").remove();
                var html = '<div id="tips_error"><div style="'+tools.defaults.tipsbg+'display:inline;"><div style="'+tools.defaults.tips+'"><span style="'+tools.defaults.erroricon+'">✖</span>'+message+'</div></div><div  style="'+tools.defaults.shadowbg+'"></div></div>';
                $('body').append(html);
                if(time !== false && $.type(time) === 'number') {
                    // setTimeout('$("#tips_error").hide();',time);
                    setTimeout(function(){
                        $("#tips_error").hide();
                    },time);
                }

            },
            hide:function() {
                $("#tips_error").hide();
            }
        },
        success:{
            show:function(message,time) {
                time = time?time:false;
                $("#tips_success").remove();
                var html = '<div id="tips_success"><div style="'+tools.defaults.successtipsbg+'"><div class="tools-success-gou" >'+message+'</div></div><div  style="'+tools.defaults.shadowbg+'"></div></div>';
                $('body').append(html);
                if(time !== false && $.type(time) === 'number') {
                    // setTimeout('$("#tips_success").hide();',time);
                    setTimeout(function(){
                        $("#tips_success").hide();
                    },time);
                }

            },
            hide:function() {
                $("#tips_success").hide();
            }
        }
    }
})($);