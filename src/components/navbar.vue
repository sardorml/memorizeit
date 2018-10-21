<template>
  <div>
    <v-toolbar flat dark color="#FF7043">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to='/new' flat>Add</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://api.adorable.io/avatars/285/sardor.png">
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
          @click="link(item.component)"
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
        { title: "Dashboard", icon: "dashboard", component: '/' },
        { title: "New", icon: "question_answer", component: '/new' }
      ],
      mini: false,
      right: null
    };
  },
  methods: {
    link: function(link) {
      this.$router.push(link)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
