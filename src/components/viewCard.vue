<template>
  <v-container fluid grid-list-md>
    <v-layout column align-center justify-center>
      <v-flex xs12>
        <h1>View Card {{title}}</h1>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs6 sm3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{title}}</h3>
              <div>{{value}}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange" :to="{ name: 'card-edit', params: { card_id: card_id }}">Edit</v-btn>
            <v-btn flat color="orange" @click="deleteCard">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from '../js/firebaseInit'
export default {
  name: "view-card",
  data() {
    return {
      card_id: null,
      title: null,
      value: null
    };
  },
  beforeRouteEnter (to, from, next) {
      db.collection('cards').where('card_id', '==', to.params.card_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.card_id = doc.data().card_id
            vm.title = doc.data().title
            vm.value = doc.data().value
          })
        })
      })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
      fetchData () {
        db.collection('cards').where('card_id', '==', this.$route.params.card_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.card_id = doc.data().card_id
            this.title = doc.data().title
            this.value = doc.data().value
          })
        })
      },
      deleteCard () {
        if(confirm ('Are you sure?')) {
          db.collection('cards').where('card_id', '==', this.$route.params.card_id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push('/')
            })
          })
        }
      }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
