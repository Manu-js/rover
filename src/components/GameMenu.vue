<template>
  <v-container>
    <div>
      <button-selector v-on:makeActions="go">
      </button-selector>    
    </div>

    <div>
      <div v-for="(row, index) in board" :key="index">
        <div style="display:inline-block; width:30px; height:30px" v-for="(casillas, index2) in row" :key="index2">
          <span v-if="actualPosition[0] === index && actualPosition[1] === index2" v-html="visualRover()"></span>
          <span v-else-if="board[index][index2] === 'b'">B</span>
          <span v-else>O</span>
        </div>
      </div>
      Score: {{score}}
      <v-btn>
                <RouterLink class="header__nav__link" :to="{ name: 'MainMenu' }"
                >Main Menu</RouterLink>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import axios from "axios"
import ButtonSelector from './ButtonSelector.vue'

export default {
  components: { ButtonSelector },

  data() {
    return{
       board : [],
      actualPosition: [0,0],
      orientation: ["N","W","S","E"],
      actualOrientation: 2,
      orders:[],
      score: 0,
            rows: this.$route.query.rows,
            columns: this.$route.query.columns
    }
    
  },
  mounted(){
        let pepe = []
        for (let index = 0; index < this.rows; index++) {
         pepe.push(Array.from(Array(Number(this.columns)).keys()))       
        }
      this.board = pepe
  },
    methods: {
      resetTab(){
        let pepe = []
        for (let index = 0; index < this.rows; index++) {
         pepe.push(Array.from(Array(Number(this.columns)).keys()))       
        }
      this.board = pepe
      },
      visualRover(){
          switch (this.orientation[this.actualOrientation]) {
              case 'N':
                return '^'
              case 'S':
                return 'v'
              case 'E':
               return '>'
              case 'W':
               return '<'
            }
      },
      async go(orders){
        orders.forEach(element => {
          this.score++
          if(element === "A") {
            switch (this.orientation[this.actualOrientation]) {
              case 'N':
                this.up()
                break;
              case 'S':
                this.down()
                break;
              case 'E':
                this.right()
                break;
              case 'W':
                this.left()
                break;
              default:
                console.log('Lo lamentamos, por el momento no disponemos de');
            }
          }
          else {
            if (element === "L") {
              this.actualOrientation = this.actualOrientation - 1 
              if (this.actualOrientation < 0) this.actualOrientation = 3              
            }
            else {
               this.actualOrientation = this.actualOrientation + 1
              if (this.actualOrientation > 3) this.actualOrientation = 0              

            }
          }
          if (this.comparePosition()){
                let confirmacion = (
                axios.post('http://localhost:4000/add',{
                  name: "yo",
                  score: this.score
                })
            );
            alert(confirmacion)
            return
          }  

        })
         
      },
      comparePosition(){
        const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

        const a = this.actualPosition
        const b = [this.columns - 1, this.rows - 1]
        return equals(a, b)
      },
      down(){
        if (this.actualPosition[0] >= 0 && this.actualPosition[0] < 9) {
            this.$set(this.actualPosition, 0, this.actualPosition[0] + 1)
            this.isLegalMovement()
        }
      },
      up(){
        if (this.actualPosition[0] > 0 &&  this.actualPosition[0] <= 9) {
            this.$set(this.actualPosition, 0, this.actualPosition[0] - 1)
            this.isLegalMovement()
        }
      },
      left(){
        if (this.actualPosition[1] > 0 &&  this.actualPosition[1] <= 9) {
            this.$set(this.actualPosition, 1, this.actualPosition[1] - 1)
            this.isLegalMovement()
        }
      },
      right(){
        if (this.actualPosition[1] >= 0 &&  this.actualPosition[1] < 9) {
            this.$set(this.actualPosition, 1, this.actualPosition[1] + 1)
            this.isLegalMovement()
        }
      },
      isLegalMovement(){
        if (this.board[this.actualPosition[0]][this.actualPosition[1]] === "b"){
          alert("RIP RIP RIP")
        }
      }

    }
  }
</script>
