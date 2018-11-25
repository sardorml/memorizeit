<template>
  <div>
    <v-container>
      <v-layout row>
        <v-flex offset-md4 md4>
          <v-card
            style="margin-bottom: 30px"
            color="blue-grey darken-2"
            class="white--text"
          >
            <v-card-title class="justify-center" primary-title>
              <div class="headline">{{ title }}</div>
            </v-card-title>
          </v-card>

          <div v-for="card in randomOptions" :key="card">
            <v-btn
              @click="checkAnswer"
              style="margin-top:10px"
              block
              large
              color="info"
              >{{ card }}</v-btn
            >
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import db from "../js/firebaseInit";
export default {
  name: "learn",
  components: {},
  data() {
    return {
      cards: [],
      loading: true,
      title: "Temporary Title",
      randomOptions: []
    };
  },
  methods: {
    randomize: function() {
      this.randomOptions = [];
      for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * this.cards.length);
        console.log(random);
        if (!this.randomOptions.includes(random)) {
          console.log("in");
          this.randomOptions.push(random);
        } else {
          random = Math.floor(Math.random() * this.cards.length);
        }
      }
      console.log(this.randomOptions);
    },
    checkAnswer: function() {}
  },
  created() {
    db.collection("cards")
      .orderBy("card_id")
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            card_id: doc.data().card_id,
            title: doc.data().title,
            value: doc.data().value
          };
          this.cards.push(data);
        });
        this.randomize();
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
