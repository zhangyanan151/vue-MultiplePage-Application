'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import Q from 'q'
import jq from 'jquery'

let Index = Vue.extend({
	template: Tpl,
	data: ()=> {
		return {
			goodslist_total_number: 0,
      		which_is_showing: ''
		}
	},
	methods: {
	    changeItem () {
	      var self=this;
	      jq('.tab-item').click(function(){
	          var hasClassActive =jq(this).hasClass('active');
	          var idx = jq(this).index();

	          if(!hasClassActive){
	            jq(this).addClass('active');
	            jq(this).siblings().removeClass('active');
	            jq('.xs-area:eq('+idx+')').addClass('show');
	            jq('.xs-area:eq('+idx+')').siblings().removeClass('show');

	          }
	          /*更改状态 —— 它最终会传递给父组件（虽然不推荐这么做，但这里需要这么做）*/
	          if(jq('.tab-item:eq(0)').hasClass('active')){
	            // console.log(self.which_is_showing);
	            self.which_is_showing='left';
	          }else{
	            self.which_is_showing='right';
	            // console.log(self.which_is_showing);
	          }
	      });
	       
	    }
	  },
	  ready: {
	    jq('.tab-item:eq(0)').click()
	  }
})

export default Index