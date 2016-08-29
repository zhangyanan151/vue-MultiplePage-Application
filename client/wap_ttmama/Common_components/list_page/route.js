import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
var $ = require('jquery');
import groupbuyService from '../../service/groupbuyService'
import base from '../../assets/js/based.js'
import ccc from '../../assets/js/tools.js'
import bbb from '../../assets/js/jquery.fly.min.js'


let Index = Vue.extend({
  //replace : true,
  template: Tpl,
  ready: function(){
    base();
    var self = this;
    var isLoading = false;
    $(window).scroll(function() {
      if($(document).scrollTop() >= $(document).height() - $(window).height() -100) {
        if(isLoading) return;
        isLoading = true;
        self.isLoading = true;
        if(self.has_next) {
          groupbuyService.showData(self.page_size, self.current_page+1).then((data)=>{
            self.current_page ++;
            self.has_next = data.has_next;
            self.page_data.items = self.page_data.items.concat(data.items);
          });
        }
        isLoading = false;
        self.isLoading = false;
      }
    });

    /* eslint-disable */
    $(document).ready(function(){
      $("#params").data('params',{cat_id:'370'});
      $('#change-droplist1').click(function() {
          $(this).next('ul').toggle();
          $(this).children('.droplist-down').toggleClass('droplist-down2');
      });
      $('#change-droplist2').click(function() {
          $(this).next('ul').toggle();
          $(this).children('.droplist-down').toggleClass('droplist-down2');
      });
      $('#change-droplist3').click(function() {
          $(this).next('ul').toggle();
          $(this).children('.droplist-down').toggleClass('droplist-down2');
      });
      // 重新筛选
      $('.re-sift').click(function() {
          $('.li-ul > .selected').removeClass('selected');
          $('.li-ul-row2 > .selected').removeClass('selected');
          $('.li-ul-row1 > .selected').removeClass('selected');
          $('.start-price').val('');
          $('.end-price').val('');
          $(this).removeClass('re-sift2')
      });
      // 提交搜索表单
      $('#submitform').submit(function() {
          if( $(this).children('input').val() == '' ){
              window.tools.error.show('请填写要搜索的内容！',2000);
              return false;
          }

      });

      // 筛选
      $('.re-button').click(function() {
          var start_price = $('.start-price').val()?$('.start-price').val():0;
          var end_price = $('.end-price').val();
          var brand_id = $('.li-ul > .selected').attr('brand_id');
          var loc_id = [];
          loc_id.push($('.li-ul-row2 > .selected').attr('loc_id'));

          if(end_price) {
              var params = {showtype:'list',brand_id:[brand_id],page:1,price:[start_price+'~'+end_price],loc_id:loc_id};
              ajax_get_goods(get_params(params));
          }else {
              var params = {showtype:'list',page:1,brand_id:[brand_id],loc_id:loc_id};
              ajax_get_goods(get_params(params));
          }

      });

      // 排序
      $('.sort').click(function() {
          // 由低到高
          if( $(this).index() === 2 ) {
              var params = {showtype:'list',page:1,orderBy:'price asc'};

              ajax_get_goods(get_params(params));
          }
          // 综合
          if( $(this).index() === 0 ) {
              var params = {showtype:'list',page:1};
              ajax_get_goods(get_params(params));
          }
          // 由高到低
          if( $(this).index() === 1) {
              var params = {showtype:'list',page:1,orderBy:'price desc'};
              ajax_get_goods(get_params(params));
          }
          // 由新到旧
          if( $(this).index() === 3 ) {
              var params = {showtype:'list',page:1,orderBy:'last_modify desc'};

              ajax_get_goods(get_params(params));
          }
          // 由旧到新
          if( $(this).index() === 4) {
              var params = {showtype:'list',page:1,orderBy:'last_modify asc'};
              ajax_get_goods(get_params(params));
          }
      });

      // 销量
      $('.sales_count').click(function() {
          var params = {showtype:'list',page:1,orderBy:'buy_w_count desc'};
          ajax_get_goods(get_params(params));
      });

      var get_params = function(params) {
          var old_params = $("#params").data('params');
          $.extend(old_params,params);
          var search_keywords = $('input[name="search_keywords"]').val()?$('input[name="search_keywords"]').val():'';
          if(search_keywords !== '') {
              $.extend(old_params,{scontent:'n,'+search_keywords});
          }
          return old_params;
      }
      var ajax_get_goods = function(params,type) {
          $("#params").data('params',params);
          $.ajax({
              url: "http://www.ttmama.com/wap/gallery-ajax_get_goods.html",
              dataType : 'json',
              type : 'POST',
              data: params,
              beforeSend:function() {
                  if(type !== 'page') {
                      window.tools.loading.show();
                  }else {
                      ajax_page_loading();
                  }
              },
              complete:function() {
                  if(type !== 'page') {
                      window.tools.loading.hide();
                  }
              },
              error : function() {
                  window.tools.error.show('网络错误，请重试！',2000);
              },
              success: function(d) {
  //                console.log(d,type)
                  $('.droplist').hide();
                  $('.droplist-re').hide();
                  if(type !== 'page') {
                      $(".new-list11 > .list-bd > .new-mu_list").html(d.list);
                      $(".new-list2 > .list-bd > .new-mu_list").html(d.list_big);
                  }else {
                      $(".new-list11 > .list-bd > .new-mu_list").append(d.list);
                      $(".new-list2 > .list-bd > .new-mu_list").append(d.list_big);
                  }
  //                console.log(typeof(d.page), d.page_total)
                  if(parseInt(d.page) >= parseInt(d.page_total)) {
                      $('.pagination').html('没有了...');
                  }else {
                      $('.pagination').html('点击加载更多...');
                  }
                  $("#params").data('page', d.page);
                  $("#params").data('pagetotal', d.page_total);
              }

          });
      }
    })

        

/* eslint-disable */
    var offset = [];
    $(document).ready(function(){
        offset = $(".foot-nav .car").offset();
        offset.top -= $(window).scrollTop();
    })
    // 加入购物车
    $('.main').on('click','.btn-cart',function(event) {
        if(!$(this).hasClass('add-unable')) {
            addCar(this,event);
        }
        
        var obj = $(this).siblings('.tit-pric-a').children('a');
        //var url = obj.attr('href');
        var max = obj.attr('max');
        var product_id = obj.attr('product_id');
        var goods_id = obj.attr('goods_id');
        if(max <= 0) {
            return false;
        }
        $.ajax({
            url: "http://www.ttmama.com/wap/cart-add-goods.html",
            dataType : 'json',
            type : 'POST',
            data: {goods:{goods_id:goods_id,product_id:product_id,num:1},min:1,max:max,mini_cart:true},
            // beforeSend:function() {
            //     window.tools.loading.show();
            // },
            complete:function() {
                window.tools.loading.hide();
            },
            error : function() {
                window.tools.error.show('网络错误，请重试！',2000);
            },
            success: function(d) {
                if(d.success){
                    //window.tools.success.show(d.success,2000);    
                }else {
                    window.tools.error.show(d.error,2000);
                }
            }
        });
    });
    function addCar(that,event){
        var img = $(that).parent().parent().find('img').attr('src');//获取当前点击图片链接
        var flyer = $('<img class="flyer-img" src="' + img + '">');//抛物体对象
        flyer.fly({
            start: {
                left: event.pageX, //抛物体起点横坐标
                top: event.pageY-$(window).scrollTop() ////抛物体起点纵坐标
            },
            end: {
                left: offset.left -10, //抛物体终点横坐标
                top: offset.top + 10 //抛物体终点纵坐标
            },
            onEnd: function() {
                $(".foot-nav .success-tip").show().animate({'top': '-20px'}, 300);//成功加入购物车动画效果
                setTimeout(function(){
                    $(".foot-nav .success-tip").hide(1000);
                },500);
                this.destory();//销毁抛物体
            }
        });
    }

/*************************************************************************/


      // 分页
      var page = function() {
          //console.log($("#params").data('params')+'---'+$("#params").data('page')+'--'+$("#params").data('pagetotal'));
          var page = parseInt($("#params").data('page')) + 1;
          var page_total = $("#params").data('pagetotal');
          if(page <= page_total) {
              ajax_get_goods(get_params( {page:page,showtype:'list'} ),'page');
          }

      }
      
      // $(document).ready(function(){
       
      // });
      

      $(window).scroll(function(){
          var mHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          var more = $(".pagination").offset().top;
          if(more >= $(window).scrollTop() && more < ($(window).scrollTop()+$(window).height())){
              page();
          }
      })
    //    var nScrollHight = 0;
    //    var nScrollTop = 0;
    //    var nDivHight = $(window).height();
    //    $(window).scroll(function(){
    //        if( $('.droplist-re').css('display') !== 'block') {
    //            nScrollHight = document.body.scrollHeight;
    //            nScrollTop =  document.body.scrollTop;
    //            if(nScrollTop + nDivHight >= nScrollHight){
    //                page();
    //            }
    //        }
    //    });


/*************************************************************************/


    function ajax_page_loading() {
        $('.pagination').html('<img style="margin: 0 auto;" width="25px" height="25px" src="http://www.ttmama.com/wap_themes/ttwap/images/ttmama-loading.gif">');
    }

    // $(document).ready(function(){
        
    // })
    $(function(){
      $(window).scroll(function(){
          var top = $(window).scrollTop();
          if(top > $(window).height()*2) {
              $("#right-top").show();
          }else{
              $("#right-top").hide();
          }
      })
      $(".right-nav .top").click(function(){
          //$("html,body").animate({scrollTop:0}, 500);
          $(window).scrollTop(0);
      });
    });

/*************************************************************************/



    (function(){
        $('.J-tab .trigger').on('tap',function(e){
            if($(this).attr('data-url') && $(this).attr('data-url') != 'true'){
                $.get($(this).attr('data-url'),function(re){
                    $($('.J-tab .panel')[$(this).index()]).append(re);
                }.bind(this));
                $(this).attr('data-url','true');
            }
            $(this).add($('.J-tab .panel')[$(this).index()]).addClass('act').siblings('.act').removeClass('act');
        });

        function changeVerify(element, hasEvent) {
            $.each(element,function(){
                var url;
                var img;
                var el = this;
                if(el.tagName === 'IMG') {
                    img = el;
                    url = el.getAttribute('src').split('?')[0];
                }
                else if(el.tagName === 'A') {
                    img = el.previousElementSibling;
                    url = el.getAttribute('href');
                }
                if(hasEvent) $(el).on('touchend click', function(e){e.preventDefault();}).on('tap longTap', changeCode.bind(el, img, url));
                else changeCode(img, url);
            });
        }
        function changeCode(img, url){
            url = url || img.src.split('?')[0];
            var random = +new Date;
            img.src = url + '?' + random;
            return false;
        }
        changeVerify($('form .auto-change-verify-handle'), true);

        $(document).on('submit', 'form', function(){
            var sel = $('.region select'),
                region_false = false;
            $.each(sel,function(){
                if((this.style.visibility == 'visible') && (this.selectedIndex==0))
                    region_false = true;
            });
            if(region_false){
                alert('请选择完整地区！');
                return false;
            }

            var required = $(this).find('input[required]');

            if(required.length){
                var checkEmpty = false, ipt;
                $.each(required,function(){
                    ipt = $(this);
                    if(ipt.val()=='' && ipt.offset().height){
                        checkEmpty = ipt;
                        if(ipt.attr('data-caution'))
                            alert(ipt.attr('data-caution'));
                        return false;
                    }
                });
                if( checkEmpty )return false;
            }
            if($(this).attr('data-type') == 'ajax'){
                var self = $(this);
                $(this).find('[type=submit]').prop('disabled', true);
                $[$(this).attr('method')]($(this).attr('action'),$(this).serialize(),function(re){
                    try{
                        re = JSON.parse(re);
                    }catch(e) {}
                    var update = self.attr('data-update');
                    if(re.error){
                        if($('form .auto-change-verify-handle').length > 0){
                            $('form .auto-change-verify-handle').trigger('tap');
                        }
                        self.find('[type=submit]').prop('disabled', false);
                        return alert(re.error);
                    }else{
                        if($(update).size()) {
                            $(update).html(re);
                        }
                        else {
                            $('#success .checkout-success').html(re.success);
                            new Dialog('#success',{title:'提交成功！',type:'noclose'});
                            setTimeout(function(){location.href = re.redirect},1000);
                        }
                    }
                });
                return false;
            }else{
                return true;
            }
        });



    })();

  },
  data: ()=> {
    return {
      page_size: 20,
      page_data: [],
      current_page: 1,
      has_next: true,
      isLoading: false
    }
  },
  created: function() {
      var self = this;
      groupbuyService.showData(self.page_size,1).then(function(data){
        self.page_data = data;    
      });  
  }
});
var myComponent = Vue.component('list-page', Index);
export default myComponent
