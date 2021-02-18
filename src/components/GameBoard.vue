<template>
  <v-card outlined class="d-flex blue-grey darken-3 justify-center">
    <div class="game-board-area blue-grey lighten-2" @click="boardHandler">
      <div
          class="game-board-cell"
          v-for="(item, index) of board"
          :key="index"
          :data-value="index"
          :style="{'color': item==='x'?'red':'green'}"
      >
        {{ item }}
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "GameBoard",
  props: {
    board: {
      type: Object,
      required: true,
      default: () => null
    },
    mark: {
      type: String,
      required: true,
      default: ""
    }
  },
  methods: {
    boardHandler(e) {
      const index = e.target.dataset.value;
      this.$emit("moved", {index})
    },
  }
}
</script>

<style scoped>

.game-board-area {
  display: grid;
  grid-template-columns: 70px 70px 70px;
  grid-template-rows: 70px 70px 70px;
  width: 210px;
}

.game-board-cell {
  border: 1px solid #33654e;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
}

</style>