/* eslint-disable */
var detail=function(){
var $=require("jquery");
/*手机详情页触发事件*/
function func() {
    $(".bgg").css('display', 'none');
    $(".tr-wz").css('display', 'none');
    $(".tr-wz-sc").css('display', 'none');
}
var detail_bd = '';

// window.onload = function(){
//     alert('detail onload');
// }

$(document).ready(function(){
    $('.btn-cart').click(function () {
        
        if($(this).data('nostore') == '1') {
            return false;
        }
        
        //消除radio按钮上的checked
        // $('#btnGroups').find('input[type=radio]').each(function () {
        //     $(this).removeProp("checked").checkboxradio("refresh");
        // })

        $(".bgg").css('display', 'inline');
        $(".list-cosi").css('display', 'inline');
        $(".list-cosi").animate({top: $(window).height() - $(".list-cosi")[0].offsetHeight + 'px'}, 500);

        $(".detail-bd").height(500);

        console.log(255);

    })


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
            $(".bgg").click(
                function () {
                    clearTimeout(a);
                    func();
                })

        });

    $('.c-btn-blue').click(
        function () {
            $(".detail-bd").css('height','auto');
            $(".list-cosi").animate({top: '100%'}, 300);
            $(".bgg").css('display', 'none');
            setTimeout(function () {
                $(".list-cosi").css('display', 'none');
            }, '300');
            //window.location.reload();

        });

    $('.list-entry').click(
        function () {
            detail_bd = $(".detail-bd").height();
            $(".bgg").css('display', 'inline');
            $(".list-cosi").css('display', 'inline');
            $(".list-cosi").animate({top: $(window).height() - $(".list-cosi")[0].offsetHeight + 'px'}, 500);
            $(".detail-bd").height(500);


        });

    $('.fx').click(
        function () {
            $(".bgg").css('display', 'block');
            // $(".fenx-row").css('display', 'block');
            // $(".fenx-row").animate({top: $(window).height() - $(".fenx-fxd")[0].offsetHeight - 15 + 'px'}, 500);

            $(".fenx-row").animate({bottom: 0}, 500);
            $(".fenx-row").css('top', 'auto');
            
        });

    $('.new-a-tm').click(
        function () {
            if ($(".new-tm-tab").css('right') == '-58px') {
                $(".new-tm-tab").show();
                $(".new-tm-tab").animate({right: '0'}, 300);

            } else {
                $(".new-tm-tab").animate({right: '-58px'}, 200);
                setTimeout(function () {
                    $(".new-tm-tab").css('display', 'none');
                }, '200');

            }

        });
        $(".bgg").click(
        function () {
            $('.cancel').click();
            $('.c-btn-blue').click();

        })


    $('.cancel').click(
        function () {
            $(".bgg").css('display', 'none');
            var heightP = -$(".fenx-row").height();
            $(".fenx-row").animate({bottom:heightP},300);

        });





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


        // var e = $.fn.cookie('UNAME')?$.fn.cookie('UNAME'):'',
        //     cartNum = $.fn.cookie('S[CART_NUMBER]')?$.fn.cookie('S[CART_NUMBER]'):'';
        // if(e){
        //     $("#footerloginuname").text(decodeURIComponent(e));
        //     $("#footerlogout").show();
        //     if($("#footerlogin"))
        //     $("#footerlogin").hide();
        // }else{
        //     $("#footerlogin").show();
        //     if($("#footerlogout"))
        //     $("#footerlogout").hide();
        // }
        // if(cartNum)$('.cart-num').html(cartNum).show();
        // else $('.cart-num').hide();
    })();


    
};
export default detail;


