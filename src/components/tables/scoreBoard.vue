<template>
  <div class="border-2 border-indigo-600">
    <v-data-table
      :headers="headers"
      :items="scoreItems.data"
      :items-per-page="10"
      class="elevation-1"
      :sort-by="['score']"
      :sort-desc="[true]"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteScore(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
          sortable: "false",
          value: "name",
        },
        {
          text: "Score",
          sortable: "true",
          value: "score",
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      scoreItems: [],
    };
  },
  mounted() {
    this.getScoresTable();
  },
  methods: {
    async getScoresTable() {
      this.scoreItems = (await axios.get("http://localhost:4000/Scores")).data;
    },
    async deleteScore(id){
      await axios
        .put("http://localhost:4000/Score/delete", {
          id: id,
        })
        .then(() => {
          this.getScoresTable();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>
