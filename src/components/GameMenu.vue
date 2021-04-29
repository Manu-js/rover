<template>
  <v-container>
    <div>
      <button-selector v-on:makeActions="go"> </button-selector>
    </div>

    <div>
      <div v-for="(row, index) in board" :key="index">
        <div
          style="display: inline-block; width: 50px; height: 50px;"
          class="mr-2"
          v-for="(casillas, index2) in row"
          :key="index2"
        >
          <img style="max-width:100%" v-if="actualPosition[0] === index && actualPosition[1] === index2"
          :src="visualRover()"
          >
          <img style="max-width:100%" v-else-if="index === rows - 1  && index2 === columns - 1"
           src="/roverImages/finish.png"
          >
          <span v-else-if="board[index][index2] === 'b'">B</span>
          <img v-else style="max-width:100%"
          src="/roverImages/marsGround.jpg"
          >
        </div>
      </div>
      Score: {{ score }}
      <v-btn>
        <RouterLink class="header__nav__link" :to="{ name: 'MainMenu' }"
          >Main Menu</RouterLink
        >
      </v-btn>
    </div>
    <modal ref="finishedGame">
        <template #tittle>
        <span>CONGRATS!!!!</span>
      </template>
      <div>
        <span>
          Congrats {{nickName}}, you win this game with {{score}} points =) =) =)
        </span>
      </div>
      <template #footer>
        <v-card-actions class="px-0 mt-2">
          <v-spacer />
          <v-btn color="primary" class="text-white">
            <RouterLink
              style="color: white"
              :to="{
                path: '/',
              }"
              >Back to main menu</RouterLink
            >
          </v-btn>
        </v-card-actions>
      </template>
    </modal>
  </v-container>
</template>

<script>
import axios from "axios";
import ButtonSelector from "./ButtonSelector.vue";
import Modal from "./dialogs/Modal.vue";

export default {
  components: { ButtonSelector, Modal },

  data() {
    return {
      board: [],
      actualPosition: [0, 0],
      orientation: ["N", "W", "S", "E"],
      actualOrientation: 3,
      orders: [],
      score: 0,
      rows: this.$route.query.rows,
      columns: this.$route.query.columns,
      nickName: this.$route.query.nickName,
    };
  },
  mounted() {
    let pepe = [];
    for (let index = 0; index < this.rows; index++) {
      pepe.push(Array.from(Array(Number(this.columns)).keys()));
    }
    this.board = pepe;
  },
  methods: {
    visualRover() {
      switch (this.orientation[this.actualOrientation]) {
        case "N":
          return "/roverImages/roverUp.png";
        case "S":
          return "/roverImages/roverDown.png";
        case "E":
          return "/roverImages/roverRight.png";
        case "W":
          return "/roverImages/roverLeft.png";
      }
    },
    async go(orders) {
      for (let index = 0; index < orders.length; index++) {
        const element = orders[index];

        this.score++;
        if (element === "A") {
          switch (this.orientation[this.actualOrientation]) {
            case "N":
              this.up();
              break;
            case "S":
              this.down();
              break;
            case "E":
              this.right();
              break;
            case "W":
              this.left();
              break;
            default:
              console.log("bad movement");
          }
        } else {
          if (element === "L") {
            this.actualOrientation = this.actualOrientation - 1;
            if (this.actualOrientation < 0) this.actualOrientation = 3;
          } else {
            this.actualOrientation = this.actualOrientation + 1;
            if (this.actualOrientation > 3) this.actualOrientation = 0;
          }
        }
        if (this.comparePosition()) {
          await axios
            .post("http://localhost:4000/add", {
              name: this.nickName,
              score: this.score,
            })
            .then((response) => {
              this.$refs.finishedGame.show();
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
          return;
        }
      }
    },
    comparePosition() {
      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

      const a = this.actualPosition;
      const b = [this.columns - 1, this.rows - 1];
      return equals(a, b);
    },
    down() {
      if (this.actualPosition[0] >= 0 && this.actualPosition[0] < 9) {
        this.$set(this.actualPosition, 0, this.actualPosition[0] + 1);
        this.isLegalMovement();
      }
    },
    up() {
      if (this.actualPosition[0] > 0 && this.actualPosition[0] <= 9) {
        this.$set(this.actualPosition, 0, this.actualPosition[0] - 1);
        this.isLegalMovement();
      }
    },
    left() {
      if (this.actualPosition[1] > 0 && this.actualPosition[1] <= 9) {
        this.$set(this.actualPosition, 1, this.actualPosition[1] - 1);
        this.isLegalMovement();
      }
    },
    right() {
      if (this.actualPosition[1] >= 0 && this.actualPosition[1] < 9) {
        this.$set(this.actualPosition, 1, this.actualPosition[1] + 1);
        this.isLegalMovement();
      }
    },
    isLegalMovement() {
      if (this.board[this.actualPosition[0]][this.actualPosition[1]] === "b") {
        alert("RIP RIP RIP");
      }
    },
  },
};
</script>
