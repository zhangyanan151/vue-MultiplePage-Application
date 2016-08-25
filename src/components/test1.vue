<template>
  <div>
    <group>
      <cell title="vue" value="cool"></cell>
      <Switch title="<span style='color:red'>I'm Red.</span>"  :value="true" ></Switch>
    </group>
  </div>
  <group>
      <cell title="vue" value="cool"></cell>
      <Switch title="<span style='color:red'>I'm Red.</span>"  :value="true" ></Switch>
    </group>
  </div>
  <group>
      <cell title="vue" value="cool"></cell>
      <Switch title="<span style='color:red'>I'm Red.</span>"  :value="true" ></Switch>
    </group>
  </div>
  <group>
      <cell title="vue" value="cool"></cell>
      <Switch title="<span style='color:red'>I'm Red.</span>"  :value="true" ></Switch>
    </group>
  </div>

   <div class="div1" 
      v-touch:tap="test($event)"
      v-touch:pan="test"
      v-touch-options:pan="{ direction: 'horizontal', threshold: 10 }"
      v-touch:press="test"

      v-text="event"></div>

 <tab>
      <tab-item :selected="demo1 === '已发货'" @click="demo1 = '已发货'" disabled>已发货</tab-item>
      <tab-item :selected="demo1 === '未发货'" @click="demo1 = '未发货'">未发货</tab-item>
      <tab-item :selected="demo1 === '全部订单'" @click="demo1 = '全部订单'">全部订单</tab-item>
    </tab>
</template>

<script>
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import Switch from 'vux-components/switch'
import  Tab  from 'vux-components/tab'
import  TabItem  from 'vux-components/tab-item'
import  Sticky  from 'vux-components/sticky'
// import { Tab, TabItem, Sticky, Divider } from 'vux/components/'
import $ from 'jquery'
var a=0;
export default {
  data: function(){
     return {event:null}
  },
  components: {
    Group,
    Cell,
    Switch,
    Tab,
    TabItem,
    Sticky

  },
  methods: {
    test: function (e) {
       a=e.deltaX
      this.event = e.deltaX
      $(".div1").css("transform","translateX("+a+"px)")
      // console.log(this.event);
    }
  }
}
</script>

<style>
@import '~vux/vux.css';
 .div1 {
      width: 300px;
      height: 300px;
      background-color: #f00;
      float: right;
      transform:translateX(50px);
      /*transition:transform .3s;*/
    }
</style>