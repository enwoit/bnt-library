<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import '../node_modules/vuetify/src/stylus/main.styl'

#app {
  text-align: center;
  color: #2c3e50;
  background-color: #4367b2;
}
</style>
