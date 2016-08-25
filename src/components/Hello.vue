<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
<!-- 这是我们的 View -->
<div id="example-1">
  Hello {{ msg }}!
  <img id="image" src="{{url}}"  />
</div>
</template>

<script>
import { get, getMessage } from '../services/message'
export default {
  data () {   
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: getMessage('#example-1'),
      url: require('../assets/logo.png')
     
    }
  },
  ready () {
//    this.handle = setInterval(() => {
//      this.count++
//    }, 1000)
    get('#example-1');
//   var img = require('../assets/logo.png');
//document.getElementById('image').setAttribute('src', img);
  }
}
    
</script>
