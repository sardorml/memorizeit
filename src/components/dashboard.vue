<template>
  <v-container fluid grid-list-md>
    <v-layout column align-center justify-center>
      <v-flex xs12>
        <h1>Dashboard</h1>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs6 sm3 v-for="card in cards" :key="card.id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{card.title}}</h3>
              <div>{{card.value}}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange" :to="{ name: 'view-card', params: { card_id: card.card_id }}">View</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from '../js/firebaseInit'
export default {
  name: "main",
  data() {
    return {
      cards: [],
      loading:true
    };
  },
  created () {
      db.collection('cards').orderBy('card_id').get().then((querySnapshot) => {
        this.loading = false
        querySnapshot.forEach((doc) => {
          const data = {
            'id': doc.id,
            'card_id': doc.data().card_id,
            'title': doc.data().title,
            'value': doc.data().value
          }
          this.cards.push(data)
        })
      })
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
