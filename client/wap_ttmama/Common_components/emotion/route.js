import Vue from 'vue';
import Tpl from './template.html';
import './style.css';
import emotion from '../../assets/emotion/Expression.js';
import Swiper from 'vux-components/swiper';
import SwiperItem from 'vux-components/swiper-item';
import $ from 'jquery'

let Index = Vue.extend({
	template: Tpl,
	data: ()=>{
		return {
			commInput: false,
			emotionInput: false,
			emotionList: emotion
		}
	},
	props: [
		'forCommentId',
		'toId',
		'memberName'
	],
	components: {
		Swiper,
		SwiperItem
	},
	created: function() {
		
	},
	computed: {
		
	},
	methods: {
    	openInput: function() {
    		this.$dispatch('is-login');
    		this.commInput = true;
    	},
    	closeInp: function() {
    		this.commInput = false;
    		this.emotionInput = false;
    		this.forCommentId = null;
    		this.toId = null;
    		this.memberName = null;
    	},
    	choseInput: function() {
    		this.$dispatch('is-login');
    		if(!this.emotionInput) {
    			this.commInput = false;
    			this.emotionInput = true;
    		}else {
    			this.commInput = true;
    			this.emotionInput = false;
    		}
    	},
    	addEmotion: function(key) {
    		var clas = this.emotionList[key];
    		this.$els.commentInput.innerHTML += "<i contenteditable='false' class='ttmama-emotion-sp "+clas+"'>"+key+"</i>";
    		this.inputFocus();
    	},
    	delEmotion: function() {
    		var content = this.$els.commentInput.innerHTML;
    		if(content!='' && content.substring(content.length-4)=='</i>') {
    			var obj = this.$els.commentInput.lastChild;
    			this.$els.commentInput.removeChild(obj);
    		}else {
    			content = content.substring(0, content.length-1);
    			this.$els.commentInput.innerHTML = content;
    		}
    		this.inputFocus();
    	},
    	submit: function() {
    		var content = this.$els.commentInput.innerText;
    		this.$dispatch('on-comment-submit', content);
    		this.closeInp();
    	},
    	inputFocus: function() {
    		if(this.$els.commentInput.innerHTML=='') {
    			var st = '评论';
    			if(this.memberName!=null && this.memberName!='') {
    				st = "回复"+this.memberName+":";
    			}
    			this.$els.commentInput.setAttribute('data-beforeData',st);
    		}else {
    			this.$els.commentInput.setAttribute('data-beforeData','');
    		}
    	}
	},
	ready: function() {

	},
	watch: {
		'commInput': function(val) {
			if(val) {
				this.$els.commentInput.focus();
				this.emotionInput = false;
			}
		}
	},
	events: {
		'comment-input': function() {
			this.openInput();
		}
	}
});
var myComplate = Vue.component('ttmama-emotion', Index);
export default myComplate;