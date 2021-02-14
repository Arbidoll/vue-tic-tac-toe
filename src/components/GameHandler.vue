<template>
  <div class="container">
    <h3 class="center white-text">Tic Tac Toe</h3>
    <hr/>
    <div class="timer" id="timer">
      {{ timer.minutes }} : {{ timer.second }}
    </div>
    <span v-if="players!=='1'" class="queue white-text">
      {{ mark === 'x' ? "Crosses" : "Noughts" }} turn
    </span>
    <span v-else class="queue white-text">
      {{ botMark === mark ? "Bot" : "You" }} turn
    </span>
    <div class="score white-text">
      Score <span class="red-text">{{ score.x }}</span> : <span class="green-text">{{ score.o }}</span>
    </div>
    <GameBoard
        :board="board"
        :mark="mark"
        @moved="moveHandler"
    />
  </div>
</template>

<script>
import {mapMutations, mapGetters} from "vuex";
import GameBoard from "@/components/GameBoard";

export default {
  name: "GameHandler",
  components: {GameBoard},
  data() {
    return {
      players: this.$route.query.players || 0,
      //кастомный таймер
      timer: {
        second: 0,
        minutes: 0
      },
      score: {x: 0, o: 0},
      move: 0,
      mark: 'x',
      botMark: '',
      board: {
        1: "", 2: "", 3: "",
        4: "", 5: "", 6: "",
        7: "", 8: "", 9: "",
      },
      currentStrategyBot: []
    }
  },
  methods: {
    ...mapMutations({saveGame: "saveGameState"}),
    moveHandler({index}) {
      if (!this.board[index].length) {
        const board = {...this.board}
        board[index] = this.mark
        this.board = board
        this.afterMoveChange()
        this.saveGame({
          board: this.board,
          score: this.score,
          move: this.move,
          mark: this.mark,
          players: this.players,
          timer: this.timer
        })
      }
    },
    checkGameStatus(mark) {
      const winCombine = Object.keys(this.board).map(key => this.board[key] === mark);
      const isDraw = !Object.keys(this.board).find(key => this.board[key] === "")
      if (isDraw) {
        this.reset()
      }
      return (winCombine[0] && winCombine[1] && winCombine[2]) ||
          (winCombine[3] && winCombine[4] && winCombine[5]) ||
          (winCombine[6] && winCombine[7] && winCombine[8]) ||
          (winCombine[0] && winCombine[3] && winCombine[6]) ||
          (winCombine[1] && winCombine[4] && winCombine[7]) ||
          (winCombine[2] && winCombine[5] && winCombine[8]) ||
          (winCombine[0] && winCombine[4] && winCombine[8]) ||
          (winCombine[2] && winCombine[4] && winCombine[6]);

    },
    afterMoveChange() {
      this.move = this.move + 1;
      const status = this.checkGameStatus(this.mark);
      this.mark = this.mark === 'x' ? 'o' : 'x';
      if (status) {
        if (this.mark === 'x') {
          this.score.o++
        } else {
          this.score.x++
        }
        this.reset();
      }
    },
    getBotStep() {
      const botMoved = Object.keys(this.board).filter(el => (this.board[el] === this.botMark || this.board[el] === ""))
      //Варианты доступных стратегий
      let variant = this.botWinStrategy.filter(subarray => {
        return subarray.every(el => Object.values(botMoved).includes(el.toString()))
      });
      //Перемешаем для большей разнообразности ходов бота
      variant = variant.sort(() => Math.random() - 0.5)
      if (variant[0] !== undefined) {

        const isActualStrategy = variant.find(el => {
          el.every((item, index) => this.currentStrategyBot[index] === item)
        })

        if (!isActualStrategy) {
          this.currentStrategyBot = variant[0];
        }
        //возвращаем текущий ход бота
        return Object.keys(this.board).filter(el => {
          if (this.board[el] === "") {
            return this.currentStrategyBot.find(item => item === +el)
          }
        })[0]

      } else {
        return Object.keys(this.board).find(el => this.board[el] === "")
      }
    },
    bot() {
      if (this.mark === this.botMark) {
        const board = {...this.board}
        board[this.getBotStep()] = this.botMark
        this.board = board
        this.afterMoveChange()
      }
    },
    startTimer() {
      setInterval(() => {
        this.timer.second++
        if (this.timer.second === 60) {
          this.timer.second = 0
          this.timer.minutes++
        }
      }, 1000)
    },
    reset() {
      this.board = {
        1: "", 2: "", 3: "",
        4: "", 5: "", 6: "",
        7: "", 8: "", 9: "",
      }
      this.mark = 'x'
      this.move = 0
    }
  },
  computed: {
    ...mapGetters({lastGame: 'loadGame'}),
    botWinStrategy() {
      return [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9], [3, 5, 7]
      ]
    }
  },
  watch: {
    mark: function (val) {
      if (val === this.botMark) {
        this.bot()
      }
    }
  },
  mounted() {
    this.startTimer()
    if (this.players === 0) {
      const lastGame = this.lastGame
      this.board = lastGame.board
      this.timer = lastGame.timer
      this.mark = lastGame.mark
      this.score = lastGame.score
      this.move = lastGame.move
      this.players = lastGame.players
    }

    if (+this.players === 1) {
      this.botMark = Math.floor(Math.random() * 2) ? "x" : "o"
      if (this.botMark === "x") {
        this.bot()
      }
    }
  },
  destroyed() {
    this.timer = {}
  }
}
</script>

<style scoped>

h3 {
  padding-top: 65px;
}

.timer {
  padding-bottom: 65px;
  color: white;
  font-size: 20px;
}

.queue {
  font-size: 25px;
}

.score {
  font-size: 20px;
  margin-bottom: 20px;
}

</style>