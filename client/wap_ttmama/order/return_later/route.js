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
			return_id: null,
			logistics_com: '',
			logistics_no: '',
			logistics_note: '',
			popShow: false,
			popText: '',
			spinShow: false
		}
	},
	computed: {
		
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.order_id = this.$route.params.order_id;
		this.return_id = this.$route.params.return_id;
	},
	ready: function() {
		this.$els.logisticsCom.focus();
	},
	methods: {
		submit: function() {
			if(this.logistics_com == '') {
				this.showPop("物流公司不能为空");
				return;
			}
			if(this.logistics_no == '') {
				this.showPop("物流单号不能为空");
				return;
			}
			this.spinShow = true;
			orderService.returnLater(this.member_id, this.accesstoken, this.order_id, this.return_id, this.logistics_com, this.logistics_no, this.logistics_note).then((data)=>{
				this.spinShow = false;
				if(data.rsp == "succ") {
					this.showPop("快递信息已提交");
					history.back();
				}
			});
		},
		showPop: function(text) {
			this.popText = text;
			this.popShow = true;
			var that = this;
			setTimeout(function(){
				that.popShow = false;
			},800)
		}
	}
});

export default Index