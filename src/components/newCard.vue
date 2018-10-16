<template>
  <v-container fluid grid-list-md>
    <v-layout column align-center justify-center>
      <v-flex xs12>
        <h1>New Card</h1>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs6 sm3>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="card_id"
            :rules="rules"
            label="ID"
            required
          ></v-text-field>
          <v-text-field
            v-model="title"
            :rules="rules"
            label="Title"
            required
          ></v-text-field>
          <v-text-field
            v-model="value"
            :rules="rules"
            label="Description"
            required
          ></v-text-field>
          <v-btn
            @click="saveCard"
          >
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from '../js/firebaseInit'
export default {
  name: "new-card",
  data() {
    return {
      valid: true,
      card_id: null,
      title: null,
      value: null,
      rules: [v => !!v || 'Required']
    };
  },
  methods: {
    saveCard () {
      if (this.$refs.form.validate()) {
        db.collection('cards').add({
          card_id: this.card_id,
          title: this.title,
          value: this.value
        })
        .then(docRef => {
          console.log('Card added: ', docRef.id)
          this.$router.push('/')
        })
        .catch(error => {
          console.error('Error adding card: ', error)
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
