<template>
  <div>
    <tool-bar :title="'Registration'" />

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <div style="margin: 25px">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="rules"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="rules"
              label="Password"
              required
              type="password"
            ></v-text-field>
            <v-btn @click="register" color=""> Register </v-btn>
          </v-form>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from "firebase";
import toolBar from "@/components/navbar";
export default {
  name: "register",
  components: {
    "tool-bar": toolBar
  },
  data() {
    return {
      email: "",
      password: "",
      rules: [v => !!v || "Required"]
    };
  },
  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert("account created");
            console.log(user);
            this.$router.push("/home");
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style scoped></style>
