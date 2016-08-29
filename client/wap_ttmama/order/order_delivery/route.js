import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import $ from 'jquery';
import {Cookieget} from '../../assets/js/util.js';
import orderService from '../../service/orderService.js';
import Pop from '../../Common_components/pop/route.js';

let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			member_id: null,
			accesstoken: null,
			order_id: null,
			isLoading: true,
			deliveryData: null
		}
	},
	computed: {
		
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.order_id = this.$route.params.order_id;
		this.initData();
	},
	methods: {
		initData: function() {
			orderService.delivery(this.member_id, this.accesstoken, this.order_id).then((data)=>{
				this.isLoading = false;
				if(data.rsp=="succ") {
					this.deliveryData = data.data;
				}else {
					window.history.go(-1);
				}
			})
		}
	}
});

export default Index