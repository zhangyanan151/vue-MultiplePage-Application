import $ from 'jquery'
import './jquery.lazyload.js'

$(function() {
    $('img.lazy').lazyload({
    	container: window,
        effect: 'fadeIn',
        threshold: 100,
        failure_limit: 5,
        skip_invisible: false
    });
});
