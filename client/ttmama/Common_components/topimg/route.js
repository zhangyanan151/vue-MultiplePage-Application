
import Vue from 'vue'
import Tpl from './template.html'
// import Q from 'q'

let Index = Vue.extend({
	template: Tpl,
	data: ()=> {
		return {
			imgurl: window.cm_groupbuyItems.cm_gzcImg
		}
	},
	methods: {
		test: function(str) {
			alert('test'+str);
		},
		goTest() {
			this.$router.go('/test');
		}
	}
})
var myComponent = Vue.component('gzc-img', Index);
export default myComponent
