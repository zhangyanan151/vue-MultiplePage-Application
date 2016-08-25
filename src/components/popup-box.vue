<style type="text/css">
  .ui-tooltip {
  display: inline-block;
  position: relative;
}
.ui-tooltip .tooltip-trigger {
  display: inline-block;
}
.ui-tooltip .tooltip {
  position: absolute;
  left: 50%;
  top: auto;
  width: 12.5rem;
  margin-top: 12px;
  margin-left: -6.25rem;
  visibility: hidden;
  border-radius: 6px;
  box-shadow: 0 3px 5px rgba(6,0,1,0.2);
  z-index: 10;
}
.ui-tooltip .tooltip.in {
  visibility: visible;
}
.ui-tooltip .tooltip.top {
  margin-top: 0;
  margin-bottom: 12px;
}
.ui-tooltip .tooltip.top .tooltip-arrow {
  top: auto;
  bottom: -24px;
  border-color: #fff transparent transparent transparent;
}
.ui-tooltip .tooltip .tooltip-arrow {
  display: block;
  position: absolute;
  left: 50%;
  top: -24px;
  width: 0;
  height: 0;
  margin-left: -12px;
  border-width: 12px;
  border-style: solid;
  border-color: transparent transparent #1472c8 transparent;
}
.ui-tooltip .tooltip .tooltip-header {
  padding: 1rem;
  color: #fff;
  background-color: #1472c8;
  text-align: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.ui-tooltip .tooltip .tooltip-content {
  margin: 0;
  padding: 1rem;
  text-align: left;
  background-color: #fff;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
#app {
  width:200px;
  margin: 0 auto;
}
  
</style>
<template>
<div id="template">
  <div class="ui-tooltip">
    <div class="tooltip-trigger" v-el:trigger @click.prevent="toggle">
      <slot name="trigger"></slot>
    </div>
    <div class="tooltip fade-in" v-el:popup :class="{in: show}" :style="style">
      <div class="tooltip-arrow" v-el:arrow></div>
      <div class="tooltip-header">
        <slot name="header"></slot>
      </div>
      <div class="tooltip-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</div>
<div id="app">
  <tooltip>
    <a slot="trigger" href>This is a tooltip</a>
    <span slot="header">Header</span>
    <p slot="content">Something you need to know is the ...<button v-tooltip-button>close</button></p>
  </tooltip>
</div>
</template>

<script>
// 箭头的高度
var ARROW_HEIGHT = 12;
$dom = {
  closest: function(elem, fn) {
    return elem && elem !== document && (fn(elem) ? elem : this.closest(elem.parentNode, fn));
  },
  closestByElement: function(elem, dom) {
    if (!Array.isArray(dom)) {
      dom = [dom];
    }
    return this.closest(elem, function(el) {
      return dom.some(function(d) {
        return el === d;
      });
    });
  }
}
var closeTooltip = function() {
  this._host.close();
};
Vue.directive('tooltip-button', {
  bind: function() {
    this.el.addEventListener('click', closeTooltip.bind(this));
  },
  unbind: function() {
    this.el.removeEventListener('click', closeTooltip.bind(this));
  }
});
Vue.component('tooltip', {
  template: '#template',
  data: function() {
    return {
      // 控制显示
      show: false,
      // 样式
      style: {}
    };
  },
  methods: {
    // 切换显示与否
    toggle: function() {
      this.show = !this.show;
      if (this.show) {
        this.$dispatch('onShown');
      } else {
        this.$dispatch('onHidden');
      }
    },
    // 关闭tooltip
    close: function() {
      this.show = false;
    },
    // 点击外面其它位置取消显示
    backdrop: function(e) {
      if (!$dom.closestByElement(e.target, [this.$els.trigger, this.$els.popup])) {
        this.show = false;
      }
    }
  },
  ready: function() {
    document.addEventListener('click', this.backdrop);
  },
  beforeDestroy: function() {
    document.removeEventListener('click', this.backdrop);
  }
});

new Vue({
  el: '#app'
});
</script>
