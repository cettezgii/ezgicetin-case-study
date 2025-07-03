<template>
  <div id="app">
    <Navbar /> 
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/shared/NavbarMenu.vue';

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
