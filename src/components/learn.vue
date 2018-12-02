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
              <div v-if="!loading" class="headline">{{ title.title }}</div>
            </v-card-title>
          </v-card>

          <div v-if="!loading" v-for="card in randomOptions" :key="card">
            <v-btn
              @click="checkAnswer(card.value);"
              style="margin-top:10px"
              block
              large
              color="info"
              >{{ card.value }}</v-btn
            >
          </div>
          <v-alert
            v-if="checkAlert == 1"
            :value="true"
            type="success"
            transition="scale-transition"
          >
            You got it!
          </v-alert>
          <v-alert
            v-if="checkAlert == 2"
            :value="true"
            type="error"
            transition="scale-transition"
          >
            Opps! You guessed wrong
          </v-alert>
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
      title: {},
      randomOptions: [],
      checkAlert: 0
    };
  },
  methods: {
    randomize: async function() {
      this.loading = true;
      this.checkAlert = 0;
      this.randomOptions = [];
      this.randomOptions = this.cards
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      this.title = this.randomOptions[
        Math.floor(Math.random() * this.randomOptions.length - 1)
      ];
      this.loading = false;

      // console.log(this.randomOptions);
    },
    checkAnswer: function(guess) {
      if (this.title.value === guess) {
        this.checkAlert = 1;
        setTimeout(function() {
          this.checkAlert = 0;
          this.randomOptions = this.cards
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          this.title = this.randomOptions[
            Math.floor(Math.random() * this.randomOptions.length - 1)
          ];
        }, 2000);
      } else {
        this.checkAlert = 2;
      }
      // this.randomize();
    }
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
