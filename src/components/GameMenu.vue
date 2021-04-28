<template>
  <v-container>
    <div>
      <v-btn @click="orders.push('A')">avance</v-btn> 
      <v-btn @click="orders.push('R')">Izquierda</v-btn> 
      <v-btn @click="orders.push('L')">derecha</v-btn> 
      <v-btn @click="go()">GO</v-btn>

      <v-textarea
            label="rows"
            auto-grow
            outlined
            rows="1"
            v-model="rows"
            type="number"
            row-height="15"
          ></v-textarea>
          <v-textarea
            label="column"
            auto-grow
            outlined
            rows="1"
            type="number"
            v-model="columns"
            row-height="15"
          ></v-textarea>

      <v-btn @click="resetTab()">apply new games!!</v-btn>
    
      actual orders: {{orders}}
    </div>

    <div>
      <div v-for="(row, index) in board" :key="index">
        <div style="display:inline-block; width:30px; height:30px" v-for="(casillas, index2) in row" :key="index2">
          <span v-if="actualPosition[0] === index && actualPosition[1] === index2" v-html="visualRover()"></span>
          <span v-else-if="board[index][index2] === 'b'">B</span>
          <span v-else>O</span>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios"

  export default {
    name: 'HelloWorld',

  data() {
    return{
       board : [],
      actualPosition: [0,0],
      orientation: ["N","W","S","E"],
      actualOrientation: 0,
      orders:[],
      columns: 10,
      rows : 10,
      score: 0
    }
    
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
      async go(){
        this.orders.forEach(element => {
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
         this.orders = []
         
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
