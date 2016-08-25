<template>
<gzc-img></gzc-img>
<tab-slider :goodslist_total_number='goodslist_total_number' :which_is_showing.sync='which_is_showing' ></tab-slider>
<!-- <div class="area"> -->
  <div class="tab-content-container">
    <div class="xs-area flash-sale show">
      <ul>
        <li class="xs-item" v-for="goods in flash_sale_goodslist">
          <div class="item-pic">
            <div class="item-pic-tag" v-bind:class="goods.deliveryloc.is_bonded | isBaoshui"></div>
            <a href="{{ goods.url | addUrl }}">
              <img :src="goods.image_url">
            </a>
          </div>
          <div class="item-cont">
            <h2>{{ goods.name }}</h2>
            <ul class="item-cont-ul">
              <li>{{ goods.brief }}</li>
            </ul>
            <p class="item-price"><span class="price-now"><em>￥</em>{{ goods.products.price | checkPrice }}<em>{{ goods.products.price | checkPriceChange }}</em></span><span class="price-old">￥{{ goods.products.mktprice }}</span><span class="item-by" v-show="goods.promotion_tags | isFreeShipping"></span></p>
            <p class="item-buy"><a href="{{ goods.url | addUrl }}" class="buy">立即购买</a><span class="num"><em>{{ goods.products.initial_num }}</em>人已购买&nbsp;剩余<em>{{ goods.products.store }}</em>件</span></p>
            <p class="item-time">距特卖结束：<span>{{ goods.timeStr }}</span></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="xs-area underline">
      <ul>
        <li class="xs-item" v-for="goods in underline_goodslist">
          <div class="item-pic">
            <div class="item-pic-tag" v-bind:class="goods.deliveryloc.is_bonded | isBaoshui"></div>
            <a href="{{ goods.url | addUrl }}">
              <img :src="goods.image_url">
            </a>
          </div>
          <div class="item-cont">
            <h2>{{ goods.name }}</h2>
            <ul class="item-cont-ul">
              <li>{{ goods.brief }}</li>
            </ul>
            <p class="item-price"><span class="price-now"><em>￥</em>{{ goods.products.price | checkPrice }}<em>{{ goods.products.price | checkPriceChange }}</em></span><span class="price-old">￥{{ goods.products.mktprice }}</span><span class="item-by" v-show="goods.promotion_tags | isFreeShipping"></span></p>
            <p class="item-buy"><a href="{{ goods.url | addUrl }}" class="buy">立即购买</a><span class="num"><em>{{ goods.products.initial_num }}</em>人已购买&nbsp;剩余<em>{{ goods.products.store }}</em>件</span></p>
            <p class="item-time">距特卖结束：<span>{{ goods.timeStr }}</span></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
<!-- </div> -->
  

