<template>
  <div>
    <div class="border-2 border-indigo-600">
      <v-data-table
        :headers="headers"
        :items="scoreItems.data"
        :items-per-page="20"
        class="elevation-1"
      ></v-data-table>
    </div>
    <modal ref="newGameModal">
      <div>
        <v-text-field
          label="Añade columnas"
          required
          v-model="rows"
        ></v-text-field>
        <v-text-field
          label="añade filas"
          required
          v-model="columns"
        ></v-text-field>
      </div>
      <template #footer>
        <v-card-actions class="px-0 mt-2">
          <v-spacer />
          <v-btn text>
            <RouterLink
              :to="{
                path: 'GameMenu',
                query: { rows: rows, columns: columns },
              }"
              >Show user info 👁</RouterLink
            >
          </v-btn>
          <v-btn color="primary" @click="$refs.newGameModal.hide()"
            >Close</v-btn
          >
        </v-card-actions>
      </template>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "./Modal.vue";
export default {
  components: { Modal },
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
      rows: 10,
      columns: 10,
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
