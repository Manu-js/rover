<template>
  <div>
    <div>
      <span> Score Board </span>
    </div>
    <score-board/>
    <config-game-form/>
  </div>
</template>

<script>
import axios from "axios";
import ConfigGameForm from './form/ConfigGameForm.vue';
import ScoreBoard from './tables/ScoreBoard.vue';

export default {
  components: { ConfigGameForm, ScoreBoard },
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
      nickName: "",
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
