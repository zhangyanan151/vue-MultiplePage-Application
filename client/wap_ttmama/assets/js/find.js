/*发现页头部滑动*/
 $(document).ready(function(){
        var width = $(".boke-tit-tab li").length*$(".boke-tit-tab li").width();
        $(".boke-tit-tab").css({width:width+'px'});
        var tabObj = $(".boke-tit-tab");
        var startX = 0,detalX = 0,totalX = 0;
        tabObj.on("touchstart",onTouchStart);
        tabObj.on("touchmove",onTouchMove);
        tabObj.on("touchend",onTouchEnd);

        function onTouchStart(e) {
            var touch = e.touches[0];
            startX = touch.pageX;
        }
        function onTouchMove(e) {
            var touch = e.touches[0];
            detalX = touch.pageX - startX;
            var x = totalX + detalX;
            $(this).css({'transform':'translateX('+x+'px)','-webkit-transform':'translateX('+x+'px)'});
        }
        function onTouchEnd(e) {
            var touch = e.touches[0];
            totalX += detalX;
            var maxX = $(this).width() - $(window).width();
            if(totalX>=0) {
                $(this).css({'transform':'translateX(0px)','-webkit-transform':'translateX(0px)'});
                totalX = 0;
            }else if(totalX < -maxX) {
                totalX = -maxX;
                $(this).css({'transform':'translateX('+totalX+'px)','-webkit-transform':'translateX('+totalX+'px)'});
            }
        }
    })
    // 团妈键
    $('.new-a-tm').click(function(){
            if($(".new-tm-tab").css('right')=='-58px'){
                $(".new-tm-tab").css('display','block');
                $(".new-tm-tab").animate({right:'0'},300);
            }else {
                $(".new-tm-tab").animate({right:'-58px'},200);
                setTimeout(function(){ $(".new-tm-tab").css('display','none');},'200');
            }
    });