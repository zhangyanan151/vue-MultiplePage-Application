<template>
<div class="bd buy-area">
	<div class="buy-tab">
		<div class="tab-area">
			<div class="tab-item {{ activity.alive ? 'tab-active' : '' }}" @click="changeTab('alive')">限时特卖</div>
			<div class="tab-item {{ activity.next ? 'tab-active' : '' }}" @click="changeTab('next')">下期预告<span class="next-num">{{underline_goodsObj.total}}</span></div>
		</div>
	</div>
	<div class="list-area" v-show="activity.alive">
		<ul>
			<li class="buy-item" v-for="goods in flash_sale_goodsObj.items">
				<a v-link="'/'">
					<div class="{{ goods.deliveryloc.is_bonded ? 'warehouse-bs' : '' }}"></div>
					<div class="item-pic"><img src="{{ goods.image_url }}"></div>
					<div class="item-text">
						<h2>{{ goods.name }}</h2>
						<p class="price-p"><span class="price">￥{{ goods.products.price }}</span><span class="price-old">￥{{ goods.products.mktprice }}</span></p>
						<p class="buy-num"><span class="num-l"><em>{{ goods.products.initial_num }}</em>人已购买</span><span class="num-r">剩余<em>{{ goods.products.store }}</em>件</span></p>
					</div>
				</a>
			</li>
		</ul>
		<div class="more">
			<p v-show="nextPage.alive" v-on:click="addMore">加载更多</p>
			<p v-show="!nextPage.alive">没有更多了</p>
		</div>
	</div>
	<div class="list-area" v-show="activity.next">
		<ul>
			<li class="buy-item" v-for="goods in underline_goodsObj.items">
				<a v-link="'/'">
					<div class="{{ goods.deliveryloc.is_bonded ? 'warehouse-bs' : '' }}"></div>
					<div class="item-pic"><img src="{{ goods.image_url }}"></div>
					<div class="item-text">
						<h2>{{ goods.name }}</h2>
						<p class="price-p"><span class="price">￥{{ goods.products.price }}</span><span class="price-old">￥{{ goods.products.mktprice }}</span></p>
						<p class="buy-num"><span class="num-l"><em>{{ goods.products.initial_num }}</em>人已购买</span><span class="num-r">剩余<em>{{ goods.products.store }}</em>件</span></p>
					</div>
				</a>
			</li>
		</ul>
		<div class="more">
			<p v-show="nextPage.next" v-on:click="addMore">加载更多</p>
			<p v-show="!nextPage.next">没有更多了</p>
		</div>
	</div>
