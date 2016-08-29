import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import tab_slide from '../tab_slide/route';
var $ = require('jquery');
import groupbuyService from '../../service/groupbuyService'
import ccc from '../../assets/js/tools.js'
import detail from  '../../assets/js/detail.js'
import share_component from '../share_component/route';

let Index = Vue.extend({
  //replace : true,
  template: Tpl,
  props: [],
  data: () => {
    return {
      all_data: {},
      tab_slide: '',
      "member_id": "2246",
      "accesstoken": "091bbe2513fc00d7d6fef2b4b3b8b56c",
      "login_account": "18911538051",
      base_information_txt: ''
    }
  },
  computed: {
    tab_slide_2: function() {
      return this.tab_slide;
    }
  },
  methods: {
    initData: function() {
      groupbuyService.details_show_data(3444).then((data) => {
        this.all_data = data;
        console.log(this.all_data);
        this.tab_slide = {
          box_id: 'id_007',
          imgs: data.imgs
        };
        var base_information_txt = data.base_information_txt;
        this.base_information_txt = base_information_txt.split('\n');
        console.log(this.base_information_txt);

      });
    }
  },
  created: function() {
    console.log('created' + this.base_information_txt);



    $(document).ready(function() {
      // console.log('document.ready');

      /*给 收藏  按钮添加点击事件 */
      $('.sc').click(
        function() {
          // $(".bgg").css('display', 'inline');
          // $(".tr-wz-sc").css('display', 'inline');
          // var a = setTimeout(func, '2000');
          // $(".bgg").click(
          //     function () {
          //         clearTimeout(a);
          //         func();
          //         $('.cancel').click();
          //         $('.c-btn-blue').click();
          //     })

        });

      /*给 分享到  按钮添加点击事件 */
      $('.fx').click(function(e) {
        e.stopPropagation();
        $('.cancel').click();
        // alert('click_btn  clicked!');

      });

      /***************************给图文按钮添加点击事件******************************************/
      $(".show-details-btn").on('click', function() {
        console.log(".show-details-btn clicked");

        if ($(".show-detail-box img").length <= 0) {
          var imgs = '<img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/202980389/TB2EeR_fXXXXXbYXXXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i1/202980389/TB2c3lZfXXXXXaSXpXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/202980389/TB2fkWjfXXXXXXrXXXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/202980389/TB20umefXXXXXaBXXXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i4/202980389/TB2eP4.fXXXXXbZXXXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/202980389/TB2835ifXXXXXXuXXXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i4/202980389/TB2HDJVfXXXXXbeXpXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i4/202980389/TB2LsVWfXXXXXbyXpXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/202980389/TB2.zlUfXXXXXbyXpXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i1/202980389/TB2GN49fXXXXXcEXXXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i3/202980389/TB2qm41fXXXXXX6XpXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i3/202980389/TB2TtJ0fXXXXXapXpXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/202980389/TB2fQVZfXXXXXaKXpXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i3/202980389/TB26Wh5fXXXXXXyXpXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/202980389/TB21CXPfXXXXXXkXFXXXXXXXXXX-202980389.jpg" style="width: 620px; float: none; margin: 0px;">';
          $(".show-detail-box").append(imgs);
        }


        $(".show-detail-box").show();
        $(".detail-bd").hide();
        $(window).scrollTop(0);
        //        window.ontouchmove=function(e){
        //            e.preventDefault && e.preventDefault();
        //            e.returnValue=false;
        //            e.stopPropagation && e.stopPropagation();
        //            return false;
        //        };
      });
      $(".show-detail-box").on('click', function() {
        $(".show-detail-box").hide();
        $(".detail-bd").show();
        //        window.ontouchmove=function(e){
        //            e.preventDefault && e.preventDefault();
        //            e.returnValue=true;
        //            e.stopPropagation && e.stopPropagation();
        //            return true;
        //        };
      });
      /***************************给图文按钮添加点击事件******************************************/


      $(document).ready(function() {
        // var heightP = -$(".fenx-row").height();
        // $(".fenx-row").css({'bottom':heightP});
      });

      $(".cosi01").on('click', 'i', function() {

        //$(this).siblings().removeClass('sel');
        //$(this).addClass('sel');
        var product_id = $(this).data('product_id');
        if (product_id == '' || product_id == 'undefined') {
          return false;
          //tools.error.show('数据错误，请刷新重试',2000);
        }
        $.ajax({
          url: "/wap/product-ajax_product.html",
          beforeSend: function() {
            tools.loading.show();
          },
          complete: function() {
            tools.loading.hide();
          },
          dataType: 'json',
          type: 'POST',
          data: {
            product_id: product_id
          },
          error: function() {
            tools.error.show('网络错误，请重试！', 2000);
          },
          success: function(d) {
            if ((typeof d.error) !== 'undefined') {
              tools.error.show(d.error, 2000);
              return false;
            }

            $('.cosi-img > img').attr('src', d.default_image);
            var html = '';

            $.each(d.spec.goods, function(key, spec) {

              html += '<div class="list-cm"><h3 class="bt">选择' + d.spec.specification.spec_name[key] + '：</h3><p class="dgsc-pc">';

              $.each(spec, function(item_key, item) {
                if (item_key == d.spec.product[key]) {
                  html += '<i data-spec=' + d.spec.specification.spec_name[key] + ' data-product_id="' + d.product_id + '" class="sel"> ' + item.spec_value + '</i>';
                } else {
                  if (item.product_id) {
                    html += '<i data-spec=' + d.spec.specification.spec_name[key] + ' data-product_id="' + item.product_id + '">' + item.spec_value + '</i>';
                  }
                }
              });
              html += '</p></div>';
            });

            var numhtml = $('.list-cm').last().clone();

            $('.dgsc-pr').html(html);
            $('.dgsc-pr').append(numhtml);

            $('.c-btn-orgn').data('cart_max', d.store.store);
            $('.c-btn-orgn').data('cart_goodsid', d.goods_id);
            $('.c-btn-orgn').data('cart_productid', d.product_id);
            //            data-  data- data-="
            //            $('.c-btn-orgn').data('cart_max',);
            // 优惠价格和 实际价格
            $('.discountPrice').text(d.price);
            $('.price').text(d.mktprice);
            // 是否可买
            if (d.store.store >= 1) {
              $(".c-btn-orgn").data('nostore', 0);
              $(".c-btn-orgn > span").text('加入购物车');
              $(".btn-cart").data('nostore', 0);
              $(".btn-cart").text('加入购物车');
            } else {
              $(".c-btn-orgn").data('nostore', 1);
              $(".c-btn-orgn > span").text('商品缺货中');
              $(".btn-cart").data('nostore', 1);
              $(".btn-cart").text('商品缺货中');
            }

            chang_spec();
          }
        });
      });

      // 购物车商品数量增加
      $(".cosi01").on('click', '.btn-add', function() {
        var num = $(this).prev().val();
        // num = (num > 0)?parseInt(num):1;
        num++;
        $(this).prev().val(num);
      });
      // 购物车商品数量减少
      $(".cosi01").on('click', '.btn-del', function() {
        var num = $(this).next().val();
        // num = (num > 1)?parseInt(num):2;
        num--;
        $(this).next().val(num);
      });
      // 收藏
      $('.sc').click(function() {
        var login = "nologin";
        // if(login === 'nologin') {
        //     // window.location.href = "/wap/passport-login.html";
        //     // window.location.href = "http://www.baidu.com";
        //     // alert('您还没有登录呦！');
        //     return false;
        // }
        alert($(this).data('isfav'));
        if ($(this).data('isfav') == '1') {
          tools.error.show('您已经收藏该商品!', 2000);
          return false;
        }
        var gid = $(this).data('goods_id');
        if (gid == '') {
          tools.error.show('商品错误，请重新选择！', 2000);
        }
        $.ajax({
          // url: "/wap/member-ajax_fav.html",
          url: "http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.member.add_fav",
          beforeSend: function() {
            tools.loading.show();
          },
          complete: function() {
            tools.loading.hide();
          },
          dataType: 'json',
          type: 'POST',
          data: {
            gid: gid,
            type: 'goods'
          },
          error: function() {
            tools.error.show('网络错误，请重试！', 2000);
          },
          success: function(d) {
            if ((typeof d.success) !== 'undefined') {
              // $('.sc > span').text( parseInt($('.sc > span').text()) + 1);
              tools.success.show(d.success, 2000);
            } else {
              tools.error.show(d.error, 2000);
            }
          }
        });
      });


      /****       未实现具体       ****/

      // 加入购物车
      $('.c-btn-orgn').click(function() {
        if ($(this).data('nostore') == '1') {
          return false;
        }
        //    console.log();
        var max = $(this).data('cart_max');
        var goods_id = $(this).data('cart_goodsid');
        var product_id = $(this).data('cart_productid');
        var num = $("input[name='cart_goodsnum']").val();
        //        console.log(num+'----'+max)
        if (num > max) {
          tools.error.show('库存不足，最多可购买' + max + '件', 2000);
          return false;
        }
        $.ajax({
          url: "/wap/cart-add-goods.html",
          dataType: 'json',
          type: 'POST',
          data: {
            goods: {
              goods_id: goods_id,
              product_id: product_id,
              num: num
            },
            min: 1,
            max: max,
            mini_cart: true
          },
          beforeSend: function() {
            tools.loading.show();
          },
          complete: function() {
            tools.loading.hide();
          },
          error: function() {
            tools.error.show('网络错误，请重试！', 2000);
          },
          success: function(d) {
            if (d.success) {
              tools.success.show(d.success, 2000);
            } else {
              tools.error.show(d.error, 2000);
            }
          }
        });
      });
      //tools.success.show('aa');
      $(function($) {
        chang_spec();
      })

      var chang_spec = function() {
        // 找到已经选择的规格
        var spec = [];
        $('.dgsc-pr').find('i').each(function() {
          if ($(this).hasClass('sel')) {
            spec.push($(this).data('spec') + '：' + $(this).text());
          }
        });

        //console.log();

        $('.list-entry > .wenz').text(spec.join());
      }


    });



  },
  ready: function() {
    console.log('ready' + this.base_information_txt);
    this.initData();
    detail();
  },
  watch: {
    'tab_slide': {
      handler: function(val, oldVal) {
        console.log(val)
      },
      deep: true
    }
  }
});
var myComponent = Vue.component('details-page', Index);
export default myComponent