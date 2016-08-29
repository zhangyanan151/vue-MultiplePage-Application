import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import $ from 'jquery';
import {Cookieget} from '../../assets/js/util.js';
import orderService from '../../service/orderService.js';

let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			member_id: null,
			accesstoken: null,
			order_id: null,
			reason_type: ''
		}
	},
	computed: {
		
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.order_id = this.$route.params.order_id;
	},
	methods: {
		cancelReason: function(reason_type) {
			this.reason_type = reason_type;
			this.orderCancel();
		},
		orderCancel: function() {
			orderService.orderCancel(this.order_id, this.member_id, this.accesstoken, this.reason_type).then((data)=>{
				history.go(-1);
			})
		}
	}
});

export default Index