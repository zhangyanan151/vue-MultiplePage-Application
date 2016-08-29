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
			data: null
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
			orderService.afterrec(this.member_id, this.accesstoken, 'all', this.order_id, '', '').then((data)=>{
				if(data.rsp == 'succ') {
					this.data = data.data;
				}else {
					history.back();
				}
			})
		},
		showDetail: function(order_id, e) {
			e.stopPropagation();
			e.preventDefault();
			location.href = '/order_details/'+order_id;
		},
		returnSche: function(order_id, return_id) {
			location.href = '/return_sche/'+order_id+'/'+return_id;
		}
	}
});

export default Index