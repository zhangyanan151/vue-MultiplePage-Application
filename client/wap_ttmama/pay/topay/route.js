import Vue from 'vue'
import Tpl from './template.html'
import {Cookieget} from '../../assets/js/util.js';
import cartService from '../../service/cartService.js';

let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			member_id: null,
			accesstoken: null,
			order_id: null,
			pay_app_id: '',
			data: null
		}
	},
	components: {
	},
	computed: {
		payurl: function() {
			var url = '';
			if(this.pay_app_id == 'malipay') {
				url = "http://mapi.alipay.com/gateway.do";
			}else if(this.pay_app_id == 'wapupacp') {
				url = "https://gateway.95516.com/gateway/api/frontTransReq.do";
			}
			return url;
		} 
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.order_id = this.$route.params.order_id;
		this.pay_app_id = this.$route.params.pay_app_id;
		this.initData();
	},
	methods: {
		initData: function() {
			cartService.gotopay(this.member_id, this.accesstoken, this.order_id, this.pay_app_id, 'order').then((data)=>{
				if(data.rsp == 'succ') {
					this.data = data.data;
				}else {
					location.back();
				}
			})
		}
	},
	watch: {
		'data': function(val) {
			if(val != null) {
				if(this.pay_app_id == 'wapupacp') {
					this.$els.payForm.method = "post";
				}
				this.$els.payForm.submit();
			}
		}
	}
});

export default Index