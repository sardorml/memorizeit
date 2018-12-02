<template>
  <div>
    <tool-bar :title="title"></tool-bar>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card flat>
          <v-spacer></v-spacer>

          <v-card-text>
            <div
              v-for="card in cards"
              :key="card.id"
              style="margin-bottom: 10px"
            >
              <v-card>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{ card.title }}</h3>
                    <div>{{ card.value }}</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn
                    flat
                    color="orange"
                    :to="{
                      name: 'view-card',
                      params: { card_id: card.card_id }
                    }"
                    >View</v-btn
                  >
                </v-card-actions>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import toolBar from "@/components/navbar";
import db from "../js/firebaseInit";
export default {
  name: "dashboard",
  components: {
    "tool-bar": toolBar
  },
  data() {
    return {
      cards: [],
      loading: true,
      title: "Dashboard"
    };
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
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
