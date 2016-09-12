import Vue from 'vue'
import Tpl from './tpl1.html'

let Index = Vue.extend({
	template: Tpl,
	data: ()=> {
		return {
			show: true
		}
	},
	methods: {
		toggle() {
			this.show = !this.show
		}
	}
})
export default Index

Vue.transition('expand', {

  beforeEnter: function (el) {
    el.textContent = 'beforeEnter'
  },
  enter: function (el) {
    el.textContent = 'enter'
  },
  afterEnter: function (el) {
    el.textContent = 'afterEnter'
  },
  enterCancelled: function (el) {
    // handle cancellation
  },

  beforeLeave: function (el) {
    el.textContent = 'beforeLeave'
  },
  leave: function (el) {
    el.textContent = 'leave'
  },
  afterLeave: function (el) {
    el.textContent = 'afterLeave'
  },
  leaveCancelled: function (el) {
    // handle cancellation
  }
})