</template>
<script>
var jq = require('jquery');
// import Vue from 'vue'
import tabSlider from './tab-slideer-box.vue'
import gzcImg from './gzc-img.vue'
import { showData } from '../services/showData'
require('../services/filters')
export default {
  // props: [ 'whichIsShowing'],
  data () {
    return {
      flash_sale_goodslist: showData('http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list', 'promit', 1),
      underline_goodslist: showData('http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list', 'trailer', 1),
      flash_sale_page: 1,
      underline_page: 1,
      which_is_showing: 'left'
     
    }
  },
  computed: {
    goodslist_total_number: function(){
      return this.underline_goodslist.total;
    }
  },
  methods: {
    checkTime (goodslist) {
      for (var i=0; i<goodslist.length; i++) {
        var goods = goodslist[i]
        if (!goods.products.end_time) return
        var now = new Date().getTime();
        now = now/1000;
        var end = goods.products.end_time;
        var deltaTime = end - now;
        var day = parseInt(deltaTime / 3600 /24, 10);
        var hour = parseInt(deltaTime / 3600 % 24, 10);
        var minutes = parseInt(deltaTime / 60 % 60, 10);
        var seconds = parseInt(deltaTime % 60, 10);
        day = day < 0 ? 0 : day;
        hour = hour < 0 ? 0 : hour;
        minutes = minutes < 0 ? 0 : minutes;
        seconds = seconds < 0 ? 0 : seconds;
        goods.timeStr = day+'天'+hour+'小时'+minutes+'分'+seconds+'秒';
      }  
    },
    invoke () {
      this.checkTime(this.flash_sale_goodslist);
      this.checkTime(this.underline_goodslist);
    },
    /*合并已有数据和 通过滚动请求过来的数据*/
    addRetrunedData (left_or_right, addData) {
      if(left_or_right==='left'){
        this.flash_sale_goodslist=this.flash_sale_goodslist.concat(addData);
      }else if(left_or_right==='right'){
        var total = this.underline_goodslist.total;/*1*/
        this.underline_goodslist=this.underline_goodslist.concat(addData);
        this.underline_goodslist.total=total;/*2*/
        /*1和2 这两行代码 还真是蛋疼啊，不这样写还不行 ，因为 对数组进行concat 运算返回的新数组 中会丢失原来数组的私有属性*/
      }
      // console.log(1);
    } 
  },
  watch: {
    
  },
  ready () {
    setInterval(this.invoke, 1000);
  },
  created () {
    /*添加 滚动加载事件*/
    var self=this;

    jq(document).ready(function (){
      jq(window).scroll(function() {

        if (jq(document).scrollTop() >= jq(document).height() - jq(window).height()-300) {
          if(self.which_is_showing === 'left'){

            var flash_sale_nowPage = ++self.flash_sale_page;
            var flash_sale_newData = showData('http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list', 'promit', flash_sale_nowPage);
            self.addRetrunedData('left', flash_sale_newData);
            // console.log(JSON.stringify(self.flash_sale_goodslist));

          }else if(self.which_is_showing === 'right'){
            var nowPage = ++self.underline_page;
            var newData = showData('http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list', 'trailer', nowPage);
            self.addRetrunedData('right', newData);

            // console.log(self.underline_goodslist);
            // console.log(JSON.stringify(self.underline_goodslist));
          }
          // console.log(self.goodslist_total_number);

        }
     
      });
    });
  },
  components: {
    tabSlider,
    gzcImg
  }
}
</script>

<style>
*{padding: 0;margin: 0;}
ul,li{list-style: none;}
.tab-content-container{width:1000px; margin:0 auto; position:relative; /*overflow: hidden;*/}
.xs-area{display: none; position:absolute; left:0; top:0; width: 1000px; height: auto; margin: 0 auto;}
.xs-area.show{display: block;}
.xs-item{width: 968px;  overflow: hidden; height: 296px; padding: 17px 16px 20px 16px; margin: 0 auto 20px auto; background-color: #fff; box-shadow: 0px 2px 2px #ccc,0px 0px 1px #ccc;}
.item-pic{display: inline-block;float:left;width: 445px; height: 296px;margin-right: 25px; position: relative;}
.item-pic img{width: 445px;height: 296px;}
.item-pic-tag{position: absolute; left: -5px; top: -5px; width: 77px;height: 77px;}
.item-pic .bsc{background: url(../assets/bsc.png) center center no-repeat;}
.item-pic .xhc{background: url(../assets/xhc.png) center center no-repeat;}
.item-cont{display: inline-block; float: left;width: 498px;}
.item-cont h2{font-size: 18px;font-family: "宋体";font-weight: 600;line-height: 30px; height: 30px; overflow: hidden;margin-top: 18px;}
.item-cont-ul{margin-top: 10px; padding-left: 16px;}
.item-cont-ul li{list-style: disc url(../assets/point.png);font-size: 14px;line-height: 20px;color: #707070;}
.item-price{margin-top: 22px;}
.price-now{color: #76c1bc;font-size: 48px;font-weight: 600;}
.price-now em{font-style: normal;font-size: 30px;vertical-align: text-top;line-height: 40px;}
.price-old{margin-left: 20px;font-size: 18px;color: #959595;text-decoration: line-through;}
.item-by{display: inline-block;width: 37px;height: 31px;margin-left: 12px;vertical-align: top;background: url(../assets/baoyou.png) top center no-repeat;}
.item-buy{margin-top: 38px;}
.item-buy .buy{display: inline-block;width: 110px;height: 35px;background-color: #FABE00;color: #fff;text-align: center;line-height: 35px;font-size: 18px;text-decoration: none;margin-right: 15px; transition: background 0.1s ease;}
.item-buy .buy:hover{background: #ffcb25;}
.item-buy .num{font-size: 14px; color: #313131;}
.item-buy .num em{font-style: normal;color: #76c1bc;margin: 0 3px;}
.item-time{margin-top: 24px;background: url(../assets/time.png) left center no-repeat;text-indent: 24px;font-size: 16px;line-height: 30px;color: #1b1b1b;}
</style>