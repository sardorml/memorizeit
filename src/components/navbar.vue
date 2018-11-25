<template>
  <div>
    <v-toolbar flat dark color="#FF7043">
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer;"
      ></v-toolbar-side-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/dashboard" flat>Dashboard</v-btn>
        <v-btn to="/register" flat>Register</v-btn>
        <v-btn to="/" flat>Login</v-btn>
        <v-btn to="/new" flat>Add</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary mobile-break-point>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://api.adorable.io/avatars/285/sardor.png" />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Sardor</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="link(item.component);"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    title: {
      type: String,
      required: true
      // default: ''
    }
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "home", component: "/home" },
        { title: "Dashboard", icon: "dashboard", component: "/dashboard" },
        { title: "Register", icon: "question_answer", component: "/register" },
        { title: "Login", icon: "question_answer", component: "/" },
        { title: "New", icon: "question_answer", component: "/new" }
      ],
      mini: false,
      right: null,
      isLoggedIn: false,
      currentUser: false
    };
  },
  methods: {
    link: function(link) {
      this.$router.push(link);
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
