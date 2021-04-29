<template>
  <modal ref="finishedGame">
    <template #tittle>
      <span>CONGRATS!!!!</span>
    </template>
    <div>
      <span>
        Congrats {{ nickName }}, you win this game with {{ score }} points!!!!!!!
      </span>
    </div>
    <template #footer>
      <v-card-actions class="px-0 mt-2">
        <v-spacer />
        <v-btn color="primary" class="text-white" @click="saveGameScore">
          Save and exit
        </v-btn>
      </v-card-actions>
    </template>
  </modal>
</template>

<script>
import Modal from "./Modal.vue";
import axios from "axios";

export default {
  components: { Modal },
  props: { nickName: String, score: Number },
  methods: {
    async saveGameScore() {
      await axios
        .post("http://localhost:4000/add", {
          name: this.nickName,
          score: this.score,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          this.$router.push("/");
        });
    },
    openModal() {
      this.$refs.finishedGame.show();
    },
  },
};
</script>
