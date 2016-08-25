
<template>
    <div class="tab-bar-container">
        <div class="tab-item active" v-on:click='changeItem'>
            <p>限时特卖</p>
        </div>
        <div class="tab-item">
            <p>
                下期预告
                <span class="nuderline-num"> {{ goodslist_total_number }}</span>
            </p>
        </div>
    </div>
</template>



<script>
var jq=require('jquery')

export default {
  // data () {
  //   return {
  //     underlineNum: 9
  //   }
  // },
  /*props 表示从 父组件获取的数据 ，其中 which_is_showing 设置为双向绑定 —— （即它可以 把变化传递给父组件）*/
  props: ['goodslist_total_number', 'which_is_showing'],
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
  ready (){
    jq('.tab-item:eq(0)').click()
  }

}

</script>

<style>
    .tab-bar-container{width:418px; margin:40px auto; border-radius: 40px; border:1px solid #c8c8c8; overflow: hidden;}
    .tab-bar-container .tab-item{width:50%; float:left;  cursor:pointer;}
    .tab-bar-container .tab-item p{line-height: 36px; margin:5px; text-align: center;  border-radius: 20px; font-size:22px; font-family: 'Microsoft YaHei';  position: relative;}
    .tab-bar-container .tab-item.active p{ background: #76c1bc; color:#fff;}
    .nuderline-num{position: absolute; top:0; right:39px; width:20px; height:20px; line-height: 20px; font-size: 14px; background:#fabe00; color:#fff; border-radius:10px; text-align: center;}
</style>