import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import $ from 'jquery';
import BigSwiper from '../big_swiper/route.js';

let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			curNum: 1,
			showBigImg: false
		};
	},
	components: {
	},
	props: {
		productSpec: {
			type: Object,
      		required: false,
			default() {
				return {
				"default_img": "",
			    "spec": [
			    ],
			    "data": {
			    }}
			}
		},
		show: {
			type: Boolean,
			default: false
		},
		curSpec: []

	},
	computed: {
		bottom: function() {
			var bottom = 0;
			if(this.show) {
				bottom = 0;
			}else {
				bottom = '-100%';
			}
			return bottom;
		},
		defaultIndex: function() {
			var defaultIndex = '';
			for(var obj in this.productSpec.data) {
				if(this.productSpec.data[obj].is_default==="true") {
					defaultIndex = obj;
				}
			}
			return defaultIndex;
		},
		defaultImg: function() {
			var valueId = this.defaultIndex.split("-");
			valueId = valueId.slice(0, valueId.length-1);
			this.curSpec = valueId;
			var img = "";
			if(this.productSpec.spec) {
				// for(var i=0; i<this.productSpec.spec.length; i++) {
					var spec = this.productSpec.spec[0];
					for(var j=0; j<spec.length; j++) {
						if(this.arrExits(valueId, spec[j].spec_value_id)) {
							if(spec[j].spec_image) {
								img = spec[j].spec_image;
							}
						}
					}
				// }
			}
			return img;
		},
		bigImgs: function() {
			var imgs=[];
			if(this.productSpec.spec) {
				// for(var i=0; i<this.productSpec.spec.length; i++) {
				// 	var spec = this.productSpec.spec[i];
				// 	for(var j=0; j<spec.length; j++) {
				// 		if(spec[j].spec_image) {
				// 			imgs.push({
				// 				url: 'javascript:',
				// 				img: spec[j].spec_image,
				// 				title: spec[j].spec_value
				// 			});
				// 		}
				// 	}
				// }
				for(var i=0; i<this.curSpec.length; i++) {
					var sp = null;
					for(var k=0; k<this.productSpec.spec[i].length; k++) {
						if(this.productSpec.spec[i][k].spec_value_id == this.curSpec[i]) {
							sp = this.productSpec.spec[i][k];
							break;
						}
					}
					if(sp.spec_goods_images) {
						for(var j=0; j<sp.spec_goods_images.length; j++) {
							imgs.push({
								url: 'javascript:',
								img: sp.spec_goods_images[j],
								title: ''
							});
						}
					}
				}
			}
			return imgs;
		}
	},
	methods: {
		arrExits: function(arr, value) {
			var b = false;
			if(arr) {
				for(var i=0; i<arr.length; i++) {
					if(value == arr[i]) {
						b = true;
					}
				}
			}
			return b;
		},
		choseSpec: function(valueId, index) {
			var ids = this.defaultIndex.split("-");
			ids = ids.slice(0, ids.length-1);
			ids[index] = valueId;
			var id="";
			for(var i=0; i<ids.length; i++) {
				id += ids[i]+'-';
			}
			this.productSpec.data[this.defaultIndex].is_default = "false";
			this.productSpec.data[id].is_default = "true";
		},
		addCart: function() {
			this.$dispatch('on-addcart', this.defaultIndex, this.curNum);
			this.$dispatch('on-hideSpec');
		},
		addOrder: function() {
			this.$dispatch('on-addorder', this.defaultIndex, this.curNum);
		},
		hideSpec: function() {
			this.$dispatch('on-hideSpec');
		},
		hasNum: function(valueId, index) {
			var tags = true;
			var ids = this.defaultIndex.split("-");
			ids = ids.slice(0, ids.length-1);
			var id = "";
			for(var i=0; i<ids.length; i++) {
				if(index == i) {
					id += valueId+"-";
				}else {
					id += ids[i]+"-";
				}
			}
			if(this.productSpec.data[id].store=="0") {
				tags = false;
			}else {
				tags = true;
			}
			return tags;
		}
	},
	events: {
		'on-show-bigimg': function(flag) {
			this.showBigImg = flag;
		}
	}
});
var myComplate = Vue.component('spec-product', Index);
export default myComplate;