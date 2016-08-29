import Vue from 'vue'
import Tpl from './index.html'
import './style.css'
import productClassify from '../Common_components/product_classify/route'
import productIndexService from '../service/productIndexService.js'
import index_small_adv from '../Common_components/single_image/route'
import recommend from '../Common_components/multiple_image/route'
import hotSalerank from '../Common_components/index_hot_salerank/route'
import brandDiscount from '../Common_components/brand_discount/route'
import tabSlide from '../Common_components/tab_slide/route'
import footIndex from '../Common_components/foot_index/route'
import searchBar from '../Common_components/search_bar/route'
import dailyTasting from '../Common_components/index_daily_tasting/route'

let Index = Vue.extend({
	template: Tpl,
	data: ()=>{

		return {
			allData: [],
			index_small_adv: [],
			recommend: [],
			productClassify: [],
			tab_slide_data_1: [],
			tab_slide_data_2: [],
			tab_slide_data_3: [],
			tab_slide_data_all: [],
			brand_discount_data: [],
			hot_salerank_data: [],
			dailyTasting: []
		}

	},
	computed: {
		index_small_adv: function() {
			var list = [];
			for(let i=0; i<this.allData.length; i++) {
				var item = this.allData[i];
				if(item.type === 'index_small_adv') {
					list.push(item);
				}
			}
			return list;
		},
		recommend: function() {
			var list = [];
			for(let i=0; i<this.allData.length; i++) {
				var item = this.allData[i];
				if(item.type === 'recommend') {
					list.push(item);
				}
			}
			return list;
		},
		productClassify: function() {
			var list = [];
			for(let i=0; i<this.allData.length; i++) {
				var item = this.allData[i];
				if(item.type === 'index_category_ranking') {
					list.push(item);
				}
			}
			return list;
		},
		tab_slide_data_all: function() {
			var list = [];
			for(let i=0; i<this.allData.length; i++) {
				var item = this.allData[i];
				if(item.type === 'index_tab_slide') {
					list.push(item);
				}
			}
			this.tab_slide_data_1 = list[0];
			this.tab_slide_data_2 = list[1];
			this.tab_slide_data_3 = list[2];

			this.tab_slide_data_1.box_id = 'id_0';
			this.tab_slide_data_2.box_id = 'id_1';
			this.tab_slide_data_3.box_id = 'id_2';
			return list;
		},
		brand_discount_data: function() {
			var list = [];
			for(let i=0; i<this.allData.length; i++) {
				var item = this.allData[i];
				if(item.type === 'index_wbd') {
					list.push(item);
				}
			}
			return list;
		},
		hot_salerank_data: function() {
			var list = [];
			for(let i=0; i<this.allData.length; i++) {
				var item = this.allData[i];
				if(item.type === 'index_hot_salerank') {
					list.push(item);
				}
			}
			return list;
		},
		dailyTasting: function() {
			var list = [];
			for(let i=0; i<this.allData.length; i++) {
				var item = this.allData[i];
				if(item.type === 'index_daily_tasting') {
					list.push(item);
				}
			}
			return list;
		}
	},
	methods: {
		initData: function() {
			if(window.cm_indexdata && window.cm_indexdata.allData) {
				this.allData = window.cm_indexdata.allData;
				localStorage.setItem('index_data', JSON.stringify({
					allData: window.cm_indexdata.allData
				}));
				delete window.cm_indexdata;
			}else if(localStorage.getItem('index_data')) {
				this.allData = JSON.parse(localStorage.getItem('index_data')).allData;
			}else {
				productIndexService.indexData().then((data)=>{
					this.allData = data;
				});
			}
		}

	},
	created: function() {
		this.initData();
	},
	ready: function(){
		/*因为 计算属性只有当调用它时，他才去计算，而 this.tab_slide_data_all 自始至终没有调用到（只是在内部调用它了），所以需要手动调用一下*/
		this.tab_slide_data_all;
	},
	components: {
		index_small_adv,
		recommend,
		productClassify,
		hotSalerank,
		brandDiscount,
		tabSlide,
		searchBar
	},
	watch: {
		'allData': function(val, oldVal) {
			require('../assets/js/lazyload.js');
		}
	}
});
export default Index
