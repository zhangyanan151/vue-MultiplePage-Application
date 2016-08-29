var Base=function(){
// check box
var $=require("jquery");
$(document).ready(function () { 
    $('.bf1').find('em').click(function () {

        $(this).siblings().removeClass('del');
        $(this).addClass('del');

    })

    $('.fenl').find('ul li').click(function () {

        $(this).addClass('popup');
        $(this).find('div').addClass('shadow');
        $(this).siblings().removeClass('popup');
        $(this).siblings().find('div').removeClass('shadow');
        $(this).parent().parent().siblings().css('display', 'block');
        $('.ui-panel-dismiss1').css('z-index', '100000');
    });



// });

// 更换验证码
$(".sxwz").click(function() {
    url = $('.check-code-img').attr('src').split('?')[0];
    var random = +new Date();
    $('.check-code-img').attr('src',url + '?' + random);
});

// 注册方式切换
$('.toggle').find('span').click(function(){

    $(this).siblings().removeClass('toggle-password');
    $(this).addClass('toggle-password');

    if($(this).hasClass('toggle-lef')){
        $('#phone').css({'display':'block'}); $('#email').css('display','none');
        $('.line-f').css({'background':'#ffffff','left':'1px','border-right':'1px #ffffff solid'});$('.line-dc').css({'background':'#dcdcdc','right':'1px','border-left':'#dcdcdc'});
    }else{
        $('#phone').css('display','none'); $('#email').css('display','block');
        $('.line-f').css({'background':'#dcdcdc','left':'3px','border-right':'#dcdcdc'});$('.line-dc').css({'background':'#ffffff','right':'-1px','border-left':'1px #ffffff solid'});
    }

})

// 注册方式切换
$('.tab').find('div').click(function(){

    if($(this).hasClass('tab_phone')){
        $(this).siblings().removeClass('phone_active');
        $('.email_active').removeClass('email_active');
        $(this).addClass('phone_active');
    }else{
        $(this).siblings().removeClass('email_active');
        $('.phone_active').removeClass('phone_active');
        $(this).addClass('email_active');
    }
    if($(this).hasClass('tab_phone')){
        $('#phone').css({'display':'block'}); 
        $('#email').css('display','none');
    }else {
        $('#phone').css('display','none'); 
        $('#email').css('display','block');
    }

})

/*商品分类页 */

$('.catagary').click(function () {

    $('.fenl').find('ul li').removeClass('popup');
    $('.fenl').animate({left: '0'}, 300);
    $('.new-fenl').css('display', 'none');
})


$('.ui-panel-dismiss1').click(function () {
    alert(1);
})


$('.list-switch').click(
    function () {
        if ($(this).hasClass('list-switch2')) {
            $(this).removeClass('list-switch2')
        } else {
            $(this).addClass('list-switch2')
        }
        var i = $('.new-list2').css('display');

        if (i == 'none') {
            $('.new-list11').css('display', 'none');
            $('.new-list2').css('display', 'block');
        } else {
            $('.new-list11').css('display', 'block');
            $('.new-list2').css('display', 'none');
        }
    });

$('.new-p2').click(
    function () {
        $('.new-p3').find('span span').removeClass('new-icon-down2');
        $('.droplist-re').css('display', 'none');
        var i = $('.droplist').css('display');

        if (i == 'none') {
            $('.new-p2').find('span span').addClass('new-icon-down2');
            $('.droplist').css('display', 'block');
        } else {
            $('.new-p2').find('span span').removeClass('new-icon-down2');
            $('.droplist').css('display', 'none');
        }
    });

$('.new-p3').click(
    function () {
        $('.new-p2').find('span span').removeClass('new-icon-down2');
        $('.droplist').css('display', 'none');
        var i = $('.droplist-re').css('display');

        if (i == 'none') {
            $('.new-p3').find('span span').addClass('new-icon-down2');
            $('.droplist-re').css('display', 'block');
        } else {
            $('.new-p3').find('span span').removeClass('new-icon-down2');
            $('.droplist-re').css('display', 'none');
        }
    });


$('.droplist').find('ul li').click(function () {
    $(this).addClass('selected');
    $(this).siblings().removeClass('selected');
})
$('.li-ul').find('li').click(function () {
    $(this).addClass('selected');
    $(this).siblings().removeClass('selected');
    $('.re-sift').addClass('re-sift2')
})
$('.li-ul-row1').find('li').click(function () {
    $(this).addClass('selected');
    $(this).siblings().removeClass('selected');
    $('.re-sift').addClass('re-sift2')
})
$('.li-ul-row2').find('li').click(function () {
    $(this).addClass('selected');
    $(this).siblings().removeClass('selected');
    $('.re-sift').addClass('re-sift2')
})


/* 购物车页面 */
//购物车
$('.cart_list .new-mi-list').click(
    function () {
        $(this).find('em[class="jzpas"]').addClass('del');
        $(this).siblings().find('em[class="jzpas del"]').removeClass('del');
    }
)
//礼品
$('.gift_list .new-mi-list').click(
    function () {
        $(this).find('em[class="jzpas"]').addClass('del');
        $(this).siblings().find('em[class="jzpas del"]').removeClass('del');
    }
)
//minato
$('.minato_list .new-mi-list').click(
    function () {
        $(this).find('em[class="jzpas"]').addClass('del');
        $(this).siblings().find('em[class="jzpas del"]').removeClass('del');
    }
)
//装货
$('.shipment_list .bf1').click(
    function () {
        $(this).find('img').addClass('kdimg2');
        $(this).siblings().find('img[class="kdimg kdimg2"]').removeClass('kdimg2');
    }
)
//支付
$('.pay .bf1').click(
    function () {
        $(this).find('em[class="jzpas"]').addClass('del');
        $(this).siblings().find('em[class="jzpas del"]').removeClass('del');
    }
)
//发票
$('.invoice .bf1').click(
    function () {
        $(this).find('em[class="jzpas"]').addClass('del');
        $(this).siblings().find('em[class="jzpas del"]').removeClass('del');
    }
)
//发表详情
$('.invoice_list .bf1').click(
    function () {
        $(this).find('em[class="jzpas"]').addClass('del');
        $(this).siblings().find('em[class="jzpas del"]').removeClass('del');
    }
)


/*手机详情页触发事件*/
function func() {
    $(".bgg").css('display', 'none');
    $(".tr-wz").css('display', 'none');
    $(".tr-wz-sc").css('display', 'none');
}
var detail_bd = $(".detail-bd").height();
//  $('.btn-cart').click(function(){
////消除radio按钮上的checked
//   $('#btnGroups').find('input[type=radio]').each(function(){
//    $(this).removeProp("checked").checkboxradio("refresh");
//   })
//
//  $(".bgg").css('display','inline');
//$(".list-cosi").css('display','inline');
//$(".list-cosi").animate({top:$(window).height()-$(".list-cosi")[0].offsetHeight+'px'},500);
//
// $(".detail-bd").height(500);
//
//
//
//
//})
function preventScroll(id) {

    var _this = $('.list-cosi')[0];
    if (navigator.userAgent.indexOf("Firefox") > 0) {
        _this.addEventListener('DOMMouseScroll', function (e) {
            _this.scrollTop += e.detail > 0 ? 60 : -60;
            e.preventDefault();
        }, false);
    } else {
        _this.onmousewheel = function (e) {
            e = e || window.event;
            _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;
            return false;
        };
    }
    return this;
}


$('.c-btn-orgn').click(
    function () {

        $(".detail-bd").height(detail_bd);
        $(".list-cosi").css('display', 'none');
        $('.tr-wz').css('display', 'block');
        var a = setTimeout(func, '2000');
        // $(".bgg").click(
        //     function () {
        //         clearTimeout(a);
        //         func();
        //     })

    });

$('.c-btn-blue').click(
    function () {
        $(".detail-bd").height(detail_bd);
        $(".list-cosi").animate({top: '100%'}, 300);
        $(".bgg").css('display', 'none');
        setTimeout(function () {
            $(".list-cosi").css('display', 'none');
        }, '300');
        window.location.reload();

    });

$('.list-entry').click(
    function () {
        $(".bgg").css('display', 'block');
        $(".list-cosi").css('display', 'block');
        $(".list-cosi").animate({top: $(window).height() - $(".list-cosi")[0].offsetHeight + 'px'}, 500);
        $(".detail-bd").height(500);


    });

// $('.fx').click(
//     function () {
//         $(".bgg").css('display', 'inline');
//         $(".fenx-row").css('display', 'inline');
//         $(".fenx-row").animate({top: $(window).height() - $(".fenx-fxd")[0].offsetHeight - 15 + 'px'}, 500);

//     });

// 团妈键
$('.new-a-tm').click(
    function () {
        console.log($(".new-tm-tab").css('display'));
        if ($(".new-tm-tab").css('right') == '-58px') {
            $(".new-tm-tab").css('display', 'block');
            $(".new-tm-tab").animate({right: '0px'});
            // $(".new-tm-tab").animate({right: '0px'}, 'slow', 'ease');
        } else {
            // $(".new-tm-tab").animate({right: '-58px'}, 200);
            $(".new-tm-tab").animate({right: '-58px'});
            setTimeout(function () {
                $(".new-tm-tab").css('display', 'none');
            }, '200');
        }
    });
// $(".bgg").click(
//     function () {
//         $('.cancel').click();
//         $('.c-btn-blue').click();

//     })


// $('.cancel').click(
//     function () {
//         $(".bgg").css('display', 'none');

//         $(".fenx-row").animate({top: '100%'}, 300);

//     });


// $('.sc').click(
//     function () {
//         $(".bgg").css('display', 'inline');
//         $(".tr-wz-sc").css('display', 'inline');
//         var a = setTimeout(func, '2000');
//         // $(".bgg").click(
//         //     function () {
//         //         clearTimeout(a);
//         //         func();
//         //         $('.cancel').click();
//         //         $('.c-btn-blue').click();
//         //     })

//     });



function pageBack() {
    var a = window.location.href;
    if (/#/.test(a)) {
        window.history.go(-2);
        window.location.load(window.location.href)
    } else {
        window.history.back();
        window.location.load(window.location.href)
    }
}

});
};
export default Base;