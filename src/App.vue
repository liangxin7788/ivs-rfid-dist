<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
<!--    <router-view/>-->
    <Index/>
  </div>
</template>

<script>
import Index from "./components/Index";
export default {
  name: 'App',
  components: {Index}
}
</script>

<style>
html, body {
  height: 100%;
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  height: 100%;
}
</style>
