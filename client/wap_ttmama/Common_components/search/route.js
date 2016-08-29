import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import $ from 'jquery'
import indexService from '../../service/indexService.js';

let myVue = Vue.extend({
	template: Tpl,
	props: {
		labelColor: {
			default: '#fff'
		},
		boxWidth: {
			type: String,
			default: '100%'
		},
	    placeholder: {
	      type: String,
	      default: 'Search'
	    },
	    cancelText: {
	      type: String,
	      default: 'cancel'
	    },
	    value: {
	      type: String,
	      // twoWay: true,
	      default: ''
	    },
	    autoFixed: {
	      type: Boolean,
	      default: true
	    },
	    showValue: {
	    	type: String,
	    	default: ''
	    },
	    opacity: {
	    	type: Boolean,
	    	default: false
	    },
	    headColor: {
	    	type: String,
	    	default: '255,255,255'
	    }
	  },
	  computed:{
		  
	  },
	  created: function() {
	  	var storage = window.localStorage;
	  	this.historySearch = JSON.parse(storage.getItem("search"));
	  	indexService.getHotKeywords().then((data)=>{
	  		if(data.rsp === "succ") {
	  			this.hotList = data.data.items;
	  		}
	  	});
	  },
	  ready: function() {
	  	if(this.opacity) {
	  		var self = this;
	  		// self.changeOpacity();
			$(document).on('scroll', self.changeOpacity);
			$('body').on('touchmove', self.changeOpacity);
	  	}
	  },
	  methods: {
	  	changeOpacity() {
   			var scrollTop = $(window).scrollTop();
   			if(!this.isFixed){
				if(scrollTop <= 300) {
					var op = scrollTop/300;
					this.$els.search.style.backgroundColor='rgba('+this.headColor+','+ op +')';
				}else {
					this.$els.search.style.backgroundColor='rgba('+this.headColor+',1)';
				}
			}else {
				this.$els.search.style.backgroundColor='';
			}
   		},
	    clear: function () {
	      this.value = ''
	      this.isFocus = true
	      this.setFocus()
	    },
	    cancel: function () {
	      // this.value = ''
	      this.isCancel = true
	      this.isFixed = false
	    },
	    touch: function () {
	      this.isCancel = false
	      if (this.autoFixed) {
	        this.isFixed = true
	      }
	    },
	    setFocus: function () {
	      this.$els.input.focus()
	    },
	    submit: function() {
	    	var item = this.value;
	    	if(item === "") return;
	    	var storage = window.localStorage;
			var history = !storage.getItem('search')?[]:JSON.parse(storage.getItem('search'));
			if(history.length===0 || history.indexOf(item)<0) {
				history.push(item);
				storage.setItem('search', JSON.stringify(history));
			}
	    },
	    delHistory: function(item) {
	    	var storage = window.localStorage;
			var history = JSON.parse(storage.getItem('search'));
			var index = history.indexOf(item);
			history = history.slice(0, index).concat(history.slice((index+1), history.length));
			this.historySearch = history;
			storage.setItem('search', JSON.stringify(history));
	    },
	    clearHistory: function() {
	    	var storage = window.localStorage;
			this.historySearch = [];
	    	storage.removeItem("search");
	    },
	    submitItem: function(item) {
	    	this.value=item;
	    	this.$els.submitBtn.click();
	    },
	    submitClick: function() {
	    	this.submit();
	    	window.location.href=encodeURI("/list?search_keywords="+this.value);
	    }
	  },
	  data () {
	    return {
	      	isCancel: true,
	      	isFocus: false,
	      	isFixed: false,
	      	historySearch: {
				type: Array,
				default: function() {
					return [];
				}
			},
			hotList: {
				type: Array,
				default: function() {
					return [];
				}
			}
	    }
	  },
	  watch: {
	    isFixed: function (val) {
	      if (val === true) {
	        this.$el.classList.add('vux-search-fixed');
	        this.setFocus();
	        this.isFocus = true;
	      } else {
	        this.$el.classList.remove('vux-search-fixed');
	      }
	    }
	  }
});
var myComplate = Vue.component('search', myVue);
export default myComplate;