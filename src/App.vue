<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default  {
  name:  'App',
  beforeDestoy() {
  	this.$store.dispatch('LogOut');
  }
};
</script>