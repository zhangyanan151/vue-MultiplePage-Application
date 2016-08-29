import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import indexService from '../service/indexService.js';
import $ from 'jquery';
import Search from '../Common_components/search/route.js';
import Scroller from 'vux-components/scroller';
import FootIndex from '../Common_components/foot_index/route.js';

let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			menuData: [],
			showIndex: 0,
			menuHeight: ''
		}
	},
	created: function() {
		indexService.getClassify().then((data)=>{
			if(data.rsp === "succ") {
				this.menuData = data.data;
			}
		})
		window.onblur = function(e) {
	        e.preventDefault()&&e.stopPropagation();
	    }
		
	},
	ready: function() {

	},
	computed: {
		curMenuData: function() {
			return this.menuData[this.showIndex];
		}
	},
	methods: {
		showItem: function(index) {
			this.showIndex = index;
		}
	},
	components: {
		Search,
		Scroller
	}
});

export default Index