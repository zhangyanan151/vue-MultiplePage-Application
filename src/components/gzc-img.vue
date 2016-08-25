<template>
  <div id="banner">
		<img src="{{url}}"/>
  </div>
</template>

<script>
export default {
	data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      url: require('../assets/gzcimg.png') 
    }
  }
}
</script>

<style>
  #banner{}
  #banner img{width:100%; }
</style>