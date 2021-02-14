<template>
  <div id="app" class="blue-grey darken-3">
    <nav id="nav" class="blue-grey darken-4">
      <div class="nav-wrapper container">
          <router-link class="left" to="/">Home</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
@import "~materialize-css/dist/css/materialize.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

a{
  text-decoration: none;
  font-weight: bold;
  font-size: 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