</div>
</template>
<script>
import { showData2 } from '../services/moduletest'
// var MyModule = require('../services/moduletest');
// var showModule = new MyModule();
export default {
	data () {
		return {
			activity: {
				alive: true,
				next: false
			},
			page: {
				alive: 1,
				next: 1
			},
			flash_sale_goodsObj: showData2('http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list', 'promit', 1),
			underline_goodsObj: showData2('http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list', 'trailer', 1)
		}
	},
	computed: {
		listTotal: function() {
			if(this.activity.alive) {
				return this.flash_sale_goodsObj.items.length;
			}else {
				return this.underline_goodsObj.items.length;
			}
		},
		nextPage: function() {
			return {
				alive: this.flash_sale_goodsObj.has_next,
				next: this.underline_goodsObj.has_next
			}
		}
	},
	methods: {
		changeTab (type) {
			if(type === 'alive') {
				this.activity = {
					alive: true,
					next: false
				}
			}else if(type === 'next') {
				this.activity = {
					alive: false,
					next: true
				}
			}
		},
		addMore () {
			var newData;
			if(this.activity.alive) {
				newData = showData2('http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list', 'promit', ++this.page.alive);
				this.flash_sale_goodsObj.has_next = newData.has_next;
				// this.nextPage.alive = newData.has_next;
				this.flash_sale_goodsObj.items = this.flash_sale_goodsObj.items.concat(newData.items);
			}else if(this.activity.next) {
				newData = showData2('http://nb.ittmom.com/ttmamaapp2/index.php/appapi?method=mobileapi2.goods.starbuy_list', 'trailer', ++this.page.next);
				this.underline_goodsObj.has_next = newData.has_next;
				// this.nextPage.next = newData.has_next;
				this.underline_goodsObj.items = this.underline_goodsObj.items.concat(newData.items);
			}
		}
	},
	ready() {
	},
	created () {
		
	}
}
</script>
<style>
*{ margin:0; padding:0;outline: 0;}
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,blockquote,p{padding:0; margin:0; background:transparent; outline:0; border:0; font: normal 14px/1.5 "Microsoft Yahei",STXihei,hei,Lucida,Arial,Helvetica,"宋体",sans-serif;}
html{ font-size:100px;}
body{background:#eee; font-size: 100%; font: inherit; outline: 0;-webkit-text-size-adjust: none;-webkit-tap-highlight-color: rgba(0,0,0,0); zoom:1;overflow-x:hidden;}
li{list-style-type:none;}
ol,ul {list-style:none;}  
img{vertical-align:top;border:0; margin:0; overflow:hidden;display:block;}

.clear:after{content: ""; display: block; width:0; height:0; clear: both;}
.fl{float:left!important;}
.fr{float:right!important;}

.bd{
	min-width: 300px;
	max-width: 640px;
	position: relative;
	margin: 0 auto !important;
	height: auto;
	padding-bottom: 15px;
}
.buy-area{
	background-color: #fff;
}
.buy-tab{
	width: 5.16rem;
	height: 0.49rem;
	margin: 0.28rem auto;
	padding: 0.06rem;
	border: 1px solid #CCCCCC;
	border-radius: 0.3rem;
}
.tab-area .tab-item{
	width: 2.53rem;
	height: 0.47rem;
	text-align: center;
	line-height: 0.47rem;
	display: inline-block;
	border-radius: 0.47rem;
	font-size: 0.3rem;
	position: relative;
}
.tab-active{
	background-color: #76C1BC;
	color: #fff;
}
.next-num{
	position: absolute;
	display: block;
	width: 0.3rem;
	height: 0.3rem;
	border-radius: 100%;
	top:0px;
	right: 0.42rem;
	background-color: #FABE01;
	color: #fff;
	font-size: 12px;
	text-align: center;
	line-height: 0.3rem;
}
.list-area{
	width: 7.2rem;
	margin: 0 auto;
}
.buy-item{
	width: 7.18rem;
	height: 2.39rem;
	border: 1px solid #CCCCCC;
	border-radius: 6px;
	margin-bottom: 0.3rem;
	position: relative;
}
.buy-item a{
	color: #000;
}
.buy-item .warehouse-bs{
	position: absolute;
	width: 0.9rem;
	height: 0.9rem;
	left: -0.06rem;
	top: -0.06rem;
	background: url(../assets/bsc_wap.png) center center no-repeat;
	background-size: 100%;
	z-index: 1;
}
.buy-item .item-pic{
	width: 3.6rem;
	height: 2.39rem;
	float: left;
	margin-right: 0;
	border-radius: 6px 0 0 6px;
	overflow: hidden;
}
.buy-item .item-pic img{
	width: 3.6rem;
	height: 2.39rem;
}
.buy-item .item-text{
	float: left;
	width: 3.26rem;
	height: 1.39rem;
	padding: 0.16rem;
}
.buy-item .item-text h2{
	font-size: 0.28rem;
	line-height: 0.36rem;
	height: 0.72rem;
	overflow: hidden;
}
.price-p{
	margin-top: 0.16rem;
}
.price-p .price{
	font-size: 0.34rem;
	color: #77C2BD;
	font-weight: 600;
}
.price-p .price-old{
	font-size: 0.2rem;
	color: #959595;
	margin-left: 0.13rem;
}
.buy-num{
	margin-top: 0.3rem;
	font-size: 0.22rem;
}
.buy-num .num-l{
	display: inline-block;
	float: left;
}
.buy-num .num-r{
	display: inline-block;
	float: right;
}
.buy-num em{
	font-style: normal;
	color: #77C2BD;
	margin: 0 3px;
}
.more{
	text-align: center;
}
</style>