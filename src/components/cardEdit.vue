<template>
  <div>
    <tool-bar :title="'Edit ' + title" />

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <div style="margin: 25px">
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
            <v-btn @click="updateCard"> submit </v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-form>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import toolBar from "@/components/navbar";
import db from "../js/firebaseInit";
export default {
  name: "card-edit",
  components: {
    "tool-bar": toolBar
  },
  data() {
    return {
      valid: true,
      card_id: null,
      title: null,
      value: null,
      rules: [v => !!v || "Required"]
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("cards")
      .where("card_id", "==", to.params.card_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.card_id = doc.data().card_id;
            vm.title = doc.data().title;
            vm.value = doc.data().value;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("cards")
        .where("card_id", "==", this.$route.params.card_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.card_id = doc.data().card_id;
            this.title = doc.data().title;
            this.value = doc.data().value;
          });
        });
    },
    updateCard() {
      if (this.$refs.form.validate()) {
        db.collection("cards")
          .where("card_id", "==", this.$route.params.card_id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref
                .update({
                  card_id: this.card_id,
                  title: this.title,
                  value: this.value
                })
                .then(() => {
                  this.$router.push({
                    name: "view-card",
                    params: { card_id: this.card_id }
                  });
                });
            });
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
