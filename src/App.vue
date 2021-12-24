<template>
  <Nav />

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
