<template>
  <div id="app" class="flex flex-col">
    <TopBar />
    <div id="nav" class="w-full" style="display:flex;">
      <LeftCol v-if="$route.meta && $route.meta.leftNav"  />
      <router-view class="flex-1" style="overflow: hidden;" />
    </div>
  </div>
</template>

<script>
import LeftCol from '@/components/LeftCol.vue'
import TopBar from '@/components/TopBar.vue'

export default {
  data() {
    return{
    }
  },
  components :{
    LeftCol,TopBar
  },
  mounted() {
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
