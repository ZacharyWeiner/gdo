<template>
  <Nav />
<div class='w-full bg-white h-6 mt-4'> Powered by: <span class='text-green-500'> Metadesk</span> Design by: <span class='text-blue-500'> Crumbs </span></div>
</template>

<script>
import Nav from './components/Nav'


export default {
    components: { Nav  }
}

</script> 

<style>
body {
  background: #000000;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
