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
			isLoading: true,
			member_id: null,
			accesstoken: null,
			order_id: null,
			return_id: null,
			data: null
		}
	},
	computed: {
		
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.order_id = this.$route.params.order_id;
		this.return_id = this.$route.params.return_id;
		this.initData();
	},
	methods: {
		initData: function() {
			orderService.returnSche(this.member_id, this.accesstoken, this.order_id, this.return_id).then((data)=>{
				this.isLoading = false;
				if(data.rsp=="succ") {
					this.data = data.data;
					var obj = null;
					var flag = 0;
					for(var i=0; i<this.data.log.length; i++) {
						if(this.data.log[i].behavior=='确认申请' && this.data.log[i].log_text_app.data=='卖家已同意申请，可以发起退货') {
							flag = i;
							obj = {
								"op_name": this.data.log[i].op_name,
                            	"alttime": this.data.log[i].alttime,  
								"behavior": '温馨提示',
								"log_text_app": {
									"author": this.data.log[i].log_text_app.author
								}
							};
						}
					}
					if(obj!=null) {
						var arr = [];
						arr = arr.concat(this.data.log.slice(0,flag+1));
						arr = arr.concat(obj);
						arr = arr.concat(this.data.log.slice(flag+1,this.data.log.length));
						this.data.log = arr;
					}
				}else {
					history.back();
				}
			})
		},
		addReturn: function() {
			this.$router.go('/return_later/'+this.order_id+"/"+this.return_id);
		},
		cancelReturn: function() {
			this.isLoading = true;
			orderService.cancelReturn(this.member_id, this.accesstoken, this.order_id, this.return_id).then((data)=>{
				if(data.rsp=="succ") {
					this.initData();
				}
			})
		},
		goBack: function() {
			window.history.back();
		}
	}
});

export default Index