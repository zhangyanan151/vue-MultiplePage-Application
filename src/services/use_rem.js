
(function (doc, win) {
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth<640){
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            console.log(100 * (clientWidth / 750) + 'px');
            }else{
                //docEl.style.fontSize = "100px";
              docEl.style.fontSize = 100 * ( 640 / 750) + 'px';
            }
    };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
