import Vue from 'vue'
import Tpl from './index.html'
import gzcImg from '../Common_components/topimg/route'
import groupbuy from '../Common_components/group/route'

let Index = Vue.extend({
	template: Tpl,
	components: {
		gzcImg,
		groupbuy
	}
});
export default Index
