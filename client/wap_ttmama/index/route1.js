import Vue from 'vue'
import Tpl from './index.html'
import './style.css'
import productClassify from '../Common_components/product_classify/route'
import indexService from '../service/indexService.js'
import index_small_adv from '../Common_components/single_image/route'
import recommend from '../Common_components/multiple_image/route'
import hotSalerank from '../Common_components/index_hot_salerank/route'
import brandDiscount from '../Common_components/brand_discount/route'
import tabSlide from '../Common_components/tab_slide/route'
import footIndex from '../Common_components/foot_index/route'
import searchBar from '../Common_components/search_bar/route'
import dailyTasting from '../Common_components/index_daily_tasting/route'

import wapapp2picCol from '../Common_components/wapapp_2pic_col/route'
import wapapp3pic12 from '../Common_components/wapapp_3pic1_2/route'
import wapapp3pic21 from '../Common_components/wapapp_3pic2_1/route'
import wapapp3picCol from '../Common_components/wapapp_3pic_col/route'
import wapappGoods2col from '../Common_components/wapapp_goods2col/route'
import wapappGoods3col from '../Common_components/wapapp_goods3col/route'
import wapappOnepic from '../Common_components/wapapp_onepic/route'
import wapappPiclist from '../Common_components/wapapp_piclist/route'

let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			allData: {},
			wapapp2picCol: {
				pdata: {}         
			},
			wapapp3pic12: {
				pdata: {}
			},
			wapapp3pic21: {
				pdata: {}
			},
			wapapp3picCol: {
				pdata: {
					slide_pic: []
				}
			},
			wapappGoods2col: {
				pdata: []
			},
			wapappGoods3col: {
				pdata: []
			},
			wapappOnepic: {
				pdata: {}
			},
			wapappPiclist: {
				pdata: []
			}
		}
	},
	computed: {
	},
	methods: {
		initData: function() {
			indexService.indexData().then((data)=>{
				this.allData = data;
				this.wapapp2picCol = data[1];
				this.wapapp3pic12 = data[2];
				this.wapapp3pic21 = data[5];
				this.wapapp3picCol = data[6];
				this.wapappGoods2col = data[7];
				this.wapappGoods3col = data[9];
				this.wapappOnepic = data[8];
				this.wapappPiclist = data[10];
			});
			// if(window.cm_indexdata && window.cm_indexdata.allData) {
			// 	this.allData = window.cm_indexdata.allData;
			// 	localStorage.setItem('index_data', JSON.stringify({
			// 		allData: window.cm_indexdata.allData
			// 	}));
			// 	delete window.cm_indexdata;
			// }else if(localStorage.getItem('index_data')) {
			// 	this.allData = JSON.parse(localStorage.getItem('index_data')).allData;
			// }else {
			// 	indexService.indexData().then((data)=>{
			// 		this.allData = data;
			// 	});
			// }
		}

	},
	created: function() {
		this.initData();
	},
	ready: function(){

	},
	components: {

	},
	watch: {
		'allData': function(val, oldVal) {
			require('../assets/js/lazyload.js');
		}
	}
});
export default Index
