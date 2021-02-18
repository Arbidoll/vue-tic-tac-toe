<template>
  <v-main class="home-menu-wrapper">
    <v-container>
      <h1 class="white--text">Start new game</h1>
      <div class="new-game">
        <v-btn text :to="{name: 'Game', query: { players: '2' } }">With another player</v-btn>
        <v-btn text :to="{name: 'Game', query: { players: '1' } }">With bot</v-btn>
      </div>
      <div
          v-if="(this.oldGame.score.o!==0)||(this.oldGame.score.x!==0)||(this.oldGame.move!==0)"
          class="load-game white--text"
      >
        Or you can
        <v-btn text to="/game">load game</v-btn>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  computed: mapGetters({oldGame: 'loadGame'}),
}
</script>

<style scoped>

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
  color: #42b983;
}

</style>