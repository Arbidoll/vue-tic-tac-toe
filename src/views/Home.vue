<template>
  <div class="container">
    <div class="home-menu-wrapper">
      <h1>Start new game</h1>
      <div class="new-game">
        <router-link :to="{name: 'Game', query: { players: '2' } }">With another player</router-link>
        <router-link :to="{name: 'Game', query: { players: '1' } }">With bot</router-link>
      </div>
      <div
          v-if="(this.oldGame.score.o!==0)||(this.oldGame.score.x!==0)||(this.oldGame.move!==0)"
          class="load-game white-text"
      >
        Or you can
        <router-link to="/game">load game</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  computed: mapGetters({oldGame: 'loadGame'}),
}
</script>

<style scoped>

h1 {
  color: white;
}

.home-menu-wrapper {
  margin-top: 15%;
}

.load-game {
  font-size: 25px;
}

a {
  color: white;
  padding: 10px;
  transition: all 1s;
  font-size: 25px;
  text-decoration: underline;
}

a:hover {
  font-weight: bolder;
  color: #42b983;
}

</style>