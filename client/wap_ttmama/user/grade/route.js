import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import $ from 'jquery';
import grade from '../../service/userService.js';
import {getQueryString,Cookieget} from '../../assets/js/util.js';
import Pop from '../../Common_components/pop/route.js';

var headImg = require('../../assets/head.png');
let Index = Vue.extend({
	template: Tpl,
	data: () => {
		return {
			gradeData:[],
			member_id:null,
			accesstoken:null,
			member_pic:null,
			headImg:headImg,
			show:true
		}
	},
	created: function() {
		this.member_id = Cookieget('member_id');
		this.accesstoken = Cookieget('accesstoken');
		this.member_pic = Cookieget('member_pic');
		grade.gradeData(this.member_id,this.accesstoken).then((data)=>{
			if(data.rsp === 'succ'){
				this.gradeData = data.data;
			}else if (data.rsp === 'fail') {
				this.show=false;
			}
		});
	},
	computed:{

	},
    methods: {
    			
	}
})
export default Index