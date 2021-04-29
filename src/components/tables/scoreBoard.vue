<template>
    <div class="border-2 border-indigo-600">
      <v-data-table
        :headers="headers"
        :items="scoreItems.data"
        :items-per-page="10"
        class="elevation-1"
        :sort-by="['score']"
        :sort-desc="[true]"
      ></v-data-table>
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
      ],
      scoreItems: [],
    };
  },
  mounted() {
    this.test();
  },
  methods: {
    async test() {
      this.scoreItems = (await axios.get("http://localhost:4000/Scores")).data;
    },
  },
};
</script>
