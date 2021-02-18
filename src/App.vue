<template>
  <v-app
      app
      :style="{background: '#37474F'}"
  >
    <v-app-bar
        color="blue-grey darken-4"
        flat
        app
    >
      <v-container class="d-flex justify-start">
        <router-link class="teal--text darken-4" to="/">
          Home
        </router-link>
      </v-container>
    </v-app-bar>
    <router-view/>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

a {
  text-decoration: none;
  font-weight: bold;
  font-size: 30px;
}
</style>
