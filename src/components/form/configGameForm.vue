<template>
  <div>
    <v-btn color="red lighten-2 mt-4" dark @click="$refs.newGameModal.show()">
      Start Game
    </v-btn>
    <modal ref="newGameModal">
      <template #tittle>
        <span>Configure the game</span>
      </template>
      <div>
        <v-text-field
          label="User name"
          required
          v-model="nickName"
        ></v-text-field>
        <v-text-field
          label="Number of rows"
          required
          v-model="rows"
        ></v-text-field>
        <v-text-field
          label="Number of columns"
          required
          v-model="columns"
        ></v-text-field>
      </div>
      <template #footer>
        <v-card-actions class="px-0 mt-2">
          <v-spacer />
          <v-btn text @click="$refs.newGameModal.hide()">Close</v-btn>
          <v-btn color="primary" class="text-white">
            <RouterLink
              style="color: white"
              :to="{
                path: 'GameMenu',
                query: { rows: rows, columns: columns, nickName: nickName },
              }"
              >Start!!!</RouterLink
            >
          </v-btn>
        </v-card-actions>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "../dialogs/Modal.vue";
export default {
  components: { Modal },
  data() {
    return {
      rows: 10,
      columns: 10,
      nickName: "New Player",
    };
  }
};
</script>
