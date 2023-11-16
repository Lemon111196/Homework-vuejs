<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  mounted() {
    document.title = "Note App"
  }
}
</script>

<style lang='scss' scoped>
  #app{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
