<template>
  <div id="app" class="flex flex-col">
    <TopBar />
    <div id="nav" class="w-full" style="display:flex;">
      <LeftCol />
      <router-view class="flex-1" style="overflow: hidden;" />
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
