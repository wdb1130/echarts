<template>
  <div id="app">
    <home></home>
    <!-- <wang></wang> -->
  </div>
</template>

<script>
  import Home from './index/Home'
  export default {
    name: 'app',
    components: {
      Home
    }
  };
</script>

<style>
  #app {
    font: 16px "microsoft yahei", Arial, Helvetica, sans-serif;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
</style>
