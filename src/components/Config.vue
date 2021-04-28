<template>
<div>
    <span>
       Score BOARDDDD
        <v-data-table
          :headers="headers"
          :items="scoreItems.data"
          :items-per-page="20"
          class="elevation-1"
        ></v-data-table>
    </span>

    <RouterLink class="header__nav__link" :to="{ name: 'GameMenu' }"
                >Jugar</RouterLink>
</div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return {
            headers:[
                {
                text: 'Name',
                sortable: 'false',
                value: 'name'
            },
                {
                text: 'Score',
                sortable: 'true',
                value: 'score'
            }
            ],
            scoreItems:[]
        }
     },
     mounted() {     
            this.test();
        },
     methods: {
       async test(){
                  this.scoreItems = (await axios.get('http://localhost:4000/Scores')).data
                }
     }
     
}
</script>
