<template>
  <div id="app">
    <TopBar />
    <div id="nav" style="display:flex">
      <LeftCol />
      <router-view />
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
  </div>
</template>

<script>
import LeftCol from '@/components/LeftCol.vue'
import TopBar from '@/components/TopBar.vue'

export default {
  components :{
    LeftCol,TopBar
  }
}
</script>
<style>
@import 'tailwind.min.css';
@import 'stylesheet.css';
#app {
  font-family: Roboto;
}

</style>
